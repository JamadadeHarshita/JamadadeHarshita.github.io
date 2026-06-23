import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/Chatbot.scss';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STARTER_QUESTIONS = [
  "What's her best project?",
  "Why did she move to Germany?",
  "What roles is she looking for?",
  "What does she do for fun?",
];

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Harshi's portfolio bot. Ask me anything about her work, projects, or what makes her tick 👋" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      // Call our serverless function at /api/chat
      // In development, Vercel CLI proxies this locally
      // In production, it runs on Vercel's servers
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Sorry, something went wrong.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error — try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button className={`chat-fab ${open ? 'fab-open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Open chat">
        {open ? '✕' : <img src="/android-chrome-192x192.png" alt="Chat" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <img src="/android-chrome-192x192.png" alt="Harshi" className="chat-avatar" />
            <div>
              <p className="chat-name">Harshi Bot</p>
              <p className="chat-status">anything about my work</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble assistant chat-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Starter questions — only shown before user sends anything */}
          {messages.length === 1 && (
            <div className="chat-starters">
              {STARTER_QUESTIONS.map((q, i) => (
                <button key={i} className="starter-btn" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-row">
            <input
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about her work..."
              disabled={loading}
              autoFocus
            />
            <button className="chat-send" onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
