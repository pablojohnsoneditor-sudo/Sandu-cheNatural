import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, Lock, Trophy, Award, Star, Clock, ChevronRight, TrendingUp, PlayCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ErrorBoundary from './ErrorBoundary';
import { cn } from '../lib/utils';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
  vturbId?: string;
  isAvailable?: boolean;
}

const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Higiene: A Base do Lucro',
    description: 'Aprenda as normas da ANVISA e como garantir a segurança total do seu produto para evitar prejuízos e fidelizar clientes.',
    duration: '12:45',
    thumbnail: 'https://picsum.photos/seed/hygiene/800/450',
    category: 'Fundamentos',
    vturbId: '69c9f73f9ece9c59e26cbabb',
    isAvailable: true
  },
  {
    id: '2',
    title: 'Produção em Escala: O Segredo do Recheio',
    description: 'Como montar 50 sanduíches em 1 hora mantendo o padrão de qualidade e frescor.',
    duration: '18:20',
    thumbnail: 'https://picsum.photos/seed/production/800/450',
    category: 'Operação',
    vturbId: '69c9f73f9ece9c59e26cbabb',
    isAvailable: true
  },
  {
    id: '3',
    title: 'Precificação Estratégica: Markup 3x Mínimo',
    description: 'Nunca mais perca dinheiro. Aprenda a calcular o CMV e definir o preço que coloca lucro real no seu bolso.',
    duration: '15:10',
    thumbnail: 'https://picsum.photos/seed/finance/800/450',
    category: 'Finanças',
    isAvailable: false
  },
  {
    id: '4',
    title: 'Tráfego Pago para Delivery Local',
    description: 'Como investir R$ 10 por dia no Instagram e lotar o seu WhatsApp de pedidos famintos.',
    duration: '22:30',
    thumbnail: 'https://picsum.photos/seed/ads/800/450',
    category: 'Marketing',
    isAvailable: false
  },
  {
    id: '5',
    title: 'Script de Vendas e Fidelização',
    description: 'O que dizer para o cliente voltar sempre e como criar combos que aumentam o seu ticket médio.',
    duration: '14:55',
    thumbnail: 'https://picsum.photos/seed/sales/800/450',
    category: 'Vendas',
    isAvailable: false
  }
];

interface LessonsScreenProps {
  completedLessons: string[];
  onComplete: (id: string) => void;
}

