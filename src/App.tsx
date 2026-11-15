import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { KpiGrid } from './components/metrics/KpiGrid';
import { SpendByToolChart } from './components/charts/SpendByToolChart';
import { BudgetVsActualChart } from './components/charts/BudgetVsActualChart';
import { ShadowAiDonutChart } from './components/charts/ShadowAiDonutChart';
import { AlertsTable } from './components/alerts/AlertsTable';
import { DataSourceModal } from './components/datasource/DataSourceModal';
import { DataSourcesView } from './components/datasource/DataSourcesView';
import { AiApplicationsTable } from './components/inventory/AiApplicationsTable';
import { DepartmentSpendTable } from './components/spend/DepartmentSpendTable';
import { KPI_METRICS, INITIAL_ALERTS } from './mock/governanceData';
import { GovernanceAlert } from './types/dashboard';
import { Menu, Sparkles, Filter, FileDown } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<GovernanceAlert[]>(INITIAL_ALERTS);

  // Cross-chart interactive filter state
  const [selectedToolFilter, setSelectedToolFilter] = useState<string>('All');
  const [selectedApprovalFilter, setSelectedApprovalFilter] = useState<string>('All');

  // Toggle status between Open / Resolved
  const handleToggleAlertStatus = (id: string) => {
    setAlerts(prev => prev.map(alert => {
      if (alert.id === id) {
        const nextStatus = alert.status === 'Resolved' ? 'Open' : 'Resolved';
        return { ...alert, status: nextStatus };
      }
      return alert;
    }));
  };

  // Handle PDF report download
  const handleDownloadPdf = () => {
    window.open('/AI_Governance_Dashboard_Assignment.pdf', '_blank');
  };

  const openAlertsCount = alerts.filter(a => a.status !== 'Resolved').length;

  // Dynamic KPI metrics
  const dynamicKpiMetrics = KPI_METRICS.map(m => {
    if (m.name === 'Policy Alerts') {
      return {
        ...m,
        value: openAlertsCount,
        subtitle: `${openAlertsCount} active alerts needing review`,
        change: openAlertsCount > 0 ? `${openAlertsCount} open` : 'All resolved',
        status: openAlertsCount > 0 ? ('critical' as const) : ('success' as const)
      };
    }
    return m;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        openAlertsCount={openAlertsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        {/* Top Header */}
        <Header 
          onOpenDataSources={() => setIsDataModalOpen(true)}
          onDownloadPdf={handleDownloadPdf}
        />

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold">AI Governance</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 text-xs font-semibold"
          >
            <Menu className="w-4 h-4" />
            <span>Menu</span>
          </button>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Active Filter Indicator */}
          {(selectedToolFilter !== 'All' || selectedApprovalFilter !== 'All') && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              <span>Filtered by: {selectedToolFilter !== 'All' ? selectedToolFilter : ''} {selectedApprovalFilter !== 'All' ? `(${selectedApprovalFilter})` : ''}</span>
              <button 
                onClick={() => {
                  setSelectedToolFilter('All');
                  setSelectedApprovalFilter('All');
                }}
                className="ml-2 text-slate-500 hover:text-slate-800 font-bold"
              >
                ✕ Clear
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW (Main Dashboard Screen) */}
          {activeTab === 'Overview' && (
            <>
              {/* 1. KPI Metric Cards */}
              <section aria-label="Key Performance Indicators">
                <KpiGrid metrics={dynamicKpiMetrics} />
              </section>

              {/* 2. Core Visualizations */}
              <section aria-label="Core Visualizations" className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Core Visualizations (3 Charts)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Click any chart bar or donut segment to filter the governance table below.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Chart 1: AI Spending by Tool */}
                  <SpendByToolChart 
                    onSelectTool={(tool) => setSelectedToolFilter(tool === selectedToolFilter ? 'All' : tool)}
                    selectedTool={selectedToolFilter}
                  />

                  {/* Chart 2: Actual Spending vs Budget */}
                  <BudgetVsActualChart />

                  {/* Chart 3: Approved vs Unapproved AI Usage */}
                  <ShadowAiDonutChart 
                    onSelectApprovalStatus={(status) => setSelectedApprovalFilter(status === selectedApprovalFilter ? 'All' : status)}
                    selectedApprovalStatus={selectedApprovalFilter}
                  />
                </div>
              </section>

              {/* 3. Governance Alerts Table */}
              <section aria-label="Governance Alerts">
                <AlertsTable 
                  alerts={alerts}
                  onToggleStatus={handleToggleAlertStatus}
                  onOpenDataSources={() => setIsDataModalOpen(true)}
                  selectedToolFilter={selectedToolFilter}
                  onSelectToolFilter={setSelectedToolFilter}
                />
              </section>
            </>
          )}

          {/* TAB 2: AI APPLICATIONS */}
          {activeTab === 'AI Applications' && (
            <div className="space-y-6">
              <AiApplicationsTable />
            </div>
          )}

          {/* TAB 3: SPEND & BUDGETS */}
          {activeTab === 'Spend & Budgets' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Budget Utilization</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Monthly spending compared against allocated budget limits.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-slate-400 block">Monthly Limit</span>
                    <span className="text-2xl font-black text-slate-900 font-mono">$12,000</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Spent: $9,000</span>
                    <span className="text-blue-600">75% ($3,000 Remaining)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              <DepartmentSpendTable />
            </div>
          )}

          {/* TAB 4: GOVERNANCE */}
          {activeTab === 'Governance' && (
            <div className="space-y-6">
              <AlertsTable 
                alerts={alerts}
                onToggleStatus={handleToggleAlertStatus}
                onOpenDataSources={() => setIsDataModalOpen(true)}
                selectedToolFilter={selectedToolFilter}
                onSelectToolFilter={setSelectedToolFilter}
              />
            </div>
          )}

          {/* TAB 5: DATA SOURCES */}
          {activeTab === 'Data Sources' && (
            <DataSourcesView />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">AI Governance Dashboard</span>
            <span>·</span>
            <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-300">DEMO DATA</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownloadPdf}
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Assignment PDF Report</span>
            </button>
            <span>•</span>
            <span>React + TypeScript + Tailwind CSS</span>
          </div>
        </footer>
      </div>

      {/* Global Data Source Modal */}
      <DataSourceModal 
        isOpen={isDataModalOpen} 
        onClose={() => setIsDataModalOpen(false)} 
      />
    </div>
  );
};

export default App;
