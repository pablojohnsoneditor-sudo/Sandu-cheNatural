import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Serializa um objeto para JSON de forma segura, removendo referências circulares
 * e garantindo que apenas propriedades primitivas sejam mantidas se necessário.
 */
export function safeJsonStringify(obj: any): string {
  const cache = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return '[Circular]';
      }
      
      // Se for um elemento HTML ou Window, extraímos apenas dados seguros
      if (value instanceof HTMLElement) {
        return {
          tagName: value.tagName,
          id: value.id,
          className: value.className,
          textContent: value.textContent?.substring(0, 100)
        };
      }
      
      if (value instanceof Event) {
        return {
          type: value.type,
          target: value.target instanceof HTMLElement ? value.target.id || value.target.tagName : 'non-html-target'
        };
      }

      cache.add(value);
    }
    return value;
  });
}
