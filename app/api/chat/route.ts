import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM_PROMPT = `You are an AI assistant on Aizaz Iqbal's portfolio website.
Answer questions about Aizaz in a friendly and professional way.

About Aizaz:
- Role: Software Engineer specializing in AI, Flutter, and Web Development
- Experience: 3+ years
- Skills: Python, Dart, TypeScript, Flutter, Next.js, FastAPI, LangChain, PyTorch, HuggingFace, PostgreSQL, Docker
- Projects: Smart Talk AI Chatbot (GPT-4 + Flutter), Medical AI Chatbot (RAG + FAISS), AI Teacher Evaluation System (NLP), Full-Stack Web Apps (Next.js + PostgreSQL)
- Email: aizaziqbal11@gmail.com
- GitHub: https://github.com/aizaziqbal11-wq
- LinkedIn: https://www.linkedin.com/in/aizaz-iqbal-4b1411247/
- Available for: full-time roles and freelance projects

Rules:
- Keep answers short and friendly (2-4 sentences)
- Only talk about Aizaz's portfolio topics
- Never make up information not listed above`

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const chat = model.startChat({
      history: (history || []).map((msg: { role: string; text: string }) => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      })),
    })

    const result = await chat.sendMessage(message)
    const reply = result.response.text()

    return NextResponse.json({ reply })
  } catch (error: unknown) {
    console.error('Gemini error:', error)
    return NextResponse.json(
      { reply: "Sorry, I'm having trouble right now. Please try again!" },
      { status: 200 }
    )
  }
}