import React, { useState } from 'react';
import { Send, CheckCircle2, RefreshCw, Mail, Table, Sparkles, Terminal, Copy, Check, Bell } from 'lucide-react';
import { TestPayload } from '../types';
import { generatePitch } from '../lib/openrouter';

export const ApiTestPlayground: React.FC = () => {
  const [payload, setPayload] = useState<TestPayload>({
    clientName: 'Tomba Laisram',
    company: 'TechFlow India',
    email: 'tomba.laisram@techflow.io',
    requirements: 'Need to train engineering managers on soft skills and empathetic communication before they interface with US clients next quarter.',
    budgetRange: '$5,000 - $10,000 USD'
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [generatedPitchText, setGeneratedPitchText] = useState<string>('');

  const handleExecuteTest = async () => {
    setIsLoading(true);
    setHasExecuted(true);
    setGeneratedPitchText('');

    try {
      await generatePitch(payload, (chunk) => {
        setGeneratedPitchText((prev) => prev + chunk);
      });
    } catch (e: any) {
      console.error(e);
      setGeneratedPitchText('Error generating pitch: ' + (e.message || String(e)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white  border border-[#E5E5E0] p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[10px] font-bold uppercase tracking-widest text-[#8C8C88] mb-1.5">
            <Terminal className="w-3 h-3 text-[#A3B18A]" />
            Interactive Webhook & Postman Simulator
          </div>
          <h3 className="text-xl font-light text-[#1A1A1A]">Test Pipeline Payload & Execution Outputs</h3>
        </div>
        <div className="text-xs text-[#8C8C88] bg-[#F4F4F1] px-3 py-1.5  border border-[#E5E5E0] font-mono">
          Real-Time Sandbox • No External Server Required
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Payload Input Form */}
        <div className="space-y-4">
          <div className="p-4 bg-[#FDFDFB]  border border-[#E5E5E0] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#8C8C88] uppercase tracking-widest">
                POST Payload JSON Body Parameters
              </span>
              <button
                onClick={handleCopyPayload}
                className="flex items-center gap-1 text-[11px] text-[#1A1A1A] font-semibold hover:underline"
                id="copy-payload-json-btn"
             >
                {copied ? <Check className="w-3 h-3 text-[#A3B18A]" /> : <Copy className="w-3 h-3 text-[#8C8C88]" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-[#1A1A1A] mb-1">clientName</label>
                <input
                  type="text"
                  value={payload.clientName}
                  onChange={(e) => setPayload({ ...payload, clientName: e.target.value })}
                  className="w-full p-2  bg-[#F9F9F7] border border-[#E5E5E0] focus:outline-none focus:ring-1 focus:ring-[#A3B18A] focus:border-[#A3B18A] text-[#1A1A1A]"
                  id="test-clientname-input"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A1A] mb-1">company</label>
                <input
                  type="text"
                  value={payload.company}
                  onChange={(e) => setPayload({ ...payload, company: e.target.value })}
                  className="w-full p-2  bg-[#F9F9F7] border border-[#E5E5E0] focus:outline-none focus:ring-1 focus:ring-[#A3B18A] focus:border-[#A3B18A] text-[#1A1A1A]"
                  id="test-company-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-[#1A1A1A] mb-1">email</label>
                <input
                  type="text"
                  value={payload.email}
                  onChange={(e) => setPayload({ ...payload, email: e.target.value })}
                  className="w-full p-2  bg-[#F9F9F7] border border-[#E5E5E0] focus:outline-none focus:ring-1 focus:ring-[#A3B18A] focus:border-[#A3B18A] text-[#1A1A1A]"
                  id="test-email-input"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A1A] mb-1">budgetRange</label>
                <select
                  value={payload.budgetRange}
                  onChange={(e) => setPayload({ ...payload, budgetRange: e.target.value })}
                  className="w-full p-2  bg-[#F9F9F7] border border-[#E5E5E0] focus:outline-none focus:ring-1 focus:ring-[#A3B18A] focus:border-[#A3B18A] text-[#1A1A1A]"
                  id="test-budget-select"
               >
                  <option>$5,000 - $10,000</option>
                  <option>$10,000 - $25,000</option>
                  <option>$25,000 - $50,000</option>
                  <option>$50,000+</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-medium text-[#1A1A1A] mb-1">requirements</label>
              <textarea
                rows={3}
                value={payload.requirements}
                onChange={(e) => setPayload({ ...payload, requirements: e.target.value })}
                className="w-full p-2  bg-[#F9F9F7] border border-[#E5E5E0] focus:outline-none focus:ring-1 focus:ring-[#A3B18A] focus:border-[#A3B18A] text-[#1A1A1A]"
                id="test-requirements-input"
              />
            </div>

            <button
              onClick={handleExecuteTest}
              disabled={isLoading}
              className="w-full py-2.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider  shadow-xs transition-colors flex items-center justify-center gap-2"
              id="send-test-payload-btn"
           >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin text-[#A3B18A]" /> : <Send className="w-4 h-4 text-[#A3B18A]" />}
              {isLoading ? 'Executing (0.8s)' : 'Send'}
            </button>
          </div>
        </div>

        {/* Right Side: Simulated Execution Outputs */}
        <div className="space-y-4">
          {!hasExecuted && (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-[#F4F4F1]  border border-dashed border-[#E5E5E0] text-center text-[#8C8C88]">
              <Terminal className="w-8 h-8 mb-2 text-[#8C8C88]" />
              <p className="text-xs font-medium">Click "Send Webhook POST Payload" to trigger live execution simulation.</p>
            </div>
          )}

          {hasExecuted && (
            <div className="space-y-4">
              {/* Output 1: Gmail Pitch Draft */}
              <div className="p-4 bg-[#FDFDFB] border border-[#E5E5E0] border-t-2 border-t-[#A3B18A] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#1A1A1A] font-bold border-b border-[#E5E5E0] pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-[#A3B18A]" />
                    Output 1: Sent Gmail Proposal
                  </span>
                  <span className="text-[10px] bg-[#F4F4F1] text-[#A3B18A] px-2 py-0.5  border border-[#E5E5E0] font-mono font-bold">
                    To: {payload.email}
                  </span>
                </div>
                <div className="p-3 bg-[#F9F9F7]  text-xs font-mono text-[#1A1A1A] border border-[#E5E5E0] whitespace-pre-line max-h-40 overflow-y-auto leading-relaxed">
                  {generatedPitchText}
                </div>
              </div>

              {/* Output 2: Google Sheets Row */}
              <div className="p-4 bg-[#FDFDFB] border border-[#E5E5E0] border-t-2 border-t-[#8E9AAF] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#1A1A1A] font-bold border-b border-[#E5E5E0] pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-[#8E9AAF]" />
                    Output 2: Google Sheets Row Appended
                  </span>
                  <span className="text-[10px] bg-[#F4F4F1] text-[#8E9AAF] px-2 py-0.5  border border-[#E5E5E0] font-mono font-bold">
                    200 OK
                  </span>
                </div>
                <div className="p-2.5 bg-[#F9F9F7]  text-xs font-mono text-[#1A1A1A] border border-[#E5E5E0] overflow-x-auto flex items-center justify-between">
                  <span>Timestamp: {new Date().toLocaleTimeString()}</span>
                  <span className="font-bold">{payload.clientName}</span>
                  <span>{payload.company}</span>
                  <span className="text-[#A3B18A] font-bold">PitchSent: Yes</span>
                </div>
              </div>

              {/* Output 3: Slack Alert */}
              <div className="p-4 bg-[#FDFDFB] border border-[#E5E5E0] border-t-2 border-t-[#C06C4C] space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-[#1A1A1A]">
                  <span className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#C06C4C]" />
                    Output 3: Slack Channel Notification (#leads-talentbridge)
                  </span>
                  <span className="text-[10px] text-[#C06C4C] font-mono uppercase tracking-wider">Alerted</span>
                </div>
                <p className="text-[#6B6B66] leading-relaxed">
                  <b className="text-[#1A1A1A]">New Lead Ingested:</b> {payload.clientName} ({payload.company}) - Budget: {payload.budgetRange}. Pitch proposal generated & dispatched via automation pipeline.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
