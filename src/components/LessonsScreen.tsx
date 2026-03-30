import React, { useState } from 'react';
import { Play, CheckCircle2, Lock, Trophy, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// FALLBACK PADRÃO PARA THUMBNAILS AUSENTES (Imagem de alta qualidade com tema de café/comida)
const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop';

// ESTRUTURA CENTRAL DE DADOS (AULAS)
// Cada objeto segue rigorosamente: { id, titulo, videoUrl, thumbnail }
const AULAS = [
  {
    id: '1',
    titulo: 'Higiene e Segurança Alimentar',
    videoUrl: '69c9f73f9ece9c59e26cbabb',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    duracao: '12:45',
    categoria: 'Fundamentos'
  },
  {
    id: '2',
    titulo: 'Produção em Escala e Montagem',
    videoUrl: '69c9f73f9ece9c59e26cbabb', 
    thumbnail: 'https://images.unsplash.com/photo-1621852004158-f3bc188caa21?q=80&w=800&auto=format&fit=crop',
    duracao: '18:20',
    categoria: 'Operação'
  },
  {
    id: '3',
    titulo: 'Precificação e Markup Lucrativo',
    videoUrl: '', 
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
    duracao: '15:10',
    categoria: 'Finanças'
  },
  {
    id: '4',
    titulo: 'Tráfego Pago para Delivery',
    videoUrl: '', 
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
    duracao: '22:30',
    categoria: 'Marketing'
  },
  {
    id: '5',
    titulo: 'Vendas e Script de Fidelização',
    videoUrl: '', 
    thumbnail: 'https://images.unsplash.com/photo-1556740734-7f96267b118a?q=80&w=800&auto=format&fit=crop',
    duracao: '14:55',
    categoria: 'Vendas'
  }
];

interface LessonsScreenProps {
  completedLessons: string[];
  onComplete: (id: string) => void;
}

export default function LessonsScreen({ completedLessons, onComplete }: LessonsScreenProps) {
  const [selectedLesson, setSelectedLesson] = useState(AULAS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // FUNÇÃO PARA GERAR O TÍTULO FORMATADO DINAMICAMENTE
  const formatLessonTitle = (index: number, titulo: string) => {
    const lessonNumber = String(index + 1).padStart(2, '0');
    return `Aula ${lessonNumber}: ${titulo}`;
  };

  // FUNÇÃO SEGURA PARA OBTER THUMBNAIL COM FALLBACK
  const getLessonThumbnail = (url?: string) => {
    return url && url.trim() !== '' ? url : FALLBACK_THUMBNAIL;
  };

  const getEmbedUrl = (videoId: string) => {
    if (!videoId) return '';
    return `https://scripts.converteai.net/936a89ee-2ce4-4007-a60f-9d25da087ec8/players/${videoId}/embed.html`;
  };

  const isCompleted = (id: string) => completedLessons.includes(id);
  const isUnlocked = (index: number) => index === 0 || isCompleted(AULAS[index - 1].id);

  const handlePlay = (lesson: typeof AULAS[0]) => {
    setSelectedLesson(lesson);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercentage = Math.round((completedLessons.length / AULAS.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        
        {/* PLAYER SECTION */}
        <AnimatePresence mode="wait">
          {isPlaying && (
            <motion.div
              key={selectedLesson.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl aspect-video relative">
                {selectedLesson.videoUrl ? (
                  <iframe
                    src={getEmbedUrl(selectedLesson.videoUrl)}
                    className="absolute top-0 left-0 w-full h-full border-none"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={formatLessonTitle(AULAS.findIndex(a => a.id === selectedLesson.id), selectedLesson.titulo)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <Play className="w-12 h-12 opacity-20 mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">Conteúdo em Breve</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="min-w-0">
                  <h2 className="font-black text-slate-900 text-sm truncate">
                    {formatLessonTitle(AULAS.findIndex(a => a.id === selectedLesson.id), selectedLesson.titulo)}
                  </h2>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Módulo: {selectedLesson.categoria}</p>
                </div>
                <button 
                  onClick={() => { onComplete(selectedLesson.id); setIsPlaying(false); }}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-500 transition-all active:scale-95 flex-shrink-0"
                >
                  Concluir Aula
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER & PROGRESS */}
        {!isPlaying && (
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-green-100">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-90">Sanduíche Natural</span>
            </div>
            <h1 className="text-2xl font-black mb-4 leading-tight">Seu Caminho para o Lucro</h1>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>Progresso Geral</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* LISTA DE AULAS */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Cronograma Estratégico</h3>
          {AULAS.map((aula, index) => {
            const completed = isCompleted(aula.id);
            const locked = !isUnlocked(index);
            const active = selectedLesson.id === aula.id && isPlaying;

            return (
              <button
                key={aula.id}
                disabled={locked}
                onClick={() => handlePlay(aula)}
                className={cn(
                  "w-full flex items-center gap-4 p-3 rounded-2xl border transition-all text-left group",
                  active ? "bg-green-50 border-green-200 ring-2 ring-green-100" : "bg-white border-slate-100 hover:border-green-200",
                  locked && "opacity-50 grayscale"
                )}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                  <img 
                    src={getLessonThumbnail(aula.thumbnail)} 
                    alt={aula.titulo} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    {locked ? <Lock className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white fill-white" />}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                      {aula.categoria}
                    </span>
                    {completed && <CheckCircle2 className="w-3 h-3 text-green-600" />}
                  </div>
                  <h4 className="font-black text-slate-900 text-xs md:text-sm truncate mb-1">
                    {formatLessonTitle(index, aula.titulo)}
                  </h4>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {aula.duracao}
                    </div>
                    {locked ? "Bloqueada" : completed ? "Concluída" : "Disponível"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
