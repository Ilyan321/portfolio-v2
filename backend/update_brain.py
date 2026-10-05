import os
import sys
import json
import time
import urllib.request
import urllib.error

# Parse .env.local natively without python-dotenv
def load_env():
    env_vars = {}
    try:
        with open(".env.local", "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    if "=" in line:
                        key, val = line.split("=", 1)
                        # Remove quotes if they exist
                        if val.startswith('"') and val.endswith('"'):
                            val = val[1:-1]
                        env_vars[key.strip()] = val.strip()
    except Exception as e:
        print("Could not read .env.local", e)
    return env_vars

env = load_env()
SUPABASE_URL = env.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = env.get("SUPABASE_SERVICE_ROLE_KEY")
GITHUB_TOKEN = env.get("GITHUB_TOKEN")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Missing Supabase URL or Service Role Key in .env.local")
    sys.exit(1)

HF_API_URL = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"

def get_embeddings(texts: list[str]) -> list[list[float]]:
    req = urllib.request.Request(HF_API_URL, method="POST")
    req.add_header("Content-Type", "application/json")
    data = json.dumps({"inputs": texts}).encode("utf-8")
    try:
        with urllib.request.urlopen(req, data=data) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        print(f"⚠️ HF API Error: {e.code} - {e.read().decode()}")
        return None
    except Exception as e:
        print(f"⚠️ Request Error: {str(e)}")
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

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += (chunk_size - overlap)
    return chunks

def supabase_rpc_delete(slug: str):
    url = f"{SUPABASE_URL}/rest/v1/portfolio_documents?project_slug=eq.{slug}"
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
    # Smaller batch size to prevent HF API limits
    for i in range(0, len(chunks), 4):
        batch = chunks[i:i+4]
        embeddings = get_embeddings(batch)
        if not embeddings or type(embeddings) != list:
            # Often HF returns dict if model is loading
            if type(embeddings) == dict and "estimated_time" in embeddings:
                print("   -> Model loading on HF... waiting 10s.")
                time.sleep(10)
                embeddings = get_embeddings(batch)
            if not embeddings or type(embeddings) != list:
                continue
        
        for j, emb in enumerate(embeddings):
            rows.append({
                "project_slug": slug,
                "chunk_text": batch[j],
                "embedding": emb
            })
        time.sleep(2)
    
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
    if "--all" in sys.argv:
        projects = get_all_projects()
        for p in projects:
            process_repo(p)

if __name__ == "__main__":
    main()
