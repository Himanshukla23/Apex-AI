# APM Take-Home Assignment: AI Governance Dashboard

> **Candidate Submission**  
> **Role:** Associate Product Manager (APM)  
> **Project:** AI Governance & FinOps Dashboard  
> **Live Prototype:** [http://localhost:3000](http://localhost:3000)  
> **Official PDF Report:** [`AI_Governance_Dashboard_Assignment.pdf`](./AI_Governance_Dashboard_Assignment.pdf) (4 Pages)  

---

## Context: Week-1 Feature Scoping

Organizations are rapidly adopting AI tools (ChatGPT, Claude, GitHub Copilot, Midjourney, Jasper AI, etc.) across teams, often without centralized visibility into **who is using what, how much it costs, and whether usage stays within approved limits**. This is the **"Shadow AI"** problem and it is one of the fastest-growing pain points in enterprise SaaS and AI governance.

### Week-One PM Scoping Objective:
Think like a PM in week one of scoping a feature:
1. **Define the data you need**
2. **Decide how you'd source it**
3. **Figure out the simplest way to communicate it to non-technical stakeholders** (CFO and IT/Security Lead).

---

## Non-Technical Stakeholder Needs

| Stakeholder Persona | Core Questions Asked | How Dashboard Communicates Simply |
| :--- | :--- | :--- |
| **Chief Financial Officer (CFO)** | • How much did we spend on AI this month?<br>• Are we staying within our $12,000 budget limit?<br>• Which AI vendors drive the largest costs? | Replaces confusing API token math with a single aggregate spend card ($9,000 / 75% utilized) and a simple bar chart of vendor spending. |
| **IT & Security Lead (CISO)** | • What unauthorized tools are staff visiting?<br>• What share of AI traffic is on Shadow AI?<br>• Are sensitive credentials or data exposed? | Translates complex firewall proxy logs into a 75% vs. 25% traffic donut chart and an actionable alerts table highlighting unapproved tools. |

---

## Reconciled Organizational Metrics (Demo Data)

* **Total AI Spend:** **$9,000 / month** (ChatGPT $4,000 + Claude $2,500 + Copilot $1,500 + Other $1,000).
* **Monthly Budget Ceiling:** **$12,000 / month** (75.0% utilized, $3,000 runway remaining).
* **Active Employee Population:** **120 users** across 6 business units (Eng, Mktg, Sales, Research, Design, Admin).
* **AI Tool Perimeter Inventory:** **11 detected tools** (8 approved enterprise tools · 3 unapproved shadow tools).
* **Active Policy Alerts:** Exactly **5 active alerts** (2 Critical, 2 High, 1 Medium).
* **Traffic Compliance Ratio:** **75% approved vs. 25% unapproved outbound web sessions** (90 users on approved tools vs. ~30 observed on shadow tools).

---

## Part 1: Prototype a Screen

> **Assignment Prompt:**  
> *"Create a prototype or design one screen of an 'AI Governance Dashboard' that shows AI tool usage and spend limits across an organization. You don't need production-quality visuals, we're just evaluating product thinking. A rough but clearly-labeled prototype is fine."*

### Screen Architecture (One-Screen Hierarchy):
1. **Header Bar:** Context (`Acme Inc.`), `DEMO DATA` badge, `This Month` filter, and quick links to `Data Sources (5)` and `Download PDF`.
2. **Tier 1: Four Core KPI Cards (5-Second Glance Time):**
   * **Total AI Spend:** `$9,000` (75% of $12k budget, $3k runway).
   * **Active AI Users:** `120` employees mapped across 6 departments.
   * **AI Tools Detected:** `11` total tools (8 approved · 3 shadow).
   * **Policy Alerts:** `5` active policy events requiring review.
3. **Tier 2: Three Focused Visualizations (Side-by-Side):**
   * Spend by tool, budget limits, and approval compliance ratio.
   * Cross-chart filtering: clicking any bar or donut segment filters the alerts table below.
4. **Tier 3: Governance & Policy Alerts Table (Actionable Triage):**
   * 6 standard columns: `Severity`, `AI Tool`, `Department`, `Event Description`, `Date`, `Action`.
   * One-click **"Mark Reviewed"** button that updates status live.
   * Simple search bar and severity filter.

---

## Part 2: API & Data Source Plan

> **Assignment Prompt:**  
> *"What APIs or data sources would you pull from to power this dashboard?"*

### Compact Data Source Matrix

| API / Data Source | Data Retrieved & Exact Endpoints |
| :--- | :--- |
| **OpenAI Admin API**<br>*(Direct AI Provider API)* | **Data Retrieved:** Input/output tokens, model-wise usage, and API costs.<br>**Exact Endpoints:**<br>• `GET /v1/organization/usage/completions` (model-specific prompt & completion token counts)<br>• `GET /v1/organization/costs` (daily aggregated dollar costs for developer API projects) |
| **Anthropic Usage & Cost Analytics API**<br>*(Direct AI Provider API)* | **Data Retrieved:** Input/output/cached tokens, model-wise usage, and costs.<br>**Exact Endpoints:**<br>• `GET /v1/organizations/{org_id}/usage` (token breakdowns across Claude 3.5 Sonnet / Haiku)<br>• `GET /v1/organizations/{org_id}/costs` (workspace-level dollar cost accrual) |
| **Microsoft Graph API (Entra ID)**<br>*(Enterprise Identity & Access)* | **Data Retrieved:** Employee identity, department, cost centers, and application sign-in activity.<br>**Exact Endpoints:**<br>• `GET /v1.0/users` (employee metadata, department codes, cost centers)<br>• `GET /v1.0/auditLogs/signIns` (active user sessions on approved SAML/SSO AI applications) |
| **CASB / Network Logs**<br>*(Perimeter Security Proxy Logs)* | **Data Retrieved:** AI website visits, user/device activity, and unapproved applications.<br>**Log Protocols:** Syslog / S3 streams from Zscaler, Netskope, or corporate DNS firewalls.<br>**Coverage:** Outbound HTTPS domain hits (SNI records) flagging Shadow AI (e.g. `midjourney.com`, `jasper.ai`). |
| **Finance ERP / CSV**<br>*(General Ledger & Accounting)* | **Data Retrieved:** Subscription invoices, actual payments, corporate card expenses, and allocated budgets.<br>**Sources:** NetSuite API, Workday REST API, or monthly Accounting CSV uploads.<br>**Coverage:** Official $12,000 monthly budget ceiling and fixed SaaS seat invoices (Copilot @ $30/mo). |

### Technical Accuracy & Engineering Rules:
1. **Consumer Web Accounts are Invisible to Provider APIs:** Consumer ChatGPT website usage (`chatgpt.com`) via personal email or individual $20/mo Plus plans is *not automatically visible through OpenAI API usage reporting*. That usage is captured solely through CASB network logs or expense claims.
2. **Network Logs Do NOT Provide Token Counts:** Network firewalls inspect TLS Server Name Indication (SNI) records to discover domain hits. Because traffic is encrypted (HTTPS/TLS 1.3), *network logs cannot inspect prompt contents or measure token counts*. Network telemetry detects WHICH tools are used, not token consumption.
3. **Shadow AI Costs Are Untracked (Not Zero):** Shadow AI costs must *not* be classified as zero. They are **untracked / unknown** financial liabilities until expense reports or vendor invoices are processed.
4. **Distinguishing API Costs from Subscription Invoices:** The dashboard explicitly reconciles *metered developer API consumption* (OpenAI/Claude tokens) separately from *fixed SaaS seat licenses* (Copilot at $30/seat/month from Finance ERP).

### Simplified Ingestion Flow:
```
[1. External Sources] ──> [2. API Connectors] ──> [3. Normalization] ──> [4. Dashboard & Alerts]
  (OpenAI, Claude, Okta,     (REST, SCIM, Syslog)    (Token-to-$, Dept Cost    (KPIs, 3 Charts, Real-Time
   CASB, Finance ERP)                                 Mapping, Risk Rules)       Governance Alerts Table)
```

---

## Part 3: Pick Your Three Charts (and Why)

> **Assignment Prompt:**  
> *"If you could only show three charts on this dashboard to communicate usage and spend-limit information, which three would you choose, and why?"*

| Selected Chart | Visual Type & Data | Stakeholder | Strategic Business Justification (Why This Chart Was Chosen) |
| :--- | :--- | :--- | :--- |
| **Chart 1:<br>AI Spending by Tool** | **Bar Chart**<br>• ChatGPT: $4,000<br>• Claude: $2,500<br>• Copilot: $1,500<br>• Other: $1,000<br>**Total: $9,000** | **CFO & Procurement** | **Identifies Cost Concentration (Pareto Principle):**<br>Non-technical CFOs need to know where money is concentrated without opening spreadsheets. ChatGPT (44.4%) and Claude (27.8%) account for **72.2% of all enterprise AI spending**. This directs procurement to focus volume discount renegotiations on OpenAI and Anthropic rather than wasting time on minor vendors. |
| **Chart 2:<br>Actual Spend vs. Budget** | **Grouped Bar Chart**<br>• ChatGPT: $4k / $5k (80%)<br>• Claude: $2.5k / $3k (83%)<br>• Copilot: $1.5k / $2k (75%)<br>• Other: $1k / $2k (50%) | **CFO & Dept Heads** | **Prevents Budget Overruns & Displays Spending Limits:**<br>An aggregate spend number ($9k / $12k) can mask localized budget breaches. This chart reveals that Claude is at **83.3% capacity** and ChatGPT is at **80%**, signaling impending overruns before month-end. It also shows a $1,000 surplus in 'Other' that can be safely reallocated to prevent work stoppages. |
| **Chart 3:<br>Approved vs. Unapproved AI** | **Donut Chart** with Center KPI<br>• Approved: **75%**<br>• Shadow AI: **25%**<br>*(Based on outbound web sessions)* | **IT & Security Lead (CISO)** | **Quantifies the 'Shadow AI' Problem for Non-Technical Leaders:**<br>Security risks are often difficult to communicate to executive peers. This donut chart translates complex network traffic into a clear risk ratio: **1 in every 4 AI interactions is on an unapproved platform** (Jasper, Midjourney). These tools lack corporate DPAs, arming the CISO with quantifiable proof to enforce security guardrails. |

---

## Actionable Incident Governance (5 Active Policy Alerts)

The prototype includes an interactive **Policy Alerts Table** with **5 active incidents** (2 Critical, 2 High, 1 Medium) covering unauthorized Shadow AI detection, prompt DLP patterns, and budget burn rate warnings with a 1-click **"Mark Reviewed"** triage action.

---

## Week-1 Scoping: MVP Scope, Assumptions & Limitations

| Dimension | MVP Scope (Week 1 Implemented) | Assumptions & Technical Constraints |
| :--- | :--- | :--- |
| **Prototype Execution** | Single-screen React/TypeScript app with stateful triage, filtering, and responsive views. | Operates on realistic local mock data (`governanceData.ts`). No live external credentials connected. |
| **Data Latency** | Simulated multi-tier sync schedules: 4h for provider APIs, 1h for IdP, 15m for CASB logs. | Provider APIs enforce 4-to-24 hour billing reporting latency; dashboard displays clear "Data as of" timestamps. |
| **Shadow AI Costing** | Shadow AI traffic is flagged by session count and risk score; spend is classified as untracked. | Network logs detect domain hits but cannot infer prompt token volume or licensing tier without SSL decryption. |
