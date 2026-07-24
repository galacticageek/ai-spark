import React, { useState } from 'react';
import { DOWNLOADABLE_ASSETS } from '../data/downloadableFiles';
import { DownloadableAsset } from '../types';
import { Download, Copy, Check, FileText, Code, Sparkles, Eye, Search, BookOpen } from 'lucide-react';

export const ResourceDownloadHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<DownloadableAsset | null>(null);

  const categories = [
    { id: 'all', label: 'All Resources (10)' },
    { id: 'workflow', label: 'n8n Workflows' },
    { id: 'guide', label: 'Setup Guides' },
    { id: 'prompt', label: 'Lovable Prompts' },
    { id: 'presentation', label: 'Presentation & Script' },
    { id: 'cheatsheet', label: 'Cheat Sheets' }
  ];

  const filteredAssets = DOWNLOADABLE_ASSETS.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch =
      asset.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      asset.filename.toLowerCase().includes(searchFilter.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (asset: DownloadableAsset) => {
    const blob = new Blob([asset.fileContent], { type: asset.mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = asset.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = (asset: DownloadableAsset) => {
    navigator.clipboard.writeText(asset.fileContent);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white  border border-[#E5E5E0] p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E5E0] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5  bg-[#F4F4F1] border border-[#E5E5E0] text-[#A3B18A] text-[10px] uppercase tracking-widest font-bold mb-1.5">
            <Download className="w-3.5 h-3.5 text-[#A3B18A]" />
            Downloadable Project Toolkit
          </div>
          <h3 className="text-2xl font-light text-[#1A1A1A]">TalentBridge & Bootcamp Files Hub</h3>
          <p className="text-xs text-[#6B6B66] mt-0.5">
            Download or copy ready-to-import n8n JSON workflows, setup manuals, Lovable prompts, and presentation decks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5  text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-[#F4F4F1] text-[#6B6B66] hover:text-[#1A1A1A] border border-[#E5E5E0]'
              }`}
              id={`filter-cat-${cat.id}`}
           >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="p-5  bg-[#FDFDFB] border border-[#E5E5E0] hover:border-[#A3B18A] transition-all flex flex-col justify-between space-y-4"
         >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5  bg-[#F4F4F1] text-[#A3B18A] border border-[#E5E5E0]">
                  {asset.category}
                </span>
                <span className="text-[10px] text-[#8C8C88] font-mono">{asset.filename}</span>
              </div>
              <h4 className="font-medium text-sm text-[#1A1A1A] leading-snug">{asset.title}</h4>
              <p className="text-xs text-[#6B6B66] leading-relaxed line-clamp-3">{asset.description}</p>
            </div>

            <div className="flex items-center gap-2 border-t border-[#E5E5E0] pt-3">
              <button
                onClick={() => handleDownload(asset)}
                className="flex-1 py-2 px-3 bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider  transition-colors shadow-xs flex items-center justify-center gap-1.5"
                id={`download-asset-${asset.id}`}
             >
                <Download className="w-3.5 h-3.5 text-[#A3B18A]" />
                <span>Download</span>
              </button>

              <button
                onClick={() => handleCopy(asset)}
                className="p-2 bg-white hover:bg-[#F4F4F1] text-[#1A1A1A]  border border-[#E5E5E0] transition-colors"
                title="Copy Content"
                id={`copy-asset-${asset.id}`}
             >
                {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-[#A3B18A]" /> : <Copy className="w-3.5 h-3.5 text-[#8C8C88]" />}
              </button>

              <button
                onClick={() => setPreviewAsset(asset)}
                className="p-2 bg-white hover:bg-[#F4F4F1] text-[#1A1A1A]  border border-[#E5E5E0] transition-colors"
                title="Preview File"
                id={`preview-asset-${asset.id}`}
             >
                <Eye className="w-3.5 h-3.5 text-[#8C8C88]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl  border border-[#E5E5E0] p-6 space-y-4 max-h-[85vh] flex flex-col shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-3">
              <div>
                <h4 className="font-light text-base text-[#1A1A1A]">{previewAsset.title}</h4>
                <p className="text-xs text-[#8C8C88] font-mono">{previewAsset.filename}</p>
              </div>
              <button
                onClick={() => setPreviewAsset(null)}
                className="p-1.5  bg-[#F4F4F1] text-[#8C8C88] hover:text-[#1A1A1A] text-xs font-bold"
                id="close-file-preview-btn"
             >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#1A1A1A] text-gray-100 p-4  text-xs font-mono whitespace-pre-wrap leading-relaxed border border-gray-800">
              {previewAsset.fileContent}
            </div>

            <div className="flex justify-end gap-2 border-t border-[#E5E5E0] pt-3">
              <button
                onClick={() => handleCopy(previewAsset)}
                className="px-4 py-2 bg-[#F4F4F1] hover:bg-[#E5E5E0] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider  transition-colors flex items-center gap-1.5 border border-[#E5E5E0]"
                id="modal-copy-file-btn"
             >
                <Copy className="w-3.5 h-3.5 text-[#8C8C88]" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => handleDownload(previewAsset)}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider  transition-colors shadow-xs flex items-center gap-1.5"
                id="modal-download-file-btn"
             >
                <Download className="w-3.5 h-3.5 text-[#A3B18A]" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
