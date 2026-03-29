import React from 'react';
import { Play, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Lesson } from '../types';

const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Higiene e Manipulação de Alimentos',
    description: 'Segurança alimentar é a base do seu negócio. Aprenda as normas da ANVISA.',
    duration: '15:20',
    thumbnail: 'https://picsum.photos/seed/hygiene/400/225',
    category: 'Produção'
  },
  {
    id: '2',
    title: 'Montagem do Sanduíche de Frango com Ervas',
    description: 'O carro-chefe. Aprenda a montagem que garante o frescor por 48h.',
    duration: '12:45',
    thumbnail: 'https://picsum.photos/seed/sandwich1/400/225',
    category: 'Produção'
  },
  {
    id: '3',
    title: 'Precificação para Lucro Máximo',
    description: 'Não venda barato. Aprenda a calcular o CMV e sua margem de contribuição.',
    duration: '22:10',
    thumbnail: 'https://picsum.photos/seed/money/400/225',
    category: 'Gestão'
  },
  {
    id: '4',
    title: 'Tráfego Pago para Delivery (Iniciante)',
    description: 'Como fazer seus primeiros anúncios no Meta Ads focados em WhatsApp.',
    duration: '18:30',
    thumbnail: 'https://picsum.photos/seed/ads/400/225',
    category: 'Vendas'
  },
  {
    id: '5',
    title: 'Scripts de Fechamento no WhatsApp',
    description: 'Transforme curiosos em clientes pagantes com gatilhos de escassez.',
    duration: '10:15',
    thumbnail: 'https://picsum.photos/seed/whatsapp/400/225',
    category: 'Vendas'
  }
];

export default function LessonsScreen() {
  return (
    <div className="p-4 pb-24 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">🎥 Aulas do Protocolo</h1>
        <p className="text-slate-500 text-sm italic">Domine a produção e as vendas.</p>
      </header>

      <div className="grid gap-4">
        {LESSONS.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer"
          >
            <div className="relative aspect-video">
              <img 
                src={lesson.thumbnail} 
                alt={lesson.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 p-3 rounded-full shadow-lg">
                  <Play className="w-6 h-6 text-green-600 fill-green-600" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-md font-mono">
                {lesson.duration}
              </span>
              <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                {lesson.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-800 line-clamp-1">{lesson.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{lesson.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>Assistir agora</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-slate-200" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
