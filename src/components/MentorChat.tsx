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
}

const SUGGESTIONS = [
  { icon: <Calculator className="w-4 h-4" />, text: "Calcular meu Markup 3x" },
  { icon: <TrendingUp className="w-4 h-4" />, text: "Como reduzir meu CMV?" },
  { icon: <DollarSign className="w-4 h-4" />, text: "Ponto de Equilíbrio hoje" },
  { icon: <Sparkles className="w-4 h-4" />, text: "Dica de fidelização" }
];

export default function MentorChat({ userData }: MentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userData && messages.length === 0) {
      const goal = parseInt(userData.incomeGoal);
      const unitsPerMonth = Math.ceil(goal / 12); // R$ 12 de lucro médio por sanduíche
      const unitsPerDay = Math.ceil(unitsPerMonth / 22); // 22 dias úteis

      const welcomeMessage = `Olá, **${userData.name}**! Sou seu **Contador IA** estratégico. 🚀

Para atingir sua meta de **R$ ${userData.incomeGoal}** de lucro mensal em **${userData.location}**, nosso plano de ataque é:

1. **Vendas Mensais**: Precisamos de aproximadamente **${unitsPerMonth} sanduíches** vendidos.
2. **Ritmo Diário**: Foco em **${unitsPerDay} unidades/dia** (considerando 22 dias).

Como posso te ajudar a bater essa meta hoje? Quer calcular seu markup ou analisar seus custos?`;

      setMessages([{ role: 'model', text: welcomeMessage }]);
    }
  }, [userData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(text);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Desculpe, tive um problema técnico. Pode repetir a pergunta? Estou focado no seu lucro!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-40px)] max-w-4xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-400 rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight leading-none mb-1">Contador IA</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Consultoria de Lucro</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Foco em Resultado</span>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent mb-4"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex items-start gap-4",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.role === 'user' ? "bg-slate-900 text-white" : "bg-green-600 text-white"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={cn(
                "max-w-[85%] rounded-3xl p-4 text-sm md:text-base leading-relaxed shadow-sm border",
                msg.role === 'user' 
                  ? "bg-white border-slate-100 text-slate-900 rounded-tr-none" 
                  : "bg-green-50/50 border-green-100 text-slate-900 rounded-tl-none"
              )}>
                <div className="prose prose-slate prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-green-700 prose-strong:font-black">
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
            className="flex items-center gap-3 text-slate-400"
          >
            <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest animate-pulse">Calculando Lucro...</span>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="space-y-4">
        {/* Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s.text)}
              className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all whitespace-nowrap shadow-sm active:scale-95"
            >
              <span className="text-green-600">{s.icon}</span>
              {s.text}
            </button>
          ))}
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative group"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte sobre custos, markup ou vendas..."
            className="w-full bg-white border-2 border-slate-100 rounded-[2rem] px-6 py-5 pr-16 text-sm font-bold focus:outline-none focus:border-green-500 transition-all shadow-xl shadow-slate-200/50 placeholder:text-slate-300"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all shadow-lg disabled:opacity-30 disabled:hover:bg-slate-900 active:scale-90"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-[9px] font-bold text-slate-300 text-center uppercase tracking-[0.2em]">
          Contador IA · Especialista em Lucro Real
        </p>
      </div>
    </div>
  );
}
