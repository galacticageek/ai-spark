import React, { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, Globe, Layout, Send } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export const LovablePromptBuilder: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('TalentBridge Systems');
  const [webhookUrl, setWebhookUrl] = useState<string>('https://your-n8n-instance.n8n.cloud/webhook/client-requirements');
  const [accentColor, setAccentColor] = useState<string>('#2D3B32');

  const settingsItems = useLiveQuery(() => db.settings.toArray());

  useEffect(() => {
    if (settingsItems) {
      const company = settingsItems.find((s) => s.key === 'companyName');
      if (company) setCompanyName(company.value);

      const webhook = settingsItems.find((s) => s.key === 'webhookUrl');
      if (webhook) setWebhookUrl(webhook.value);
    }
  }, [settingsItems]);

  const updateSetting = async (key: string, value: string) => {
    if (key === 'companyName') setCompanyName(value);
    if (key === 'webhookUrl') setWebhookUrl(value);
    await db.settings.put({ key, value });
  };

  const generatedPrompt = `Create a modern, minimalistic Nordic Lagom styled client intake landing page for "${companyName}" — a high-performance soft skills consulting agency.

Design & Layout:
- Background: Clean warm off-white (#F9F8F6)
- Card container: Pure white (#FFFFFF) with  corners (16px) and subtle border (#EFECE6)
- Primary Accent: Nordic Pine (${accentColor})

Form Fields Required:
1. Client Full Name (Text, Required) -> ID: clientName
2. Company Name (Text, Required) -> ID: company
3. Work Email Address (Email, Required) -> ID: email
4. Soft Skills & Training Requirements (Textarea, 4 rows, Required) -> ID: requirements
   Placeholder: "e.g., Our engineering managers need active listening and conflict management workshops..."
5. Estimated Budget Range (Dropdown) -> ID: budgetRange
   Options: ["$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "$50,000+"]

Functionality:
- On submit, POST raw JSON payload to webhook endpoint: "${webhookUrl}".
- Show loading state button: "Drafting AI Proposal...".
- Display toast on success: "Proposal request sent! Check your inbox in 30 seconds."`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white  border border-[#E5E5E0] p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[10px] uppercase tracking-widest font-bold text-[#8C8C88] mb-1.5">
            <Globe className="w-3 h-3 text-[#A3B18A]" />
            Interactive Day 4 Lovable Generator
          </div>
          <h3 className="text-xl font-light text-[#1A1A1A]">Lovable Prompt & Webform Generator</h3>
        </div>
        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-[#1A1A1A] bg-[#F4F4F1] px-3 py-1.5  border border-[#E5E5E0] hover:bg-[#E5E5E0] transition-colors uppercase tracking-wider"
       >
          Open Lovable
          <ExternalLink className="w-3.5 h-3.5 text-[#A3B18A]" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customizer Panel */}
        <div className="space-y-4">
          <div className="p-4 bg-[#FDFDFB]  border border-[#E5E5E0] space-y-3">
            <h4 className="font-bold text-[10px] text-[#8C8C88] uppercase tracking-widest">Customize Form Parameters</h4>

            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] mb-1">Agency / Business Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => updateSetting('companyName', e.target.value)}
                className="w-full p-2.5  bg-[#F9F9F7] border border-[#E5E5E0] text-xs focus:outline-none focus:ring-1 focus:ring-[#A3B18A] text-[#1A1A1A]"
                id="lovable-agency-name-input"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] mb-1">Target Webhook Submission URL</label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => updateSetting('webhookUrl', e.target.value)}
                className="w-full p-2.5  bg-[#F9F9F7] border border-[#E5E5E0] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#A3B18A] text-[#1A1A1A]"
                id="lovable-webhook-url-input"
              />
            </div>
          </div>

          {/* Prompt Output Box */}
          <div className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#8C8C88] uppercase tracking-widest flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-[#C06C4C]" />
                Generated Lovable Prompt
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1  bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                id="copy-lovable-prompt-btn"
             >
                {copied ? <Check className="w-3.5 h-3.5 text-[#A3B18A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#1A1A1A] text-gray-100  text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-64 border border-gray-800 leading-relaxed">
              {generatedPrompt}
            </pre>
          </div>
        </div>

        {/* Live Form Mockup Preview */}
        <div className="p-5  bg-[#FDFDFB] border border-[#E5E5E0] space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-2">
            <span className="text-xs font-light text-[#1A1A1A]">Live Webform Preview</span>
            <span className="text-[9px] bg-[#F4F4F1] text-[#A3B18A] font-bold px-2 py-0.5  border border-[#E5E5E0] uppercase tracking-widest">
              Lovable Output
            </span>
          </div>

          <div className="bg-white p-5  border border-[#E5E5E0] shadow-xs space-y-3">
            <div className="text-center space-y-1">
              <h4 className="font-light text-base text-[#1A1A1A]">{companyName}</h4>
              <p className="text-xs text-[#8C8C88]">Soft Skills Performance & Pitch Intake</p>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[#1A1A1A] mb-0.5">Full Name *</label>
                <input
                  disabled
                  placeholder="e.g. Tomba Laisram"
                  className="w-full p-2 bg-[#F9F9F7] border border-[#E5E5E0]  text-[#8C8C88]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1A1A1A] mb-0.5">Work Email *</label>
                <input
                  disabled
                  placeholder="e.g. tomba@techflow.io"
                  className="w-full p-2 bg-[#F9F9F7] border border-[#E5E5E0]  text-[#8C8C88]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1A1A1A] mb-0.5">Training Requirements *</label>
                <textarea
                  disabled
                  rows={2}
                  placeholder="Describe your team's soft skill challenges..."
                  className="w-full p-2 bg-[#F9F9F7] border border-[#E5E5E0]  text-[#8C8C88]"
                />
              </div>

              <button
                disabled
                className="w-full py-2.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider  flex items-center justify-center gap-1.5 opacity-90 cursor-not-allowed"
             >
                <Send className="w-3.5 h-3.5 text-[#A3B18A]" />
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
