'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm Vivan's AI assistant. Ask me anything about his projects, skills, or experience!",
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking
    setTimeout(() => {
      let response = "That's a great question! Vivan is currently specializing in Cybersecurity and Backend development. You can find more details in the Projects section above.";
      
      const lowInput = input.toLowerCase();
      if (lowInput.includes('skill')) {
        response = "Vivan has a diverse stack: Frontend (React, Flutter), Backend (Python, C#, JavaScript), and Databases (Firebase, MongoDB, Supabase). He also has soft skills like Leadership, Analytical thinking, and Adaptability.";
      } else if (lowInput.includes('project')) {
        response = "His key projects include LaunchLens (AI web auditor), PhishLeakGuard (security tool), and Health_Vault4. He uses Git, Docker, and tools like Figma/Canva for development.";
      } else if (lowInput.includes('contact')) {
        response = "You can reach Vivan via the Contact form below, email at cyberfocus2410@gmail.com, or through his GitHub/LinkedIn in the side dock!";
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          left: 28,
          bottom: 28,
          width: 50,
          height: 50,
          borderRadius: 14,
          background: 'var(--accent)',
          border: 'none',
          color: 'white',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(56, 189, 248, 0.4)',
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'fixed',
              left: 28,
              bottom: 96,
              width: 320,
              height: 440,
              background: 'var(--bg-deep)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              zIndex: 100,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)',
              background: 'rgba(56, 189, 248, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green)' }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Vivan's Assistant</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', margin: 0 }}>Always active</p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: m.role === 'user' ? 'var(--accent)' : 'var(--surface)',
                    padding: '10px 14px',
                    borderRadius: m.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    color: m.role === 'user' ? 'white' : 'var(--text-primary)',
                    fontSize: 12.5,
                    lineHeight: 1.5,
                  }}
                >
                  {m.content}
                </div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--surface)', padding: '10px 14px', borderRadius: '14px 14px 14px 2px', fontSize: 10, color: 'var(--text-muted)' }}>
                   Thinking...
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              style={{
                padding: 16,
                borderTop: '1px solid var(--border)',
                display: 'flex',
                gap: 8,
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                style={{
                  flex: 1,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '8px 12px',
                  fontSize: 12,
                  outline: 'none',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: 8,
                  width: 34,
                  height: 34,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
