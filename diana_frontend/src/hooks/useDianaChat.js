"use client";

import { useState, useCallback, useEffect } from 'react';

export function useDianaChat() {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('diana_chat_messages') : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.map((m) => ({ ...m, createdAt: new Date(m.createdAt) }));
      }
    } catch (e) {
      console.warn('chat:init:localStorage_parse_error', e);
    }
    return [
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm Diana, your AI assistant. How can I help you today?",
        createdAt: new Date(),
      }
    ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const append = useCallback(async (message) => {
    if (!message.content?.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message.content,
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_query: message.content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again.",
        createdAt: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reload = useCallback(async () => {
    if (messages.length === 0) return;
    
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) return;

    // Remove the last assistant message if it exists
    setMessages(prev => {
      const lastIndex = prev.length - 1;
      if (prev[lastIndex]?.role === 'assistant') {
        return prev.slice(0, lastIndex);
      }
      return prev;
    });

    // Resend the last user message
    await append({ content: lastUserMessage.content });
  }, [messages, append]);

  const stop = useCallback(() => {
    setIsLoading(false);
  }, []);

  // persist messages
  useEffect(() => {
    try {
      localStorage.setItem('diana_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('chat:persist:error', e);
    }
  }, [messages]);

  return {
    messages,
    append,
    reload,
    stop,
    isLoading,
    error,
    setMessages,
  };
}
