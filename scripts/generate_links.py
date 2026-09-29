#!/usr/bin/env python3
"""
Direct Boolean Deep-Search Link Generator & Career Intelligence Hub
Candidate: Avinash Jadhav (14+ Yrs Exp, Physical Security & Data Center Infrastructure SME)
Generates structured JSON and JS datasets with boolean-optimized query strings and direct job portal URLs.
"""

import json
import urllib.parse
from pathlib import Path
from datetime import datetime

# Base configuration & candidate info
CANDIDATE_INFO = {
    "name": "Avinash Jadhav",
    "title": "Senior Program Manager | Physical Security & Data Center Infrastructure SME",
    "experience": "14+ Years",
    "phone": "+91 9901071166",
    "email": "ajadhav311989@gmail.com",
    "linkedin": "https://www.linkedin.com/in/avinash-jadhav-54a67645",
    "location": "Bengaluru, India",
    "mobility": "Bengaluru, Pune, Mumbai / Navi Mumbai, Hyderabad (Open to Relocation / Hybrid / Travel)",
    "education": "B.Tech in Electronics & Communications (S.S.I.T, 2011)",
    "certifications": [
        {"name": "Lenel OnGuard Certified Systems Engineer", "type": "Vendor SME", "year": "Verified"},
        {"name": "Genetec Security Center Certified Systems Engineer", "type": "Vendor SME", "year": "Verified"},
        {"name": "Oracle Cloud Infrastructure Data Center Operations Foundations Associate", "type": "Cloud / DC", "year": "2026"},
        {"name": "Oracle Cloud Infrastructure AI Foundations Associate", "type": "AI Foundations", "year": "2025"},
        {"name": "Professional Scrum Master I (PSM I)", "type": "Agile Program Management", "year": "Verified"},
        {"name": "Framework Alignment: ASIS CPP / PSP & PMP Principles", "type": "Industry Standards", "year": "Active"}
    ],
    "languages": ["English (Fluent / Corporate)", "Hindi (Fluent)", "Marathi (Native)", "Telugu (Proficient)"]
}

LOCATIONS = [
    {"id": "bengaluru", "name": "Bengaluru", "linkedin_geo": "105214831", "state": "Karnataka"},
    {"id": "pune", "name": "Pune", "linkedin_geo": "103671728", "state": "Maharashtra"},
    {"id": "mumbai", "name": "Mumbai / Navi Mumbai", "linkedin_geo": "106155005", "state": "Maharashtra"},
    {"id": "hyderabad", "name": "Hyderabad", "linkedin_geo": "105556991", "state": "Telangana"},
    {"id": "india", "name": "India (All / Remote)", "linkedin_geo": "102713980", "state": "National"}
]

