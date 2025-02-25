import { OpenAI } from "openai";
import { traceable } from "langsmith/traceable";
import { wrapOpenAI } from "langsmith/wrappers";

export const runtime = 'edge';

export async function GET() {
  try {
    const client = wrapOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));
    
    const pipeline = traceable(async (user_input: string) => {
      const result = await client.chat.completions.create({
        messages: [{ role: "user", content: user_input }],
        model: "gpt-4o-mini",
        temperature: 0
      });
      return result.choices[0].message.content;
    });

    const response = await pipeline("what is LLM?");
    
    return new Response(JSON.stringify({ 
      message: "Test successful", 
      response: response 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Test route error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 