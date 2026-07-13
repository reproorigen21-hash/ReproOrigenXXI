import { AI_STANDARD } from './AI_STANDARD';

export interface PromptEngine {
  compose(system: string, context: string, request: string): string;
}

export class ReproPromptEngine implements PromptEngine {
  compose(system: string, context: string, request: string) {
    return [
      `Sistema: ${AI_STANDARD.identity.product} / ${AI_STANDARD.identity.platform}`,
      `Estilo: ${AI_STANDARD.tone.style}`,
      `Sistema base: ${system}`,
      `Contexto: ${context}`,
      `Solicitud: ${request}`,
      `Formato: ${AI_STANDARD.responseFormat.join(' | ')}`
    ].join('\n');
  }
}
