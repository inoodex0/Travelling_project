'use client';

import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  "Suggest budget friendly tours 🗺️",
  "Best time to visit Kyoto? 🌸",
  "Tell me about Swiss Alps package 🏔️",
  "Do you have 24/7 support? 🛎️"
];

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello! I'm Lily, your Trivana Smart Travel Concierge. Where would you like to escape to next?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const sendMessageToGemini = async (userMessage: string) => {
    setIsTyping(true);
    const apiKey = ""; // Left empty so Canvas runtime automatically injects it.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const systemPrompt = `You are "Lily", a world-class luxury travel concierge for Trivana Travel Agency. 
    Be exceptionally warm, helpful, polite, and enthusiastic. Use appropriate emojis like ✈️, 🏝️, 🏔️, 🛎️.
    Keep your answers concise, structured (using bold text or bullet points if necessary), and focus on encouraging the user to explore our tours (like Swiss Alps, Bali resorts, Kyoto heritage, Santorini romance, Amalfi Coast, Serengeti safari).
    If asked about pricing, reference Swiss Alps ($1,299), Maldives ($1,850), Bali ($499), Kyoto ($1,200), Positano ($1,420).`;

    const payload = {
      contents: [{ parts: [{ text: userMessage }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        maxOutputTokens: 250,
        temperature: 0.7
      }
    };

    // Exponential Backoff implementation
    let delay = 1000;
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const result = await response.json();
        const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (responseText) {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'bot',
              text: responseText,
              timestamp: new Date()
            }
          ]);
          setIsTyping(false);
          return;
        }
      } catch (err) {
        if (attempt === maxRetries - 1) {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'bot',
              text: "I'm experiencing a brief connection glitch. Please try sending your message again! 🌐",
              timestamp: new Date()
            }
          ]);
          setIsTyping(false);
        } else {
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    }
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Call Gemini API
    sendMessageToGemini(textToSend);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      
      {/* FLOATING ACTION CHAT BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group w-16 h-16 rounded-full bg-[#ff5a1f] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Open Live Chat"
        >
          {/* Animated Pulse Waves */}
          <span className="absolute inset-0 rounded-full bg-[#ff5a1f]/40 animate-ping opacity-75 -z-10"></span>
          <span className="absolute inset-[-4px] rounded-full border border-[#ff5a1f]/20 -z-10"></span>
          
          {/* Chat Icon */}
          <svg className="w-7 h-7 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>

          {/* Online Dot */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>
      )}

      {}
      {/* CHAT WINDOW INTERFACE */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300 transform origin-bottom-right">
          
          {/* Top Panel / Header */}
          <div className="bg-gradient-to-r from-gray-950 to-gray-900 p-6 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* Agent Avatar */}
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" 
                  alt="Lily AI Concierge" 
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-gray-950"></span>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm leading-none">Lily Agent</h4>
                <p className="text-[11px] text-gray-400 mt-1">Smart Travel Concierge</p>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setMessages([{
                  id: '1',
                  sender: 'bot',
                  text: "Chat history cleared! What would you like to ask now? 😊",
                  timestamp: new Date()
                }])}
                className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" 
                title="Clear Chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-[#ff5a1f] hover:text-white rounded-full text-gray-400 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {}
          {/* Scrollable Message Box */}
          <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-gray-50/50">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
                >
                  <div className={`max-w-[80%] rounded-[1.5rem] p-4 text-sm text-left ${
                    isBot 
                      ? 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm' 
                      : 'bg-[#ff5a1f] text-white rounded-tr-sm shadow-md shadow-orange-500/10'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span className={`block text-[10px] mt-1.5 text-right ${isBot ? 'text-gray-400' : 'text-orange-200'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start items-center gap-2">
                <div className="bg-white border border-gray-100 rounded-[1.5rem] p-4 text-sm rounded-tl-sm shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#ff5a1f] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#ff5a1f] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#ff5a1f] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Helper Tags */}
          <div className="px-5 py-2.5 bg-white border-t border-gray-100 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="inline-block text-xs font-semibold px-3 py-2 bg-gray-50 hover:bg-orange-50 hover:text-[#ff5a1f] border border-gray-100 hover:border-orange-200 rounded-full transition-all duration-200 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
            className="p-4 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Lily about tours, bookings..."
              className="flex-grow h-11 bg-gray-50 border border-gray-100 rounded-full px-5 text-sm outline-none focus:border-orange-300 focus:bg-white transition-all text-gray-800"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-11 h-11 rounded-full bg-[#ff5a1f] disabled:bg-gray-200 text-white flex items-center justify-center shadow-md shadow-orange-500/10 hover:scale-105 active:scale-95 transition-all"
            >
              <svg className="w-4.5 h-4.5 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
