import {
  GovernanceAlert,
  KpiMetric,
  ToolSpendItem,
  BudgetVsActualItem,
  ShadowAiItem,
  DataSourceInfo,
  AiApplicationItem,
  DepartmentSpendItem
} from '../types/dashboard';

export const KPI_METRICS: KpiMetric[] = [
  {
    name: "Total AI Spend",
    value: "$9,000",
    subtitle: "75% of $12,000 monthly budget used",
    change: "+8.4% vs last month",
    isPositive: false,
    status: 'warning',
    trendData: [4500, 5800, 7200, 8100, 9000],
    targetPersona: 'CFO'
  },
  {
    name: "Active AI Users",
    value: 120,
    subtitle: "Employees using AI across 6 departments",
    change: "+15 new users this month",
    isPositive: true,
    status: 'normal',
    trendData: [65, 80, 95, 105, 120],
    targetPersona: 'Both'
  },
  {
    name: "AI Tools Detected",
    value: 11,
    subtitle: "8 approved · 3 unauthorized tools found",
    change: "+2 new tools discovered",
    isPositive: false,
    status: 'warning',
    trendData: [4, 6, 8, 9, 11],
    targetPersona: 'CISO'
  },
  {
    name: "Policy Alerts",
    value: 5,
    subtitle: "2 critical · 2 high · 1 medium priority",
    change: "Needs review",
    isPositive: false,
    status: 'critical',
    trendData: [1, 2, 4, 3, 5],
    targetPersona: 'CISO'
  }
];

export const TOOL_SPEND_DATA: ToolSpendItem[] = [
  { tool: "ChatGPT", spend: 4000, share: 44.4, color: "#2563EB", category: "LLM & Assistant", tokenCount: "1.42M tokens" },
  { tool: "Claude", spend: 2500, share: 27.8, color: "#0D9488", category: "Developer API", tokenCount: "980k tokens" },
  { tool: "Copilot", spend: 1500, share: 16.7, color: "#6366F1", category: "Coding Assistant", tokenCount: "50 seats @ $30" },
  { tool: "Other", spend: 1000, share: 11.1, color: "#94A3B8", category: "Productivity", tokenCount: "Aggregated tools" }
];

export const BUDGET_VS_ACTUAL_DATA: BudgetVsActualItem[] = [
  {
    tool: "ChatGPT",
    budget: 5000,
    actual: 4000,
    variance: -1000,
    utilizationRate: 80,
    status: 'Near Limit'
  },
  {
    tool: "Claude",
    budget: 3000,
    actual: 2500,
    variance: -500,
    utilizationRate: 83.3,
    status: 'Near Limit'
  },
  {
    tool: "Copilot",
    budget: 2000,
    actual: 1500,
    variance: -500,
    utilizationRate: 75,
    status: 'Under'
  },
  {
    tool: "Other",
    budget: 2000,
    actual: 1000,
    variance: -1000,
    utilizationRate: 50,
    status: 'Under'
  }
];

export const SHADOW_AI_DATA: ShadowAiItem[] = [
  { name: "Approved AI", value: 75, count: 90, color: "#0D9488" },
  { name: "Unapproved (Shadow)", value: 25, count: 30, color: "#E11D48" }
];

export const INITIAL_ALERTS: GovernanceAlert[] = [
  {
    id: "ALT-101",
    severity: "Critical",
    tool: "Jasper AI",
    department: "Marketing",
    event: "Unauthorized AI tool detected in use",
    date: "2026-11-14",
    status: "Open",
    approvalStatus: "Unapproved",
    detail: "14 web requests were detected to jasper.ai — a tool not authorized by the company, with no data protection agreement in place.",
    sourceCategory: "Network Security Logs",
    recommendation: "Block the domain or migrate the marketing team to the approved ChatGPT Enterprise workspace.",
    riskScore: 92
  },
  {
    id: "ALT-102",
    severity: "High",
    tool: "Claude",
    department: "Engineering",
    event: "AI spending nearing budget limit",
    date: "2026-11-13",
    status: "In Review",
    approvalStatus: "Approved",
    detail: "Claude API spending has reached $2,500 out of a $3,000 monthly limit (83.3% used).",
    sourceCategory: "Anthropic Usage API",
    recommendation: "Apply rate limits on non-production environments, or reallocate $500 from the 'Other' budget.",
    riskScore: 78
  },
  {
    id: "ALT-103",
    severity: "Critical",
    tool: "Midjourney",
    department: "Design",
    event: "Potential sensitive data shared with unauthorized AI",
    date: "2026-11-12",
    status: "Open",
    approvalStatus: "Unapproved",
    detail: "Frequent image generation detected using company project code names in prompts — sent to an unauthorized external AI service.",
    sourceCategory: "Network Security Logs",
    recommendation: "Issue a security warning to the Design lead; switch the team to Adobe Firefly Enterprise (with IP protection).",
    riskScore: 95
  },
  {
    id: "ALT-104",
    severity: "High",
    tool: "ChatGPT",
    department: "Sales",
    event: "Personal AI subscription expensed instead of company account",
    date: "2026-11-11",
    status: "Open",
    approvalStatus: "Approved",
    detail: "An employee submitted a personal $20/month ChatGPT Plus expense claim instead of using the company's Enterprise account.",
    sourceCategory: "Finance System",
    recommendation: "Reject the personal reimbursement and invite the employee to the company ChatGPT Enterprise workspace.",
    riskScore: 72
  },
  {
    id: "ALT-105",
    severity: "Medium",
    tool: "DeepSeek",
    department: "Research",
    event: "Unauthorized AI tool detected in use",
    date: "2026-11-10",
    status: "Resolved",
    approvalStatus: "Unapproved",
    detail: "A direct connection to an overseas AI API was detected and blocked by the company firewall.",
    sourceCategory: "Network Security Logs",
    recommendation: "Resolved: Firewall rule applied. Research team redirected to self-hosted Llama 3 instance.",
    riskScore: 58
  }
];

