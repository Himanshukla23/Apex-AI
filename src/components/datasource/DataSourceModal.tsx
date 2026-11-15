import React from 'react';
import { 
  X, 
  Database, 
  AlertTriangle, 
  Clock, 
  ShieldCheck
} from 'lucide-react';
import { DATA_SOURCES } from '../../mock/governanceData';

interface DataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataSourceModal: React.FC<DataSourceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                APIs & Data Source Architecture
              </h2>
              <p className="text-xs text-slate-500">
                Data pipeline lineage, synchronization schedules, and telemetry limitations
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Architecture Overview Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-teal-50 border border-blue-200 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Unified Ingestion & Attribution Engine
            </div>
            <p>
              To construct a holistic view of enterprise AI consumption, this dashboard synthesizes <strong>5 disparate data source categories</strong>. Direct vendor APIs capture raw token costs; enterprise directory services map costs to business units; network proxies discover Shadow AI; and ERP systems enforce budgetary ceilings.
            </p>
          </div>

          {/* Sources List */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Connected Telemetry & Billing Pipelines (5 of 5 Operational)
            </h3>

            {DATA_SOURCES.map((source) => (
              <div 
                key={source.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white shadow-sm space-y-3 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-900 text-sm">{source.name}</span>
                    <span className="text-[11px] font-medium text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {source.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      source.costType === 'Actual Metered'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : source.costType === 'Invoiced Seat Cost'
                          ? 'bg-teal-100 text-teal-800 border border-teal-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {source.costType}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Operational Purpose: </strong>
                  {source.purpose}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">Sync Frequency & Latency</span>
                    <span className="text-slate-700 font-semibold flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {source.syncFrequency} (Last: {source.lastSync})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">Volume Processed</span>
                    <span className="text-slate-700 font-semibold font-mono mt-0.5 block">
                      {source.recordsCount}
                    </span>
                  </div>
                </div>

                {/* Limitations Callout */}
                <div className="flex items-start gap-2 text-[11px] text-amber-800 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/80">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Telemetry Boundary: </strong>
                    {source.limitations}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy & SSL Compliance Note */}
          <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-1.5">
            <div className="font-semibold text-teal-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Security Architecture & Prompt Privacy Guardrail
            </div>
            <p className="text-slate-300 leading-relaxed">
              All network discovery logs adhere strictly to zero-trust privacy boundaries. Network logs inspect HTTPS SNI (Server Name Indication) domain headers to discover AI access without decrypting raw prompt payloads. Confidential organizational intellectual property and prompt conversations are never persisted in dashboard indices.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Acme Inc. Governance Telemetry Pipeline v1.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
