import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Zap,
  Globe,
  CheckCircle2,
  Download,
  Terminal,
  Presentation,
  ShieldCheck,
  TrendingUp,
  Workflow,
  BookOpen,
  ChevronRight,
  Layers,
  Coffee
} from 'lucide-react';
import { DayId } from '../types';
import { BlurFade } from "@/components/ui/blur-fade";
import { GridPattern } from "@/components/ui/grid-pattern";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { DayNightSky } from "@/components/ui/day-night-sky";
import { HeroHeader } from './HeroHeader';
import { MiniDashboard } from './MiniDashboard';
import { LogoCloud } from './LogoCloud';


interface LandingPageProps {
  onEnterWorkspace: (targetTab?: DayId | 'hub' | 'presentation' | 'playground' | 'talentbridge') => void;
  onOpenCheatSheet: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterWorkspace, onOpenCheatSheet }) => {
  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white flex flex-col">
      {/* Navigation Bar */}
      <HeroHeader onEnterWorkspace={onEnterWorkspace} onOpenCheatSheet={onOpenCheatSheet} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 border-b border-[#E5E5E0] bg-[#FDFDFB] overflow-hidden">
        <DayNightSky className="absolute inset-0 z-0 w-full h-full opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 z-0"></div>
        <div aria-hidden className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#A3B18A]/10 to-transparent z-0"></div>
        
        <div className="relative max-w-6xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8">
              <BlurFade delay={0.1} inView>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F4F1] border border-[#E5E5E0] text-[#A3B18A] text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-[#A3B18A]" />
                  <span>Gen AI Curriculum Hub</span>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight leading-[1.15]">
                  Master Generative AI & <br className="hidden md:block" />
                  <TypingAnimation 
                    className="font-semibold text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl inline-block mt-2" 
                    duration={50}
                  >
                    Autonomous Pipelines
                  </TypingAnimation>
                </h1>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <p className="text-base md:text-lg text-[#6B6B66] leading-relaxed font-normal">
                  Step-by-step interactive guidance for building Custom GPTs, automated lead pipelines, and AI pitch generation.
                </p>
              </BlurFade>

              <BlurFade delay={0.4} inView>
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => onEnterWorkspace('day3')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A1A1A]"
                    id="landing-hero-start-btn"
                    aria-label="Start Building workspace"
                  >
                    <span>Start Building</span>
                    <ArrowRight className="w-4 h-4 text-[#A3B18A]" />
                  </button>

                  <button
                    onClick={() => onEnterWorkspace('talentbridge')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-[#E5E5E0] hover:border-[#A3B18A] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A3B18A]"
                    id="landing-hero-talentbridge-btn"
                    aria-label="View TalentBridge demo"
                  >
                    <Workflow className="w-4 h-4 text-[#A3B18A]" />
                    <span>View Demo</span>
                  </button>
                </div>
              </BlurFade>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#A3B18A]/20 to-transparent blur-3xl rounded-full opacity-50 -z-10 transform translate-x-4 translate-y-4"></div>
              <BlurFade delay={0.5} inView>
                <MiniDashboard />
              </BlurFade>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <BlurFade delay={0.6} inView>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 text-left">
              <div className="p-5 bg-[#F4F4F1] border border-[#E5E5E0] rounded-[1rem]">
                <div className="text-2xl font-light text-[#1A1A1A] font-mono">$42,000+</div>
                <div className="text-[11px] text-[#8C8C88] font-medium uppercase tracking-wider mt-1">Annual Cost Savings</div>
              </div>

              <div className="p-5 bg-[#F4F4F1] border border-[#E5E5E0] rounded-[1rem]">
                <div className="text-2xl font-light text-[#1A1A1A] font-mono">99.8%</div>
                <div className="text-[11px] text-[#8C8C88] font-medium uppercase tracking-wider mt-1">Speed Boost (0.8s vs 30m)</div>
              </div>

              <div className="p-5 bg-[#F4F4F1] border border-[#E5E5E0] rounded-[1rem]">
                <div className="text-2xl font-light text-[#1A1A1A] font-mono">6 Modules</div>
                <div className="text-[11px] text-[#8C8C88] font-medium uppercase tracking-wider mt-1">Hands-On Curriculum</div>
              </div>

              <div className="p-5 bg-white/80 backdrop-blur-sm border border-[#E5E5E0] rounded-[1rem] shadow-sm">
                <div className="text-2xl font-light text-[#1A1A1A] font-mono">100% Free</div>
                <div className="text-[11px] text-[#8C8C88] font-medium uppercase tracking-wider mt-1">Zero Paid APIs Required</div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <LogoCloud />

      {/* Featured Showcase Section - TalentBridge #13 */}
      <section className="py-16 px-4 md:px-8 border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C88] mb-1">
                Featured Blueprint
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-[#1A1A1A]">
                TalentBridge Systems Project #13 Enterprise Workflow
              </h2>
              <p className="text-xs text-[#6B6B66] mt-1">
                End-to-end automated lead intake, AI pitch generation, Google Sheets logging, and Slack alerts.
              </p>
            </div>

            <button
              onClick={() => onEnterWorkspace('talentbridge')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A1A1A]"
              id="landing-view-pipeline-link"
              aria-label="Explore TalentBridge Pipeline"
           >
              <span>Explore Pipeline</span>
              <ChevronRight className="w-4 h-4 text-[#A3B18A]" />
            </button>
          </div>

          <div className="p-6 bg-white  border border-[#E5E5E0] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="p-3.5  bg-[#F4F4F1] border border-[#E5E5E0] space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#8C8C88] uppercase">Node 1 • Webhook</div>
                <div className="text-xs font-semibold text-[#1A1A1A]">POST Intake Endpoint</div>
                <div className="text-[10px] text-[#6B6B66]">Receives JSON from Lovable form</div>
              </div>

              <div className="p-3.5  bg-[#F4F4F1] border border-[#E5E5E0] space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#8C8C88] uppercase">Node 2 • OpenAI</div>
                <div className="text-xs font-semibold text-[#1A1A1A]">GPT Pitch Drafter</div>
                <div className="text-[10px] text-[#6B6B66]">Creates tailored proposal</div>
              </div>

              <div className="p-3.5  bg-[#F4F4F1] border border-[#E5E5E0] space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#8C8C88] uppercase">Node 3 • Gmail</div>
                <div className="text-xs font-semibold text-[#1A1A1A]">Email Dispatcher</div>
                <div className="text-[10px] text-[#6B6B66]">Sends draft directly to client</div>
              </div>

              <div className="p-3.5  bg-[#F4F4F1] border border-[#E5E5E0] space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#8C8C88] uppercase">Node 4 • Google Sheets</div>
                <div className="text-xs font-semibold text-[#1A1A1A]">Row Appender</div>
                <div className="text-[10px] text-[#6B6B66]">Logs client name, budget & status</div>
              </div>

              <div className="p-3.5  bg-[#F4F4F1] border border-[#E5E5E0] space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#8C8C88] uppercase">Node 5 • Slack</div>
                <div className="text-xs font-semibold text-[#1A1A1A]">Team Alert</div>
                <div className="text-[10px] text-[#6B6B66]">Notifies #leads-talentbridge</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#F4F4F1]  border border-[#E5E5E0]">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-[#A3B18A] shrink-0" />
                <p className="text-xs text-[#6B6B66] leading-relaxed">
                  Includes full importable n8n JSON workflow file, step-by-step setup guide, and built-in webhook simulator sandbox.
                </p>
              </div>
              <button
                onClick={() => onEnterWorkspace('playground')}
                className="w-full sm:w-auto px-4 py-2  bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A1A1A]"
                id="landing-try-simulator-btn"
                aria-label="Test Webhook Simulator"
             >
                Test Webhook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Curriculum Modules Grid */}
      <section className="py-16 px-4 md:px-8 border-b border-[#E5E5E0] bg-[#FDFDFB]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C88] mb-1">
              Curriculum Overview
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-[#1A1A1A]">
              Interactive Bootcamp Days & Workspaces
            </h2>
            <p className="text-xs text-[#6B6B66] mt-1">
              Select any module below to launch directly into the step-by-step guides and embedded simulators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Day 3 */}
            <div
              onClick={() => onEnterWorkspace('day3')}
              className="p-6  bg-[#FDFDFB] border border-[#E5E5E0] hover:border-[#A3B18A] transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              id="card-landing-day3"
           >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-2 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[#A3B18A]">
                    Day 3
                  </span>
                  <Bot className="w-4 h-4 text-[#8C8C88] group-hover:text-[#A3B18A] transition-colors" />
                </div>
                <h3 className="font-semibold text-base text-[#1A1A1A]">Teachable Machine & Custom GPTs</h3>
                <p className="text-xs text-[#6B6B66] leading-relaxed">
                  Train gesture recognition models in browser and configure soft skills coaching GPTs.
                </p>
              </div>
              <div className="pt-2 border-t border-[#E5E5E0] flex items-center justify-between text-xs text-[#1A1A1A] font-medium group-hover:text-[#A3B18A]">
                <span>Launch Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Day 4 */}
            <div
              onClick={() => onEnterWorkspace('day4')}
              className="p-6  bg-[#FDFDFB] border border-[#E5E5E0] hover:border-[#A3B18A] transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              id="card-landing-day4"
           >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-2 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[#A3B18A]">
                    Day 4
                  </span>
                  <Globe className="w-4 h-4 text-[#8C8C88] group-hover:text-[#A3B18A] transition-colors" />
                </div>
                <h3 className="font-semibold text-base text-[#1A1A1A]">Lovable Webforms & Webhooks</h3>
                <p className="text-xs text-[#6B6B66] leading-relaxed">
                  Generate no-code frontend webforms targeting n8n webhook triggers with instant feedback.
                </p>
              </div>
              <div className="pt-2 border-t border-[#E5E5E0] flex items-center justify-between text-xs text-[#1A1A1A] font-medium group-hover:text-[#A3B18A]">
                <span>Launch Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Day 5 */}
            <div
              onClick={() => onEnterWorkspace('day5')}
              className="p-6  bg-[#FDFDFB] border border-[#E5E5E0] hover:border-[#A3B18A] transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              id="card-landing-day5"
           >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-2 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[#A3B18A]">
                    Day 5
                  </span>
                  <Zap className="w-4 h-4 text-[#8C8C88] group-hover:text-[#A3B18A] transition-colors" />
                </div>
                <h3 className="font-semibold text-base text-[#1A1A1A]">n8n Automation & Pitch Engine</h3>
                <p className="text-xs text-[#6B6B66] leading-relaxed">
                  Build complete multi-node pipelines connecting OpenAI, Sheets, and Gmail for instant lead processing.
                </p>
              </div>
              <div className="pt-2 border-t border-[#E5E5E0] flex items-center justify-between text-xs text-[#1A1A1A] font-medium group-hover:text-[#A3B18A]">
                <span>Launch Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Day 6 */}
            <div
              onClick={() => onEnterWorkspace('day6')}
              className="p-6  bg-[#FDFDFB] border border-[#E5E5E0] hover:border-[#A3B18A] transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              id="card-landing-day6"
           >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-2 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[#A3B18A]">
                    Day 6
                  </span>
                  <Presentation className="w-4 h-4 text-[#8C8C88] group-hover:text-[#A3B18A] transition-colors" />
                </div>
                <h3 className="font-semibold text-base text-[#1A1A1A]">Pitch Deck & ROI Rehearsal</h3>
                <p className="text-xs text-[#6B6B66] leading-relaxed">
                  Interactive 14-slide pitch deck viewer with speaker scripts, visual cues, and ROI math calculator.
                </p>
              </div>
              <div className="pt-2 border-t border-[#E5E5E0] flex items-center justify-between text-xs text-[#1A1A1A] font-medium group-hover:text-[#A3B18A]">
                <span>Launch Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features & Tools */}
      <section className="py-16 px-4 md:px-8 border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-[#1A1A1A]">
              Built for Bootcamp Excellence
            </h2>
            <p className="text-xs text-[#6B6B66]">
              Everything you need to complete, present, and deploy TalentBridge enterprise automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5  bg-white border border-[#E5E5E0] space-y-3">
              <div className="p-2  bg-[#F4F4F1] border border-[#E5E5E0] w-fit">
                <Terminal className="w-4 h-4 text-[#A3B18A]" />
              </div>
              <h4 className="font-medium text-sm text-[#1A1A1A]">Interactive Webhook Simulator</h4>
              <p className="text-xs text-[#6B6B66] leading-relaxed">
                Test JSON payloads directly inside the app without configuring external webhook tunnels or postman servers.
              </p>
            </div>

            <div className="p-5  bg-white border border-[#E5E5E0] space-y-3">
              <div className="p-2  bg-[#F4F4F1] border border-[#E5E5E0] w-fit">
                <BookOpen className="w-4 h-4 text-[#A3B18A]" />
              </div>
              <h4 className="font-medium text-sm text-[#1A1A1A]">Student & Instructor Guides</h4>
              <p className="text-xs text-[#6B6B66] leading-relaxed">
                Access curated cheat sheets, key terms, troubleshooting guides, and teaching methodologies in seconds.
              </p>
            </div>

            <div className="p-5  bg-white border border-[#E5E5E0] space-y-3">
              <div className="p-2  bg-[#F4F4F1] border border-[#E5E5E0] w-fit">
                <Download className="w-4 h-4 text-[#A3B18A]" />
              </div>
              <h4 className="font-medium text-sm text-[#1A1A1A]">Toolkit Download Hub</h4>
              <p className="text-xs text-[#6B6B66] leading-relaxed">
                Download ready-to-import n8n workflow JSON files, markdown setups, Lovable prompts, and deck decks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Section */}
      <section className="py-16 px-4 md:px-8 bg-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5  bg-gray-800 border border-gray-700 text-[#A3B18A] text-[10px] uppercase tracking-widest font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A3B18A]" />
            Ready for Demo Day
          </div>

          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Start Exploring the Interactive Workspace Now
          </h2>

          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Follow the step-by-step guides, track your completion progress, and run live automation simulations.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onEnterWorkspace('day3')}
              className="px-8 py-3.5  bg-white hover:bg-gray-100 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              id="landing-bottom-cta-btn"
              aria-label="Launch Workspace from bottom"
           >
              <span>Launch Workspace</span>
              <ArrowRight className="w-4 h-4 text-[#A3B18A]" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E0] bg-[#F9F9F7] py-8 px-4 md:px-8 text-center text-xs text-[#8C8C88]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">AI-Spark</span>
            <span>• Gen AI Bootcamp & TalentBridge Systems</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCheatSheet}
              className="hover:text-[#1A1A1A] underline"
           >
              Cheat Sheet
            </button>
            <button
              onClick={() => onEnterWorkspace('hub')}
              className="hover:text-[#1A1A1A] underline"
           >
              Download Hub
            </button>
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-1 text-[#8C8C88] text-[10px] uppercase tracking-wider">
          <span>fueled by code &</span>
          <Coffee className="w-3.5 h-3.5 mx-0.5 text-[#C06C4C]" />
          <span>by Oliver Oinam</span>
        </div>
      </footer>
    </div>
  );
};
