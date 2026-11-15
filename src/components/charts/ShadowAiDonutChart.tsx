import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Info } from 'lucide-react';
import { SHADOW_AI_DATA } from '../../mock/governanceData';

interface ShadowAiDonutChartProps {
  onSelectApprovalStatus?: (status: string) => void;
  selectedApprovalStatus?: string;
}

export const ShadowAiDonutChart: React.FC<ShadowAiDonutChartProps> = ({
  onSelectApprovalStatus,
  selectedApprovalStatus = 'All'
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-lg border border-slate-700 min-w-[170px]">
          <div className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
            {data.name}
          </div>
          <div className="mt-1.5 space-y-1 font-mono">
            <div className="text-slate-300 flex justify-between">
              <span className="font-sans text-slate-400">Traffic Share:</span>
              <span className="font-bold text-white">{data.value}%</span>
            </div>
            <div className="text-slate-400 flex justify-between">
              <span className="font-sans text-slate-400">Users:</span>
              <span>~{data.count} employees</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <h3 className="font-bold text-slate-900 text-sm">
                Approved vs. Unapproved AI
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Traffic ratio across sanctioned tools vs. Shadow AI.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-md">
            25% Shadow AI
          </span>
        </div>

        {/* Donut Chart */}
        <div className="h-56 mt-4 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SHADOW_AI_DATA}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                className="cursor-pointer"
                onClick={(entry) => {
                  if (onSelectApprovalStatus) {
                    const statusKey = entry.name.includes('Approved') && !entry.name.includes('Unapproved')
                      ? 'Approved'
                      : 'Unapproved';
                    onSelectApprovalStatus(statusKey === selectedApprovalStatus ? 'All' : statusKey);
                  }
                }}
              >
                {SHADOW_AI_DATA.map((entry, index) => {
                  const isMatch =
                    selectedApprovalStatus === 'All' ||
                    (selectedApprovalStatus === 'Approved' && entry.name.startsWith('Approved')) ||
                    (selectedApprovalStatus === 'Unapproved' && entry.name.startsWith('Unapproved'));

                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      opacity={isMatch ? 1 : 0.4}
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={32}
                iconType="circle"
                wrapperStyle={{ fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Callout */}
          <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="block text-2xl font-black text-slate-900 leading-none font-mono">
              25%
            </span>
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block mt-0.5">
              Shadow AI
            </span>
          </div>
        </div>
      </div>

      {/* Business Justification */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 bg-slate-50 p-2.5 rounded-lg text-xs text-slate-600">
        <div className="flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-800">Business Justification: </strong>
            Helps IT and security teams track Shadow AI activity. 1 in 4 AI visits uses unapproved platforms (e.g. Jasper AI, Midjourney) lacking enterprise data protection, creating data leakage risks.
          </div>
        </div>
      </div>
    </div>
  );
};
