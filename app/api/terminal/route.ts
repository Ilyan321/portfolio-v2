import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { site, techStack } from '@/lib/data';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are the "IlyanOS AI Assistant", a terminal-based AI running on Ilyan Khan's portfolio website. 
You act as a command-line interface helper. Keep responses concise, formatting them as plain text or markdown that looks good in a console.
Do NOT use large markdown headers (like # or ##). Use simple text formatting.

Here is Ilyan's context:
- Name: Ilyan Khan
- Role: ${site.role}
- Headline: ${site.headline}
- Bio: ${site.about}
- Contact: Email: ${site.email} | WhatsApp: ${site.phone}
- Tech Stack: ${techStack.map(g => `${g.group} (${g.items.join(', ')})`).join(' | ')}
- Projects: He has over 12 featured projects including a Schema-Aware SQL Agent, The Hogwarts Archivist RAG Chatbot, and VibeGuard Content Moderation Engine.
- Experience: Internships at FlyRank AI and IntelliVerse.

Answer the user's prompt using this context. Be helpful, technical, and a bit clever, but stay in character as a sleek terminal assistant.
`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      system: SYSTEM_PROMPT,
      prompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Groq API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
