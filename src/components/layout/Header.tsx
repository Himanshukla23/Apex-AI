import React from 'react';
import { 
  Building2, 
  Calendar, 
  Database, 
  FileDown,
  Shield
} from 'lucide-react';

interface HeaderProps {
  onOpenDataSources: () => void;
  onDownloadPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenDataSources, 
  onDownloadPdf
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 max-w-7xl mx-auto w-full">
        {/* Title & Organization */}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              AI Governance Dashboard
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
              DEMO DATA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span className="font-semibold text-slate-700">Acme Inc.</span>
            <span>•</span>
            <span>Centralized visibility into AI tool spend, budget limits & Shadow AI</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date Filter */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 cursor-pointer transition-colors">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>This Month</span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>

          {/* Data Sources Trigger */}
          <button 
            onClick={onOpenDataSources}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
            title="Inspect the 5 APIs and Data Sources"
          >
            <Database className="w-3.5 h-3.5 text-teal-400" />
            <span>Data Sources (5)</span>
          </button>

          {/* Download Assignment PDF Button */}
          <button
            onClick={onDownloadPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
            title="Download the official Assignment PDF Report"
          >
            <FileDown className="w-3.5 h-3.5 text-blue-100" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
