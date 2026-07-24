import React, { useState } from 'react';
import { BootcampModule } from '../types';
import { CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { quizFeedback } from '../lib/openrouter';
import { toast } from 'sonner';
import { SuccessRippleAnimation } from './ui/success-ripple';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MatteDarkButton } from './ui/matte-dark-button';

interface QuizModalProps {
  module: BootcampModule;
  onClose: () => void;
  onCompleteQuiz: (moduleId: string) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ module, onClose, onCompleteQuiz }) => {
  const quiz = module.quiz;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  if (!quiz) return null;

  const handleSubmit = async () => {
    if (selectedIndex === null) {
      toast.error('Please select an answer before submitting.');
      return;
    }
    setSubmitted(true);
    setAiFeedback('');

    if (selectedIndex === quiz.correctIndex) {
      onCompleteQuiz(module.id);
    }

    setIsAiLoading(true);
    try {
      await quizFeedback(
        quiz.question,
        quiz.options[selectedIndex],
        quiz.options[quiz.correctIndex],
        (chunk) => {
          setAiFeedback((prev) => prev + chunk);
        }
      );
    } catch (e: any) {
      console.error(e);
      setAiFeedback('AI Feedback failed: ' + (e.message || String(e)));
    } finally {
      setIsAiLoading(false);
    }
  };

  const isCorrect = selectedIndex === quiz.correctIndex;

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border border-[#E5E5E0] bg-white p-0 shadow-xl relative" showCloseButton={false}>
        {submitted && isCorrect && (
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-50">
            <SuccessRippleAnimation />
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E5E0] px-6 py-4 relative z-10 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1A1A1A] text-[#A3B18A]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            </div>
            <DialogHeader>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C88]">Day {module.dayNumber} Knowledge Check</p>
              <DialogTitle className="font-light text-base text-[#1A1A1A]">{module.title}</DialogTitle>
            </DialogHeader>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#8C8C88] hover:text-[#1A1A1A] p-1"
            id="close-quiz-btn"
          >
            ✕
          </button>
        </div>

        {/* Question */}
        <div className="space-y-4 px-6 py-4 relative z-10 bg-white/80 backdrop-blur-sm">
          <p className="text-sm font-medium text-[#1A1A1A] leading-relaxed">{quiz.question}</p>

          <div className="space-y-2">
            {quiz.options.map((option, idx) => {
              const isSelected = selectedIndex === idx;
              let btnStyle = 'bg-[#F4F4F1] border-[#E5E5E0] text-[#1A1A1A] hover:bg-white hover:border-[#A3B18A]';

              if (submitted) {
                if (idx === quiz.correctIndex) {
                  btnStyle = 'bg-[#F4F9F1] border-[#A3B18A] text-[#1A1A1A] font-bold border-2';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                }
              } else if (isSelected) {
                btnStyle = 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-semibold';
              }

              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full p-3 border text-left text-xs transition-all flex items-center gap-2.5 ${btnStyle}`}
                  id={`quiz-option-${idx}`}
                >
                  <span className="w-5 h-5 border border-current flex items-center justify-center text-[10px] font-mono shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        {submitted && (
          <div
            className={`mx-6 mb-4 p-4 text-xs space-y-1.5 border break-words relative z-10 bg-white/90 backdrop-blur-md ${
              isCorrect ? 'bg-[#F4F9F1]/90 border-[#A3B18A] text-[#1A1A1A]' : 'bg-rose-50/90 border-rose-200 text-rose-900'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 text-sm">
              {isCorrect ? <CheckCircle2 className="w-4 h-4 text-[#A3B18A]" /> : <XCircle className="w-4 h-4 text-rose-600" />}
              <span>{isCorrect ? 'Correct Assessment' : 'Needs Review'}</span>
            </div>
            
            <div className="pt-2 border-t border-current/10">
              <div className="flex items-center gap-1 mb-1 opacity-70">
                <Sparkles className="w-3 h-3" />
                <span className="font-mono text-[10px] uppercase tracking-wider">AI Coach Feedback</span>
              </div>
              <p className="leading-relaxed text-xs whitespace-pre-wrap">
                {aiFeedback || (isAiLoading ? 'Analyzing your answer...' : quiz.explanation)}
                {isAiLoading && <span className="animate-pulse ml-1 inline-block w-1.5 h-3 bg-current align-middle" />}
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 border-t border-[#E5E5E0] px-6 py-4 relative z-10 bg-white">
          {!submitted ? (
            <MatteDarkButton
              onClick={handleSubmit}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider h-auto"
              id="submit-quiz-btn"
            >
              Submit
            </MatteDarkButton>
          ) : (
            <MatteDarkButton
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 h-auto"
              id="continue-after-quiz-btn"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3B18A]" />
            </MatteDarkButton>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
