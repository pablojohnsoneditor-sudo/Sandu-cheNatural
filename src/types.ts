export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: 'Produção' | 'Vendas' | 'Gestão';
}

export interface PDFResource {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Copy' | 'Tráfego' | 'Custos' | 'Etiquetas' | 'Produção';
}

export type AgentType = 'mentor' | 'finance';

export interface UserData {
  name: string;
  incomeGoal: string;
  location: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}
