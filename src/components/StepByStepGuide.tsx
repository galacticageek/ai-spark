import React, { useState } from 'react';
import { BootcampModule, StepItem } from '../types';
import { CheckCircle2, Circle, ExternalLink, Copy, Check, MousePointer, HelpCircle, Sparkles, AlertTriangle, Bookmark } from 'lucide-react';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { TeachableMachineSimulator } from './TeachableMachineSimulator';
import { LovablePromptBuilder } from './LovablePromptBuilder';
import { N8nWorkflowVisualizer } from './n8nWorkflowVisualizer';
import { PresentationDeckViewer } from './PresentationDeckViewer';
import { explainStep } from '../lib/openrouter';

interface StepGuideProps {
  module: BootcampModule;
  completedSteps: Record<string, boolean>;
  bookmarkedSteps: Record<string, boolean>;
  onToggleStep: (stepId: string) => void;
  onToggleBookmark: (stepId: string) => void;
  onDownloadWorkflow: () => void;
  onTakeQuiz: (module: BootcampModule) => void;
}

export const StepByStepGuide: React.FC<StepGuideProps> = ({
  module,
  completedSteps,
  bookmarkedSteps,
  onToggleStep,
  onToggleBookmark,
  onDownloadWorkflow,
  onTakeQuiz
}) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [explainingStepId, setExplainingStepId] = useState<string | null>(null);
  const [explanations, setExplanations] = useState<Record<string, string>>({});

  const handleExplain = async (stepId: string, title: string, description: string) => {
    if (explanations[stepId]) return; // already explained
    setExplainingStepId(stepId);
    setExplanations((prev) => ({ ...prev, [stepId]: '' }));

    try {
      await explainStep(title, description, (chunk) => {
        setExplanations((prev) => ({
          ...prev,
          [stepId]: (prev[stepId] || '') + chunk
        }));
      });
    } catch (e: any) {
      console.error(e);
      setExplanations((prev) => ({
        ...prev,
        [stepId]: 'Failed to explain: ' + (e.message || String(e))
      }));
    } finally {
      setExplainingStepId(null);
    }
  };

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleStepClick = (stepId: string) => {
    const isNowCompleted = !completedSteps[stepId];
    onToggleStep(stepId);

    if (isNowCompleted) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#2D3B32', '#5A7361', '#C06C4C', '#F59E0B']
      });
    }
  };

  const completedCountInModule = module.steps.filter((s) => completedSteps[s.id]).length;
  const moduleProgress = Math.round((completedCountInModule / module.steps.length) * 100);

  return (
    <div className="space-y-6">
      {/* Module Overview Header */}
      <div className="bg-white  border border-[#E5E5E0] p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E5E0] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5  bg-[#1A1A1A] text-white">
                Day {module.dayNumber}
              </span>
              <span className="text-xs font-mono font-medium text-[#8C8C88]">Estimated Time: {module.estimatedTime}</span>
            </div>
            <h2 className="text-2xl font-light text-[#1A1A1A]">{module.title}</h2>
            <p className="text-xs text-[#6B6B66] mt-1 max-w-3xl leading-relaxed">{module.description}</p>
          </div>

          <div className="p-4 bg-[#F4F4F1]  border border-[#E5E5E0] text-right shrink-0 flex items-center gap-4">
            <div>
              <div className="text-[10px] text-[#8C8C88] uppercase font-bold tracking-widest mb-0.5">Module Progress</div>
              <div className="text-lg font-mono font-bold text-[#1A1A1A] text-left">
                {completedCountInModule} / {module.steps.length} <span className="text-xs text-[#8C8C88]">Steps</span>
              </div>
            </div>
            
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#E5E5E0]" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-[#A3B18A] transition-all duration-1000 ease-out"
                  strokeWidth="3"
                  strokeDasharray={`${(moduleProgress / 100) * 100.53} 100.53`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#1A1A1A]">
                {moduleProgress}%
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {module.keyTakeaways.map((takeaway, idx) => (
            <div key={idx} className="p-3 bg-[#FDFDFB]  border border-[#E5E5E0] text-xs font-medium text-[#1A1A1A] flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#A3B18A] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{takeaway}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Walkthrough List */}
      <div className="space-y-4">
        {module.steps.map((step) => {
          const isDone = Boolean(completedSteps[step.id]);

          return (
            <div
              key={step.id}
              className={`bg-white  border transition-all p-6 space-y-4 ${
                isDone ? 'border-[#A3B18A] bg-[#F4F9F1]/40' : 'border-[#E5E5E0] hover:border-[#A3B18A]'
              }`}
           >
              {/* Step Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className="mt-0.5 transition-transform active:scale-95 focus:outline-none shrink-0"
                    id={`toggle-step-${step.id}`}
                 >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-[#A3B18A] fill-[#A3B18A]/20" />
                    ) : (
                      <div className="w-5 h-5  border border-[#A3B18A] flex items-center justify-center text-[10px] font-bold font-mono text-[#A3B18A] hover:bg-[#F4F9F1]">
                        {step.stepNumber}
                      </div>
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#A3B18A]">STEP 0{step.stepNumber}</span>
                      <h3 className={`text-sm font-semibold ${isDone ? 'line-through text-[#8C8C88]' : 'text-[#1A1A1A]'}`}>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#6B6B66] mt-1 leading-relaxed">{step.description}</p>
                    
                    <button 
                      onClick={() => handleExplain(step.id, step.title, step.description)}
                      disabled={explainingStepId === step.id}
                      className="mt-2 text-[10px] uppercase font-bold tracking-widest text-[#A3B18A] hover:text-[#8E9C76] flex items-center gap-1 transition-colors disabled:opacity-50"
                    >
                      <Sparkles className="w-3 h-3" />
                      {explanations[step.id] ? 'AI Explanation' : (explainingStepId === step.id ? 'Explaining...' : 'Explain Step (AI)')}
                    </button>
                    {explanations[step.id] !== undefined && (
                      <div className="mt-2 p-3 bg-[#F4F4F1] border border-[#E5E5E0] text-xs text-[#1A1A1A] leading-relaxed whitespace-pre-wrap">
                        {explanations[step.id]}
                        {explainingStepId === step.id && <span className="animate-pulse ml-1 inline-block w-1.5 h-3 bg-[#A3B18A] align-middle" />}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {step.exactUrl && (
                    <a
                      href={step.exactUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-[#1A1A1A] bg-[#F4F4F1] px-3 py-1.5  border border-[#E5E5E0] hover:bg-white hover:border-[#A3B18A] transition-colors shrink-0"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3 text-[#8C8C88]" />
                    </a>
                  )}
                  <button
                    onClick={() => onToggleBookmark(step.id)}
                    className="p-1.5 hover:bg-[#F4F4F1] transition-colors text-[#8C8C88] hover:text-[#C06C4C]"
                    title="Bookmark Step"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedSteps[step.id] ? 'fill-[#C06C4C] text-[#C06C4C]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Click Path Instructions */}
              {step.clickPath && (
                <div className="p-3 bg-[#F4F4F1]  border border-[#E5E5E0] text-xs space-y-1">
                  <div className="font-bold text-[#1A1A1A] flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#8C8C88]">
                    <MousePointer className="w-3 h-3 text-[#A3B18A]" />
                    <span>Exact Click Path / Menu Navigation:</span>
                  </div>
                  <p className="font-mono text-xs text-[#1A1A1A] leading-relaxed font-medium pl-4">
                    {step.clickPath}
                  </p>
                </div>
              )}

              {/* Code / Prompt Snippet Box */}
              {step.codeSnippet && (
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-[#8C8C88] tracking-widest">
                      {step.codeLanguage || 'code'}
                    </span>
                    <button
                      onClick={() => handleCopyCode(step.id, step.codeSnippet!)}
                      className="flex items-center gap-1 text-[11px] text-[#1A1A1A] font-semibold hover:underline"
                      id={`copy-code-${step.id}`}
                   >
                      {copiedCodeId === step.id ? <Check className="w-3.5 h-3.5 text-[#A3B18A]" /> : <Copy className="w-3.5 h-3.5 text-[#8C8C88]" />}
                      <span>{copiedCodeId === step.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 bg-[#1A1A1A] text-gray-100  text-xs font-mono overflow-x-auto border border-gray-800 leading-relaxed max-h-48">
                    {step.codeSnippet}
                  </pre>
                </div>
              )}

              {/* Interactive Simulator Embed */}
              {step.interactiveType === 'teachable' && <TeachableMachineSimulator />}
              {step.interactiveType === 'lovable' && <LovablePromptBuilder />}

              {/* Tips & Warnings */}
              {step.tip && (
                <div className="p-3 bg-[#FDFDFB]  border border-[#E5E5E0] text-xs text-[#6B6B66] flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#A3B18A] shrink-0 mt-0.5" />
                  <span><b className="text-[#1A1A1A]">Instructor Tip:</b> {step.tip}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Embedded Deep Interactive Tool for Day 5 */}
      {module.id === 'day5' && <N8nWorkflowVisualizer onDownloadWorkflow={onDownloadWorkflow} />}

      {/* Embedded Deep Interactive Tool for Day 6 */}
      {module.id === 'day6' && <PresentationDeckViewer />}

      {/* End of Module Knowledge Check Quiz Banner */}
      {module.quiz && (
        <div className="p-6 bg-[#1A1A1A] text-white  flex flex-col md:flex-row items-center justify-between gap-4 border border-[#E5E5E0] shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#A3B18A]">Knowledge Check Point</span>
            <h4 className="text-base font-light text-white">Day {module.dayNumber} Self Assessment</h4>
            <p className="text-xs text-gray-400">Validate your understanding before proceeding to the next lesson.</p>
          </div>

          <button
            onClick={() => onTakeQuiz(module)}
            className="px-5 py-2.5 bg-[#A3B18A] hover:bg-[#8E9C76] text-white text-xs font-bold uppercase tracking-wider  transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
            id={`take-quiz-btn-day${module.dayNumber}`}
         >
            <HelpCircle className="w-3.5 h-3.5 text-white" />
            <span>Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
