import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, Calculator, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../services/gemini';
import { Message, UserData } from '../types';
import { cn } from '../lib/utils';

interface MentorChatProps {
  userData: UserData | null;
}

export default function MentorChat({ userData }: MentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (userData && !hasInitialized.current) {
      hasInitialized.current = true;
      const initialMsg = `Registro feito. Meta de R$ ${userData.incomeGoal}/mês detectada para ${userData.name} em ${userData.location}. Vamos aos números.`;
      setMessages([{ role: 'model', content: initialMsg }]);
    }
  }, [userData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage, 'finance');
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: 'Erro no cálculo. Foco no lucro, tente novamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="bg-white p-4 border-b border-slate-100 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-green-600 shadow-green-200">
              <Calculator className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 leading-tight">Agente Financeiro</h2>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full animate-pulse bg-green-500" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Focado em Lucro Líquido</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full max-w-[85%]",
                msg.role === 'user' ? "ml-auto justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                msg.role === 'user' ? "bg-green-600 text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
              )}>
                <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-green-700">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-green-600" />
              <span className="text-xs text-slate-400 font-medium italic">Calculando margens de lucro...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 pb-24">
        <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-green-500 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Custo, ROI, Markup..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 py-1 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-green-600 text-white p-2 rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['Calcular Markup', 'ROI de Anúncio', 'Ponto de Equilíbrio', 'Custo Unitário'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full hover:bg-green-50 hover:text-green-600 transition-colors border border-slate-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