export const DATA_SOURCES: DataSourceInfo[] = [
  {
    id: "src-openai",
    name: "OpenAI Admin API",
    category: "AI Provider Billing API",
    purpose: "Ingests input/output tokens, model usage, and daily developer costs via GET /v1/organization/usage/completions and GET /v1/organization/costs.",
    status: "Connected",
    costType: "Actual Metered",
    syncFrequency: "Every 4 hours (batch polling)",
    lastSync: "12 mins ago",
    limitations: "Only monitors developer API accounts; consumer ChatGPT website usage (chatgpt.com) is not automatically visible.",
    recordsCount: "1,420,800 tokens",
    latencyMs: 142
  },
  {
    id: "src-anthropic",
    name: "Anthropic Usage & Cost Analytics API",
    category: "AI Provider Billing API",
    purpose: "Retrieves input/output/cached tokens and costs via GET /v1/organizations/{org_id}/usage and GET /v1/organizations/{org_id}/costs.",
    status: "Connected",
    costType: "Actual Metered",
    syncFrequency: "Every 4 hours (batch polling)",
    lastSync: "35 mins ago",
    limitations: "Covers developer API workspace keys; consumer claude.ai web subscriptions are not accessible.",
    recordsCount: "980,450 tokens",
    latencyMs: 185
  },
  {
    id: "src-idp",
    name: "Microsoft Graph API (Entra ID)",
    category: "Enterprise Identity (IdP)",
    purpose: "Retrieves employee identity, department codes, cost centers, and SSO logins via GET /v1.0/users and GET /v1.0/auditLogs/signIns.",
    status: "Connected",
    costType: "Invoiced Seat Cost",
    syncFrequency: "Hourly delta sync",
    lastSync: "8 mins ago",
    limitations: "Only tracks tools authenticated with corporate Single Sign-On (SSO); blind to direct username/password signups.",
    recordsCount: "120 active employees",
    latencyMs: 95
  },
  {
    id: "src-casb",
    name: "CASB & Network Logs",
    category: "Perimeter Security Proxy",
    purpose: "Detects AI website visits, device activity, and unapproved applications via outbound HTTPS domain logs (SNI records).",
    status: "Connected",
    costType: "Unavailable (Zero-Cost)",
    syncFrequency: "Near real-time (15-min batches)",
    lastSync: "Just now",
    limitations: "Network logs do NOT provide token counts or prompt text. Shadow AI costs are untracked liabilities until expensed.",
    recordsCount: "8,940 events",
    latencyMs: 38
  },
  {
    id: "src-finance",
    name: "Finance ERP & Invoicing (CSV)",
    category: "General Ledger & Procurement",
    purpose: "Ingests subscription invoices (Copilot @ $30/mo), actual card expenses, and allocated department budget limits ($12k ceiling).",
    status: "Connected",
    costType: "Actual Metered",
    syncFrequency: "Daily / Accounting close cycle",
    lastSync: "2 hours ago",
    limitations: "Invoicing introduces a 15-to-30 day lag; requires reconciliation with live credit card expense reports.",
    recordsCount: "$12,000 budget cap",
    latencyMs: 260
  }
];

