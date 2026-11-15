import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

# Dynamic two-pass "Page X of Y" canvas
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748B"))

        # Running Header on pages 2..N
        if self._pageNumber > 1:
            self.drawString(36, 756, "APM Take-Home Assignment: AI Governance Dashboard | Candidate Submission")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.75)
            self.line(36, 750, 576, 750)

        # Running Footer on all pages
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(36, 36, 576, 36)

        self.setFont("Helvetica", 7.5)
        self.drawString(36, 25, "APM TAKE-HOME ASSIGNMENT SUBMISSION — CONFIDENTIAL — DEMO DATA")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(576, 25, page_str)
        self.restoreState()

def build_pdf():
    pdf_filename = "AI_Governance_Dashboard_Assignment.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=40,
        bottomMargin=42
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor("#0B132B")
    )
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#2563EB")
    )
    meta_style = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#64748B")
    )
    part_banner_style = ParagraphStyle(
        'PartBanner',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.white
    )
    prompt_quote_style = ParagraphStyle(
        'PromptQuote',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#1E293B")
    )
    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#0B132B"),
        spaceBefore=5,
        spaceAfter=2
    )
    h2_style = ParagraphStyle(
        'Header2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#1E293B"),
        spaceBefore=4,
        spaceAfter=2
    )
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.8,
        textColor=colors.HexColor("#334155")
    )
    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.8,
        textColor=colors.HexColor("#334155"),
        leftIndent=10,
        spaceBefore=1
    )
    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.5,
        textColor=colors.HexColor("#1E293B")
    )
    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white
    )

    story = []

    # =========================================================================
    # PAGE 1: CONTEXT + PART 1 : PROTOTYPE A SCREEN
    # =========================================================================
    title_table_data = [
        [
            Paragraph("APM Take-Home Assignment: AI Governance Dashboard", title_style),
            Paragraph("<b>ASSIGNMENT:</b> APM TAKE-HOME<br/><b>PROTOTYPE:</b> COMPLETED<br/><b>ORG:</b> ACME INC. (DEMO)", meta_style)
        ],
        [
            Paragraph("Week-1 Feature Scoping: AI Tool Usage, Spend Limits & Shadow AI Governance", subtitle_style),
            Paragraph("<b>TARGET AUDIENCE:</b> CFO & IT/Security Lead", meta_style)
        ]
    ]
    title_table = Table(title_table_data, colWidths=[390, 150])
    title_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(title_table)
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2563EB"), spaceAfter=5))

    # Context Callout
    context_text = (
        "<b>Context & The 'Shadow AI' Problem:</b> Organizations are rapidly adopting AI tools (ChatGPT, Claude, Copilot, Midjourney, etc.) "
        "across teams, often without centralized visibility into <b>who is using what, how much it costs, and whether usage stays within approved limits</b>. "
        "This week-one scoping exercise defines the necessary data, how to source it, and the simplest way to communicate usage and spend limits "
        "to non-technical stakeholders (CFO for financial control; IT/Security Lead for compliance & data risk)."
    )
    story.append(Paragraph(context_text, body_style))
    story.append(Spacer(1, 5))

    # Part 1 Banner
    p1_banner = Table([[Paragraph("PART 1 : PROTOTYPE A SCREEN", part_banner_style)]], colWidths=[540])
    p1_banner.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#1D4ED8")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(p1_banner)
    story.append(Spacer(1, 3))

    p1_prompt = "<b>Assignment Prompt:</b> <i>'Create a prototype or design one screen of an AI Governance Dashboard that shows AI tool usage and spend limits across an organization. A rough but clearly-labeled prototype is fine.'</i>"
    story.append(Paragraph(p1_prompt, prompt_quote_style))
    story.append(Spacer(1, 3))

    # Prototype Screenshot
    if os.path.exists("dashboard-desktop.png"):
        story.append(RLImage("dashboard-desktop.png", width=540, height=270))
        story.append(Paragraph("<i>Figure 1: Single-Screen AI Governance Dashboard Prototype — 4 Key Metrics, 3 Core Visualizations, and Actionable Incident Governance Table.</i>", meta_style))
    story.append(Spacer(1, 4))

    # Screen Architecture Breakdown
    screen_breakdown_data = [
        [
            Paragraph("<b>Dashboard Zone</b>", table_header),
            Paragraph("<b>Information Communicated to Non-Technical Stakeholders</b>", table_header),
            Paragraph("<b>Reconciled Metric Value (Demo Data)</b>", table_header)
        ],
        [
            Paragraph("<b>Top KPI Cards</b><br/><i>(5-sec glance time)</i>", table_cell),
            Paragraph("• <b>Total AI Spend:</b> Reconciled spend against monthly budget ceiling.<br/>• <b>Active AI Users:</b> Employee adoption across business units.<br/>• <b>Tools Detected:</b> Total AI perimeter inventory (approved vs. shadow).<br/>• <b>Policy Alerts:</b> Urgent security and budget incidents needing review.", table_cell),
            Paragraph("• <b>$9,000</b> spent (75.0% of $12k limit)<br/>• <b>120 active users</b> across 6 depts<br/>• <b>11 tools detected</b> (8 approved, 3 shadow)<br/>• <b>5 active alerts</b> (2 crit, 2 high, 1 med)", table_cell)
        ],
        [
            Paragraph("<b>Three Core Charts</b><br/><i>(Middle tier)</i>", table_cell),
            Paragraph("• <b>Spend by Tool (Bar):</b> Pareto cost concentration ($4k ChatGPT + $2.5k Claude = 72% spend).<br/>• <b>Actual vs. Budget (Grouped):</b> Individual tool runway (Claude at 83%, ChatGPT at 80%).<br/>• <b>Approved vs. Shadow AI (Donut):</b> Compliance ratio (75% approved vs. 25% unapproved sessions).", table_cell),
            Paragraph("Communicates vendor spend concentration, budget limits, and Shadow AI exposure at a single glance.", table_cell)
        ],
        [
            Paragraph("<b>Alerts Table</b><br/><i>(Bottom tier)</i>", table_cell),
            Paragraph("Six-column actionable table (Severity, Tool, Department, Event Description, Date, Action) with a 1-click 'Mark Reviewed' button to triage unapproved tool access.", table_cell),
            Paragraph("Direct bridge from passive visibility to active governance enforcement.", table_cell)
        ]
    ]
    sb_table = Table(screen_breakdown_data, colWidths=[105, 290, 145])
    sb_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0B132B")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#F8FAFC"), colors.white]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(sb_table)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: PART 2 : API & DATA SOURCE PLAN
    # =========================================================================
    p2_banner = Table([[Paragraph("PART 2 : API & DATA SOURCE PLAN", part_banner_style)]], colWidths=[540])
    p2_banner.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#0D9488")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(p2_banner)
    story.append(Spacer(1, 3))

    p2_prompt = "<b>Assignment Prompt:</b> <i>'What APIs or data sources would you pull from to power this dashboard?'</i>"
    story.append(Paragraph(p2_prompt, prompt_quote_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph(
        "To provide a complete governance view, data is integrated across three functional pillars: <b>(1) Token Usage</b>, <b>(2) Application Discovery</b>, and <b>(3) Financial Budgets</b>. Below is the compact API sourcing plan:",
        body_style
    ))
    story.append(Spacer(1, 4))

    # Compact 2-Column Table as specifically requested
    api_compact_table = [
        [
            Paragraph("<b>API / Data Source</b>", table_header),
            Paragraph("<b>Data Retrieved & Exact Endpoints</b>", table_header)
        ],
        [
            Paragraph("<b>OpenAI Admin API</b><br/><i>Direct AI Provider API</i>", table_cell),
            Paragraph("<b>Data Retrieved:</b> Input/output tokens, model-wise usage, and API costs.<br/><b>Exact Endpoints:</b><br/>• `GET /v1/organization/usage/completions` (model-specific prompt & completion token counts)<br/>• `GET /v1/organization/costs` (daily aggregated dollar costs for developer API projects)", table_cell)
        ],
        [
            Paragraph("<b>Anthropic Usage & Cost Analytics API</b><br/><i>Direct AI Provider API</i>", table_cell),
            Paragraph("<b>Data Retrieved:</b> Input/output/cached tokens, model-wise usage, and costs.<br/><b>Exact Endpoints:</b><br/>• `GET /v1/organizations/{org_id}/usage` (token breakdowns across Claude 3.5 Sonnet / Haiku)<br/>• `GET /v1/organizations/{org_id}/costs` (workspace-level dollar cost accrual)", table_cell)
        ],
        [
            Paragraph("<b>Microsoft Graph API (Entra ID)</b><br/><i>Enterprise Identity & Access (IdP)</i>", table_cell),
            Paragraph("<b>Data Retrieved:</b> Employee identity, department, cost centers, and application sign-in activity.<br/><b>Exact Endpoints:</b><br/>• `GET /v1.0/users` (employee metadata, department codes, cost centers)<br/>• `GET /v1.0/auditLogs/signIns` (active user sessions on approved SAML/SSO AI applications)", table_cell)
        ],
        [
            Paragraph("<b>CASB / Network Logs</b><br/><i>Perimeter Security Proxy Logs</i>", table_cell),
            Paragraph("<b>Data Retrieved:</b> AI website visits, user/device activity, and unapproved applications.<br/><b>Log Protocols:</b> Syslog / S3 streams from Zscaler, Netskope, or corporate DNS firewalls.<br/><b>Coverage:</b> Outbound HTTPS domain hits (SNI records) flagging Shadow AI (e.g., `midjourney.com`, `jasper.ai`).", table_cell)
        ],
        [
            Paragraph("<b>Finance ERP / CSV</b><br/><i>General Ledger & Accounting</i>", table_cell),
            Paragraph("<b>Data Retrieved:</b> Subscription invoices, actual payments, corporate card expenses, and allocated budgets.<br/><b>Sources:</b> NetSuite API, Workday REST API, or monthly Accounting CSV uploads.<br/><b>Coverage:</b> Official $12,000 monthly budget ceiling and fixed SaaS seat invoices (Copilot @ $30/mo).", table_cell)
        ]
    ]
    at_table = Table(api_compact_table, colWidths=[150, 390])
    at_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0B132B")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#F8FAFC"), colors.white]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(at_table)
    story.append(Spacer(1, 5))

    story.append(Paragraph("<b>Technical Accuracy & Architectural Governance Rules</b>", h1_style))
    story.append(Paragraph("• <b>Consumer Web Accounts are Invisible to Provider APIs:</b> Consumer ChatGPT website usage (`chatgpt.com`) via personal email or individual $20/mo Plus plans is <i>not automatically visible through OpenAI API usage reporting</i>. That usage is captured solely through CASB network logs or corporate card expense claims.", bullet_style))
    story.append(Paragraph("• <b>Network Logs Do NOT Provide Token Counts:</b> Modern network firewalls inspect TLS Server Name Indication (SNI) to discover web visits. Because traffic is encrypted (HTTPS/TLS 1.3), <i>network logs cannot inspect prompt contents or measure token counts</i>. Network telemetry detects WHICH tools are used, not token consumption.", bullet_style))
    story.append(Paragraph("• <b>Shadow AI Costs Are Untracked (Not Zero):</b> Shadow AI costs must <i>not</i> be classified as zero. They are <b>untracked / unknown</b> financial liabilities until expense reports or vendor invoices are processed.", bullet_style))
    story.append(Paragraph("• <b>Distinguishing API Costs from Subscription Invoices:</b> The dashboard explicitly reconciles <i>metered developer API consumption</i> (OpenAI/Claude tokens) separately from <i>fixed SaaS seat licenses</i> (Copilot at $30/seat/month from Finance ERP).", bullet_style))

    story.append(Spacer(1, 5))
    story.append(Paragraph("<b>Simplified End-to-End Data Flow Pipeline</b>", h2_style))
    
    flow_simple_data = [
        [
            Paragraph("<b>1. External Sources</b><br/>OpenAI, Claude, Okta, CASB, ERP", table_cell),
            Paragraph("<b>→</b>", table_header),
            Paragraph("<b>2. API Connectors</b><br/>REST Polling, SCIM, Syslog", table_cell),
            Paragraph("<b>→</b>", table_header),
            Paragraph("<b>3. Normalization</b><br/>Token-to-$, Dept Cost Mapping", table_cell),
            Paragraph("<b>→</b>", table_header),
            Paragraph("<b>4. Dashboard & Alerts</b><br/>KPIs, 3 Charts, Real-Time Alerts", table_cell)
        ]
    ]
    fs_table = Table(flow_simple_data, colWidths=[120, 15, 120, 15, 130, 15, 125])
    fs_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 3),
        ('RIGHTPADDING', (0,0), (-1,-1), 3),
        ('ALIGN', (1,0), (1,-1), 'CENTER'),
        ('ALIGN', (3,0), (3,-1), 'CENTER'),
        ('ALIGN', (5,0), (5,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(fs_table)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: PART 3 : PICK YOUR THREE CHARTS (AND WHY)
    # =========================================================================
    p3_banner = Table([[Paragraph("PART 3 : PICK YOUR THREE CHARTS (AND WHY)", part_banner_style)]], colWidths=[540])
    p3_banner.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#4F46E5")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(p3_banner)
    story.append(Spacer(1, 3))

    p3_prompt = "<b>Assignment Prompt:</b> <i>'If you could only show three charts on this dashboard to communicate usage and spend-limit information, which three would you choose, and why?'</i>"
    story.append(Paragraph(p3_prompt, prompt_quote_style))
    story.append(Spacer(1, 3))

    # Embed Charts Screenshot
    if os.path.exists("dashboard-charts.png"):
        story.append(RLImage("dashboard-charts.png", width=540, height=170))
        story.append(Paragraph("<i>Figure 2: The Three Selected Visualizations — Spend by Tool (Bar), Spend vs. Budget (Grouped Bar), and Approved vs. Unapproved AI Usage (Donut).</i>", meta_style))
    story.append(Spacer(1, 5))

    chart_justifications = [
        [
            Paragraph("<b>Selected Chart</b>", table_header),
            Paragraph("<b>Type & Data</b>", table_header),
            Paragraph("<b>Stakeholder</b>", table_header),
            Paragraph("<b>Strategic Business Justification (Why This Chart Was Chosen)</b>", table_header)
        ],
        [
            Paragraph("<b>Chart 1:<br/>AI Spending by Tool</b>", table_cell),
            Paragraph("<b>Bar Chart</b><br/>• ChatGPT: $4,000<br/>• Claude: $2,500<br/>• Copilot: $1,500<br/>• Other: $1,000<br/><b>Total: $9,000</b>", table_cell),
            Paragraph("<b>CFO & Procurement</b>", table_cell),
            Paragraph("<b>Identifies Cost Concentration (Pareto Principle):</b><br/>Non-technical CFOs need to know where the money is concentrated without opening spreadsheets. ChatGPT (44.4%) and Claude (27.8%) account for <b>72.2% of all enterprise AI spending</b>. This directs procurement to focus volume discount renegotiations on OpenAI and Anthropic rather than wasting time on minor vendors.", table_cell)
        ],
        [
            Paragraph("<b>Chart 2:<br/>Actual Spend vs. Budget</b>", table_cell),
            Paragraph("<b>Grouped Bar</b><br/>• ChatGPT: $4k / $5k (80%)<br/>• Claude: $2.5k / $3k (83%)<br/>• Copilot: $1.5k / $2k (75%)<br/>• Other: $1k / $2k (50%)", table_cell),
            Paragraph("<b>CFO & Dept Heads</b>", table_cell),
            Paragraph("<b>Prevents Budget Overruns & Displays Spending Limits:</b><br/>An aggregate spend number ($9k / $12k) can mask localized budget breaches. This chart reveals that Claude is at <b>83.3% capacity</b> and ChatGPT is at <b>80%</b>, signaling impending overruns before month-end. It also shows a $1,000 surplus in 'Other' that can be safely reallocated to prevent work stoppages.", table_cell)
        ],
        [
            Paragraph("<b>Chart 3:<br/>Approved vs. Unapproved AI</b>", table_cell),
            Paragraph("<b>Donut Chart</b><br/>• Approved: <b>75%</b><br/>• Shadow AI: <b>25%</b><br/><i>(Based on outbound web sessions)</i>", table_cell),
            Paragraph("<b>IT & Security Lead (CISO)</b>", table_cell),
            Paragraph("<b>Quantifies the 'Shadow AI' Problem for Non-Technical Leaders:</b><br/>Security risks are often difficult to communicate to executive peers. This donut chart translates complex network traffic into a clear risk ratio: <b>1 in every 4 AI interactions is on an unapproved platform</b> (Jasper, Midjourney). These tools lack corporate DPAs, arming the CISO with quantifiable proof to enforce security guardrails.", table_cell)
        ]
    ]
    c_table = Table(chart_justifications, colWidths=[85, 105, 80, 270])
    c_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0B132B")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#F8FAFC"), colors.white]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(c_table)
    story.append(Spacer(1, 5))

    story.append(Paragraph("<b>Summary & Week-1 MVP Scoping Assumptions</b>", h2_style))
    story.append(Paragraph(
        "• <b>Prototypes & Mock Data:</b> The prototype runs on deterministic mock data (`governanceData.ts`) showing $9,000 spend against a $12,000 limit across 120 employees and 11 detected tools.<br/>"
        "• <b>Active Governance:</b> Exactly 5 active alerts (2 Critical, 2 High, 1 Medium) demonstrate real-time triage for unapproved AI detection and budget thresholds.<br/>"
        "• <b>Deliverables Complete:</b> All 3 assignment parts are fully addressed: (1) Prototype Screen, (2) API & Data Source Plan, and (3) Three Selected Charts.",
        body_style
    ))

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated: {pdf_filename}")

if __name__ == '__main__':
    build_pdf()
