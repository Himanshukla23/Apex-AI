import React from 'react';
import { DollarSign, TrendingUp, Users, Building, AlertCircle } from 'lucide-react';
import { DEPARTMENT_SPEND_DATA } from '../../mock/governanceData';

export const DepartmentSpendTable: React.FC = () => {
  const totalBudget = DEPARTMENT_SPEND_DATA.reduce((acc, curr) => acc + curr.budget, 0);
  const totalSpend = DEPARTMENT_SPEND_DATA.reduce((acc, curr) => acc + curr.spend, 0);
  const globalUtil = ((totalSpend / totalBudget) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
              Departmental Spend & Budget Allocation
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cost attribution across business units mapped via Microsoft Entra ID and Okta directory groups.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
            Total Allocated: ${totalBudget.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-600 font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Primary Tool Usage</th>
              <th className="py-3 px-4">Active Staff</th>
              <th className="py-3 px-4">Allocated Budget</th>
              <th className="py-3 px-4">Current Spend</th>
              <th className="py-3 px-4">Utilization</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {DEPARTMENT_SPEND_DATA.map((dept) => {
              const isWarning = dept.utilization >= 80;
              return (
                <tr key={dept.department} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {dept.department}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {dept.primaryTool}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                    {dept.activeUsers} users
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">
                    ${dept.budget.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    ${dept.spend.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[11px] font-mono font-bold">
                        <span>{dept.utilization}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full ${isWarning ? 'bg-amber-500' : 'bg-blue-600'}`}
                          style={{ width: `${Math.min(100, dept.utilization)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {isWarning ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300">
                        Near Limit
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Healthy
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
