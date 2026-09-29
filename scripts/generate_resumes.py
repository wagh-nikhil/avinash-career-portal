#!/usr/bin/env python3
"""
Resume HTML & PDF Generator for Avinash Jadhav
Generates clean, ATS-compliant, executive-styled HTML resumes and prints them to PDF via headless browser.
"""

import os
import subprocess
import shutil
from pathlib import Path

RESUMES = [
    {
        "id": "track-1",
        "filename_base": "Avinash_Jadhav_Resume_Physical_Security_Program_Manager",
        "title": "AVINASH JADHAV",
        "subtitle": "Senior Program Manager | Physical Security Infrastructure SME",
        "contact": "Bengaluru, India (Open to Relocation / Remote to Mumbai/Hyderabad) • +91 9901071166 • ajadhav311989@gmail.com • linkedin.com/in/avinash-jadhav-54a67645",
        "summary": "Data Center & Enterprise Physical Security Subject Matter Expert with 14+ years of hands-on engineering and program delivery experience across APAC and EMEA. Proven track record managing physical security projects from early design and AutoCAD submittals to installation, testing, commissioning and operational turnover. Expert in aligning complex regional construction with baseline standards, vendor management, and enterprise security platforms (Lenel OnGuard, Genetec Security Center, S2). Experienced in supporting critical infrastructure, executing site walks, and managing customer-facing relationships with cross-functional stakeholders.",
        "skills": [
            ("Data Center & Critical Infrastructure", "Physical Security Design, Site Turnover, Operational Acceptance, Commissioning, Audits, Punch List Verification, Test & Acceptance (T&A)."),
            ("Physical Security Systems", "Access Control (ACS), Video Management Systems (VMS), Intrusion Detection Systems (IDS), Perimeter Intrusion Detection (PIDS), Intercoms, Edge Controllers."),
            ("Platforms & Tools", "Lenel OnGuard (Certified), Genetec Security Center (Certified), S2 Systems, AutoCAD, Visio, ServiceNow, Jira."),
            ("Project & Vendor Management", "Subcontractor Technical Oversight, SOW Compliance, Design Drawings Review, RFIs, Budgeting, Schedule Enforcement, Root Cause Analysis (RCA)."),
            ("Standards & Compliance", "Alignment with CPP/PSP principles, ISO 27001, PCI DSS, SOC 2, Indian Jurisdictional & Construction Standards.")
        ],
        "experience": [
            {
                "company": "ORACLE",
                "role": "Technical Program Lead – Security Operations & Systems Engineering",
                "period": "Aug 2021 – Present",
                "location": "Bengaluru, India",
                "bullets": [
                    "Lead end-to-end physical security program execution for complex enterprise and critical sites, managing initial layout, system design reviews, construction oversight, and commissioning.",
                    "Provide SME guidance on physical security standards, reviewing vendor design submittals, AutoCAD drawings, and scope of work (SOW) compliance across regional facility deployments.",
                    "Validate installation and configuration quality through structured site walks, commissioning reviews, and contractor audits to enforce project schedules and defect closure.",
                    "Perform system commissioning and final Test & Acceptance for Access Control (ACS), CCTV/VMS, and Intrusion Detection Systems across enterprise locations.",
                    "Act as primary technical liaison for cross-functional partners (Global IT, Facilities, HR, Legal) and external integration partners to resolve design gaps and streamline project delivery.",
                    "Evaluate emerging AI video analytics and edge technologies to improve threat detection and maximize security system uptime."
                ]
            },
            {
                "company": "MASTERCARD",
                "role": "Senior Analyst – Corporate Security Infrastructure",
                "period": "Dec 2017 – Jul 2021",
                "location": "Pune, India",
                "bullets": [
                    "Managed regional physical security infrastructure builds and upgrades, maintaining strict compliance with ISO 27001, SOC 2, and PCI DSS baseline requirements.",
                    "Engineered and validated local edge-controller configurations to guarantee redundant logging and video recording during critical infrastructure events.",
                    "Oversee site vulnerability audits, physical security system health checks, and preventative maintenance workflows with third-party vendors and integrators.",
                    "Recognition: Awarded Corporate 'Innovation Award' and 'Challenge Coin Award' for excellence in security infrastructure delivery."
                ]
            }
        ],
        "earlier_experience": [
            ("Target", "Security Consultant", "Jun 2017 – Dec 2017", "Conducted physical risk assessments, vulnerability audits, and initial security system design for corporate assets."),
            ("Wells Fargo", "Technology Specialist", "Feb 2015 – May 2017", "Executed enterprise access control expansions and integrated multi-site physical security hardware."),
            ("Tyco", "Project Engineer", "Sep 2012 – Jan 2015", "Commissioned Perimeter Intrusion Detection Systems (PIDS) and integrated large-scale security systems."),
            ("Siemens", "Project Engineer", "Oct 2011 – Sep 2012", "Created AutoCAD CCTV layouts, ACS architecture diagrams, and submittal packages for large-scale facilities.")
        ],
        "education": [
            "Bachelor of Technology (B.Tech) in Electronics & Communications — S.S.I.T (2011)",
            "Certified Systems Engineer: Lenel OnGuard & Genetec Security Center",
            "Professional Scrum Master I (PSM I) — Agile Project Execution",
            "Oracle Cloud Infrastructure AI Foundations Associate (2025)",
            "Oracle Data Center Operations Certified Foundations Associate (2026)",
            "In Progress / Aligned: Certified Protection Professional (CPP) / Physical Security Professional (PSP) framework"
        ],
        "languages_mobility": "Languages: English (Fluent / Professional), Hindi (Proficient), Marathi, Telugu • Travel Mobility: Fully flexible and equipped for up to 50% regional and global travel, including short notice travel for site walks, commissioning and turnover."
    },
    {
        "id": "track-2",
        "filename_base": "Avinash_Jadhav_Resume_Data_Center_Infrastructure_Engineer",
        "title": "AVINASH JADHAV",
        "subtitle": "Security Systems Engineer – Data Center Infrastructure",
        "contact": "Bengaluru, India (Open to Relocation to Mumbai / Pune) • +91 9901071166 • ajadhav311989@gmail.com • linkedin.com/in/avinash-jadhav-54a67645 • Native Fluency in Marathi, English & Hindi",
        "summary": "Data Center & Critical Infrastructure Engineering SME with 14+ years of experience leading end-to-end technical solutioning, post-sales deployment, fitout integration, and physical infrastructure delivery across hyperscale and enterprise environments. Proven track record collaborating with sales, client success, legal, and engineering teams to translate complex client requirements into scalable MEP-aligned, fiber network, BMS, and physical security solutions. Expert in conducting site walkthroughs, leading technical presentations, authoring technical response packages (RFPs/RFIs), and ensuring contract/lease review compliance.",
        "skills": [
            ("Data Center Infrastructure & Solutions", "Hyperscale & Enterprise Solutions Design, Post-Sales Engineering, Technical Response Packages (RFPs/RFIs), Client Technical Tours, Quoting & SOW Alignment, Site Handover & Commissioning."),
            ("MEP, BMS & Physical Systems", "Mechanical, Electrical & Plumbing (MEP) Alignment, Fault-Tolerant Power Redundancy, Liquid Cooling Concepts, Building Management Systems (BMS), Fiber Network Infrastructure, Access Control & VMS/CCTV."),
            ("Stakeholder & Legal Alignment", "Lease & Contract Review Support, Cross-Functional Team Leadership (Sales, Legal, Ops, SMEs), Vendor & OEM Technical Management, Customer Acceptance (UAT)."),
            ("Standards & Enterprise Platforms", "AutoCAD, Visio, ServiceNow, Jira, Genetec Security Center, Lenel OnGuard, ISO 27001, SOC 2, OCI Data Center Operations Certified.")
        ],
        "experience": [
            {
                "company": "ORACLE",
                "role": "Senior Program Manager – Data Center Infrastructure & Security Solutions",
                "period": "Aug 2021 – Present",
                "location": "Bengaluru, India",
                "bullets": [
                    "Post-Sales Technical Solutioning: Lead end-to-end technical solutioning and delivery for mission-critical enterprise and hyperscale data center facilities, translating client operational needs into technical architectures.",
                    "Cross-Functional Collaboration: Partner directly with Sales, Product Management, Legal, and Facilities teams to prepare comprehensive technical response packages, client proposal reviews, and Scope of Work (SOW) compliance documentation.",
                    "MEP & Infrastructure Integration: Oversee vendor technical submittals, AutoCAD design layouts, and engineering integration across MEP, BMS, power redundancy, and high-security physical infrastructure.",
                    "Contract & Lease Technical Support: Assist Legal and Operations teams during client lease and SLA reviews to verify technical feasibility, power/cooling redundancy commitments, and security compliance.",
                    "Client Tours & Solution Presentations: Lead facility walkthroughs and technical presentation sessions for prospective and existing hyperscale/enterprise clients, demonstrating facility differentiators and technical capabilities.",
                    "System Commissioning & Acceptance: Direct final testing, commissioning, and Operational Acceptance (T&A) for complex physical infrastructure systems, edge-controllers, and AI-driven monitoring platforms."
                ]
            },
            {
                "company": "MASTERCARD",
                "role": "Senior Analyst – Corporate Security Infrastructure & Engineering",
                "period": "Dec 2017 – Jul 2021",
                "location": "Pune, India",
                "bullets": [
                    "Regional Technical Delivery: Managed physical security and infrastructure upgrades for critical facilities, ensuring strict alignment with ISO 27001, SOC 2, and PCI DSS compliance baselines.",
                    "Engineering & Fitout Support: Engineered edge-controller configurations and fiber networking paths to guarantee redundant logging and video recording during critical infrastructure events.",
                    "Vendor & Operations Alignment: Led physical vulnerability audits, health checks, and preventative maintenance workflows alongside Service Operations, fitout teams, and third-party contractors.",
                    "Statutory & Stakeholder Liaison: Interfaced with government bodies, municipal authorities, and internal stakeholders to ensure fast-track project approvals and regulatory adherence."
                ]
            }
        ],
        "earlier_experience": [
            ("Target", "Security Consultant", "Jun 2017 – Dec 2017", "Performed infrastructure risk assessments, vulnerability audits, and technical designs for core corporate assets."),
            ("Wells Fargo", "Technology Specialist", "Feb 2015 – May 2017", "Executed enterprise access control expansions and integrated multi-site physical security hardware across critical sites."),
            ("Tyco", "Project Engineer", "Sep 2012 – Jan 2015", "Commissioned Perimeter Intrusion Detection Systems (PIDS) and integrated large-scale critical asset infrastructure."),
            ("Siemens", "Project Engineer", "Oct 2011 – Sep 2012", "Designed AutoCAD CCTV layouts, electrical schematic submittals, and system architecture diagrams for large-scale facility builds.")
        ],
        "education": [
            "Bachelor of Technology (B.Tech) in Electronics & Communication — SSIT (2011)",
            "Oracle Cloud Infrastructure Data Center Operations Foundations Associate (2026)",
            "Oracle Cloud Infrastructure AI Foundations Associate (2025)",
            "Certified Systems Engineer: Lenel OnGuard & Genetec Security Center",
            "Professional Scrum Master I (PSM I) — Agile Execution Management"
        ],
        "languages_mobility": "Languages: English (Professional/Corporate), Marathi (Native), Hindi (Fluent), Telugu • Location Flexibility: Immediately available for relocation to Mumbai / Navi Mumbai or Pune for facility tours, client meetings, and operational delivery."
    },
    {
        "id": "track-3",
        "filename_base": "Avinash_Jadhav_Resume_Critical_Infrastructure_Commissioning_Lead",
        "title": "AVINASH JADHAV",
        "subtitle": "Technical Program Lead / Security Engineering Manager – Critical Infrastructure",
        "contact": "Bengaluru, Karnataka, India • +91 9901071166 • ajadhav311989@gmail.com • linkedin.com/in/avinash-jadhav-54a67645",
        "summary": "Strategic, results-driven Senior Program Manager – Security Technology with 14+ years of experience leading physical security architecture, APAC/EMEA regional infrastructure integrations and technology strategy for multinational tech enterprises. Proven track record defining enterprise security technology roadmaps, directing CAPEX/OPEX budgets and executing large-scale integrations across CCTV, Access Control Systems (ACS), Intrusion Detection Systems (IDS) and Regional Security Operations Centers (RSOC). Hands-on expertise managing Lenel OnGuard, Genetec and Milestone deployments, aligning physical security with enterprise IT, cybersecurity and data compliance standards (ISO 27001, PCI DSS). Skilled at vendor governance, system lifecycle management, and leveraging AI/analytics to automate incident management, improve resilience, and scale cross-functional operations.",
        "skills": [
            ("Security Technology Strategy", "Technology Roadmapping, APAC Regional Strategy, Enterprise Security Architecture, RSOC/Command Center Integration, System Lifecycle Management."),
            ("Systems Governance & Integration", "CCTV Surveillance, Access Control (ACS), Intrusion Detection (IDS), Perimeter Intrusion (PIDS), Video Management Systems (VMS), Incident Management, Travel Safety & Crisis Coordination."),
            ("Program & Vendor Management", "CAPEX & OPEX Budgeting, Scope of Work (SOW) Compliance, Vendor Performance & SLA Governance, System Commissioning, Test & Acceptance, Risk Mitigation."),
            ("Platforms & Technology", "Lenel OnGuard (Certified), Genetec Security Center (Certified), Milestone VMS, AI Video Analytics, ServiceNow, Jira, AutoCAD, Visio."),
            ("Standards & Compliance", "ISO 27001, PCI DSS, PSP/CPP Framework Alignment, Cybersecurity Compliance, Root Cause Analysis (RCA).")
        ],
        "experience": [
            {
                "company": "ORACLE",
                "role": "Senior Security System Program Manager – Systems & Infrastructure",
                "period": "Aug 2021 – Present",
                "location": "Bengaluru, India",
                "bullets": [
                    "Define and execute regional security technology roadmaps, aligning APAC/global facilities with enterprise security architecture, physical security standards, and cybersecurity compliance requirements.",
                    "Spearhead end-to-end management of complex physical security infrastructure programs, overseeing CAPEX/OPEX budgeting, project scope, procurement, and multi-vendor service performance.",
                    "Direct system integrations linking physical security assets (ACS, CCTV, IDS) with centralized monitoring, incident management platforms, and Regional Security Operations Center (RSOC) infrastructure to enhance operational visibility.",
                    "Partner with cross-functional stakeholders in Enterprise Technology, Facilities, Corporate Security, HR, and Legal to maintain operational readiness, standardizing SLA/vendor performance metrics across APAC locations.",
                    "Piloted and integrated edge AI video analytics and automation tools into existing monitoring platforms to accelerate threat detection, reduce incident response times, and maximize uptime across critical installations.",
                    "Lead system commissioning, final Test & Acceptance, and post-implementation reviews for enterprise upgrades, conducting Root Cause Analysis (RCA) and remediating system vulnerabilities."
                ]
            },
            {
                "company": "MASTERCARD",
                "role": "Senior Analyst – Corporate Security Infrastructure",
                "period": "Dec 2017 – Jul 2021",
                "location": "Pune, India",
                "bullets": [
                    "Governed physical security infrastructure deployments across multi-site corporate environments, maintaining 100% compliance with ISO 27001 and PCI DSS standards.",
                    "Engineered local edge-controller configurations and centralized logging solutions, ensuring continuous video recording, access logging reliability, and seamless integration with corporate incident response workflows.",
                    "Managed vendor performance, hardware lifecycle maintenance, and preventative service workflows to minimize system downtime across critical infrastructure.",
                    "Key Achievement: Recognized with Corporate 'Innovation Award' and 'Challenge Coin Award' for outstanding performance in enterprise security infrastructure modernization."
                ]
            }
        ],
        "earlier_experience": [
            ("Target", "Security Consultant", "Jun 2017 – Dec 2017", "Conducted physical risk audits, vulnerability evaluations, and security system design for corporate tech campuses and retail distribution networks."),
            ("Wells Fargo", "Technology Specialist", "Feb 2015 – May 2017", "Executed multi-site enterprise access control and CCTV system expansions; managed vendor integration and hardware upgrades."),
            ("Tyco", "Project Engineer", "Sep 2012 – Jan 2015", "Commissioned large-scale Perimeter Intrusion Detection Systems (PIDS) and integrated multi-layered physical security platforms for corporate clients."),
            ("Siemens", "Project Engineer", "Oct 2011 – Sep 2012", "Designed CCTV layouts, access control system architectures, and building automation diagrams using AutoCAD.")
        ],
        "education": [
            "Bachelor of Technology (B.Tech) in Electronics & Communications — S.S.I.T (2011)",
            "Certified Systems Engineer: Lenel OnGuard & Genetec Security Center",
            "Oracle Cloud Infrastructure AI Foundations Associate (2025)",
            "Oracle Data Center Operations Certified Foundations Associate (2026)",
            "Professional Scrum Master I (PSM I) — Agile Project Management Execution",
            "Framework Alignment: Aligned with Physical Security Professional (PSP) & PMP methodologies"
        ],
        "languages_mobility": "Languages: English (Fluent/Proficient), Hindi, Telugu, Marathi • Travel Availability: Open to regional and international travel across APAC facilities (10–20%)"
    }
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} - {subtitle}</title>
<style>
  @page {{
    size: A4;
    margin: 12mm 14mm 12mm 14mm;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 9.5pt;
    line-height: 1.38;
  }}
  .resume-container {{
    max-width: 800px;
    margin: 0 auto;
    padding: 10px 15px;
  }}
  header {{
    text-align: center;
    border-bottom: 2px solid #0f172a;
    padding-bottom: 8px;
    margin-bottom: 10px;
  }}
  h1 {{
    font-size: 18pt;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #0f172a;
    font-weight: 800;
    margin-bottom: 2px;
  }}
  .subtitle {{
    font-size: 11pt;
    font-weight: 700;
    color: #0284c7;
    margin-bottom: 4px;
    letter-spacing: 0.3px;
  }}
  .contact-bar {{
    font-size: 8.5pt;
    color: #475569;
    line-height: 1.3;
  }}
  .contact-bar a {{
    color: #0284c7;
    text-decoration: none;
  }}
  section {{
    margin-bottom: 9px;
  }}
  .section-title {{
    font-size: 10pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #0f172a;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 2px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }}
  .summary-text {{
    font-size: 9pt;
    color: #334155;
    text-align: justify;
  }}
  .skill-grid {{
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5px;
    font-size: 8.8pt;
  }}
  .skill-item strong {{
    color: #0f172a;
    display: inline;
  }}
  .skill-item span {{
    color: #334155;
  }}
  .job-block {{
    margin-bottom: 7px;
  }}
  .job-header {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 9.3pt;
  }}
  .job-company {{
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }}
  .job-role {{
    font-weight: 700;
    color: #0369a1;
  }}
  .job-meta {{
    font-size: 8.5pt;
    color: #64748b;
    font-weight: 500;
    white-space: nowrap;
  }}
  ul.bullets {{
    margin-top: 3px;
    padding-left: 15px;
  }}
  ul.bullets li {{
    font-size: 8.8pt;
    color: #334155;
    margin-bottom: 2.5px;
    line-height: 1.32;
  }}
  .earlier-row {{
    display: flex;
    font-size: 8.5pt;
    margin-bottom: 3px;
    line-height: 1.25;
  }}
  .earlier-head {{
    min-width: 250px;
    font-weight: 700;
    color: #1e293b;
  }}
  .earlier-desc {{
    color: #475569;
  }}
  .cert-list {{
    list-style: none;
    padding: 0;
    font-size: 8.6pt;
    color: #334155;
  }}
  .cert-list li {{
    margin-bottom: 2px;
  }}
  .cert-list li::before {{
    content: "• ";
    color: #0284c7;
    font-weight: bold;
  }}
  .footer-note {{
    font-size: 8.2pt;
    color: #64748b;
    border-top: 1px dashed #cbd5e1;
    padding-top: 4px;
    margin-top: 5px;
  }}
  @media print {{
    body {{
      background: none;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    .resume-container {{
      padding: 0;
    }}
  }}
</style>
</head>
<body>
<div class="resume-container">
  <header>
    <h1>{title}</h1>
    <div class="subtitle">{subtitle}</div>
    <div class="contact-bar">{contact}</div>
  </header>

  <section>
    <div class="section-title">Professional Summary</div>
    <div class="summary-text">{summary}</div>
  </section>

  <section>
    <div class="section-title">Core Competencies & Technical Skills</div>
    <div class="skill-grid">
      {skills_html}
    </div>
  </section>

  <section>
    <div class="section-title">Professional Experience</div>
    {experience_html}
  </section>

  <section>
    <div class="section-title">Earlier Security & Systems Engineering Experience</div>
    {earlier_html}
  </section>

  <section>
    <div class="section-title">Education & Professional Certifications</div>
    <ul class="cert-list">
      {education_html}
    </ul>
  </section>

  <section>
    <div class="section-title">Languages & Regional Mobility</div>
    <div class="summary-text" style="font-size: 8.5pt;">{languages_mobility}</div>
  </section>
</div>
</body>
</html>
"""

def generate_html_files(output_dir: Path):
    output_dir.mkdir(parents=True, exist_ok=True)
    generated = []

    for r in RESUMES:
        skills_html = "\n".join([
            f'<div class="skill-item"><strong>• {cat}:</strong> <span>{desc}</span></div>'
            for cat, desc in r["skills"]
        ])

        exp_blocks = []
        for job in r["experience"]:
            bullets_html = "\n".join([f"<li>{b}</li>" for b in job["bullets"]])
            block = f"""
            <div class="job-block">
              <div class="job-header">
                <div>
                  <span class="job-company">{job['company']}</span> &nbsp;|&nbsp;
                  <span class="job-role">{job['role']}</span>
                </div>
                <div class="job-meta">{job['location']} &nbsp;•&nbsp; {job['period']}</div>
              </div>
              <ul class="bullets">
                {bullets_html}
              </ul>
            </div>
            """
            exp_blocks.append(block)
        experience_html = "\n".join(exp_blocks)

        earlier_rows = []
        for co, role, period, desc in r["earlier_experience"]:
            row = f"""
            <div class="earlier-row">
              <div class="earlier-head">• <strong>{co}</strong> | {role} ({period}):</div>
              <div class="earlier-desc">{desc}</div>
            </div>
            """
            earlier_rows.append(row)
        earlier_html = "\n".join(earlier_rows)

        education_html = "\n".join([f"<li>{item}</li>" for item in r["education"]])

        html_content = HTML_TEMPLATE.format(
            title=r["title"],
            subtitle=r["subtitle"],
            contact=r["contact"],
            summary=r["summary"],
            skills_html=skills_html,
            experience_html=experience_html,
            earlier_html=earlier_html,
            education_html=education_html,
            languages_mobility=r["languages_mobility"]
        )

        html_path = output_dir / f"{r['filename_base']}.html"
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        
        pdf_path = output_dir / f"{r['filename_base']}.pdf"
        generated.append((html_path, pdf_path))
        print(f" Generated HTML resume: {html_path.name}")

    return generated

def convert_html_to_pdf(generated_pairs):
    """Finds Chrome or Edge and converts HTML to PDF."""
    browsers = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
    ]
    browser_exe = None
    for b in browsers:
        if os.path.exists(b):
            browser_exe = b
            break

    if not browser_exe:
        print("  Notice: No headless browser executable found in standard locations for PDF compilation.")
        return

    print(f"Using browser for PDF compilation: {browser_exe}")
    for html_path, pdf_path in generated_pairs:
        cmd = [
            browser_exe,
            "--headless=new",
            "--disable-gpu",
            "--run-all-compositor-stages-before-draw",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            str(html_path.resolve())
        ]
        try:
            res = subprocess.run(cmd, capture_output=True, timeout=15)
            if pdf_path.exists() and pdf_path.stat().st_size > 1000:
                print(f" Compiled PDF: {pdf_path.name} ({pdf_path.stat().st_size // 1024} KB)")
            else:
                print(f"  Browser printed with exit code {res.returncode}, check output.")
        except Exception as e:
            print(f"  Error converting {html_path.name} to PDF: {e}")

def main():
    root_dir = Path(__file__).resolve().parent.parent
    resumes_dir = root_dir / "assets" / "resumes"
    generated_pairs = generate_html_files(resumes_dir)
    convert_html_to_pdf(generated_pairs)

if __name__ == "__main__":
    main()
