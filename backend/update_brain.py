import urllib.parse
import os
import sys
import json
import time
import urllib.request
import urllib.error

def load_env():
    env_vars = {}
    try:
        with open(".env.local", "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    if "=" in line:
                        key, val = line.split("=", 1)
                        if val.startswith('"') and val.endswith('"'):
                            val = val[1:-1]
                        env_vars[key.strip()] = val.strip()
    except Exception:
        pass
    return env_vars

env = load_env()
SUPABASE_URL = env.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = env.get("SUPABASE_SERVICE_ROLE_KEY")
GITHUB_TOKEN = env.get("GITHUB_TOKEN")
HF_TOKEN = env.get("HF_TOKEN")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Missing Supabase URL or Service Role Key in .env.local")
    sys.exit(1)

# New Hugging Face router endpoint for feature extraction (bge-small-en-v1.5 produces 384d vectors)
HF_API_URL = "https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5"

def get_embeddings(texts: list[str], retries=3) -> list[list[float]]:
    req = urllib.request.Request(HF_API_URL, method="POST")
    req.add_header("Content-Type", "application/json")
    if HF_TOKEN:
        req.add_header("Authorization", f"Bearer {HF_TOKEN}")
        
    data = json.dumps({"inputs": texts}).encode("utf-8")
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, data=data) as response:
                return json.loads(response.read().decode())
        except urllib.error.HTTPError as e:
            err_body = e.read().decode()
            if e.code == 503:
                print("   -> HF model waking up... waiting 10s.")
                time.sleep(10)
                continue
            elif e.code == 429:
                print("   -> Rate limited... waiting 15s.")
                time.sleep(15)
                continue
            elif e.code == 401:
                print("❌ 401 Unauthorized: Please add HF_TOKEN=hf_... to your .env.local (Get free token at https://huggingface.co/settings/tokens)")
                return None
            else:
                print(f"⚠️ HF API Error: {e.code} - {err_body}")
                return None
        except Exception as e:
            print(f"⚠️ Request Error: {str(e)} - retrying in 3s...")
            time.sleep(3)
            continue
    return None

def get_github_readme(repo_url: str) -> str:
    repo_path = repo_url.replace("https://github.com/", "").strip()
    api_url = f"https://api.github.com/repos/{repo_path}/readme"
    
    req = urllib.request.Request(api_url)
    req.add_header("Accept", "application/vnd.github.v3.raw")
    if GITHUB_TOKEN:
        req.add_header("Authorization", f"token {GITHUB_TOKEN}")
        
    try:
        with urllib.request.urlopen(req) as response:
            return response.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        print(f"⚠️ GitHub API Error: {e.code}")
        return None
    except Exception:
        return None

def chunk_text(text: str, max_chunk_size: int = 800) -> list[str]:
    cleaned = text.replace("\r\n", "\n")
    paragraphs = [p.strip() for p in cleaned.split("\n\n") if p.strip()]
    chunks = []
    current = ""
    for p in paragraphs:
        if len(current) + len(p) + 2 <= max_chunk_size:
            current = f"{current}\n\n{p}" if current else p
        else:
            if current:
                chunks.append(current)
            if len(p) > max_chunk_size:
                lines = [l for l in p.split("\n") if l.strip()]
                sub = ""
                for line in lines:
                    if len(sub) + len(line) + 1 <= max_chunk_size:
                        sub = f"{sub}\n{line}" if sub else line
                    else:
                        if sub:
                            chunks.append(sub)
                        sub = line
                current = sub
            else:
                current = p
    if current:
        chunks.append(current)
    return chunks if chunks else [cleaned[:max_chunk_size]]

def supabase_rpc_delete(slug: str):
    url = f"{SUPABASE_URL}/rest/v1/portfolio_documents?project_slug=eq.{urllib.parse.quote(slug)}"
    req = urllib.request.Request(url, method="DELETE")
    req.add_header("apikey", SUPABASE_KEY)
    req.add_header("Authorization", f"Bearer {SUPABASE_KEY}")
    try:
        urllib.request.urlopen(req)
    except:
        pass

def supabase_insert(rows: list):
    url = f"{SUPABASE_URL}/rest/v1/portfolio_documents"
    req = urllib.request.Request(url, method="POST")
    req.add_header("apikey", SUPABASE_KEY)
    req.add_header("Authorization", f"Bearer {SUPABASE_KEY}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Prefer", "return=minimal")
    
    data = json.dumps(rows).encode("utf-8")
    try:
        urllib.request.urlopen(req, data=data)
    except urllib.error.HTTPError as e:
        print(f"Supabase Insert Error: {e.read().decode()}")

def process_repo(project):
    slug = project.get("title").split("|||")[0].strip()
    repo_url = project.get("github")
    
    if not repo_url or "github.com" not in repo_url:
        return
        
    print(f"\n🔄 Processing {slug}...")
    readme = get_github_readme(repo_url)
    
    if not readme:
        print(f"   -> No README found or Private Repo access failed.")
        return
        
    chunks = chunk_text(readme)
    print(f"   -> Sliced into {len(chunks)} chunks.")
    
    rows = []
    for i in range(0, len(chunks), 4):
        batch = chunks[i:i+4]
        embeddings = get_embeddings(batch)
        if not embeddings or type(embeddings) != list:
            print("   -> Failed to get embeddings. Skipping batch.")
            continue
        
        for j, emb in enumerate(embeddings):
            rows.append({
                "project_slug": slug,
                "chunk_text": batch[j],
                "embedding": emb
            })
        time.sleep(1)
    
    if rows:
        supabase_rpc_delete(slug)
        supabase_insert(rows)
        print(f"✅ Injected {len(rows)} vectors into pgvector for {slug}!")

def get_all_projects():
    url = f"{SUPABASE_URL}/rest/v1/v2_projects?select=title,github"
    req = urllib.request.Request(url)
    req.add_header("apikey", SUPABASE_KEY)
    req.add_header("Authorization", f"Bearer {SUPABASE_KEY}")
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except:
        return []

def main():
    if "--repo" in sys.argv:
        idx = sys.argv.index("--repo")
        repo_url = sys.argv[idx + 1]
        slug = repo_url.split("/")[-1]
        if "--slug" in sys.argv:
            s_idx = sys.argv.index("--slug")
            slug = sys.argv[s_idx + 1]
        process_repo({"title": slug, "github": repo_url})
    elif "--all" in sys.argv:
        projects = get_all_projects()
        for p in projects:
            process_repo(p)
    else:
        print("Usage: python3 backend/update_brain.py [--all] | [--repo <github_url> --slug <name>]")

if __name__ == "__main__":
    main()
