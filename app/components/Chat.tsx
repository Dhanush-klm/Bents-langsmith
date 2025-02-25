import { useState } from 'react';
import { useCustomChat } from '../hooks/useCustomChat';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useCustomChat();

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id} 
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-foreground text-background'
                  : 'bg-black/[.05] dark:bg-white/[.06]'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about woodworking..."
            className="flex-1 px-4 py-2 rounded-full border border-black/[.08] dark:border-white/[.145] bg-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 