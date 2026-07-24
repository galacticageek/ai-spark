import React, { useState } from 'react';
import { toast } from 'sonner';
import { WORKFLOW_NODES } from '../data/bootcampData';
import { WorkflowNodeData } from '../types';
import { Webhook, Sparkles, Mail, BellRing, Table, Clock, ArrowRight, Copy, Check, Download, Info, CheckCircle2 } from 'lucide-react';

interface VisualizerProps {
  onDownloadWorkflow: () => void;
}

export const N8nWorkflowVisualizer: React.FC<VisualizerProps> = ({ onDownloadWorkflow }) => {
  const [selectedNode, setSelectedNode] = useState<WorkflowNodeData>(WORKFLOW_NODES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Webhook':
        return <Webhook className="w-4 h-4 text-[#A3B18A]" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#A3B18A]" />;
      case 'Mail':
        return <Mail className="w-4 h-4 text-[#8E9AAF]" />;
      case 'BellRing':
        return <BellRing className="w-4 h-4 text-[#C06C4C]" />;
      case 'Table':
        return <Table className="w-4 h-4 text-[#8E9AAF]" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-[#8C8C88]" />;
      default:
        return <Webhook className="w-4 h-4 text-[#A3B18A]" />;
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(selectedNode.jsonSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy to clipboard.');
    }
  };

  return (
    <div className="bg-white  border border-[#E5E5E0] p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E5E0] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[#A3B18A] text-[10px] uppercase tracking-widest font-bold mb-1.5">
            <Sparkles className="w-3 h-3 text-[#A3B18A]" />
            Project #13 Blueprint
          </div>
          <h3 className="text-2xl font-light text-[#1A1A1A]">TalentBridge Systems Interactive n8n Pipeline</h3>
          <p className="text-xs text-[#6B6B66] mt-0.5">
            Click any node below to inspect exact configuration, input/output fields, JSON schemas, and troubleshooting tips.
          </p>
        </div>

        <button
          onClick={onDownloadWorkflow}
          className="flex items-center justify-center gap-2 px-4 py-2  bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          id="download-workflow-json-btn"
       >
          <Download className="w-3.5 h-3.5 text-[#A3B18A]" />
          <span>Download JSON</span>
        </button>
      </div>

      {/* Interactive Node Flow Diagram */}
      <div className="p-4 bg-[#F4F4F1]  border border-[#E5E5E0] overflow-x-auto">
        <div className="text-[10px] font-bold text-[#8C8C88] uppercase tracking-widest mb-3">
          Interactive Architecture Blueprint (Select Node)
        </div>

        <div className="flex items-center gap-2 min-w-max pb-2">
          {WORKFLOW_NODES.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5  border text-left transition-all w-48 shrink-0 ${
                    isSelected
                      ? 'bg-white border-[#A3B18A] border-t-2 border-t-[#A3B18A] shadow-xs'
                      : 'bg-[#FDFDFB] border-[#E5E5E0] hover:border-[#A3B18A]'
                  }`}
                  id={`workflow-node-${node.id}`}
               >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5  bg-[#F4F4F1] border border-[#E5E5E0]">
                      {getIconComponent(node.icon)}
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[#8C8C88]">
                      {node.type}
                    </span>
                  </div>
                  <div className="font-semibold text-xs text-[#1A1A1A] truncate">{node.name}</div>
                  <div className="text-[10px] text-[#8C8C88] truncate">{node.subtitle}</div>
                </button>

                {index < WORKFLOW_NODES.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C8C88] shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Detail Card */}
      <div className="p-6 bg-[#FDFDFB]  border border-[#E5E5E0] space-y-6">
        <div className="flex items-start justify-between border-b border-[#E5E5E0] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white  border border-[#E5E5E0]">
              {getIconComponent(selectedNode.icon)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-light text-[#1A1A1A]">{selectedNode.name}</h4>
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[#A3B18A]">
                  {selectedNode.subtitle}
                </span>
              </div>
              <p className="text-xs text-[#6B6B66] mt-0.5">{selectedNode.description}</p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Click Path & Field Mappings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Exact Path & Inputs */}
          <div className="space-y-4">
            <div className="p-4 bg-white  border border-[#E5E5E0] space-y-2">
              <span className="text-[10px] font-bold text-[#8C8C88] uppercase tracking-widest block">
                📍 Canvas Click Navigation
              </span>
              <p className="text-xs text-[#1A1A1A] font-mono leading-relaxed bg-[#F4F4F1] p-2.5  border border-[#E5E5E0]">
                {selectedNode.exactPath}
              </p>
            </div>

            <div className="p-4 bg-white  border border-[#E5E5E0] space-y-2">
              <span className="text-[10px] font-bold text-[#8C8C88] uppercase tracking-widest block">
                📥 Inputs & Parameters
              </span>
              <div className="space-y-1.5 text-xs font-mono bg-[#F4F4F1] p-2.5  border border-[#E5E5E0]">
                {Object.entries(selectedNode.inputs).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between text-[#1A1A1A] border-b border-[#E5E5E0] pb-1 last:border-0 last:pb-0">
                    <span className="font-bold text-[#A3B18A]">{key}:</span>
                    <span className="text-[#6B6B66] truncate max-w-[200px]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Outputs & JSON Snippet */}
          <div className="space-y-4">
            <div className="p-4 bg-white  border border-[#E5E5E0] space-y-2">
              <span className="text-[10px] font-bold text-[#8C8C88] uppercase tracking-widest block">
                📤 Output Schema
              </span>
              <div className="space-y-1.5 text-xs font-mono bg-[#F4F4F1] p-2.5  border border-[#E5E5E0]">
                {Object.entries(selectedNode.outputs).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between text-[#1A1A1A] border-b border-[#E5E5E0] pb-1 last:border-0 last:pb-0">
                    <span className="font-bold text-[#A3B18A]">{key}:</span>
                    <span className="text-[#6B6B66] truncate max-w-[200px]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white  border border-[#E5E5E0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#8C8C88] uppercase tracking-widest">
                  💻 Node JSON Config
                </span>
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#1A1A1A] hover:underline"
                  id="copy-node-json-btn"
               >
                  {copied ? <Check className="w-3 h-3 text-[#A3B18A]" /> : <Copy className="w-3 h-3 text-[#8C8C88]" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 bg-[#1A1A1A] text-gray-100  text-xs font-mono overflow-x-auto max-h-32 border border-gray-800">
                {selectedNode.jsonSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div className="p-4 bg-[#F4F4F1]  border border-[#E5E5E0] space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C8C88] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#A3B18A]" />
            <span>Instructor Debugging Tips for {selectedNode.name}</span>
          </div>
          <ul className="list-disc list-inside text-xs text-[#6B6B66] space-y-1 pl-1 italic">
            {selectedNode.troubleshooting.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
