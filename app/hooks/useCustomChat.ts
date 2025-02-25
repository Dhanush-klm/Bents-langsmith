import { useChat as useAIChat } from 'ai/react';

export function useCustomChat() {
  return useAIChat({
    api: '/api',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm Bent's Woodworks Assistant. How can I help you with your woodworking questions today?"
      }
    ]
  });
} 