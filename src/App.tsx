import React, { useState, useEffect } from 'react';
import { PlayCircle, FileText, MessageSquare, User, Menu, X, TrendingUp, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LessonsScreen from './components/LessonsScreen';
import PDFsScreen from './components/PDFsScreen';
import MentorChat from './components/MentorChat';
import RegistrationScreen from './components/RegistrationScreen';
import { cn } from './lib/utils';
import { UserData } from './types';

type Screen = 'lessons' | 'pdfs' | 'mentor';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('lessons');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  // Load from local storage if exists
  useEffect(() => {
    const saved = localStorage.getItem('sanduiche_user');
    if (saved) {
      setUserData(JSON.parse(saved));
      setIsRegistered(true);
    }
  }, []);

  const handleRegistration = (data: UserData) => {
    setUserData(data);
    setIsRegistered(true);
    localStorage.setItem('sanduiche_user', JSON.stringify(data));
    setActiveScreen('mentor'); // Go to chat to "validate" profile
  };

  if (!isRegistered) {
    return <RegistrationScreen onComplete={handleRegistration} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'lessons': return <LessonsScreen />;
      case 'pdfs': return <PDFsScreen />;
      case 'mentor': return <MentorChat userData={userData} />;
      default: return <LessonsScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-100 flex-col p-6 z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
            <Target className="text-white w-6 h-6" />
          </div>
          <h1 className="font-black text-xl tracking-tighter leading-none">
            SANDUÍCHE<br/><span className="text-green-600">NATURAL</span>
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          <NavButton 
            active={activeScreen === 'lessons'} 
            onClick={() => setActiveScreen('lessons')}
            icon={<PlayCircle className="w-5 h-5" />}
            label="Aulas"
          />
          <NavButton 
            active={activeScreen === 'pdfs'} 
            onClick={() => setActiveScreen('pdfs')}
            icon={<FileText className="w-5 h-5" />}
            label="Downloads"
          />
          <NavButton 
            active={activeScreen === 'mentor'} 
            onClick={() => setActiveScreen('mentor')}
            icon={<MessageSquare className="w-5 h-5" />}
            label="Agente Financeiro"
          />
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-slate-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">{userData?.name || 'Aluno Tubarão'}</p>
              <p className="text-[10px] text-slate-400">Meta: R$ {userData?.incomeGoal}</p>
            </div>
          </div>
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Chamados</span>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">0 Ativos</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Resposta</span>
              <span className="text-[10px] font-bold text-slate-600">~15 min</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 min-h-screen transition-all duration-300",
        "md:ml-64"
      )}>
        {/* Mobile Header */}
        <header className="md:hidden bg-white p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Target className="text-white w-5 h-5" />
            </div>
            <h1 className="font-black text-sm tracking-tighter leading-none uppercase">
              Sanduíche <span className="text-green-600">Natural</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
               <p className="text-[10px] font-bold text-slate-900 leading-none">{userData?.name.split(' ')[0]}</p>
               <p className="text-[8px] text-green-600 font-bold uppercase tracking-widest">Meta: {userData?.incomeGoal}</p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 flex justify-around p-3 pb-6 z-50">
          <MobileNavButton 
            active={activeScreen === 'lessons'} 
            onClick={() => setActiveScreen('lessons')}
            icon={<PlayCircle className="w-6 h-6" />}
            label="Aulas"
          />
          <MobileNavButton 
            active={activeScreen === 'pdfs'} 
            onClick={() => setActiveScreen('pdfs')}
            icon={<FileText className="w-6 h-6" />}
            label="Downloads"
          />
          <MobileNavButton 
            active={activeScreen === 'mentor'} 
            onClick={() => setActiveScreen('mentor')}
            icon={<MessageSquare className="w-6 h-6" />}
            label="Financeiro"
          />
        </nav>
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
        active 
          ? "bg-green-600 text-white shadow-lg shadow-green-200" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      )}
    >
      {icon}
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
  );
}

function MobileNavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all duration-200",
        active ? "text-green-600 scale-110" : "text-slate-400"
      )}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="w-1 h-1 bg-green-600 rounded-full mt-1"
        />
      )}
    </button>
  );
}
