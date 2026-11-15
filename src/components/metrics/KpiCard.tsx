import React from 'react';
import { DollarSign, Users, Cpu, ShieldAlert } from 'lucide-react';
import { KpiMetric } from '../../types/dashboard';

interface KpiCardProps {
  metric: KpiMetric;
}

export const KpiCard: React.FC<KpiCardProps> = ({ metric }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Total AI Spend':
        return <DollarSign className="w-5 h-5 text-blue-600" />;
      case 'Active AI Users':
        return <Users className="w-5 h-5 text-teal-600" />;
      case 'AI Tools Detected':
        return <Cpu className="w-5 h-5 text-indigo-600" />;
      case 'Policy Alerts':
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      default:
        return <DollarSign className="w-5 h-5 text-slate-600" />;
    }
  };

  const getCardStyle = (name: string) => {
    switch (name) {
      case 'Policy Alerts':
        return 'border-rose-200 bg-rose-50/30';
      case 'Total AI Spend':
        return 'border-blue-200 bg-blue-50/30';
      case 'AI Tools Detected':
        return 'border-amber-200 bg-amber-50/30';
      default:
        return 'border-slate-200 bg-white';
    }
  };

  return (
    <div className={`p-5 rounded-xl border shadow-xs transition-all hover:shadow-md ${getCardStyle(metric.name)}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {metric.name}
        </span>
        <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100">
          {getIcon(metric.name)}
        </div>
      </div>

      <div className="mt-3">
        <span className="text-3xl font-black text-slate-900 tracking-tight font-mono">
          {metric.value}
        </span>
      </div>

      {/* Visual indicator for budget */}
      {metric.name === 'Total AI Spend' && (
        <div className="mt-3 space-y-1">
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      )}

      {/* Visual indicator for tool approval status */}
      {metric.name === 'AI Tools Detected' && (
        <div className="mt-3 flex items-center gap-1 h-2 rounded-full overflow-hidden bg-slate-200">
          <div className="w-[73%] bg-teal-500 h-full" title="8 Approved"></div>
          <div className="w-[27%] bg-rose-500 h-full" title="3 Unauthorized"></div>
        </div>
      )}

      <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
        <span className="text-slate-600 font-medium">
          {metric.subtitle}
        </span>
        {metric.change && (
          <span className={`text-[11px] font-bold ${
            metric.name === 'Policy Alerts'
              ? 'text-rose-600'
              : metric.isPositive
                ? 'text-emerald-600'
                : 'text-slate-500'
          }`}>
            {metric.change}
          </span>
        )}
      </div>
    </div>
  );
};
