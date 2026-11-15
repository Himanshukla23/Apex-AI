# AI Governance & FinOps Dashboard

> **APM Take-Home Assignment Prototype**  
> **Role:** Senior Product Manager, UI/UX Designer & Full-Stack Developer  
> **Status:** Prototype Complete & Verified  

An enterprise dashboard prototype providing organizations with centralized visibility into AI tool usage, spending, budget ceilings, and governance risks (Shadow AI).

---

## 🚀 Quick Start & How to Run

### Option 1: View the Live Server
The prototype is actively running locally on port 3000:
* **Dashboard URL:** [http://localhost:3000](http://localhost:3000)
* **Direct PDF Download:** [http://localhost:3000/AI_Governance_Dashboard_Assignment.pdf](http://localhost:3000/AI_Governance_Dashboard_Assignment.pdf)

### Option 2: Run Locally from Source
```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Launch preview server
npm run preview
```

---

## 📦 Key Deliverables

| Deliverable | Location | Description |
| :--- | :--- | :--- |
| **Interactive Prototype** | [http://localhost:3000](http://localhost:3000) | Built with React 18, TypeScript, Tailwind CSS, Recharts, Lucide |
| **Executive PDF Report** | [`AI_Governance_Dashboard_Assignment.pdf`](./AI_Governance_Dashboard_Assignment.pdf) | 5-page publication-grade PDF report with embedded screenshots |
| **Architecture Specification** | [`architecture.md`](./architecture.md) | 376-line technical and product architecture document |
| **Desktop Screenshot** | [`dashboard-desktop.png`](./dashboard-desktop.png) | 1440×1050 full desktop preview |
| **Mobile Screenshot** | [`dashboard-mobile.png`](./dashboard-mobile.png) | 400×900 responsive mobile preview |

---

## 🎯 Assignment Breakdown

### Part 1: One Dashboard Screen (Usage & Spend Limits)
* **4 Key Performance Indicators (KPIs):**
  * **Total AI Spend:** `$9,000` (75% of $12,000 monthly budget envelope)
  * **Active AI Users:** `120` employees mapped across 6 business units
  * **AI Tools Detected:** `11` total tools (8 approved enterprise tools · 3 unapproved shadow tools)
  * **Policy Alerts:** `5` active policy events requiring review
* **Interactive Governance & Policy Alerts Table:**
  * 6 columns: `Severity`, `AI Tool`, `Department`, `Event Description`, `Date`, `Action`
  * One-click **"Mark Reviewed"** / **"Re-open"** stateful triage
  * Instant search and severity filtering

---

### Part 2: APIs & Data Source Architecture
The platform synthesizes **5 external data sources** to produce unified metrics:

```
[External Sources] 
  ├── 1. OpenAI Admin API (Token usage & direct API metered costs)
  ├── 2. Anthropic Usage API (Claude API tokens & developer billing)
  ├── 3. Microsoft Entra ID / Okta (Employee directory, departments, SSO apps)
  ├── 4. CASB & Network Logs (Perimeter discovery of unapproved Shadow AI)
  └── 5. Finance ERP / Invoices (Department budgets & SaaS seat licenses)
       │
       ▼
[6-Stage Ingestion Pipeline]
  1. External Data Sources → 2. API Connectors → 3. Normalization Engine
  → 4. Identity & Tool Mapping → 5. Central Storage → 6. Dashboard & Alerts
```

#### Cost Classification:
1. **Actual Metered Spend:** Direct developer token consumption (OpenAI, Claude).
2. **Invoiced Seat Cost:** Provisioned enterprise SaaS licenses (GitHub Copilot, Notion AI).
3. **Unavailable (Zero-Cost):** Shadow AI web visits detected by proxy headers ($0 spend, high data risk).

#### Privacy & Telemetry Boundaries:
* Network logs inspect DNS / TLS Server Name Indication (SNI) records only.
* **Network logs do NOT decrypt HTTPS traffic or read prompt texts.**
* Consumer accounts ($20/mo personal Plus subscriptions) are discovered via network logs or expense claims, as they are invisible to provider enterprise Admin APIs.

---

### Part 3: Exactly Three Selected Visualizations

| Chart | Visual Type | Stakeholder | Business Justification |
| :--- | :--- | :--- | :--- |
| **1. AI Spending by Tool** | Bar Chart | **CFO** | **Cost Concentration:** Identifies that ChatGPT (\$4,000) and Claude (\$2,500) drive 72% of total spend, pinpointing priorities for volume discounts. |
| **2. Actual Spending vs Budget** | Grouped Bar Chart | **CFO & Dept Heads** | **Fiscal Variance:** Claude is at 83% and ChatGPT is at 80% capacity, signaling impending overruns before month-end. |
| **3. Approved vs Unapproved AI** | Donut Chart | **CISO / IT Security** | **Shadow AI Threat:** 1 in 4 AI visits occurs on unvetted tools lacking corporate Data Processing Agreements (DPAs). |

---

## 🛠️ Technology Stack
* **Frontend:** React 18, TypeScript
* **Styling:** Tailwind CSS (Enterprise SaaS light theme)
* **Visualizations:** Recharts (SVG Responsive Containers)
* **Icons:** Lucide React
* **Build System:** Vite
* **PDF Engine:** Python ReportLab (Two-pass NumberedCanvas)