TRACKS = [
    {
        "id": "track-1",
        "title": "Senior Program Manager – Physical Security & Security Technology",
        "short_title": "Physical Security Program Manager",
        "badge": "Tech MNCs & GCCs",
        "target_roles": [
            "Senior Program Manager - Physical Security",
            "Physical Security Operations Manager",
            "Security Technology Program Manager",
            "RSOC / Command Center Manager",
            "Enterprise Security Systems Specialist",
            "Corporate Security Infrastructure Lead"
        ],
        "core_keywords": [
            "Lenel OnGuard", "Genetec Security Center", "RSOC", "VMS", "Access Control (ACS)",
            "CCTV Surveillance", "Incident Automation", "Vendor SLA Governance", "ISO 27001",
            "PCI DSS", "Milestone VMS", "AI Video Analytics", "CAPEX/OPEX"
        ],
        "summary": "14+ years driving physical security technology architecture, RSOC central monitoring integrations, and multi-site enterprise deployments across APAC/EMEA tech campuses.",
        "search_queries": {
            "boolean_standard": '("Physical Security" OR "Security Technology" OR "Access Control" OR "Lenel" OR "Genetec") AND ("Program Manager" OR "Security Operations" OR "RSOC" OR "Lead")',
            "boolean_broad": '("Physical Security" OR "Lenel OnGuard" OR "Genetec" OR "VMS" OR "ACS") AND ("Program Manager" OR "Operations Manager" OR "Security Manager")',
            "boolean_strict": '("Lenel" OR "Genetec") AND ("Physical Security" OR "Access Control") AND ("Program Manager" OR "Senior Manager")',
            "naukri_query": '(Physical Security OR Lenel OR Genetec OR VMS OR Access Control OR CCTV) AND (Program Manager OR Security Manager OR RSOC)',
            "indeed_query": '("Physical Security" OR "Lenel" OR "Genetec" OR "Access Control") ("Program Manager" OR "Security Manager")',
            "google_jobs_query": '("Physical Security" OR "Lenel" OR "Genetec") ("Program Manager" OR "Security Manager" OR "RSOC") jobs in India'
        },
        "target_employers_sample": ["Microsoft", "Amazon", "Google", "Cisco", "Mastercard", "Wells Fargo", "Uber", "Walmart Global Tech", "JPMorgan Chase"]
    },
    {
        "id": "track-2",
        "title": "Security Systems Engineer / Solutions Engineer – Data Center Infrastructure",
        "short_title": "Data Center Infrastructure & Solutions",
        "badge": "Colocation & Hyperscalers",
        "target_roles": [
            "Data Center Security Systems Engineer",
            "Solutions Engineer - Data Center Infrastructure",
            "Critical Facilities Infrastructure Lead",
            "Post-Sales Solutions Architect - Colocation",
            "MEP & BMS Security Solutions Specialist",
            "Hyperscale Site Operations Engineer"
        ],
        "core_keywords": [
            "Hyperscale Data Centers", "MEP Integration", "Building Management Systems (BMS)",
            "Power Redundancy (UPS/Generators)", "Liquid Cooling Infrastructure", "SOW / RFP Packages",
            "Client Technical Walkthroughs", "OCI DC Foundations Certified", "OCI AI Associate",
            "Fiber Network Infrastructure", "High-Security Access Control"
        ],
        "summary": "Data Center Subject Matter Expert bridging client technical solutioning, MEP/BMS alignment, power redundancy, client site walkthroughs, and mission-critical colocation deployments.",
        "search_queries": {
            "boolean_standard": '("Data Center" OR "Hyperscale" OR "Colocation") AND ("Security Systems" OR "Solutions Engineer" OR "Infrastructure Engineer" OR "MEP" OR "BMS")',
            "boolean_broad": '("Data Center" OR "Hyperscale" OR "Critical Facilities") AND ("Security Engineer" OR "Solutions Engineer" OR "Systems Engineer" OR "BMS")',
            "boolean_strict": '("Data Center" OR "Colocation") AND ("MEP" OR "BMS" OR "Power Redundancy") AND ("Solutions Engineer" OR "Security Engineer" OR "Infrastructure")',
            "naukri_query": '(Data Center OR Hyperscale OR Colocation) AND (Security Systems Engineer OR Solutions Engineer OR Infrastructure OR BMS OR MEP)',
            "indeed_query": '("Data Center" OR "Colocation") ("Security Systems Engineer" OR "Solutions Engineer" OR "Infrastructure Engineer")',
            "google_jobs_query": '("Data Center" OR "Colocation") ("Security Systems Engineer" OR "Solutions Engineer" OR "Infrastructure") jobs in India'
        },
        "target_employers_sample": ["Equinix", "NTT Global Data Centers", "STT GDC", "CtrlS", "Yotta", "AdaniConneX", "Digital Edge", "Colt DCS", "AWS DC Ops"]
    },
    {
        "id": "track-3",
        "title": "Technical Program Lead / Security Engineering Manager – Critical Infrastructure & Commissioning Lead",
        "short_title": "Critical Infrastructure & Commissioning Lead",
        "badge": "EPCs, Integrators & Tech Construction",
        "target_roles": [
            "Critical Infrastructure Commissioning Lead",
            "Technical Program Lead - Systems Engineering",
            "Site Turnover & Operational Acceptance Lead",
            "Senior Commissioning Engineer - Physical Security & BMS",
            "Security Engineering Project Manager",
            "Perimeter & Infrastructure Integration Lead"
        ],
        "core_keywords": [
            "Site Turnover", "Testing & Acceptance (T&A)", "System Commissioning", "Punch List Verification",
            "AutoCAD Layouts", "PIDS (Perimeter Intrusion Detection)", "PSM I Scrum Master",
            "Subcontractor Oversight", "Design Drawings Review", "Root Cause Analysis (RCA)", "SOW Compliance"
        ],
        "summary": "14+ years spearheading end-to-end critical site turnover, rigorous testing & acceptance (T&A), vendor punch-list verification, and complex physical security commissioning.",
        "search_queries": {
            "boolean_standard": '("Commissioning" OR "Site Turnover" OR "Testing and Acceptance" OR "T&A") AND ("Physical Security" OR "Critical Infrastructure" OR "AutoCAD" OR "PIDS")',
            "boolean_broad": '("Commissioning" OR "Operational Acceptance" OR "Punch List" OR "Turnover") AND ("Security Systems" OR "Critical Infrastructure" OR "Building Automation")',
            "boolean_strict": '("Commissioning Lead" OR "Project Engineer" OR "Program Lead") AND ("Site Turnover" OR "Testing & Acceptance") AND ("Security" OR "BMS")',
            "naukri_query": '(Commissioning OR "Testing and Acceptance" OR "Site Turnover" OR Punch List OR AutoCAD) AND (Physical Security OR Critical Infrastructure OR PIDS)',
            "indeed_query": '("Commissioning" OR "Site Turnover" OR "Testing and Acceptance") ("Physical Security" OR "Critical Infrastructure")',
            "google_jobs_query": '("Commissioning" OR "Site Turnover" OR "Testing and Acceptance") ("Physical Security" OR "Critical Infrastructure") jobs in India'
        },
        "target_employers_sample": ["Honeywell Building Solutions", "Johnson Controls", "Schneider Electric", "Siemens", "CBRE", "JLL", "Cushman & Wakefield", "Tyco"]
    }
]

