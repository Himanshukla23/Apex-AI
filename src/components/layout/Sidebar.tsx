import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  DollarSign, 
  ShieldAlert, 
  Database, 
  Sparkles,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen,
  openAlertsCount
}) => {
  const navItems = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'AI Applications', label: 'AI Applications', icon: Layers, badge: '11' },
    { id: 'Spend & Budgets', label: 'Spend & Budgets', icon: DollarSign, badge: '$9k' },
    { id: 'Governance', label: 'Governance', icon: ShieldAlert, badge: openAlertsCount > 0 ? `${openAlertsCount}` : undefined, badgeColor: 'bg-rose-500' },
    { id: 'Data Sources', label: 'Data Sources', icon: Database, badge: '5/5' }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white block">Apex AI</span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">Gov & FinOps</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Core Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab.toLowerCase() === item.id.toLowerCase();
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-medium ${
                    isActive 
                      ? 'bg-blue-700 text-white' 
                      : (item.badgeColor ? `${item.badgeColor} text-white` : 'bg-slate-800 text-slate-300')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Health Card */}
        <div className="p-4 mx-3 mb-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium mb-1.5">
            <span>Budget Ceiling</span>
            <span className="font-semibold text-white">75%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            $9,000 spent of $12,000 monthly limit.
          </p>
        </div>

        {/* User Session Profile */}
        <div className="p-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-700 text-teal-300 flex items-center justify-center text-xs font-bold border border-slate-600">
              CFO
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white">Executive View</div>
              <div className="text-[10px] text-slate-400">Finance & Security Lead</div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500" title="System Online"></div>
        </div>
      </aside>
    </>
  );
};
