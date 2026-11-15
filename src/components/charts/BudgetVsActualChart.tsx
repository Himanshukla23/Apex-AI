import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { Info } from 'lucide-react';
import { BUDGET_VS_ACTUAL_DATA } from '../../mock/governanceData';

export const BudgetVsActualChart: React.FC = () => {
  const totalBudget = BUDGET_VS_ACTUAL_DATA.reduce((acc, curr) => acc + curr.budget, 0);
  const totalActual = BUDGET_VS_ACTUAL_DATA.reduce((acc, curr) => acc + curr.actual, 0);
  const utilization = ((totalActual / totalBudget) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const budgetVal = payload.find((p: any) => p.dataKey === 'budget')?.value || 0;
      const actualVal = payload.find((p: any) => p.dataKey === 'actual')?.value || 0;
      const rate = ((actualVal / budgetVal) * 100).toFixed(0);

      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-lg border border-slate-700 min-w-[180px]">
          <div className="font-bold text-sm text-slate-100">{label} ({rate}% used)</div>
          <div className="mt-1.5 space-y-1 font-mono">
            <div className="text-slate-300 flex justify-between">
              <span className="font-sans text-slate-400">Budget Limit:</span>
              <span>${budgetVal.toLocaleString()}</span>
            </div>
            <div className="text-blue-400 flex justify-between">
              <span className="font-sans text-slate-400">Actual Spend:</span>
              <span>${actualVal.toLocaleString()}</span>
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
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
              <h3 className="font-bold text-slate-900 text-sm">
                Actual Spending vs. Budget
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Are individual tools approaching their monthly spending limit?
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-md">
            {utilization}% Global
          </span>
        </div>

        {/* Grouped Bar Chart */}
        <div className="h-56 mt-4 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={BUDGET_VS_ACTUAL_DATA}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
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
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '4px' }} 
              />
              <Bar 
                name="Budget" 
                dataKey="budget" 
                fill="#94A3B8" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                name="Actual" 
                dataKey="actual" 
                fill="#2563EB" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Business Justification */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 bg-slate-50 p-2.5 rounded-lg text-xs text-slate-600">
        <div className="flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-800">Business Justification: </strong>
            Helps management spot budget overruns early. Claude is at 83% and ChatGPT is at 80% utilization, signaling the need for threshold caps before the end of the month.
          </div>
        </div>
      </div>
    </div>
  );
};
