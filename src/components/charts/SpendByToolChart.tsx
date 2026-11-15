import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Info } from 'lucide-react';
import { TOOL_SPEND_DATA } from '../../mock/governanceData';

interface SpendByToolChartProps {
  onSelectTool?: (tool: string) => void;
  selectedTool?: string;
}

export const SpendByToolChart: React.FC<SpendByToolChartProps> = ({ 
  onSelectTool,
  selectedTool = 'All'
}) => {
  const totalSpend = TOOL_SPEND_DATA.reduce((acc, curr) => acc + curr.spend, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-lg border border-slate-700 min-w-[180px]">
          <div className="font-bold text-sm text-slate-100">{data.tool}</div>
          <div className="mt-1.5 space-y-1 font-mono">
            <div className="text-blue-400 flex justify-between">
              <span className="font-sans text-slate-400">Monthly Spend:</span>
              <span>${data.spend.toLocaleString()}</span>
            </div>
            <div className="text-teal-400 flex justify-between">
              <span className="font-sans text-slate-400">Share of Total:</span>
              <span>{data.share}%</span>
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
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h3 className="font-bold text-slate-900 text-sm">
                AI Spending by Tool
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Which AI vendors consume the largest share of budget?
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
            ${totalSpend.toLocaleString()} Total
          </span>
        </div>

        {/* Bar Chart */}
        <div className="h-56 mt-4 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={TOOL_SPEND_DATA}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              onClick={(e) => {
                if (e && e.activePayload && onSelectTool) {
                  onSelectTool(e.activePayload[0].payload.tool);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="tool" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 11 }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="spend" 
                radius={[4, 4, 0, 0]}
                className="cursor-pointer"
              >
                {TOOL_SPEND_DATA.map((entry, index) => {
                  const isSelected = selectedTool === entry.tool;
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke={isSelected ? '#0F172A' : 'none'}
                      strokeWidth={isSelected ? 2 : 0}
                      opacity={selectedTool === 'All' || isSelected ? 1 : 0.6}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Business Justification */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 bg-slate-50 p-2.5 rounded-lg text-xs text-slate-600">
        <div className="flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-800">Business Justification: </strong>
            Helps the CFO identify cost concentration. ChatGPT ($4,000) and Claude ($2,500) drive 72% of spending, highlighting targets for enterprise volume discounts.
          </div>
        </div>
      </div>
    </div>
  );
};
