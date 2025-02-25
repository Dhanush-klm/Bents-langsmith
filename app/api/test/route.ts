import { OpenAI } from "openai";
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { AISDKExporter } from 'langsmith/vercel';

export const runtime = 'edge';

export async function GET() {
  try {
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [{ role: "user", content: "what is Dhanush?" }],
      experimental_telemetry: AISDKExporter.getSettings(),
    });

    return result.toDataStreamResponse();

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