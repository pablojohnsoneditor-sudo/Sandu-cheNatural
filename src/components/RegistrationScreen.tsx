import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, ArrowRight, User, MapPin, DollarSign } from 'lucide-react';
import { UserData } from '../types';

interface RegistrationScreenProps {
  onComplete: (data: UserData) => void;
}

export default function RegistrationScreen({ onComplete }: RegistrationScreenProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    incomeGoal: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.incomeGoal && formData.location) {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-6 justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto w-full space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-xl shadow-green-200 mx-auto mb-4">
            <Target className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
            SANDUÍCHE <span className="text-green-600">NATURAL</span>
          </h1>
          <p className="text-slate-500 font-medium italic">Área de Membros Estratégica</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Seu Nome</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: João Silva"
                className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Meta de Renda (Mensal)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                required
                type="text"
                value={formData.incomeGoal}
                onChange={e => setFormData({ ...formData, incomeGoal: e.target.value })}
                placeholder="Ex: 5.000,00"
                className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Localização</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                required
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ex: São Paulo, SP"
                className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-100 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors mt-4"
          >
            COMEÇAR AGORA
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          Sanduíche Natural • Foco no Lucro
        </p>
      </motion.div>
    </div>
  );
}
