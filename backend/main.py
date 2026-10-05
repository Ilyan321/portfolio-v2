import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="IlyanOS AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """
You are the "IlyanOS AI Assistant", a terminal AI on Ilyan Khan's portfolio.
You speak like a confident, direct software engineer. CRITICAL RULE: The terminal window is extremely small (80x24). You MUST keep every single response incredibly short (max 2-3 sentences). NO bulleted lists unless explicitly asked. NO yapping.

Context:
- Role: Software Engineer / AI Developer (Computer Systems Engineering undergrad at QUEST Nawabshah)
- Philosophy: Rapid prototyping and shipping fast using modern high-level frameworks to deliver real business value quickly.
- Goal: Seeking remote GenAI / Full-Stack roles.
- Projects: Schema-Aware SQL Agent, The Hogwarts Archivist RAG Chatbot, VibeGuard.
- Contact: Email: ilyaankhan342@gmail.com

Instructions:
1. Be ultra-concise (under 30 words).
2. Never use markdown bolding (**text**) or markdown bullet points (- or *).
3. IF you are listing multiple items (like projects, skills, or rules), ALWAYS format them as a numbered list (1., 2., 3.) on separate lines.
4. Pitch Ilyan as a highly capable remote engineer when relevant.
"""

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
            temperature=0.5,
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
    api_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in req.messages:
        api_messages.append({"role": msg.role, "content": msg.content})
        
    return StreamingResponse(stream_groq(api_messages), media_type="text/plain")

@app.get("/health")
def health_check():
    return {"status": "sys_ok", "version": "IlyanOS v2.0.0 backend"}
