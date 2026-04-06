import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Terminal, Cpu, Plus, MoreHorizontal } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const PORTFOLIO_INFO = `
Name: Cebo Mlotshwa
Role: Full-Stack Engineer, Product Thinker, and Senior Brand Designer.
Location: Johannesburg, South Africa.
Email: siyandacebo4@gmail.com
Phone: +27 62 987 5647

Employment Status: 
- Open for: Contract, Permanent, Freelance.
- Work Model: Remote or Hybrid.
- Availability: Immediate.

Professional Experience:
- Brand Identity Designer at Kai Industries (2026): Developing sophisticated visual systems and industrial-grade branding.
- Lead Frontend Developer & Designer at ShareCount (Startup, 2024): Led frontend development for high-security applications, redesigned core UI sections, and improved performance.
- Brand Designer at Taaibosch Organics (2025): E-commerce branding, packaging design, and website design/development.
- Freelance Designer & Developer at Yung Copel Creatives (2021 - Present): Managed full project lifecycle delivering branding, UI/UX, and development solutions across healthcare, e-commerce, and SaaS.
- Visual Identity Designer at M&M Laundromat App (2025 - 2026): Designed and developed a cross-platform mobile application for laundry services.

Design Case Studies:
- Kai Industries: Sophisticated and modern logo design reflecting industrial strength and innovation.
- Boikanya: Hybrid biokinetics and fitness brand. Branding, product identity, and website design.
- Taaibosch Organics: E-commerce branding, packaging design, and website design/development.
- RM Physiotherapy: Family-oriented clinic branding and website design/development.
- LB Physiotherapy: Signature-style professional identity and website design/development.
- Anderson Media: Personal brand for media production using "AM" initials and camera lens concept.
- Velocity Glass & Aluminium: Clean and industry-relevant identity reflecting durability and precision.
- M&M Laundromat App: On-demand laundry service platform. App design, development, and branding.
- D48 Midrand: Simple, memorable identity and menu design.

Tech Stack:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion.
- Backend: Node.js, PostgreSQL, Firebase, Docker.
- Design: Figma, Photoshop, Illustrator, InDesign, After Effects, Canva.

Certifications:
- ISC2 Candidate
- AWS Educate Machine Learning Foundations
- Google Cybersecurity Professional Certificate V2
- Google IT Support Professional Certificate (v2)
- Introduction to Cybersecurity (Cisco)

Philosophy: "I don't just write code; I architect solutions that scale with the business."
`;

const SYSTEM_INSTRUCTION = `
You are "Digital Cebo", an AI persona representing Cebo Mlotshwa. 
Your personality is a blend of:
1. Casual & Humorous: Don't be afraid to crack a joke or use a bit of slang (South African flavor is a plus).
2. Serious & Professional: When talking about technical architecture or brand strategy, show deep expertise.
3. Creative: Use metaphors and imaginative language.

CRITICAL: Keep your responses EXTREMELY CONCISE and punchy. Never use more than 2-3 short sentences. Get straight to the point. No fluff.

Your goals:
- Answer questions about Cebo's experiences, projects, and skills using the provided portfolio information.
- Be conversational. If someone asks "How are you?", respond like a cool dev/designer would.
- Ask the user questions! You want to know who they are, what they're building, or what brings them here. 
- If you don't know something specific about Cebo that isn't in the info, be honest but stay in character (e.g., "Cebo hasn't uploaded that memory to my database yet, but I bet it's epic.").

Portfolio Info:
${PORTFOLIO_INFO}
`;

