import React from 'react';
import { FileText, Download, Target, Calculator, Tag, MessageSquare, FileCheck, ShieldCheck, ReceiptText } from 'lucide-react';
import { motion } from 'motion/react';
import { PDFResource } from '../types';

const RESOURCES: PDFResource[] = [
  {
    id: '1',
    title: 'Manual de Produção e Higiene',
    description: 'Normas técnicas e processos de segurança alimentar.',
    icon: 'ShieldCheck',
    category: 'Produção'
  },
  {
    id: '2',
    title: 'Script de Vendas WhatsApp',
    description: 'Modelos de copy para conversão imediata.',
    icon: 'MessageSquare',
    category: 'Copy'
  },
  {
    id: '3',
    title: 'Planilha de Custos Operacionais',
    description: 'Cálculo automatizado de CMV e margem.',
    icon: 'Calculator',
    category: 'Custos'
  },
  {
    id: '4',
    title: 'Modelos de Etiquetas e Notas',
    description: 'Arquivos prontos para impressão e personalização.',
    icon: 'ReceiptText',
    category: 'Etiquetas'
  },
  {
    id: '5',
    title: 'Checklist de Tráfego Pago',
    description: 'Configuração de campanhas no Meta Ads.',
    icon: 'Target',
    category: 'Tráfego'
  }
];

const IconMap: Record<string, any> = {
  MessageSquare,
  Target,
  Calculator,
  Tag,
  FileText,
  ShieldCheck,
  ReceiptText,
  FileCheck
};

export default function PDFsScreen() {
  return (
    <div className="p-4 pb-24 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">📂 Central de Downloads</h1>
        <p className="text-slate-500 text-sm italic">Documentos, manuais e notas fiscais.</p>
      </header>

      <div className="space-y-2">
        {RESOURCES.map((resource, index) => {
          const Icon = IconMap[resource.icon] || FileText;
          return (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-green-200 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-green-50 transition-colors">
                  <Icon className="w-5 h-5 text-slate-600 group-hover:text-green-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{resource.title}</h3>
                  <p className="text-[11px] text-slate-400 truncate">{resource.description}</p>
                </div>
              </div>
              
              <button className="ml-4 bg-slate-50 hover:bg-green-600 text-slate-400 hover:text-white p-2.5 rounded-xl transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider">Baixar</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center text-center space-y-3">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
          <FileCheck className="w-6 h-6 text-slate-300" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Precisa de outro documento?</h4>
          <p className="text-xs text-slate-400">Abra um chamado com o suporte financeiro.</p>
        </div>
      </div>
    </div>
  );
}
