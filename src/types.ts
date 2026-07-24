export type DayId = 'day3' | 'day4' | 'day5' | 'day6' | 'talentbridge';

export interface StepItem {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  clickPath?: string;
  exactUrl?: string;
  codeSnippet?: string;
  codeLanguage?: string;
  tip?: string;
  warning?: string;
  interactiveType?: 'teachable' | 'gpt' | 'lovable' | 'webhook' | 'sheets' | 'presentation' | 'copy_prompt';
}

export interface BootcampModule {
  id: DayId;
  dayNumber: number | string;
  title: string;
  subtitle: string;
  description: string;
  estimatedTime: string;
  status: 'Not started' | 'In progress' | 'Completed';
  iconName: string;
  keyTakeaways: string[];
  steps: StepItem[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface WorkflowNodeData {
  id: string;
  name: string;
  type: 'trigger' | 'ai' | 'action' | 'db' | 'condition' | 'notification';
  icon: string;
  subtitle: string;
  description: string;
  exactPath: string;
  inputs: Record<string, string>;
  outputs: Record<string, string>;
  jsonSnippet: string;
  troubleshooting: string[];
}

export interface TestPayload {
  clientName: string;
  company: string;
  email: string;
  requirements: string;
  budgetRange: string;
}

export interface PresentationSlide {
  slideNumber: number;
  title: string;
  category: string;
  bullets: string[];
  speakerNotes: string;
  visualCue: string;
  timeAllocation: string;
}

export interface DownloadableAsset {
  id: string;
  filename: string;
  title: string;
  category: 'workflow' | 'guide' | 'prompt' | 'presentation' | 'cheatsheet' | 'advanced';
  description: string;
  fileContent: string;
  mimeType: string;
}

export interface UserProgress {
  completedSteps: Record<string, boolean>;
  completedModules: Record<string, boolean>;
  quizScores: Record<string, boolean>;
  lastVisitedDay: DayId;
}
