import React from 'react';
import { FileText, Download, CheckCircle2, FileCheck, MessageSquare, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// 1. ESTRUTURA DE DADOS CENTRAL (PDFS)
// Cada objeto contém: id, titulo, arquivoUrl + metadados para UI
const pdfs = [
  {
    id: '1',
    titulo: 'Volume 1: Proteínas do Mar',
    descricao: 'Receitas e técnicas para sanduíches com peixes, frutos do mar e atum.',
    categoria: 'Receitas',
    arquivoUrl: 'https://drive.google.com/file/d/1_-ynsiHSvb7bzCC1Qn4ldr9IPvL_mafh/view?usp=sharing'
  },
  {
    id: '2',
    titulo: 'Volume 2: Carnes',
    descricao: 'O guia definitivo para sanduíches com carnes bovinas, suínas e aves.',
    categoria: 'Receitas',
    arquivoUrl: 'https://drive.google.com/file/d/1TyNTsG9zB_eCl9XUKk6CRZhW4Dit-Un7/view?usp=sharing'
  },
  {
    id: '3',
    titulo: 'Volume 3: Vegetarianos',
    descricao: 'Opções deliciosas e nutritivas sem carne para diversificar seu cardápio.',
    categoria: 'Receitas',
    arquivoUrl: 'https://drive.google.com/file/d/1rhyadyxY1KtLjG9Gk76mqUIDokoFuBGI/view?usp=drive_link'
  },
  {
    id: '4',
    titulo: 'Volume 4: Queijos e Ricota',
    descricao: 'Combinações cremosas e sofisticadas usando diferentes tipos de queijos.',
    categoria: 'Receitas',
    arquivoUrl: 'https://drive.google.com/file/d/1XAZsPvti76eeLNdeWp2V99DQ3Nl04odu/view?usp=sharing'
  },
  {
    id: '5',
    titulo: 'Volume 5: Bases e Complementos',
    descricao: 'Molhos, pastas e acompanhamentos que elevam o nível do seu produto.',
    categoria: 'Bases',
    arquivoUrl: 'https://drive.google.com/file/d/1thBW6ZXznU20K3jxa3yeg13H700je72V/view?usp=sharing'
  }
];

interface PDFsScreenProps {
  downloadedItems: string[];
  onDownload: (id: string) => void;
}

const tituloSecaoPDFs = "Material GUIA Premium";

export default function PDFsScreen({ downloadedItems, onDownload }: PDFsScreenProps) {
  const handleDownload = (id: string, url: string) => {
    onDownload(id);
    
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  const totalPdfs = pdfs.length;
  const downloadedCount = downloadedItems.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        
        {/* HEADER DINÂMICO */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-5 md:p-6 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-90">
                Material de Apoio
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black mb-2 leading-tight">
              {tituloSecaoPDFs}
            </h1>
            <p className="text-xs md:text-sm opacity-90">
              Acelere sua operação com nossos manuais, planilhas e scripts exclusivos.
            </p>
          </div>
        </div>

        {/* CONTADOR DE PROGRESSO */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl md:rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] md:text-xs font-bold text-green-900 uppercase tracking-wider mb-1">
                Materiais Coletados
              </p>
              <p className="text-xl md:text-2xl font-black text-green-600">
                {downloadedCount}/{totalPdfs}
              </p>
            </div>
            <div className="bg-white p-2.5 md:p-3 rounded-xl flex-shrink-0 shadow-sm">
              <FileCheck className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* LISTA DE PDFS (RENDERIZAÇÃO DINÂMICA) */}
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider px-1">
            Biblioteca de Downloads
          </h2>
          
          {pdfs.map((pdf, index) => {
            const isDownloaded = downloadedItems.includes(pdf.id);

            return (
              <motion.div
                key={pdf.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all overflow-hidden active:scale-[0.98]"
              >
                <div className="p-3 md:p-4">
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    <div className={cn(
                      "p-2.5 md:p-3 rounded-xl transition-colors flex-shrink-0",
                      isDownloaded ? 'bg-green-50' : 'bg-blue-50'
                    )}>
                      <FileText className={cn(
                        "w-5 h-5 md:w-6 md:h-6",
                        isDownloaded ? 'text-green-600' : 'text-blue-600'
                      )} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-xs md:text-sm leading-tight pr-2">
                          {pdf.titulo}
                        </h3>
                        <span className="text-[9px] md:text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                          {pdf.categoria}
                        </span>
                      </div>
                      <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed">
                        {pdf.descricao}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(pdf.id, pdf.arquivoUrl)}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs md:text-sm transition-all min-h-[44px]",
                      isDownloaded
                        ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                    )}
                  >
                    {isDownloaded ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
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

        {/* SUPORTE PERSONALIZADO */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl md:rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-amber-500 p-2 rounded-xl flex-shrink-0">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 text-xs md:text-sm mb-1">
                Precisa de algo específico?
              </h4>
              <p className="text-[11px] md:text-xs text-slate-600 mb-3">
                Nossa equipe pode criar etiquetas ou planilhas personalizadas para sua marca.
              </p>
              <button className="text-[11px] font-bold text-amber-700 bg-white px-3 py-2 rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors">
                Falar com Suporte →
              </button>
            </div>
          </div>
        </div>

        {/* DICA PRO DINÂMICA */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl md:rounded-2xl p-4">
          <div className="flex gap-3">
            <div className="text-xl flex-shrink-0">💡</div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 text-xs md:text-sm mb-1">Dica de Especialista</h4>
              <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed">
                Comece imprimindo o <strong>{pdfs[0].titulo}</strong> para organizar sua cozinha. 
                Em seguida, utilize os <strong>{pdfs[1].titulo}</strong> para otimizar seu atendimento no WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
