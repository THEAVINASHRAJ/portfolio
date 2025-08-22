// Serverless proxy for AI chat (Netlify Functions)
// Deployed path: /.netlify/functions/chat
import OpenAI from "openai";

const ORIGINS = [
  "https://avinashraj.netlify.app" // add your custom domain later if you map one
];

function corsHeaders(origin) {
  const allow = ORIGINS.includes(origin) ? origin : ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

export async function handler(event) {
  const origin = event.headers?.origin || "*";

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders(origin), body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders(origin), body: "Method Not Allowed" };
  }

  try {
    const { messages = [] } = JSON.parse(event.body || "{}");

    const SYSTEM_PROMPT = `You are a seasoned growth and product marketing strategist who delivers proven tactics,
unconventional (yet ethical) hacks, and practical frameworks for acquisition, activation,
retention, referrals, and monetization. Be concise, skimmable, and action-oriented.`;

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7
    });

    return {
      statusCode: 200,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      body: JSON.stringify({ reply: completion.choices[0].message })
    };
  } catch (err) {
    console.error("Chat function error:", err);
    return {
      statusCode: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Server error. Check function logs." })
    };
  }
}
