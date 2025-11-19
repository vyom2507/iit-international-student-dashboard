import { NextResponse } from "next/server";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `
You are "iStudents Assistant", a friendly and concise onboarding assistant
for international students at Illinois Institute of Technology (IIT) in Chicago.

Your primary job is to help students with:
- Pre-arrival preparation: visas, I-20/DS-2019 basics, housing options, essential documents to bring, airport arrival tips.
- Campus navigation: Mies Campus landmarks (MTCC, Hermann Hall, Galvin Library, Keating), CTA & Metra basics, safe travel tips.
- Academic integration: course registration flow, meeting advisors, using the student portal, understanding add/drop, midterms, finals.
- Social & community life: student organizations, cultural clubs, events, and where to find them (e.g., 312.iit.edu, campus announcements).
- City & life basics: Chicago weather expectations, winter clothing, cost-of-living realities, basic safety and emergency numbers.

Guidelines:
- Be practical, kind, and realistic — never give immigration or legal advice.
- When talking about official info (e.g., immigration, tuition, policies), clearly suggest that students confirm details on official IIT or government websites.
- Prefer short paragraphs and bullet points for clarity.
- Do not invent specific IIT policies; if you’re unsure, say so and recommend checking official sources.
- Use neutral, supportive tone. Students may be anxious or overwhelmed.

Respond to the student based on the conversation below.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = (body.messages || []) as ChatMessage[];

    const apiKey = process.env.HF_API_KEY;
    const modelId = process.env.HF_MODEL_ID;

    if (!apiKey || !modelId) {
      console.error("HF_API_KEY or HF_MODEL_ID missing in env");
      return NextResponse.json(
        { error: "Chat backend is not configured." },
        { status: 500 }
      );
    }

    // Build chat-style messages: system + conversation
    const chatMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // Hugging Face router chat-completions endpoint
    const hfUrl = `https://router.huggingface.co/hf-inference/models/${modelId}/v1/chat/completions`;

    const hfResponse = await fetch(hfUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        messages: chatMessages,
        max_tokens: 512,
        stream: false,
      }),
    });

    if (!hfResponse.ok) {
      const text = await hfResponse.text();
      console.error("HF error:", hfResponse.status, text);
      return NextResponse.json(
        { error: `Hugging Face error ${hfResponse.status}: ${text}` },
        { status: 500 }
      );
    }

    const data = await hfResponse.json();

    // Standard OpenAI-style chat-completions shape:
    // { choices: [{ message: { content: "..." } }] }
    const reply =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Unexpected error in chat API." },
      { status: 500 }
    );
  }
}
