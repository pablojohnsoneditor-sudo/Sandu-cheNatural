import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, TrendingUp, DollarSign, Calculator, MessageSquare, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../services/gemini';
import { UserData } from '../types';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface MentorChatProps {
  userData: UserData | null;
  onMessageSent?: () => void;
}

const SUGGESTIONS = [
  { icon: <Calculator className="w-4 h-4" />, text: "Calcular meu Markup 3x" },
  { icon: <TrendingUp className="w-4 h-4" />, text: "Como reduzir meu CMV?" },
  { icon: <DollarSign className="w-4 h-4" />, text: "Ponto de Equilíbrio hoje" },
  { icon: <Sparkles className="w-4 h-4" />, text: "Dica de fidelização" }
];

export default function MentorChat({ userData, onMessageSent }: MentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userData && messages.length === 0) {
      const goal = parseInt(userData.incomeGoal);
      const unitsPerMonth = Math.ceil(goal / 12);
      const unitsPerDay = Math.ceil(unitsPerMonth / 22);

      const welcomeMessage = `Olá, **${userData.name}**! Sou seu **Contador IA** estratégico. 🚀

Para atingir sua meta de **R$ ${userData.incomeGoal}** de lucro mensal em **${userData.location}**, nosso plano é:

1. **Vendas Mensais**: ~**${unitsPerMonth} sanduíches**.
2. **Ritmo Diário**: **${unitsPerDay} unidades/dia**.

Como posso te ajudar a lucrar mais hoje?`;

      setMessages([{ role: 'model', text: welcomeMessage }]);
    }
  }, [userData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (onMessageSent) onMessageSent();

    try {
      const response = await sendMessage(text);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Desculpe, tive um problema técnico. Pode repetir a pergunta?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col fixed inset-0 z-30 bg-white md:relative md:h-[calc(100vh-40px)] md:inset-auto md:bg-transparent overflow-hidden pt-[57px] pb-[72px] md:pt-0 md:pb-0">
      {/* HEADER FIXO */}
      <header className="flex-shrink-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
            <Bot className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight leading-none mb-1">Assistente IA</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Online agora</span>
            </div>
          </div>
        </div>
        <div className="bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
          <Flame className="w-3.5 h-3.5 text-green-600" />
        </div>
      </header>

      {/* ÁREA DE MENSAGENS (SCROLLÁVEL) */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] md:max-w-[70%] p-4 shadow-sm text-sm md:text-base leading-relaxed",
                msg.role === 'user' 
                  ? "bg-slate-900 text-white rounded-2xl rounded-tr-none" 
                  : "bg-white border border-slate-100 text-slate-900 rounded-2xl rounded-tl-none"
              )}>
                <div className={cn(
                  "prose prose-sm max-w-none",
                  msg.role === 'user' ? "prose-invert" : "prose-slate"
                )}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-slate-400"
          >
            <div className="bg-white border border-slate-100 p-2 rounded-xl shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-green-600" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">IA está escrevendo...</span>
          </motion.div>
        )}
      </div>

      {/* INPUT FIXO NO BOTTOM */}
      <footer className="flex-shrink-0 p-4 bg-white border-t border-slate-100 space-y-4 sticky bottom-0">
        {/* Sugestões Rápidas */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s.text)}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all whitespace-nowrap active:scale-95"
            >
              {s.icon}
              {s.text}
            </button>
          ))}
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-slate-900 transition-all placeholder:text-slate-300"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-green-600 transition-all shadow-lg disabled:opacity-20 active:scale-90 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
}
