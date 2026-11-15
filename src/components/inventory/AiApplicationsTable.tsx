import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink,
  Users,
  DollarSign,
  Filter
} from 'lucide-react';
import { AI_APPLICATIONS_CATALOG } from '../../mock/governanceData';
import { ApprovalStatus } from '../../types/dashboard';

export const AiApplicationsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(AI_APPLICATIONS_CATALOG.map(a => a.category)))];

  const filteredApps = AI_APPLICATIONS_CATALOG.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || app.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || app.approvalStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
                AI Application Discovery Inventory
              </h3>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                11 Tools Detected
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Complete inventory of sanctioned enterprise licenses, developer platforms, and Shadow AI endpoints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">8 Approved · 3 Shadow</span>
          </div>
        </div>

        {/* Filter controls */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search tools, vendors, or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved Only</option>
              <option value="Unapproved">Shadow AI Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-600 font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Application & Vendor</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Governance Status</th>
              <th className="py-3 px-4">Primary Department</th>
              <th className="py-3 px-4">Active Users</th>
              <th className="py-3 px-4">Monthly Cost</th>
              <th className="py-3 px-4">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredApps.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  <div>
                    <span>{app.name}</span>
                    <span className="text-[10px] text-slate-400 block font-normal">{app.vendor}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {app.category}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {app.approvalStatus === 'Approved' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                      <ShieldCheck className="w-3 h-3 text-teal-600" />
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300">
                      <AlertTriangle className="w-3 h-3 text-rose-600" />
                      Shadow AI
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-semibold">
                  {app.department}
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                  {app.activeUsers} staff
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                  {app.monthlyCost > 0 ? `$${app.monthlyCost.toLocaleString()}` : '$0 (Free/Shadow)'}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    app.riskLevel === 'Critical' 
                      ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                      : app.riskLevel === 'High'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : app.riskLevel === 'Medium'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {app.riskLevel} Risk
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
