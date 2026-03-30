import React, { useState, useEffect } from 'react';
import { PlayCircle, FileText, MessageSquare, Trophy, Flame, ChevronRight, LayoutDashboard, CheckCircle2, Award, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import RegistrationScreen from './components/RegistrationScreen';
import LessonsScreen from './components/LessonsScreen';
import PDFsScreen from './components/PDFsScreen';
import MentorChat from './components/MentorChat';
import RewardsScreen, { Badge } from './components/RewardsScreen';
import { UserData } from './types';
import { cn, safeJsonStringify } from './lib/utils';

type Screen = 'lessons' | 'pdfs' | 'mentor' | 'rewards';

const tituloSecaoPDFs = "Material GUIA Premium";

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>('lessons');
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [downloadedPdfs, setDownloadedPdfs] = useState<string[]>([]);
  const [mentorMessagesCount, setMentorMessagesCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('sanduiche_user');
    const progress = localStorage.getItem('sanduiche_progress');
    const pdfs = localStorage.getItem('sanduiche_pdfs');
    const mentor = localStorage.getItem('sanduiche_mentor');
    const savedPoints = localStorage.getItem('sanduiche_points');
    const savedBadges = localStorage.getItem('sanduiche_earned_badges');
    
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setIsRegistered(true);
    }
    if (progress) setCompletedLessons(JSON.parse(progress));
    if (pdfs) setDownloadedPdfs(JSON.parse(pdfs));
    if (mentor) setMentorMessagesCount(parseInt(mentor));
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedBadges) setEarnedBadges(JSON.parse(savedBadges));
  }, []);

  const saveGamification = (newPoints: number, newBadges: string[]) => {
    setPoints(newPoints);
    setEarnedBadges(newBadges);
    localStorage.setItem('sanduiche_points', newPoints.toString());
    localStorage.setItem('sanduiche_earned_badges', safeJsonStringify(newBadges));
  };

  const checkBadges = (currentPoints: number, lessons: number[], pdfs: string[], messages: number) => {
    const newBadges = [...earnedBadges];
    let changed = false;

    const addBadge = (id: string) => {
      if (!newBadges.includes(id)) {
        newBadges.push(id);
        changed = true;
      }
    };

    if (lessons.length >= 1) addBadge('primeiro_passo');
    if (lessons.length >= 5) addBadge('especialista');
    if (pdfs.length >= 5) addBadge('mestre_teoria');
    if (messages >= 5) addBadge('aprendiz_curioso');
    if (currentPoints >= 1000) addBadge('lucro_maximo');

    if (changed) {
      saveGamification(currentPoints, newBadges);
    }
  };

  const handleRegistration = (data: UserData) => {
    setUserData(data);
    setIsRegistered(true);
    localStorage.setItem('sanduiche_user', safeJsonStringify(data));
    setActiveScreen('lessons');
  };

  const handleLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      localStorage.setItem('sanduiche_progress', safeJsonStringify(updated));
      
      const newPoints = points + 100;
      setPoints(newPoints);
      localStorage.setItem('sanduiche_points', newPoints.toString());
      checkBadges(newPoints, updated, downloadedPdfs, mentorMessagesCount);
    }
  };

  const handlePdfDownload = (pdfId: string) => {
    if (!downloadedPdfs.includes(pdfId)) {
      const updated = [...downloadedPdfs, pdfId];
      setDownloadedPdfs(updated);
      localStorage.setItem('sanduiche_pdfs', safeJsonStringify(updated));
      
      const newPoints = points + 50;
      setPoints(newPoints);
      localStorage.setItem('sanduiche_points', newPoints.toString());
      checkBadges(newPoints, completedLessons, updated, mentorMessagesCount);
    }
  };

  const handleMentorEngagement = () => {
    const updatedCount = mentorMessagesCount + 1;
    setMentorMessagesCount(updatedCount);
    localStorage.setItem('sanduiche_mentor', updatedCount.toString());
    
    const newPoints = points + 10;
    setPoints(newPoints);
    localStorage.setItem('sanduiche_points', newPoints.toString());
    checkBadges(newPoints, completedLessons, downloadedPdfs, updatedCount);
  };

  const badges: Badge[] = [
    { id: 'primeiro_passo', title: 'Primeiro Passo', description: 'Concluiu sua primeira aula estratégica.', icon: <Zap className="w-8 h-8" />, color: 'bg-blue-500', isEarned: earnedBadges.includes('primeiro_passo') },
    { id: 'mestre_teoria', title: 'Mestre da Teoria', description: 'Baixou todos os 5 manuais de operação.', icon: <FileText className="w-8 h-8" />, color: 'bg-purple-500', isEarned: earnedBadges.includes('mestre_teoria') },
    { id: 'aprendiz_curioso', title: 'Aprendiz Curioso', description: 'Enviou 5 mensagens para o Mentor IA.', icon: <MessageSquare className="w-8 h-8" />, color: 'bg-orange-500', isEarned: earnedBadges.includes('aprendiz_curioso') },
    { id: 'especialista', title: 'Especialista', description: 'Concluiu todas as 5 aulas do treinamento.', icon: <Award className="w-8 h-8" />, color: 'bg-green-500', isEarned: earnedBadges.includes('especialista') },
    { id: 'lucro_maximo', title: 'Lucro Máximo', description: 'Alcançou a marca histórica de 1000 pontos.', icon: <Trophy className="w-8 h-8" />, color: 'bg-yellow-500', isEarned: earnedBadges.includes('lucro_maximo') },
  ];

  const progressPercentage = Math.round((completedLessons.length / 5) * 100);
  const isCertified = completedLessons.length === 5;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      {!isRegistered ? (
        <div className="flex-1 flex flex-col">
          <RegistrationScreen onComplete={handleRegistration} />
        </div>
      ) : (
        <>
          {/* Sidebar Desktop - APENAS DESKTOP */}
          <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-100 flex-col p-6 z-50">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify-center shadow-xl shadow-green-200/50">
                  <Flame className="text-white w-7 h-7" />
                </div>
                <div>
                  <h1 className="font-black text-xl tracking-tighter text-slate-900 leading-none">
                    SANDUÍCHE<br /><span className="text-green-600">NATURAL</span>
                  </h1>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">Área de Membros</p>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-slate-50 rounded-3xl p-5 mb-8 border border-slate-100 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className={cn("w-4 h-4 transition-colors", isCertified ? "text-yellow-500" : "text-slate-400")} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Seu Progresso</span>
                    </div>
                    <span className="text-xs font-black text-green-600">{progressPercentage}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-green-600 to-green-400"
                    />
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 leading-tight">
                    {isCertified 
                      ? "Parabéns! Você concluiu o treinamento e está pronto para lucrar." 
                      : `Faltam ${5 - completedLessons.length} aulas para o seu certificado.`}
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors" />
              </div>

              <nav className="space-y-2 flex-1">
                <NavButton 
                  active={activeScreen === 'lessons'} 
                  onClick={() => setActiveScreen('lessons')}
                  icon={<PlayCircleIcon className="w-5 h-5" />}
                  label="Do Zero ao Lucro"
                  subLabel="5 Aulas Estratégicas"
                  badge={`${completedLessons.length}/5`}
                />
                <NavButton 
                  active={activeScreen === 'pdfs'} 
                  onClick={() => setActiveScreen('pdfs')}
                  icon={<FileText className="w-5 h-5" />}
                  label={tituloSecaoPDFs}
                  subLabel="5 PDFs de Operação"
                  badge={`${downloadedPdfs.length}/5`}
                />
                <NavButton 
                  active={activeScreen === 'mentor'} 
                  onClick={() => setActiveScreen('mentor')}
                  icon={<MessageSquare className="w-5 h-5" />}
                  label="Consultor de Lucro"
                  subLabel="Inteligência Artificial"
                  badge="Online"
                />
                <NavButton 
                  active={activeScreen === 'rewards'} 
                  onClick={() => setActiveScreen('rewards')}
                  icon={<Zap className="w-5 h-5" />}
                  label="Suas Conquistas"
                  subLabel="Pontos e Medalhas"
                  badge={`${points} pts`}
                />
              </nav>

              <div className="mt-auto pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-slate-600 font-black text-sm shadow-sm group-hover:from-green-100 group-hover:to-green-50 group-hover:text-green-700 transition-all">
                    {userData?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate">{userData?.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">Meta: R$ {userData?.incomeGoal}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT Area */}
          <main className="min-h-screen md:ml-64">
            {/* Mobile Header - FIXO NO TOPO */}
            <header className="md:hidden sticky top-0 bg-white border-b border-slate-100 z-40 safe-top">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center shadow-md">
                      <Flame className="text-white w-4 h-4" />
                    </div>
                    <h1 className="font-black text-xs uppercase tracking-tight">
                      Sanduíche <span className="text-green-600">Natural</span>
                    </h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                      <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] font-black">{points}</span>
                    </div>
                    <div className="w-7 h-7 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center text-white font-bold text-[10px]">
                      {userData?.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-green-600 to-green-400"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-green-600 min-w-[32px]">
                    {progressPercentage}%
                  </span>
                </div>
              </div>
            </header>

            {/* CONTENT AREA - COM PADDING PARA BOTTOM NAV */}
            <div className="pb-20 md:pb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeScreen === 'lessons' && (
                    <LessonsScreen 
                      completedLessons={completedLessons} 
                      onComplete={handleLessonComplete} 
                    />
                  )}
                  {activeScreen === 'pdfs' && (
                    <PDFsScreen 
                      downloadedItems={downloadedPdfs}
                      onDownload={handlePdfDownload}
                    />
                  )}
                  {activeScreen === 'mentor' && (
                    <MentorChat 
                      userData={userData} 
                      onMessageSent={handleMentorEngagement}
                    />
                  )}
                  {activeScreen === 'rewards' && (
                    <RewardsScreen 
                      points={points}
                      badges={badges}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Bottom Nav - FIXO, COM SAFE AREA */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 z-50 safe-bottom">
              <div className="flex justify-around items-center px-2 pt-2 pb-safe">
                <MobileNavButton 
                  active={activeScreen === 'lessons'} 
                  onClick={() => setActiveScreen('lessons')}
                  icon={<LayoutDashboard className="w-5 h-5" />}
                  label="Aulas"
                />
                <MobileNavButton 
                  active={activeScreen === 'pdfs'} 
                  onClick={() => setActiveScreen('pdfs')}
                  icon={<FileText className="w-5 h-5" />}
                  label="GUIA"
                />
                <MobileNavButton 
                  active={activeScreen === 'mentor'} 
                  onClick={() => setActiveScreen('mentor')}
                  icon={<MessageSquare className="w-5 h-5" />}
                  label="IA"
                />
                <MobileNavButton 
                  active={activeScreen === 'rewards'} 
                  onClick={() => setActiveScreen('rewards')}
                  icon={<Zap className="w-5 h-5" />}
                  label="Conquistas"
                />
              </div>
            </nav>
          </main>
        </>
      )}
    </div>
  );
}

