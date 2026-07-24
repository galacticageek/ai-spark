import React, { useState } from 'react';
import { Camera, Sparkles, CheckCircle2, Play, RefreshCw, Upload, FileText, Cpu } from 'lucide-react';

export const TeachableMachineSimulator: React.FC = () => {
  const [class1Samples, setClass1Samples] = useState<number>(32);
  const [class2Samples, setClass2Samples] = useState<number>(28);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingProgress, setTrainingProgress] = useState<number>(0);
  const [isTrained, setIsTrained] = useState<boolean>(false);

  const [activeGesture, setActiveGesture] = useState<'confident' | 'nervous'>('confident');
  const [gptPrompt, setGptPrompt] = useState<string>(
    'You are a soft skills coach. Analyze client requirements and suggest 3 tailored training modules.'
  );
  const [uploadedFile, setUploadedFile] = useState<string | null>('Soft_Skills_Framework_2026.pdf');

  const handleTrain = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setIsTrained(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setTrainingProgress(current);
      if (current>= 100) {
        clearInterval(interval);
        setIsTraining(false);
        setIsTrained(true);
      }
    }, 150);
  };

  return (
    <div className="bg-white  border border-[#E5E5E0] p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[10px] uppercase tracking-widest font-bold text-[#8C8C88] mb-1.5">
            <Cpu className="w-3 h-3 text-[#A3B18A]" />
            Interactive Day 3 Playground
          </div>
          <h3 className="text-xl font-light text-[#1A1A1A]">Teachable Machine & Custom GPT Simulator</h3>
        </div>
        <div className="text-xs text-[#8C8C88] bg-[#F4F4F1] px-3 py-1.5  border border-[#E5E5E0] font-mono">
          No Camera Required • Web ML Sandbox
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teachable Machine Side */}
        <div className="p-5  bg-[#FDFDFB] border border-[#E5E5E0] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-light text-sm text-[#1A1A1A] flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#C06C4C]" />
              Image Classifier (Soft Skills Gestures)
            </h4>
            <span className="text-[10px] text-[#A3B18A] font-mono uppercase tracking-wider">TensorFlow.js</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Class 1 */}
            <div className="p-3 bg-white  border border-[#E5E5E0]">
              <div className="text-xs font-semibold text-[#1A1A1A] mb-1">Class 1: Confident</div>
              <div className="text-xs text-[#8C8C88] mb-2 font-mono">{class1Samples} Samples</div>
              <button
                onClick={() => setClass1Samples((prev) => prev + 5)}
                className="w-full py-1.5 px-3 bg-[#F4F4F1] hover:bg-[#E5E5E0] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider  border border-[#E5E5E0] transition-colors flex items-center justify-center gap-1"
                id="add-class1-btn"
             >
                +5
              </button>
            </div>

            {/* Class 2 */}
            <div className="p-3 bg-white  border border-[#E5E5E0]">
              <div className="text-xs font-semibold text-[#1A1A1A] mb-1">Class 2: Nervous</div>
              <div className="text-xs text-[#8C8C88] mb-2 font-mono">{class2Samples} Samples</div>
              <button
                onClick={() => setClass2Samples((prev) => prev + 5)}
                className="w-full py-1.5 px-3 bg-[#F4F4F1] hover:bg-[#E5E5E0] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider  border border-[#E5E5E0] transition-colors flex items-center justify-center gap-1"
                id="add-class2-btn"
             >
                +5
              </button>
            </div>
          </div>

          {/* Train Button & Progress */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleTrain}
              disabled={isTraining}
              className="w-full py-2.5 px-4 bg-[#1A1A1A] hover:bg-black text-white font-semibold text-xs uppercase tracking-wider  transition-colors shadow-xs flex items-center justify-center gap-2"
              id="train-model-btn"
           >
              {isTraining ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#A3B18A]" /> : <Play className="w-3.5 h-3.5 text-[#A3B18A]" />}
              {isTraining ? `Training (${trainingProgress}%)` : 'Train Model'}
            </button>

            {isTraining && (
              <div className="w-full bg-[#F4F4F1] h-1.5  overflow-hidden border border-[#E5E5E0]">
                <div
                  className="bg-[#A3B18A] h-full transition-all duration-150"
                  style={{ width: `${trainingProgress}%` }}
               ></div>
              </div>
            )}
          </div>

          {/* Inference Output Bar */}
          {isTrained && (
            <div className="p-4 bg-white  border border-[#E5E5E0] space-y-3">
              <div className="text-xs font-bold text-[#1A1A1A] flex items-center justify-between">
                <span>Gesture Classification Output</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveGesture('confident')}
                    className={`px-2 py-0.5 text-[10px]  font-mono font-semibold uppercase tracking-wider ${
                      activeGesture === 'confident'
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-[#F4F4F1] text-[#6B6B66] border border-[#E5E5E0]'
                    }`}
                 >
                    Confident
                  </button>
                  <button
                    onClick={() => setActiveGesture('nervous')}
                    className={`px-2 py-0.5 text-[10px]  font-mono font-semibold uppercase tracking-wider ${
                      activeGesture === 'nervous'
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-[#F4F4F1] text-[#6B6B66] border border-[#E5E5E0]'
                    }`}
                 >
                    Nervous
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-[#1A1A1A]">
                  <span>Confident Pose:</span>
                  <span className="font-bold text-[#A3B18A]">{activeGesture === 'confident' ? '98.4%' : '3.1%'}</span>
                </div>
                <div className="w-full bg-[#F4F4F1] h-1.5  overflow-hidden">
                  <div
                    className="bg-[#A3B18A] h-full transition-all"
                    style={{ width: activeGesture === 'confident' ? '98.4%' : '3.1%' }}
                 ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-[#1A1A1A]">
                  <span>Nervous Pose:</span>
                  <span className="font-bold text-[#C06C4C]">{activeGesture === 'nervous' ? '96.9%' : '1.6%'}</span>
                </div>
                <div className="w-full bg-[#F4F4F1] h-1.5  overflow-hidden">
                  <div
                    className="bg-[#C06C4C] h-full transition-all"
                    style={{ width: activeGesture === 'nervous' ? '96.9%' : '1.6%' }}
                 ></div>
                </div>
              </div>

              <div className="text-[11px] text-[#8C8C88] flex items-center gap-1 font-mono pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A3B18A]" />
                <span className="truncate">Model: teachablemachine.withgoogle.com/models/A1B2C3D4/</span>
              </div>
            </div>
          )}
        </div>

        {/* Custom GPT Builder Side */}
        <div className="p-5  bg-[#FDFDFB] border border-[#E5E5E0] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-light text-sm text-[#1A1A1A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A3B18A]" />
              Custom GPT Soft Skills Coach Configurator
            </h4>
            <span className="text-[10px] text-[#8C8C88] font-mono uppercase tracking-wider">ChatGPT Editor</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">System Instructions Prompt</label>
            <textarea
              rows={3}
              value={gptPrompt}
              onChange={(e) => setGptPrompt(e.target.value)}
              className="w-full p-3  bg-white border border-[#E5E5E0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#A3B18A] font-mono shadow-xs"
              id="custom-gpt-instructions-input"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">Knowledge Files Uploaded</label>
            {uploadedFile ? (
              <div className="flex items-center justify-between p-3 bg-white  border border-[#E5E5E0] text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C06C4C]" />
                  <span className="font-semibold text-[#1A1A1A] font-mono">{uploadedFile}</span>
                  <span className="text-[9px] bg-[#F4F4F1] text-[#A3B18A] border border-[#E5E5E0] px-2 py-0.5  font-mono uppercase tracking-wider">
                    Knowledge RAG
                  </span>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-xs text-[#C06C4C] hover:underline"
               >
                  Remove
                </button>
              </div>
            ) : (
              <button
                onClick={() => setUploadedFile('Soft_Skills_Framework_2026.pdf')}
                className="w-full py-3 border border-dashed border-[#E5E5E0] hover:border-[#A3B18A]  text-xs text-[#8C8C88] hover:text-[#1A1A1A] flex items-center justify-center gap-2 transition-colors bg-white font-mono"
                id="upload-knowledge-btn"
             >
                <Upload className="w-3.5 h-3.5 text-[#A3B18A]" />
                Upload PDF
              </button>
            )}
          </div>

          <div className="p-3 bg-[#F4F4F1] border border-[#E5E5E0]  text-xs text-[#1A1A1A] space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#A3B18A]" />
              Custom GPT Public Link Active:
            </div>
            <div className="font-mono text-[11px] text-[#6B6B66] truncate">
              https://chatgpt.com/g/g-talentbridge-softskills-coach
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