COMPANIES = [
    # Hyperscalers & Colocation Data Centers
    {
        "name": "Equinix India",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Mumbai", "Bengaluru", "Chennai"],
        "careers_url": "https://careers.equinix.com/jobs/search?q=India",
        "portal_type": "Workday",
        "search_hint": "Search: 'Physical Security', 'Data Center Infrastructure', 'Solutions Architect'",
        "logo_text": "EQ",
        "priority": "High Priority"
    },
    {
        "name": "NTT Global Data Centers India",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Mumbai", "Bengaluru", "Noida", "Chennai", "Delhi"],
        "careers_url": "https://datacenter.hello.global.ntt/en-us/about-us/careers",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Security Operations', 'Infrastructure', 'Facility Operations'",
        "logo_text": "NTT",
        "priority": "High Priority"
    },
    {
        "name": "STT GDC India (ST Telemedia)",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Mumbai", "Bengaluru", "Pune", "Hyderabad", "Chennai"],
        "careers_url": "https://www.sttelemediagdc.in/careers",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Project Engineering', 'Security Management', 'DC Operations'",
        "logo_text": "STT",
        "priority": "High Priority"
    },
    {
        "name": "CtrlS Datacenters",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Hyderabad", "Mumbai", "Bengaluru", "Noida"],
        "careers_url": "https://www.ctrls.in/careers.html",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Infrastructure Engineering', 'Security Head', 'Data Center Operations'",
        "logo_text": "CS",
        "priority": "High Priority"
    },
    {
        "name": "Yotta Data Services",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Navi Mumbai", "Greater Noida", "GIFT City"],
        "careers_url": "https://yotta.com/careers/",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Physical Security', 'MEP Solutions', 'Operations Lead'",
        "logo_text": "YT",
        "priority": "High Priority"
    },
    {
        "name": "AdaniConneX",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Chennai", "Noida", "Navi Mumbai", "Hyderabad", "Pune", "Bengaluru"],
        "careers_url": "https://www.adaniconnex.com/careers",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Data Center Projects', 'Security Systems', 'Commissioning'",
        "logo_text": "AC",
        "priority": "High Priority"
    },
    {
        "name": "Amazon Web Services (AWS Infrastructure)",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Bengaluru", "Mumbai", "Hyderabad"],
        "careers_url": "https://www.amazon.jobs/en/search?base_query=Data+Center+Security&country=IND",
        "portal_type": "Amazon Jobs",
        "search_hint": "Search: 'Cluster Security Manager', 'Physical Security Specialist', 'DC Operations'",
        "logo_text": "AWS",
        "priority": "High Priority"
    },
    {
        "name": "Microsoft Data Center Operations",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Pune", "Mumbai", "Hyderabad", "Bengaluru"],
        "careers_url": "https://careers.microsoft.com/us/en/search-results?q=Physical%20Security%20India",
        "portal_type": "Microsoft Careers",
        "search_hint": "Search: 'Datacenter Physical Security', 'Critical Environment', 'Security Program Manager'",
        "logo_text": "MS",
        "priority": "High Priority"
    },
    {
        "name": "Colt Data Centre Services",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Navi Mumbai", "Mumbai"],
        "careers_url": "https://www.coltdatacentres.net/careers/",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Operations Engineer', 'Physical Security', 'Commissioning'",
        "logo_text": "CD",
        "priority": "Medium Priority"
    },
    {
        "name": "Digital Edge DC",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Navi Mumbai", "Bengaluru"],
        "careers_url": "https://www.digitaledgedc.com/about-us/careers/",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Engineering Operations', 'Security Infrastructure', 'Solutions'",
        "logo_text": "DE",
        "priority": "Medium Priority"
    },
    {
        "name": "Iron Mountain Data Centers / Web Werks",
        "category": "Data Centers & Hyperscalers",
        "locations": ["Mumbai", "Bengaluru", "Pune", "Hyderabad"],
        "careers_url": "https://www.ironmountain.com/about-us/careers",
        "portal_type": "Workday",
        "search_hint": "Search: 'Security Systems', 'Data Center Facility Manager', 'Compliance'",
        "logo_text": "IM",
        "priority": "Medium Priority"
    },

    # Enterprise Technology & GCCs
    {
        "name": "Google",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Bengaluru", "Hyderabad", "Mumbai", "Gurugram"],
        "careers_url": "https://www.google.com/about/careers/applications/jobs/results/?q=Physical%20Security&location=India",
        "portal_type": "Google Careers",
        "search_hint": "Search: 'Physical Security Program Manager', 'Data Center Security', 'Protective Services'",
        "logo_text": "GO",
        "priority": "High Priority"
    },
    {
        "name": "Cisco Systems",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Bengaluru"],
        "careers_url": "https://jobs.cisco.com/jobs/SearchJobs/?21178=%5B169482%5D&21178_format=6020&q=Physical+Security",
        "portal_type": "Cisco Jobs",
        "search_hint": "Search: 'Global Workplace Security', 'Physical Security Engineer', 'Safety & Resilience'",
        "logo_text": "CS",
        "priority": "High Priority"
    },
    {
        "name": "Mastercard",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Pune", "Gurugram", "Bengaluru"],
        "careers_url": "https://mastercard.wd1.myworkdayjobs.com/CorporateCareers?locationCountry=e2ff4099a41c42bb8d888258ef3bb824&q=Security",
        "portal_type": "Workday",
        "search_hint": "Alumni advantage! Search: 'Corporate Security Infrastructure', 'Security Operations'",
        "logo_text": "MC",
        "priority": "High Priority"
    },
    {
        "name": "Wells Fargo",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Bengaluru", "Hyderabad"],
        "careers_url": "https://www.wellsfargojobs.com/en/jobs/?search=Security&country=India",
        "portal_type": "Direct Portal",
        "search_hint": "Alumni advantage! Search: 'Physical Security Specialist', 'Systems Technology'",
        "logo_text": "WF",
        "priority": "High Priority"
    },
    {
        "name": "Target in India",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Bengaluru"],
        "careers_url": "https://corporate.target.com/careers/india?keyword=Security",
        "portal_type": "Direct Portal",
        "search_hint": "Alumni advantage! Search: 'Corporate Security', 'Assets Protection', 'Technology'",
        "logo_text": "TG",
        "priority": "High Priority"
    },
    {
        "name": "Uber",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Bengaluru", "Hyderabad"],
        "careers_url": "https://www.uber.com/global/en/careers/list/?location=IND--Bangalore&department=Safety%20and%20Security",
        "portal_type": "Greenhouse",
        "search_hint": "Search: 'Physical Security Systems Specialist', 'Global Security operations', 'RSOC'",
        "logo_text": "UB",
        "priority": "High Priority"
    },
    {
        "name": "Walmart Global Tech",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Bengaluru", "Chennai"],
        "careers_url": "https://careers.walmart.com/results?q=Physical%20Security&location=India",
        "portal_type": "Workday",
        "search_hint": "Search: 'Enterprise Physical Security', 'Asset Protection Lead', 'Infrastructure'",
        "logo_text": "WM",
        "priority": "High Priority"
    },
    {
        "name": "JPMorgan Chase & Co.",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Bengaluru", "Mumbai", "Hyderabad"],
        "careers_url": "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/requisitions?keyword=Global+Security&location=India",
        "portal_type": "Oracle Cloud HCM",
        "search_hint": "Search: 'Global Security & Investigations', 'Technical Security Project Manager'",
        "logo_text": "JP",
        "priority": "High Priority"
    },
    {
        "name": "Goldman Sachs",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Bengaluru", "Hyderabad"],
        "careers_url": "https://www.goldmansachs.com/careers/find-a-role?location=Bengaluru&skills=Security",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Corporate Workplace Solutions', 'Physical Security Engineer', 'Resilience'",
        "logo_text": "GS",
        "priority": "Medium Priority"
    },
    {
        "name": "Apple India",
        "category": "Enterprise Tech & GCCs",
        "locations": ["Bengaluru", "Hyderabad", "Mumbai"],
        "careers_url": "https://jobs.apple.com/en-in/search?search=Security&location=india-INDC",
        "portal_type": "Apple Careers",
        "search_hint": "Search: 'Global Security Specialist', 'Facilities Systems Integrator'",
        "logo_text": "AP",
        "priority": "High Priority"
    },

    # Building Automation & Security Integrators
    {
        "name": "Honeywell Building Solutions",
        "category": "Security Integrators & EPCs",
        "locations": ["Bengaluru", "Pune", "Gurugram", "Mumbai"],
        "careers_url": "https://careers.honeywell.com/us/en/search-results?keywords=Security%20Systems&location=India",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Security Project Manager', 'Access Control Engineer', 'Commissioning Lead'",
        "logo_text": "HW",
        "priority": "High Priority"
    },
    {
        "name": "Johnson Controls",
        "category": "Security Integrators & EPCs",
        "locations": ["Bengaluru", "Pune", "Mumbai", "Gurugram"],
        "careers_url": "https://jobs.johnsoncontrols.com/search-jobs/India/Security?glat=20.593684&glon=78.96288",
        "portal_type": "Workday",
        "search_hint": "Search: 'Security Systems Project Manager', 'Commissioning Engineer', 'BMS Lead'",
        "logo_text": "JC",
        "priority": "High Priority"
    },
    {
        "name": "Schneider Electric",
        "category": "Security Integrators & EPCs",
        "locations": ["Bengaluru", "Mumbai", "Gurugram", "Pune"],
        "careers_url": "https://www.se.com/in/en/about-us/careers/overview.jsp",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'EcoStruxure Building Operation', 'Data Center Infrastructure Solutions'",
        "logo_text": "SE",
        "priority": "High Priority"
    },
    {
        "name": "Siemens India",
        "category": "Security Integrators & EPCs",
        "locations": ["Mumbai", "Bengaluru", "Pune", "Chennai"],
        "careers_url": "https://jobs.siemens.com/careers?query=Security%20Systems&location=India",
        "portal_type": "SmartRecruiters",
        "search_hint": "Alumni advantage! Search: 'Smart Infrastructure', 'Building Technologies', 'Project Engineer'",
        "logo_text": "SM",
        "priority": "High Priority"
    },
    {
        "name": "CBRE Data Center Solutions",
        "category": "Security Integrators & EPCs",
        "locations": ["Bengaluru", "Mumbai", "Pune", "Hyderabad"],
        "careers_url": "https://cbre.wd1.myworkdayjobs.com/cbre_careers?q=Data+Center+Security+India",
        "portal_type": "Workday",
        "search_hint": "Search: 'Critical Environments Operations', 'Project Management', 'Technical Lead'",
        "logo_text": "CB",
        "priority": "High Priority"
    },
    {
        "name": "JLL India (Jones Lang LaSalle)",
        "category": "Security Integrators & EPCs",
        "locations": ["Bengaluru", "Mumbai", "Pune", "Hyderabad"],
        "careers_url": "https://jll.wd1.myworkdayjobs.com/jllcareers?q=Data+Center+Security+India",
        "portal_type": "Workday",
        "search_hint": "Search: 'Project & Development Services', 'Critical Facilities Engineer', 'Security Lead'",
        "logo_text": "JL",
        "priority": "High Priority"
    },
    {
        "name": "Cushman & Wakefield India",
        "category": "Security Integrators & EPCs",
        "locations": ["Bengaluru", "Mumbai", "Pune"],
        "careers_url": "https://cushmanwakefield.wd1.myworkdayjobs.com/en-US/CW_Careers?q=Critical+Facilities+India",
        "portal_type": "Workday",
        "search_hint": "Search: 'Data Center Project Management', 'Security Engineering'",
        "logo_text": "CW",
        "priority": "Medium Priority"
    },
    {
        "name": "Securitas India",
        "category": "Security Integrators & EPCs",
        "locations": ["Bengaluru", "Mumbai", "Pune", "Gurugram"],
        "careers_url": "https://www.securitas.in/careers/",
        "portal_type": "Direct Portal",
        "search_hint": "Search: 'Electronic Security Systems', 'Operations Program Lead'",
        "logo_text": "SC",
        "priority": "Medium Priority"
    }
]

