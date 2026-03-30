import React, { Component, ErrorInfo, ReactNode } from 'react';
import { safeJsonStringify } from '../lib/utils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Logamos como string segura para evitar erros de estrutura circular no console/logs
    console.error('Uncaught error (safe):', safeJsonStringify({ error: error.message, stack: error.stack, errorInfo }));
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold">
          Ocorreu um erro ao carregar este componente.
        </div>
      );
    }

    return this.props.children;
  }
}
