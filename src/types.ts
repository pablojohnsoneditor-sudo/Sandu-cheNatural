export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
}

export interface PDFResource {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  downloadUrl?: string;
}

export interface UserData {
  name: string;
  incomeGoal: string;
  location: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export type AgentType = 'finance';