def make_linkedin_url(query: str, location: str, geo_id: str = None) -> str:
    params = {
        "keywords": query,
        "location": location,
        "f_TPR": "r2592000",  # past month
        "sortBy": "DD"         # Most recent first
    }
    if geo_id:
        params["geoId"] = geo_id
    return f"https://www.linkedin.com/jobs/search/?{urllib.parse.urlencode(params)}"

def make_naukri_url(query: str, location: str) -> str:
    # Naukri clean search endpoint
    loc_clean = location.split("/")[0].strip().lower().replace(" ", "-")
    encoded_query = urllib.parse.quote(query)
    encoded_loc = urllib.parse.quote(location)
    return f"https://www.naukri.com/jobs-in-india?k={encoded_query}&l={encoded_loc}"

def make_indeed_url(query: str, location: str) -> str:
    params = {
        "q": query,
        "l": location,
        "fromage": "14",  # past 14 days
        "sort": "date"
    }
    return f"https://in.indeed.com/jobs?{urllib.parse.urlencode(params)}"

def make_foundit_url(query: str, location: str) -> str:
    params = {
        "query": query,
        "locations": location
    }
    return f"https://www.foundit.in/srp/results?{urllib.parse.urlencode(params)}"

def make_google_jobs_url(query: str, location: str) -> str:
    search_term = f"{query} in {location}"
    return f"https://www.google.com/search?ibp=htl;jobs&q={urllib.parse.quote(search_term)}"

