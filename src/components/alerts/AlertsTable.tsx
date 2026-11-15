import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Check, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GovernanceAlert, AlertSeverity, AlertStatus } from '../../types/dashboard';

interface AlertsTableProps {
  alerts: GovernanceAlert[];
  onToggleStatus: (id: string) => void;
  onOpenDataSources: () => void;
  selectedToolFilter?: string;
  onSelectToolFilter?: (tool: string) => void;
}

export const AlertsTable: React.FC<AlertsTableProps> = ({ 
  alerts, 
  onToggleStatus,
  onOpenDataSources,
  selectedToolFilter = 'All',
  onSelectToolFilter
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const tools = ['All', ...Array.from(new Set(alerts.map(a => a.tool)))];

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'All' || alert.severity === selectedSeverity;
    const matchesTool = selectedToolFilter === 'All' || alert.tool === selectedToolFilter;
    const matchesSearch = 
      alert.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.tool.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSeverity && matchesTool && matchesSearch;
  });

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'Critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
            {severity}
          </span>
        );
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    if (status === 'Resolved') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Reviewed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
        Open
      </span>
    );
  };

  const activeCount = alerts.filter(a => a.status !== 'Resolved').length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Title & Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-slate-900 text-base">
                Governance & Policy Alerts
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full">
                {activeCount} Action Required
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated notifications for unauthorized AI tool discovery, budget thresholds, and sensitive data risks.
            </p>
          </div>

          <button 
            onClick={onOpenDataSources}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline self-start sm:self-auto cursor-pointer"
          >
            How are these alerts detected?
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-4 pt-3 border-t border-slate-200/70 flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-medium">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-medium">Tool:</span>
            <select
              value={selectedToolFilter}
              onChange={(e) => onSelectToolFilter && onSelectToolFilter(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700"
            >
              {tools.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Tools' : t}</option>
              ))}
            </select>
          </div>

          {(selectedSeverity !== 'All' || selectedToolFilter !== 'All' || searchTerm !== '') && (
            <button
              onClick={() => {
                setSelectedSeverity('All');
                if (onSelectToolFilter) onSelectToolFilter('All');
                setSearchTerm('');
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer ml-auto"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Clean Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-4">Severity</th>
              <th className="py-2.5 px-4">AI Tool</th>
              <th className="py-2.5 px-4">Department</th>
              <th className="py-2.5 px-4">Event Description</th>
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAlerts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  No alerts match your filter.
                </td>
              </tr>
            ) : (
              filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    {getSeverityBadge(alert.severity)}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900">{alert.tool}</span>
                    <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      alert.approvalStatus === 'Approved'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {alert.approvalStatus === 'Approved' ? 'Approved' : 'Shadow AI'}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                    {alert.department}
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">
                    <div>{alert.event}</div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">{alert.detail}</div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono">
                    {alert.date}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {getStatusBadge(alert.status)}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => onToggleStatus(alert.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        alert.status === 'Resolved'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      }`}
                    >
                      {alert.status === 'Resolved' ? (
                        <span>Re-open</span>
                      ) : (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Mark Reviewed</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
        <span>Showing {filteredAlerts.length} of {alerts.length} policy alerts</span>
        <span>Click "Mark Reviewed" to update incident status in real time.</span>
      </div>
    </div>
  );
};
