import os
import sys
import json
import urllib.request
import urllib.error
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
from groq import Groq
from dotenv import load_dotenv

# Load env variables from backend/.env, ../.env.local, or .env.local
load_dotenv()
load_dotenv("../.env.local")
load_dotenv(".env.local")

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
HF_TOKEN = os.getenv("HF_TOKEN")

HF_API_URL = "https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5"

app = FastAPI(title="IlyanOS AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=GROQ_API_KEY)

# Read baseline portfolio data from frontend codebase
PORTFOLIO_DATA = ""
for path in ["../lib/data.ts", "lib/data.ts", "./lib/data.ts"]:
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                PORTFOLIO_DATA = f.read()
            break
        except Exception:
            pass

BASE_SYSTEM_PROMPT = f"""
You are the "IlyanOS AI Assistant", a terminal AI on Ilyan Khan's portfolio.
You speak like a confident, direct software engineer. CRITICAL RULE: The terminal window is extremely small (80x24). You MUST keep every single response short and direct (max 2-3 sentences). NO yapping.

Context:
- Role: Software Engineer / AI Developer (Computer Systems Engineering undergrad at QUEST Nawabshah)
- Philosophy: Rapid prototyping and shipping fast using modern high-level frameworks to deliver real business value quickly.
- Goal: Seeking remote GenAI / Full-Stack roles.
- Contact: Email: ilyaankhan342@gmail.com

--- BASE PORTFOLIO OVERVIEW (lib/data.ts) ---
{PORTFOLIO_DATA}
---------------------------------------------

Instructions:
1. Be concise (under 35 words unless deep architectural detail is asked).
2. Never use markdown bolding (**text**) or markdown bullet points (- or *).
3. IF you are listing multiple items (like projects, skills, or rules), ALWAYS format them as a numbered list (1., 2., 3.) on separate lines.
4. Pitch Ilyan as a highly capable remote engineer when relevant.
"""

def get_query_embedding(text: str) -> Optional[List[float]]:
    if not HF_TOKEN or not text.strip():
        return None
    req = urllib.request.Request(HF_API_URL, method="POST")
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", f"Bearer {HF_TOKEN}")
    data = json.dumps({"inputs": [text[:500]]}).encode("utf-8")
    try:
        with urllib.request.urlopen(req, data=data, timeout=5) as response:
            result = json.loads(response.read().decode())
            if isinstance(result, list) and len(result) > 0:
                return result[0]
    except Exception as e:
        print(f"[RAG] Embedding warning: {e}")
    return None

def query_vector_db(query_emb: List[float], match_threshold: float = 0.25, match_count: int = 4) -> List[dict]:
    if not SUPABASE_URL or not SUPABASE_KEY or not query_emb:
        return []
    url = f"{SUPABASE_URL}/rest/v1/rpc/match_documents"
    payload = json.dumps({
        "query_embedding": str(query_emb),
        "match_threshold": match_threshold,
        "match_count": match_count
    }).encode("utf-8")
    req = urllib.request.Request(url, method="POST", data=payload)
    req.add_header("apikey", SUPABASE_KEY)
    req.add_header("Authorization", f"Bearer {SUPABASE_KEY}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        print(f"[RAG] Supabase match_documents warning: {e}")
    return []

def build_rag_context(user_query: str) -> str:
    emb = get_query_embedding(user_query)
    if not emb:
        return ""
    matches = query_vector_db(emb, match_threshold=0.25, match_count=4)
    if not matches:
        return ""
    
    context_blocks = []
    for m in matches:
        slug = m.get("project_slug", "Project")
        chunk = m.get("chunk_text", "").strip()
        context_blocks.append(f"### [Verified Repository Context: {slug}]\n{chunk}")
    
    return "\n\n".join(context_blocks)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

async def stream_groq(api_messages):
    try:
        completion = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=api_messages,
            temperature=0.4,
            max_tokens=500,
            stream=True
        )
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                yield chunk.choices[0].delta.content
    except Exception as e:
        yield f"Error: {str(e)}"

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    # Extract latest user message to retrieve semantic RAG context
    latest_user_query = ""
    for msg in reversed(req.messages):
        if msg.role == "user":
            latest_user_query = msg.content
            break
            
    rag_context = ""
    if latest_user_query:
        rag_context = build_rag_context(latest_user_query)

    system_prompt = BASE_SYSTEM_PROMPT
    if rag_context:
        system_prompt += f"\n\n--- RELEVANT PROJECT DETAILS (FROM SUPABASE PGVECTOR RAG) ---\n{rag_context}\n-------------------------------------------------------------"

    api_messages = [{"role": "system", "content": system_prompt}]
    for msg in req.messages:
        api_messages.append({"role": msg.role, "content": msg.content})
        
    return StreamingResponse(stream_groq(api_messages), media_type="text/plain")

@app.api_route("/health", methods=["GET", "HEAD"])
def health_check():
    return {"status": "sys_ok", "version": "IlyanOS v2.0.0 backend", "rag_enabled": True}