def make_google_xray_url(query: str, location: str) -> str:
    # Google Dork / X-Ray for ATS sites (lever, greenhouse, workday)
    ats_query = f'({query}) AND ("{location}" OR "India") (site:jobs.lever.co OR site:boards.greenhouse.io OR site:myworkdayjobs.com OR site:smartrecruiters.com)'
    return f"https://www.google.com/search?q={urllib.parse.quote(ats_query)}"

def generate_all_links():
    """Generates the full dataset with URLs for every track and location."""
    result = {
        "candidate": CANDIDATE_INFO,
        "generated_at": datetime.now().isoformat(),
        "locations": LOCATIONS,
        "tracks": [],
        "companies": COMPANIES,
        "outreach_templates": {
            "track-1": {
                "subject": "Avinash Jadhav – Senior Physical Security & Security Technology Program Manager (Ex-Oracle / Mastercard)",
                "body": (
                    "Hi [Hiring Manager / Recruiter Name],\n\n"
                    "I noticed your team at [Target Company] is scaling security technology and operations. "
                    "With 14+ years spearheading enterprise physical security architecture, RSOC central monitoring integrations, "
                    "and multi-site deployments at Oracle and Mastercard, I wanted to reach out directly.\n\n"
                    "Highlights of my background:\n"
                    "• Certified Systems Engineer: Lenel OnGuard & Genetec Security Center.\n"
                    "• End-to-end program management: CAPEX/OPEX budgeting, vendor SLA governance, ISO 27001/PCI DSS compliance, and edge AI video analytics.\n"
                    "• Led regional security deployments across APAC & EMEA tech campuses.\n\n"
                    "I am based in Bengaluru with immediate mobility across Pune/Mumbai/Hyderabad and would welcome a brief conversation regarding how I can contribute to [Target Company]'s physical security roadmap.\n\n"
                    "Best regards,\nAvinash Jadhav\n+91 9901071166 | ajadhav311989@gmail.com\nlinkedin.com/in/avinash-jadhav-54a67645"
                )
            },
            "track-2": {
                "subject": "Avinash Jadhav – Data Center Infrastructure & Solutions Engineering SME",
                "body": (
                    "Hi [Hiring Manager / Recruiter Name],\n\n"
                    "I am reaching out regarding Data Center Solutions Engineering and Critical Infrastructure roles at [Target Company]. "
                    "I bring 14+ years of mission-critical engineering experience, most recently leading Data Center Infrastructure & Security Solutions at Oracle.\n\n"
                    "Key capabilities aligned with your hyperscale/colocation operations:\n"
                    "• Post-Sales & Pre-Sales Technical Solutioning: Authoring RFP/RFI technical responses, lease/contract technical compliance, and MEP/BMS alignment.\n"
                    "• Power & Cooling Architecture: Fault-tolerant redundancy, liquid cooling integration, edge controllers, and fiber network pathways.\n"
                    "• Certified: Oracle Cloud Infrastructure Data Center Operations Certified Foundations Associate & OCI AI Foundations Associate.\n"
                    "• Client Tours: Proven success leading executive walkthroughs and client technical presentations for hyperscale tenants.\n\n"
                    "I would love to connect for 10 minutes to explore synergies with your critical facilities team.\n\n"
                    "Warm regards,\nAvinash Jadhav\n+91 9901071166 | ajadhav311989@gmail.com\nlinkedin.com/in/avinash-jadhav-54a67645"
                )
            },
            "track-3": {
                "subject": "Avinash Jadhav – Critical Infrastructure Commissioning Lead & Site Turnover SME",
                "body": (
                    "Hi [Hiring Manager / Recruiter Name],\n\n"
                    "I am writing to connect regarding Critical Infrastructure Commissioning, Site Turnover, and Technical Program Lead roles at [Target Company]. "
                    "Over the past 14+ years with Oracle, Mastercard, Tyco, and Siemens, I have specialized in bridging complex engineering design with flawless field commissioning and operational turnover.\n\n"
                    "Core competencies:\n"
                    "• Rigorous Testing & Acceptance (T&A), structured site walks, contractor punch-list closeout, and defect resolution.\n"
                    "• Deep integration expertise across PIDS (Perimeter Intrusion Detection), Access Control, CCTV/VMS, and Building Management Systems.\n"
                    "• Certified Scrum Master (PSM I), Lenel & Genetec Systems Engineer with hands-on AutoCAD drawing review and SOW enforcement.\n\n"
                    "I am readily available for regional travel and site turnover execution. Let's schedule a brief conversation.\n\n"
                    "Sincerely,\nAvinash Jadhav\n+91 9901071166 | ajadhav311989@gmail.com\nlinkedin.com/in/avinash-jadhav-54a67645"
                )
            }
        }
    }

    for track in TRACKS:
        track_data = {
            "id": track["id"],
            "title": track["title"],
            "short_title": track["short_title"],
            "badge": track["badge"],
            "target_roles": track["target_roles"],
            "core_keywords": track["core_keywords"],
            "summary": track["summary"],
            "search_queries": track["search_queries"],
            "target_employers_sample": track["target_employers_sample"],
            "location_links": []
        }

        # Build location-specific links for each portal
        for loc in LOCATIONS:
            loc_name = loc["name"]
            geo_id = loc["linkedin_geo"]
            
            # Formulate queries
            li_q = track["search_queries"]["boolean_broad"]
            naukri_q = track["search_queries"]["naukri_query"]
            indeed_q = track["search_queries"]["indeed_query"]
            google_q = track["search_queries"]["google_jobs_query"]
            xray_q = track["search_queries"]["boolean_standard"]

            portal_links = {
                "location_id": loc["id"],
                "location_name": loc_name,
                "linkedin_url": make_linkedin_url(li_q, loc_name, geo_id),
                "naukri_url": make_naukri_url(naukri_q, loc_name),
                "indeed_url": make_indeed_url(indeed_q, loc_name),
                "foundit_url": make_foundit_url(track["core_keywords"][0] + " " + track["target_roles"][0], loc_name),
                "google_jobs_url": make_google_jobs_url(google_q, loc_name),
                "google_xray_ats_url": make_google_xray_url(xray_q, loc_name)
            }
            track_data["location_links"].append(portal_links)

        result["tracks"].append(track_data)

    return result

def main():
    root_dir = Path(__file__).resolve().parent.parent
    data_dir = root_dir / "data"
    data_dir.mkdir(parents=True, exist_ok=True)

    print("Generating comprehensive job portal deep-search dataset...")
    data = generate_all_links()

    # Save to JSON
    json_path = data_dir / "links.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f" Saved JSON dataset: {json_path}")

    # Save to JS for zero-CORS direct local file:// browsing & GitHub Pages static load
    js_path = data_dir / "portal_data.js"
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("// Auto-generated by scripts/generate_links.py\n")
        f.write("window.PORTAL_DATA = ")
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    print(f" Saved JS dataset: {js_path}")

    # Summary
    print("\nSummary of Generated Target Intelligence:")
    print(f"- Total Career Tracks: {len(data['tracks'])}")
    print(f"- Target Locations: {', '.join([l['name'] for l in data['locations']])}")
    print(f"- Curated Hiring Companies: {len(data['companies'])}")
    print(f"- Total Deep Search Links Generated: {len(data['tracks']) * len(data['locations']) * 6}")
    print("Done!")

if __name__ == "__main__":
    main()
