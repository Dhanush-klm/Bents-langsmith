import { OpenAI } from "openai";
import { traceable } from "langsmith/traceable";
import { wrapOpenAI } from "langsmith/wrappers";
import { AISDKExporter } from 'langsmith/vercel';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

export async function GET() {
  try {
    const pipeline = traceable(async (user_input: string) => {
      const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages: [{ role: "user", content: user_input }],
        experimental_telemetry: AISDKExporter.getSettings({
          runName: 'test-completion',
          metadata: { endpoint: 'test' }
        })
      });
      return result;
    }, {
      name: 'test-pipeline'
    });

    const response = await pipeline("what is mac?");
    return response.toDataStreamResponse();

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