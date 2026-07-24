import Dexie, { type EntityTable } from 'dexie';

export interface ProgressStep {
  stepId: string;
  isCompleted: boolean;
}

export interface AppSetting {
  key: string;
  value: string;
}

export interface QuizScore {
  moduleId: string;
  score: number;
  passed: boolean;
  timestamp: number;
}

export interface Bookmark {
  stepId: string;
  timestamp: number;
}

class AISparkDB extends Dexie {
  progress!: EntityTable<ProgressStep, 'stepId'>;
  settings!: EntityTable<AppSetting, 'key'>;
  quizScores!: EntityTable<QuizScore, 'moduleId'>;
  bookmarks!: EntityTable<Bookmark, 'stepId'>;

  constructor() {
    super('AISparkDB');
    this.version(1).stores({
      progress: 'stepId',
      settings: 'key'
    });
    this.version(2).stores({
      progress: 'stepId',
      settings: 'key',
      quizScores: 'moduleId',
      bookmarks: 'stepId'
    });
  }
}

export const db = new AISparkDB();