export const AI_APPLICATIONS_CATALOG: AiApplicationItem[] = [
  {
    id: "app-1",
    name: "ChatGPT Enterprise",
    vendor: "OpenAI",
    category: "LLM Platform",
    approvalStatus: "Approved",
    activeUsers: 68,
    monthlyCost: 4000,
    costModel: "Direct API Token",
    riskLevel: "Low",
    department: "Cross-Functional",
    dataClassification: "Confidential"
  },
  {
    id: "app-2",
    name: "Claude 3.5 Sonnet (API)",
    vendor: "Anthropic",
    category: "Developer API",
    approvalStatus: "Approved",
    activeUsers: 34,
    monthlyCost: 2500,
    costModel: "Direct API Token",
    riskLevel: "Low",
    department: "Engineering",
    dataClassification: "Confidential"
  },
  {
    id: "app-3",
    name: "GitHub Copilot",
    vendor: "Microsoft / GitHub",
    category: "Coding Assistant",
    approvalStatus: "Approved",
    activeUsers: 50,
    monthlyCost: 1500,
    costModel: "Enterprise Seat License",
    riskLevel: "Low",
    department: "Engineering",
    dataClassification: "Internal Only"
  },
  {
    id: "app-4",
    name: "Jasper AI",
    vendor: "Jasper Inc.",
    category: "Copywriting",
    approvalStatus: "Unapproved",
    activeUsers: 14,
    monthlyCost: 0,
    costModel: "Shadow / Free Web",
    riskLevel: "Critical",
    department: "Marketing",
    dataClassification: "Restricted"
  },
  {
    id: "app-5",
    name: "Midjourney",
    vendor: "Midjourney Inc.",
    category: "Image & Media",
    approvalStatus: "Unapproved",
    activeUsers: 8,
    monthlyCost: 0,
    costModel: "Shadow / Free Web",
    riskLevel: "Critical",
    department: "Design",
    dataClassification: "Restricted"
  },
  {
    id: "app-6",
    name: "DeepSeek API",
    vendor: "DeepSeek",
    category: "Developer API",
    approvalStatus: "Unapproved",
    activeUsers: 6,
    monthlyCost: 0,
    costModel: "Shadow / Free Web",
    riskLevel: "High",
    department: "Research",
    dataClassification: "Restricted"
  },
  {
    id: "app-7",
    name: "Perplexity Enterprise",
    vendor: "Perplexity AI",
    category: "Search & Research",
    approvalStatus: "Approved",
    activeUsers: 22,
    monthlyCost: 400,
    costModel: "Enterprise Seat License",
    riskLevel: "Low",
    department: "Research",
    dataClassification: "Internal Only"
  },
  {
    id: "app-8",
    name: "Notion AI",
    vendor: "Notion Labs",
    category: "Copywriting",
    approvalStatus: "Approved",
    activeUsers: 35,
    monthlyCost: 350,
    costModel: "Enterprise Seat License",
    riskLevel: "Low",
    department: "Product",
    dataClassification: "Internal Only"
  },
  {
    id: "app-9",
    name: "Cursor AI",
    vendor: "Anysphere",
    category: "Coding Assistant",
    approvalStatus: "Approved",
    activeUsers: 12,
    monthlyCost: 250,
    costModel: "Enterprise Seat License",
    riskLevel: "Medium",
    department: "Engineering",
    dataClassification: "Confidential"
  },
  {
    id: "app-10",
    name: "Grammarly Business AI",
    vendor: "Grammarly",
    category: "Copywriting",
    approvalStatus: "Approved",
    activeUsers: 40,
    monthlyCost: 0,
    costModel: "Enterprise Seat License",
    riskLevel: "Low",
    department: "Sales & Marketing",
    dataClassification: "Unrestricted"
  },
  {
    id: "app-11",
    name: "Hugging Face Hub (Private)",
    vendor: "Hugging Face",
    category: "LLM Platform",
    approvalStatus: "Approved",
    activeUsers: 10,
    monthlyCost: 0,
    costModel: "Enterprise Seat License",
    riskLevel: "Low",
    department: "Data Science",
    dataClassification: "Confidential"
  }
];

export const DEPARTMENT_SPEND_DATA: DepartmentSpendItem[] = [
  { department: "Engineering", budget: 5500, spend: 4250, utilization: 77.3, activeUsers: 45, primaryTool: "Claude & GitHub Copilot" },
  { department: "Marketing", budget: 2200, spend: 1800, utilization: 81.8, activeUsers: 30, primaryTool: "ChatGPT Enterprise" },
  { department: "Sales", budget: 1800, spend: 1350, utilization: 75.0, activeUsers: 25, primaryTool: "ChatGPT & Notion AI" },
  { department: "Research", budget: 1200, spend: 950, utilization: 79.2, activeUsers: 12, primaryTool: "Perplexity & DeepSeek" },
  { department: "Design", budget: 800, spend: 400, utilization: 50.0, activeUsers: 8, primaryTool: "Midjourney & Firefly" },
  { department: "General & Admin", budget: 500, spend: 250, utilization: 50.0, activeUsers: 8, primaryTool: "Grammarly & ChatGPT" }
];
