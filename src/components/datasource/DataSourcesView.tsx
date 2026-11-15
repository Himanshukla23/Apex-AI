import React from 'react';
import { 
  Database, 
  AlertTriangle, 
  Server
} from 'lucide-react';
import { DATA_SOURCES } from '../../mock/governanceData';

export const DataSourcesView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">
                APIs & Data Source Ingestion Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Multi-source ingestion pipeline powering real-time AI spend governance, identity attribution, and Shadow AI detection.
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
            All 5 Connectors Healthy
          </span>
        </div>

        {/* High-level Data Flow Steps */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
          {[
            { step: "01", title: "External Sources", desc: "OpenAI, Claude, Okta, CASB, ERP" },
            { step: "02", title: "Connectors", desc: "Batch polling & log listeners" },
            { step: "03", title: "Normalization", desc: "Schema harmonizer & tokens-to-$" },
            { step: "04", title: "Identity Mapping", desc: "User email to Dept & Cost Center" },
            { step: "05", title: "Central Store", desc: "PostgreSQL & TimescaleDB metrics" },
            { step: "06", title: "Dashboard & Alerts", desc: "Real-time KPIs & policy triage" },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">Step {item.step}</span>
                <h4 className="font-bold text-slate-800 mt-1">{item.title}</h4>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of the 5 Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DATA_SOURCES.map((source) => (
          <div 
            key={source.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{source.name}</h3>
                    <span className="text-[11px] text-slate-500">{source.category}</span>
                  </div>
                </div>
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

              <div className="mt-3 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Purpose: </strong>
                  {source.purpose}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-medium text-[10px] uppercase block">Sync Interval</span>
                    <span className="text-slate-700 font-semibold">{source.syncFrequency}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium text-[10px] uppercase block">Processed Volume</span>
                    <span className="text-slate-700 font-semibold font-mono">{source.recordsCount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-start gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Limitation: </strong>
                  {source.limitations}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cost Classification Guide */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-3">
          Methodological Framework: Cost Attribution Tiers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-blue-400 block mb-1">1. Actual Metered Spend</span>
            <p className="text-slate-300">
              Recorded directly from developer API logs (OpenAI / Claude) and confirmed accounts payable invoices. 100% financial accuracy.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-teal-400 block mb-1">2. Estimated / Modeled Spend</span>
            <p className="text-slate-300">
              Synthesized by multiplying provisioned SSO active users by published SaaS seat prices (e.g. Copilot @ $30/mo/user).
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-amber-400 block mb-1">3. Unavailable Cost (Shadow AI)</span>
            <p className="text-slate-300">
              Network web logs indicate domain visits to free AI tools (e.g. Jasper AI, DeepSeek). Financial spend is $0, but data leak risk is critical.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
