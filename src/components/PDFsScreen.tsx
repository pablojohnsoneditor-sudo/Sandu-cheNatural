import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, Star, HelpCircle, ChevronRight, ExternalLink, FileCheck, ShieldCheck, Search, X, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface PDFResource {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadUrl: string;
}

const RESOURCES: PDFResource[] = [
  {
    id: '1',
    title: 'Volume 01: Manual do Sanduíche Perfeito',
    description: 'Checklist completo de higiene, conservação e montagem passo a passo.',
    category: 'Operação',
    downloadUrl: 'https://drive.google.com/file/d/1_-ynsiHSvb7bzCC1Qn4ldr9IPvL_mafh/view?usp=sharing'
  },
  {
    id: '2',
    title: 'Volume 02: Scripts de Venda para WhatsApp',
    description: 'Modelos prontos de mensagens para fechar vendas e fidelizar clientes.',
    category: 'Vendas',
    downloadUrl: 'https://drive.google.com/file/d/1TyNTsG9zB_eCl9XUKk6CRZhW4Dit-Un7/view?usp=sharing'
  },
  {
    id: '3',
    title: 'Volume 03: Planilha de Custos e Lucro',
    description: 'Ferramenta automática para calcular seu markup e lucro líquido real.',
    category: 'Finanças',
    downloadUrl: 'https://drive.google.com/file/d/1rhyadyxY1KtLjG9Gk76mqUIDokoFuBGI/view?usp=drive_link'
  },
  {
    id: '4',
    title: 'Volume 04: Modelos de Etiquetas e Logos',
    description: 'Arquivos editáveis para profissionalizar a embalagem do seu produto.',
    category: 'Design',
    downloadUrl: 'https://drive.google.com/file/d/1XAZsPvti76eeLNdeWp2V99DQ3Nl04odu/view?usp=sharing'
  },
  {
    id: '5',
    title: 'Volume 05: Guia de Tráfego Pago Express',
    description: 'O passo a passo para configurar seus primeiros anúncios no Meta Ads.',
    category: 'Marketing',
    downloadUrl: 'https://drive.google.com/file/d/1thBW6ZXznU20K3jxa3yeg13H700je72V/view?usp=sharing'
  }
];

export default function PDFsScreen() {
  const [downloadedItems, setDownloadedItems] = useState<string[]>([]);

  const handleDownload = (resourceId: string, url: string) => {
    if (!downloadedItems.includes(resourceId)) {
      setDownloadedItems([...downloadedItems, resourceId]);
    }
    
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* CONTAINER RESPONSIVO */}
      <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        
        {/* HERO HEADER - RESPONSIVO */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-5 md:p-6 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-90">
                Material de Apoio
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black mb-2 leading-tight">
              5 Ferramentas Prontas para Uso
            </h1>
            <p className="text-xs md:text-sm opacity-90">
              Tudo que você precisa para operar: planilhas, scripts, etiquetas e manuais.
            </p>
          </div>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/5 rounded-full blur-3xl" />
        </div>

        {/* CONTADOR - RESPONSIVO */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl md:rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] md:text-xs font-bold text-green-900 uppercase tracking-wider mb-1">
                Recursos Baixados
              </p>
              <p className="text-xl md:text-2xl font-black text-green-600">
                {downloadedItems.length}/5
              </p>
            </div>
            <div className="bg-white p-2.5 md:p-3 rounded-xl flex-shrink-0">
              <FileCheck className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
          </div>
          {downloadedItems.length === 5 && (
            <p className="text-[11px] md:text-xs text-green-700 mt-2 font-medium">
              ✅ Você possui todo o arsenal operacional!
            </p>
          )}
        </div>

        {/* LISTA DE PDFs - RESPONSIVO */}
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider px-1">
            Downloads Disponíveis
          </h2>
          
          {RESOURCES.map((resource, index) => {
            const isDownloaded = downloadedItems.includes(resource.id);

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all overflow-hidden active:scale-[0.98]"
              >
                <div className="p-3 md:p-4">
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    {/* ICON */}
                    <div className={cn(
                      "p-2.5 md:p-3 rounded-xl transition-colors flex-shrink-0",
                      isDownloaded ? 'bg-green-50' : 'bg-slate-50'
                    )}>
                      <FileText className={cn(
                        "w-5 h-5 md:w-6 md:h-6 transition-colors",
                        isDownloaded ? 'text-green-600' : 'text-slate-600'
                      )} />
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-xs md:text-sm leading-tight pr-2">
                          {resource.title}
                        </h3>
                        <span className="text-[9px] md:text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                          {resource.category}
                        </span>
                      </div>
                      <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                  </div>

                  {/* BOTÃO DOWNLOAD - TOUCH FRIENDLY */}
                  <button
                    onClick={() => handleDownload(resource.id, resource.downloadUrl || '#')}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs md:text-sm transition-all min-h-[44px]",
                      isDownloaded
                        ? 'bg-green-50 text-green-700 hover:bg-green-100 active:bg-green-200 border border-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg'
                    )}
                  >
                    {isDownloaded ? (
                      <>
                        <FileCheck className="w-4 h-4" />
                        <span>Baixar Novamente</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Grátis</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CARDS DE AJUDA - RESPONSIVOS */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl md:rounded-2xl p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className="bg-amber-500 p-2 rounded-xl flex-shrink-0">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 text-xs md:text-sm mb-1">
                Precisa de Material Personalizado?
              </h4>
              <p className="text-[11px] md:text-xs text-slate-600 mb-3 leading-relaxed">
                Etiquetas com sua marca, receitas exclusivas ou planilhas customizadas.
              </p>
              <button className="text-[11px] md:text-xs font-bold text-amber-700 bg-white px-3 py-2 rounded-lg hover:bg-amber-50 active:bg-amber-100 transition-colors border border-amber-200 min-h-[36px]">
                Falar com Suporte →
              </button>
            </div>
          </div>
        </div>

        {/* DICA PRO */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl md:rounded-2xl p-4">
          <div className="flex gap-3">
            <div className="text-xl md:text-2xl flex-shrink-0">💡</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 text-xs md:text-sm mb-1">Dica Pro</h4>
              <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed">
                Imprima o <strong>Manual de Produção</strong> e deixe visível na sua cozinha. 
                Use os <strong>Scripts de Vendas</strong> como templates fixos no WhatsApp Business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
