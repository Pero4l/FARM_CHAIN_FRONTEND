'use client';

import React, { useState } from 'react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    // Placeholder AI response
    const aiMessage: Message = {
      id: Date.now() + 1,
      text: 'AI response will appear here',
      sender: 'ai',
    };

    setMessages((prev) => [...prev, aiMessage]);
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto my-8 border rounded-md shadow-md flex flex-col h-[80vh]">
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-md max-w-xs ${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 p-4 border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
