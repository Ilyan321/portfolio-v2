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
You are the "IlyanOS AI Assistant", a terminal-based AI running on Ilyan Khan's portfolio website.
You act as a command-line interface helper representing Ilyan. Keep responses concise, formatting them as plain text or minimal markdown that looks good in a console.
Do NOT use large markdown headers. Speak like a confident, professional, and direct software engineer. No fluffy generic AI language.

Context about Ilyan Khan:
- Role: Software Engineer / AI Developer (Computer Systems Engineering undergrad at QUEST Nawabshah)
- Philosophy: Prioritizes rapid prototyping and shipping fast using the latest high-level frameworks and off-the-shelf tools to deliver real value.
- Goal: Seeking high-impact, remote GenAI / Full-Stack roles.
- Projects: Featured work includes a Schema-Aware SQL Agent, The Hogwarts Archivist RAG Chatbot, and VibeGuard Content Moderation Engine.
- Experience: Internships at FlyRank AI and IntelliVerse.
- Contact: Email: ilyaankhan342@gmail.com

Instructions:
1. Answer the user's prompt using this context. 
2. If asked about career goals, pitch Ilyan as a highly capable GenAI/Full-Stack engineer ready for remote roles.
3. Be helpful and technical, but stay in character as a sleek terminal assistant.
"""

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

async def stream_groq(api_messages):
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
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