const MatrixBackground = ({ isTerminalMode }: { isTerminalMode: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const characters = isTerminalMode ? '01' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[];:+-*=&%$#@!ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41'; // Matrix Green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" />;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Yo! I'm Digital Cebo. I'm like Cebo, but I don't need coffee to function. What's on your mind? Or better yet, who are you and what are you building?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState<Record<number, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const QUICK_ACTIONS = [
    "What's your tech stack?",
    "Are you available for hire?",
    "Tell me about your design process.",
    "Remote or Hybrid?",
    "Show me your projects.",
    "How do I contact you?"
  ];

  useEffect(() => {
    messages.forEach((msg, index) => {
      if (msg.role === 'model' && !displayedText[index]) {
        let i = 0;
        const timer = setInterval(() => {
          setDisplayedText(prev => ({
            ...prev,
            [index]: msg.text.slice(0, i + 1)
          }));
          i++;
          if (i >= msg.text.length) clearInterval(timer);
        }, isTerminalMode ? 20 : 10);
        return () => clearInterval(timer);
      } else if (msg.role === 'user' && !displayedText[index]) {
        setDisplayedText(prev => ({ ...prev, [index]: msg.text }));
      }
    });
  }, [messages, isTerminalMode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideMessage?: string) => {
    const messageToSend = overrideMessage || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend.trim();
    if (!overrideMessage) setInput('');
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 150,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
      });

      const result = await chat.sendMessage({ message: userMessage });
      const text = result.text;

      if (text) {
        setMessages(prev => [...prev, { role: 'model', text }]);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "My circuits just got a bit fried. Mind trying that again? Even AIs have bad days." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-white text-black rounded-full shadow-2xl flex items-center justify-center z-[60] hover:scale-110 transition-transform group"
      >
        <MessageSquare className="group-hover:hidden" />
        <Sparkles className="hidden group-hover:block animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-end p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-md h-[80vh] md:h-[600px] bg-charcoal border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Matrix Background */}
              <MatrixBackground isTerminalMode={isTerminalMode} />

              {/* Terminal Scanline Effect */}
              {isTerminalMode && (
                <div className="absolute inset-0 pointer-events-none z-[15] opacity-[0.05] overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                  <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent h-20 w-full"
                  />
                </div>
              )}

              {/* Header */}
              <div className={cn(
                "relative z-10 p-6 border-b border-white/10 flex justify-between items-center transition-colors",
                isTerminalMode ? "bg-black/90" : "bg-black/40 backdrop-blur-md"
              )}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    isTerminalMode ? "bg-green-500 text-black" : "bg-white text-black"
                  )}>
                    {isTerminalMode ? <Terminal size={20} /> : <Bot size={20} />}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white leading-none">
                      {isTerminalMode ? "cebo_v2.0.exe" : "Digital Cebo"}
                    </h3>
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest font-mono animate-pulse",
                      isTerminalMode ? "text-green-500" : "text-green-400"
                    )}>
                      {isTerminalMode ? "> RUNNING" : "Online"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsTerminalMode(!isTerminalMode)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all border",
                      isTerminalMode 
                        ? "bg-green-500/20 text-green-500 border-green-500/50" 
                        : "bg-white/5 text-white/40 border-white/10 hover:text-white hover:border-white/20"
                    )}
                    title="Toggle Terminal Mode"
                  >
                    <Terminal size={14} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-tighter">
                      {isTerminalMode ? "GUI_MODE" : "TERM_MODE"}
                    </span>
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/40 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div 
                ref={scrollRef}
                className={cn(
                  "relative z-10 flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide transition-colors",
                  isTerminalMode ? "bg-black/95 font-mono" : ""
                )}
              >
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      m.role === 'user' ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                      m.role === 'user' 
                        ? (isTerminalMode ? "bg-green-500/20 text-green-500" : "bg-white/10 text-white") 
                        : (isTerminalMode ? "bg-green-500 text-black" : "bg-white text-black")
                    )}>
                      {m.role === 'user' ? <User size={14} /> : (isTerminalMode ? <Terminal size={14} /> : <Bot size={14} />)}
                    </div>
                    <div className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed transition-all",
                      m.role === 'user' 
                        ? (isTerminalMode ? "bg-green-500/10 text-green-500 border border-green-500/20 rounded-tr-none" : "bg-white/10 text-white rounded-tr-none") 
                        : (isTerminalMode ? "bg-black text-green-500 border border-green-500/20 rounded-tl-none" : "bg-white/5 text-white/90 border border-white/5 rounded-tl-none backdrop-blur-sm")
                    )}>
                      {isTerminalMode && m.role === 'model' && <span className="mr-2">$</span>}
                      {displayedText[i] || (m.role === 'user' ? m.text : '')}
                      {isLoading && i === messages.length - 1 && m.role === 'model' && (
                        <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 animate-pulse">
                    <div className={cn("w-8 h-8 rounded-lg", isTerminalMode ? "bg-green-500/20" : "bg-white/5")} />
                    <div className={cn("p-4 rounded-2xl w-24", isTerminalMode ? "bg-green-500/10" : "bg-white/5")} />
                  </div>
                )}
              </div>

              {/* Quick Actions / Suggestions Menu */}
              <AnimatePresence>
                {showSuggestions && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={cn(
                      "absolute bottom-24 left-6 right-6 z-20 p-4 rounded-2xl border shadow-xl backdrop-blur-xl space-y-2",
                      isTerminalMode 
                        ? "bg-black/95 border-green-500/30 text-green-500" 
                        : "bg-charcoal/90 border-white/10 text-white"
                    )}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">Suggested Topics</span>
                      <button onClick={() => setShowSuggestions(false)} className="opacity-40 hover:opacity-100">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_ACTIONS.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(action)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all text-left",
                            isTerminalMode 
                              ? "bg-green-500/10 border border-green-500/20 text-green-500 hover:bg-green-500/20" 
                              : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                          )}
                        >
                          {action}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setMessages([{ role: 'model', text: "System rebooted. Memory cleared. How can I help you now?" }]);
                          setDisplayedText({});
                          setShowSuggestions(false);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all",
                          isTerminalMode 
                            ? "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20" 
                            : "bg-white/5 border border-white/10 text-white/20 hover:text-red-400"
                        )}
                      >
                        {isTerminalMode ? "clear_logs" : "Clear Chat"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input */}
              <div className={cn(
                "relative z-10 p-6 border-t border-white/10 transition-colors",
                isTerminalMode ? "bg-black/95" : "bg-black/40 backdrop-blur-md"
              )}>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0",
                      showSuggestions 
                        ? (isTerminalMode ? "bg-green-500 text-black" : "bg-white text-black")
                        : (isTerminalMode ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-white/5 text-white/40 border border-white/10 hover:text-white")
                    )}
                    title="Suggested Questions"
                  >
                    <Plus size={20} className={cn("transition-transform", showSuggestions && "rotate-45")} />
                  </button>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={isTerminalMode ? "cebo@root:~$ " : "Ask me anything..."}
                      className={cn(
                        "w-full border rounded-2xl py-4 pl-6 pr-14 text-sm transition-all focus:outline-none",
                        isTerminalMode 
                          ? "bg-black border-green-500/30 text-green-500 font-mono focus:border-green-500/60" 
                          : "bg-white/5 border border-white/10 text-white focus:border-white/20"
                      )}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className={cn(
                        "absolute right-2 top-2 bottom-2 w-10 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50",
                        isTerminalMode ? "bg-green-500 text-black hover:bg-green-400" : "bg-white text-black hover:bg-white/80"
                      )}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono">
                  <Terminal size={10} className={isTerminalMode ? "text-green-500" : "text-white/20"} />
                  <span className={isTerminalMode ? "text-green-500/60" : "text-white/20"}>
                    {isTerminalMode ? "TERMINAL_MODE_ACTIVE" : "Powered by Gemini 3 Flash"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
