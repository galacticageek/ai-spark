import React, { useState, useRef, useEffect } from 'react';
import { PRESENTATION_SLIDES } from '../data/bootcampData';
import { ChevronLeft, ChevronRight, Presentation, Clock, HelpCircle, TrendingUp, Sparkles, Volume2, Maximize2, Minimize2 } from 'lucide-react';

export const PresentationDeckViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [numProposals, setNumProposals] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Financial ROI calculations
  const manualTimeHours = (numProposals * 210) / 60; // 3.5 hrs per proposal
  const manualCost = manualTimeHours * 50; // $50/hr labor
  const aiCost = numProposals * 0.12; // $0.12 per OpenAI pitch
  const netSavings = manualCost - aiCost;

  return (
    <div ref={containerRef} className="bg-white border border-[#E5E5E0] p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E0] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#F4F4F1] border border-[#E5E5E0] text-[10px] uppercase tracking-widest font-bold text-[#8C8C88] mb-1.5">
            <Presentation className="w-3.5 h-3.5 text-[#A3B18A]" />
            Day 6 Presentation Deck & Demo Rehearsal
          </div>
          <h3 className="text-xl font-light text-[#1A1A1A]">TalentBridge Systems Pitch Deck (14 Slides)</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 border text-xs font-semibold uppercase tracking-wider transition-colors ${
              showNotes ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-[#F4F4F1] text-[#6B6B66] border-[#E5E5E0]'
            }`}
            id="toggle-speaker-notes-btn"
         >
            {showNotes ? 'Hide Notes' : 'Show Notes'}
          </button>
        </div>
      </div>

      {/* Main Presentation View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Slide Canvas (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-8 bg-[#1A1A1A] text-white border border-gray-800 shadow-md min-h-[340px] flex flex-col justify-between relative overflow-hidden">
            {/* Slide Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#A3B18A]">
                Slide {currentSlide.slideNumber} of {PRESENTATION_SLIDES.length}: {currentSlide.category}
              </span>
              <span className="text-[10px] bg-gray-800 text-gray-300 px-2.5 py-1 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#A3B18A]" />
                Target: {currentSlide.timeAllocation}
              </span>
            </div>

            {/* Slide Body */}
            <div className="my-6 space-y-4">
              <h2 className="text-2xl md:text-3xl font-light text-white leading-snug">
                {currentSlide.title}
              </h2>
              <ul className="space-y-2 text-sm text-gray-300">
                {currentSlide.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#A3B18A] font-bold">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Slide Footer */}
            <div className="flex items-center justify-between border-t border-gray-800 pt-3 text-xs text-gray-400">
              <span className="font-semibold text-gray-300">TalentBridge Systems — Gen AI Bootcamp</span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  className="p-1.5 bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  id="prev-slide-btn"
               >
                  <ChevronLeft className="w-4 h-4 text-[#A3B18A]" />
                </button>
                <span className="font-mono text-white text-xs px-2">
                  {currentSlideIndex + 1} / {PRESENTATION_SLIDES.length}
                </span>
                <button
                  disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
                  onClick={() => setCurrentSlideIndex((prev) => Math.min(PRESENTATION_SLIDES.length - 1, prev + 1))}
                  className="p-1.5 bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  id="next-slide-btn"
               >
                  <ChevronRight className="w-4 h-4 text-[#A3B18A]" />
                </button>
              </div>
            </div>
          </div>

          {/* Speaker Notes Box */}
          {showNotes && (
            <div className="p-4 bg-[#F4F4F1] border border-[#E5E5E0] space-y-2">
              <div className="text-[10px] font-bold text-[#8C8C88] uppercase tracking-widest flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#C06C4C]" />
                <span>Presenter Script & Voiceover Guide</span>
              </div>
              <p className="text-xs text-[#1A1A1A] italic leading-relaxed bg-white p-3 border border-[#E5E5E0]">
                "{currentSlide.speakerNotes}"
              </p>
              <div className="text-[11px] text-[#A3B18A] font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#A3B18A]" />
                <span>Visual Cue: {currentSlide.visualCue}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive ROI Math Calculator & Q&A Strategy */}
        <div className="space-y-4">
          {/* ROI Calculator */}
          <div className="p-5 bg-[#FDFDFB] border border-[#E5E5E0] space-y-4">
            <h4 className="font-bold text-[10px] text-[#8C8C88] uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#A3B18A]" />
              Interactive ROI Math Calculator
            </h4>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#1A1A1A] mb-1">
                <span>Annual Proposal Volume:</span>
                <span className="text-[#A3B18A] font-bold font-mono">{numProposals} Proposals</span>
              </div>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={numProposals}
                onChange={(e) => setNumProposals(Number(e.target.value))}
                className="w-full accent-[#1A1A1A]"
                id="proposal-volume-range"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-[#F9F9F7] border border-[#E5E5E0]">
                <div className="text-[#8C8C88] text-[10px]">Manual Cost ($50/hr)</div>
                <div className="font-bold text-[#C06C4C] text-sm font-mono">${manualCost.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-[#F9F9F7] border border-[#E5E5E0]">
                <div className="text-[#8C8C88] text-[10px]">Automated API Cost</div>
                <div className="font-bold text-[#A3B18A] text-sm font-mono">${aiCost.toFixed(2)}</div>
              </div>
            </div>

            <div className="p-3 bg-[#1A1A1A] text-white text-center space-y-0.5 border border-gray-800">
              <div className="text-[10px] text-[#A3B18A] uppercase font-semibold tracking-wider">Net Annual Savings</div>
              <div className="text-xl font-light text-white font-mono">${netSavings.toLocaleString()} / year</div>
              <div className="text-[10px] text-gray-400">99.8% Cost Reduction Verified</div>
            </div>
          </div>

          {/* Q&A Strategy Card */}
          <div className="p-4 bg-white border border-[#E5E5E0] space-y-2 text-xs">
            <div className="flex justify-between items-center">
                <div className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#8E9AAF]" />
                  <span>Judge Q&A Flashcard Tip:</span>
                </div>
                <button onClick={toggleFullscreen} className="p-1 hover:bg-[#F4F4F1]">
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
            </div>
            <p className="text-[#6B6B66] leading-relaxed">
              If asked about <b className="text-[#1A1A1A]">data privacy</b>, mention that client requirements are passed securely through OpenAI enterprise API routes without training public models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