function NavButton({ active, onClick, icon, label, subLabel, badge }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, subLabel: string, badge?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
        active 
          ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
          active ? "bg-green-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-green-600 group-hover:shadow-sm"
        )}>
          {icon}
        </div>
        <div className="text-left">
          <p className="font-black text-sm tracking-tight leading-none mb-1">{label}</p>
          <p className={cn(
            "text-[10px] font-bold uppercase tracking-widest opacity-60",
            active ? "text-green-400" : "text-slate-400"
          )}>{subLabel}</p>
        </div>
      </div>
      {badge && (
        <div className="relative z-10">
          <span className={cn(
            "text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tighter",
            active ? "bg-green-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
          )}>
            {badge}
          </span>
        </div>
      )}
      {active && (
        <motion.div 
          layoutId="activeNavBg"
          className="absolute inset-0 bg-slate-900"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}

function MobileNavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 transition-all duration-300 relative py-1 flex-1",
        active ? "text-green-600" : "text-slate-400"
      )}
    >
      <div className={cn(
        "transition-all duration-300 relative",
        active ? "scale-110 -translate-y-1" : "scale-100"
      )}>
        {icon}
        {active && (
          <motion.div 
            layoutId="activeIndicator"
            className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white"
          />
        )}
      </div>
      <span className={cn(
        "text-[10px] font-black uppercase tracking-tighter transition-all duration-300",
        active ? "opacity-100" : "opacity-60"
      )}>
        {label}
      </span>
    </button>
  );
}

function PlayCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  );
}
