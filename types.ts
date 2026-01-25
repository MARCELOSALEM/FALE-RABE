
export interface ArabicLetter {
  char: string;
  name: string;
  trans: string;
  desc: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
  example?: {
    word: string;
    meaning: string;
  };
}

export enum ViewMode {
  SEARCH = 'search',
  GRID = 'grid',
  FLASHCARD = 'flashcard',
  AI_TUTOR = 'ai_tutor'
}