export default function LessonsScreen({ completedLessons, onComplete }: LessonsScreenProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(LESSONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (e.message === 'Script error.' || (e.error && e.error.message && e.error.message.includes('circular structure'))) {
        e.preventDefault();
        return true;
      }
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    if (isPlaying && selectedLesson.vturbId) {
      const script = document.createElement("script");
      script.src = `https://scripts.converteai.net/936a89ee-2ce4-4007-a60f-9d25da087ec8/players/${selectedLesson.vturbId}/v4/player.js`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
      
      return () => {
        // Cleanup script if needed
      };
    }
  }, [isPlaying, selectedLesson.vturbId]);

  const isCompleted = (id: string) => completedLessons.includes(id);
  const isUnlocked = (index: number) => {
    const lesson = LESSONS[index];
    if (index === 0) return true;
    // Sequential unlock: previous must be completed
    return isCompleted(LESSONS[index - 1].id);
  };

  const handleLessonClick = (lesson: Lesson, index: number) => {
    if (isUnlocked(index)) {
      setSelectedLesson(lesson);
      setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id);
    }
  };

  const allCompleted = completedLessons.length === LESSONS.length;
  const progressPercentage = Math.round((completedLessons.length / LESSONS.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* CONTAINER COM PADDING RESPONSIVO */}
      <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        
        {/* HERO HEADER - RESPONSIVO */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 p-5 md:p-6 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-90">
                Sanduíche Natural
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black mb-2 leading-tight">
              {allCompleted ? '🎉 Curso Completo!' : 'Do Zero ao Lucro em 5 Aulas'}
            </h1>
            <p className="text-xs md:text-sm opacity-90 mb-4">
              {allCompleted 
                ? 'Você desbloqueou todo o conteúdo. Agora é executar e escalar!'
                : 'Assista na ordem. Cada aula libera uma habilidade do negócio.'}
            </p>
            
            {/* PROGRESS BAR */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] md:text-xs">
                <span className="font-bold">Seu Progresso</span>
                <span className="font-mono">{completedLessons.length}/{LESSONS.length} concluídas</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-white rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MOTIVATIONAL CARD - RESPONSIVO */}
        {!allCompleted && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl md:rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="bg-orange-500 p-2 rounded-lg flex-shrink-0">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-xs md:text-sm mb-1">
                  Próxima Meta: {completedLessons.length === 0 ? 'Assistir 1ª Aula' : `Completar Aula ${completedLessons.length + 1}`}
                </h3>
                <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed">
                  Alunos que completam o protocolo faturam em média <strong className="text-orange-600">R$ 3.200/mês</strong> no primeiro trimestre.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CERTIFICADO - RESPONSIVO */}
        {allCompleted && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl md:rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2.5 md:p-3 rounded-full flex-shrink-0">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-slate-900 text-sm md:text-base mb-1">
                  Certificado Desbloqueado! 🏆
                </h3>
                <p className="text-[11px] md:text-xs text-slate-600">
                  Você domina o protocolo. Baixe os PDFs e consulte o Agente Financeiro.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIDEO PLAYER SECTION - IF PLAYING */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative aspect-video"
            >
              {selectedLesson.vturbId ? (
                <div className="w-full h-full" key={selectedLesson.vturbId}>
                  <ErrorBoundary fallback={
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                      <Play className="w-12 h-12 opacity-20" />
                      <p className="text-sm font-bold uppercase tracking-widest">Erro ao carregar o vídeo.</p>
                      <button 
                        onClick={() => {
                          onComplete(selectedLesson.id);
                          setIsPlaying(false);
                        }}
                        className="bg-green-600 text-white px-6 py-2 rounded-full font-bold text-xs"
                      >
                        Pular Aula
                      </button>
                    </div>
                  }>
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: `<vturb-smartplayer id="vid-${selectedLesson.vturbId}" style="display: block; margin: 0 auto; width: 100%; "></vturb-smartplayer>` 
                      }} 
                      className="w-full h-full"
                    />
                  </ErrorBoundary>
                  <div className="absolute bottom-4 right-4 z-20">
                    <button 
                      onClick={() => {
                        onComplete(selectedLesson.id);
                        setIsPlaying(false);
                      }}
                      className="bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-green-500 transition-all shadow-xl shadow-green-900/20 active:scale-95 min-h-[44px]"
                    >
                      Concluir e Liberar Próxima
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                  <Play className="w-12 h-12 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">Aula em Breve...</p>
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-xl font-bold text-xs hover:bg-slate-700 transition-colors min-h-[44px]"
                  >
                    Voltar ao Cronograma
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LESSONS GRID - RESPONSIVO */}
        <div className="space-y-4">
          <h2 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider px-1">
            Módulos do Curso
          </h2>
          
          {LESSONS.map((lesson, index) => {
            const completed = isCompleted(lesson.id);
            const locked = !isUnlocked(index);
            const expanded = expandedLesson === lesson.id;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border transition-all",
                  locked 
                    ? "border-slate-200 opacity-60" 
                    : "border-slate-100 hover:border-green-300 hover:shadow-md active:scale-[0.98]"
                )}
              >
                <button
                  onClick={() => handleLessonClick(lesson, index)}
                  disabled={locked}
                  className="w-full text-left"
                >
                  {/* THUMBNAIL - ASPECT RATIO FIXO */}
                  <div className="relative aspect-video bg-slate-100">
                    <img 
                      src={lesson.thumbnail} 
                      alt={lesson.title} 
                      loading="lazy"
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-500",
                        locked ? "grayscale" : "group-hover:scale-105"
                      )}
                    />
                    
                    {/* OVERLAY PLAY/LOCK */}
                    {!locked && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 active:opacity-100 transition-opacity">
                        <div className="bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-full shadow-lg">
                          {completed ? (
                            <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                          ) : (
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-green-600 fill-green-600" />
                          )}
                        </div>
                      </div>
                    )}

                    {locked && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                          <Lock className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" />
                          <p className="text-[10px] md:text-xs font-bold">
                            Complete a aula anterior
                          </p>
                        </div>
                      </div>
                    )}

                    {/* BADGES */}
                    <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-[9px] md:text-[10px] px-2 py-1 rounded-lg font-mono font-bold">
                      {lesson.duration}
                    </span>

                    <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] md:text-[10px] px-2 py-1 rounded-lg font-bold uppercase tracking-wider shadow-lg">
                      {lesson.category}
                    </span>

                    {completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 bg-green-500 text-white p-1.5 md:p-2 rounded-full shadow-lg"
                      >
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                      </motion.div>
                    )}
                  </div>

                  {/* CARD CONTENT - PADDING RESPONSIVO */}
                  <div className="p-3 md:p-4">
                    <h3 className="font-bold text-slate-900 text-xs md:text-sm leading-tight mb-2 line-clamp-2">
                      {lesson.title}
                    </h3>
                    
                    <p className="text-[11px] md:text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                        <span className="font-medium truncate">
                          {completed ? 'Assistir novamente' : locked ? 'Bloqueada' : 'Começar agora'}
                        </span>
                      </div>
                      
                      {completed && (
                        <span className="text-[9px] md:text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                          Concluída ✓
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {/* EXPANDED CONTENT */}
                <AnimatePresence>
                  {expanded && !locked && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-100 bg-slate-50 px-3 md:px-4 py-3"
                    >
                      <p className="text-[11px] md:text-xs text-slate-600 mb-3 leading-relaxed">
                        <strong>O que você vai aprender:</strong> {lesson.description}
                      </p>
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-xs md:text-sm py-2.5 md:py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        <Play className="w-4 h-4" />
                        Assistir Aula Completa
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, label, active }: { icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <div className="text-center group">
      <div className={cn(
        "w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-2 transition-all duration-500 border-2",
        active 
          ? "bg-green-50 border-green-100 text-green-600 shadow-lg shadow-green-50 scale-110" 
          : "bg-slate-50 border-transparent text-slate-200 grayscale opacity-40"
      )}>
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" })}
      </div>
      <p className={cn(
        "text-[8px] font-black uppercase tracking-widest transition-colors",
        active ? "text-green-600" : "text-slate-300"
      )}>{label}</p>
    </div>
  );
}
