import React from 'react';
import { Trophy, Star, Award, Zap, Target, Flame, CheckCircle2, Lock, FileText, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isEarned: boolean;
}

interface RewardsScreenProps {
  points: number;
  badges: Badge[];
}

export default function RewardsScreen({ points, badges }: RewardsScreenProps) {
  const earnedBadgesCount = badges.filter(b => b.isEarned).length;
  const progressToNextLevel = (points % 500) / 5; // Level every 500 points

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-6 max-w-4xl mx-auto space-y-8">
        
        {/* POINTS DASHBOARD */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total de Pontos</span>
              </div>
              <div className="flex items-baseline gap-2">
                <motion.span 
                  key={points}
                  initial={{ scale: 1.2, color: '#4ade80' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-6xl font-black tracking-tighter"
                >
                  {points}
                </motion.span>
                <span className="text-xl font-black text-slate-500 uppercase tracking-tighter">PTS</span>
              </div>
            </div>

            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                <span className="text-slate-400">Nível {Math.floor(points / 500) + 1}</span>
                <span className="text-green-400">{500 - (points % 500)} pts para o próximo nível</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-24 -mb-24" />
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            icon={<Trophy className="w-5 h-5 text-yellow-500" />}
            label="Conquistas"
            value={`${earnedBadgesCount}/${badges.length}`}
          />
          <StatCard 
            icon={<Flame className="w-5 h-5 text-orange-500" />}
            label="Nível"
            value={Math.floor(points / 500) + 1}
          />
          <StatCard 
            icon={<Target className="w-5 h-5 text-blue-500" />}
            label="Rank"
            value="Iniciante"
          />
          <StatCard 
            icon={<Star className="w-5 h-5 text-purple-500" />}
            label="Reputação"
            value="Alta"
          />
        </div>

        {/* BADGES SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sua Galeria de Medalhas</h2>
            <span className="text-[10px] font-bold text-slate-400">{earnedBadgesCount} Desbloqueadas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ y: -2 }}
                className={cn(
                  "relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300",
                  badge.isEarned 
                    ? "bg-white border-slate-100 shadow-sm" 
                    : "bg-slate-50 border-slate-100 opacity-60 grayscale"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden",
                  badge.isEarned ? badge.color : "bg-slate-200"
                )}>
                  <div className="relative z-10 text-white">
                    {badge.isEarned ? badge.icon : <Lock className="w-6 h-6 text-slate-400" />}
                  </div>
                  {badge.isEarned && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-slate-900 text-sm">{badge.title}</h3>
                    {badge.isEarned && <CheckCircle2 className="w-3 h-3 text-green-600" />}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase tracking-wide">
                    {badge.description}
                  </p>
                </div>

                {!badge.isEarned && (
                  <div className="absolute top-3 right-3">
                    <Lock className="w-3 h-3 text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* HOW TO EARN */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Como ganhar mais pontos?</h3>
          <div className="space-y-3">
            <EarnMethod icon={<PlayCircleIcon className="w-4 h-4" />} label="Concluir uma Aula" points="+100" />
            <EarnMethod icon={<FileText className="w-4 h-4" />} label="Baixar uma Ferramenta (PDF)" points="+50" />
            <EarnMethod icon={<MessageSquareIcon className="w-4 h-4" />} label="Interagir com o Mentor IA" points="+10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-green-200 transition-all">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-lg font-black text-slate-900">{value}</p>
    </div>
  );
}

function EarnMethod({ icon, label, points }: { icon: React.ReactNode, label: string, points: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
          {icon}
        </div>
        <span className="text-xs font-black text-slate-700">{label}</span>
      </div>
      <span className="text-xs font-black text-green-600">{points}</span>
    </div>
  );
}

function PlayCircleIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  );
}

function MessageSquareIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
