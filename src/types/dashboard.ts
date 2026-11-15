export type AlertSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type AlertStatus = 'Open' | 'In Review' | 'Resolved';
export type ApprovalStatus = 'Approved' | 'Unapproved' | 'Pending Review';
export type PersonaView = 'All' | 'CFO' | 'CISO';

export interface GovernanceAlert {
  id: string;
  severity: AlertSeverity;
  tool: string;
  department: string;
  event: string;
  date: string;
  status: AlertStatus;
  approvalStatus: ApprovalStatus;
  detail: string;
  sourceCategory: string;
  recommendation?: string;
  riskScore?: number;
}

export interface KpiMetric {
  name: string;
  value: string | number;
  subtitle: string;
  change?: string;
  isPositive?: boolean;
  status?: 'normal' | 'warning' | 'critical' | 'success';
  trendData?: number[];
  targetPersona?: 'CFO' | 'CISO' | 'Both';
}

export interface ToolSpendItem {
  tool: string;
  spend: number;
  share: number;
  color: string;
  category: string;
  tokenCount?: string;
}

export interface BudgetVsActualItem {
  tool: string;
  budget: number;
  actual: number;
  variance: number;
  utilizationRate: number;
  status: 'Under' | 'Near Limit' | 'Exceeded';
}

export interface ShadowAiItem {
  name: string;
  value: number;
  count: number;
  color: string;
}

export interface DataSourceInfo {
  id: string;
  name: string;
  category: string;
  purpose: string;
  status: 'Connected' | 'Syncing' | 'Degraded';
  costType: 'Actual Metered' | 'Estimated / Modeled' | 'Unavailable (Zero-Cost)' | 'Invoiced Seat Cost';
  syncFrequency: string;
  lastSync: string;
  limitations: string;
  recordsCount: string;
  latencyMs?: number;
}

export interface AiApplicationItem {
  id: string;
  name: string;
  vendor: string;
  category: 'LLM Platform' | 'Developer API' | 'Coding Assistant' | 'Copywriting' | 'Image & Media' | 'Search & Research';
  approvalStatus: ApprovalStatus;
  activeUsers: number;
  monthlyCost: number;
  costModel: 'Direct API Token' | 'Enterprise Seat License' | 'Shadow / Free Web';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  department: string;
  dataClassification: 'Internal Only' | 'Confidential' | 'Unrestricted' | 'Restricted';
}

export interface DepartmentSpendItem {
  department: string;
  budget: number;
  spend: number;
  utilization: number;
  activeUsers: number;
  primaryTool: string;
}
