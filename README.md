# Avinash Jadhav – Career Command Center & Target Portal Finder

> **Automated Job-Search Web Application, Boolean Deep-Search Aggregator & Application CRM**  
> Tailored for **Avinash Jadhav** (14+ Years Enterprise Engineering & Program Leadership — Ex-Oracle, Mastercard, Wells Fargo, Tyco, Siemens).

[![GitHub Pages Ready](https://img.shields.io/badge/GitHub%20Pages-Ready-emerald?style=for-the-badge&logo=github)](https://pages.github.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Pure Static](https://img.shields.io/badge/Architecture-Pure_Static_Zero_Build-blue?style=for-the-badge)](https://developer.mozilla.org/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)](#)

---

## 📌 Executive Summary

Following recent corporate restructuring at Oracle, this dashboard was engineered to provide Avinash Jadhav with an unfair speed-and-precision advantage in the Indian and APAC talent market. 

It unifies **3 distinct career tracks**, pre-filters **90+ boolean search deep-links** across major portals, catalogs **29+ curated Indian employers** (Hyperscalers, GCCs, Integrators), includes **3 ATS-optimized resume PDFs**, provides an **Interactive Job Application CRM (LocalStorage backed)**, and features a **Cold InMail Outreach Studio**.

---

## 🎯 Candidate Profile & 3 Target Career Tracks

| Track | Specialization & Focus | Target Employers | Key Certifications & Tags |
| :--- | :--- | :--- | :--- |
| **Track 1** | **Senior Program Manager – Physical Security & Security Technology**<br>RSOC command centers, enterprise VMS/ACS architecture, AI video analytics, vendor SLA governance, ISO 27001/PCI DSS. | Tech MNCs, Global Capability Centers (Microsoft, Amazon, Google, Cisco, Uber, Mastercard, Wells Fargo, Walmart) | • Lenel OnGuard Certified<br>• Genetec Security Center Certified<br>• PSM I Scrum Master |
| **Track 2** | **Security Systems Engineer / Solutions Engineer – Data Center Infrastructure**<br>Hyperscale DC fitouts, MEP/BMS alignment, power redundancy, liquid cooling, client technical walkthroughs, RFP/RFI packages. | Colocation Providers & Hyperscalers (Equinix, NTT Data, STT GDC, Yotta, CtrlS, AdaniConneX, AWS, Microsoft DC Ops) | • OCI Data Center Operations Certified (2026)<br>• OCI AI Foundations (2025)<br>• MEP & BMS SME |
| **Track 3** | **Technical Program Lead / Security Engineering Manager – Critical Infrastructure**<br>Testing & Acceptance (T&A), site turnover, contractor punch-list closeout, AutoCAD layouts, PIDS (Perimeter Intrusion Detection). | Specialized EPCs & Integrators (Honeywell Building Solutions, Johnson Controls, Schneider Electric, Siemens, CBRE, JLL) | • PSM I (Scrum Master)<br>• AutoCAD SME<br>• ASIS CPP / PSP Aligned |

---

## 🚀 Key Deliverables & System Architecture

```
d:\AI_stuff\Avinash\
├── index.html                    # Responsive Single-Page Dashboard (Tailwind + Lucide, Zero Build)
├── styles.css                    # Glassmorphism effects, theme variables, print & responsive styles
├── app.js                        # State engine: Track switching, local CRM, CSV export, InMail generator
├── data/
│   ├── links.json                # Structured dataset containing all deep-search links & metadata
│   └── portal_data.js            # Global JS fallback ensuring 100% offline & zero-CORS compatibility
├── scripts/
│   ├── generate_links.py         # Python intelligence engine generating URL-encoded boolean queries
│   └── generate_resumes.py       # Headless browser pipeline compiling ATS-clean HTML & PDF resumes
├── assets/
│   ├── resumes/
│   │   ├── Avinash_Jadhav_Resume_Physical_Security_Program_Manager.pdf
│   │   ├── Avinash_Jadhav_Resume_Physical_Security_Program_Manager.html
│   │   ├── Avinash_Jadhav_Resume_Data_Center_Infrastructure_Engineer.pdf
│   │   ├── Avinash_Jadhav_Resume_Data_Center_Infrastructure_Engineer.html
│   │   ├── Avinash_Jadhav_Resume_Critical_Infrastructure_Commissioning_Lead.pdf
│   │   └── Avinash_Jadhav_Resume_Critical_Infrastructure_Commissioning_Lead.html
│   └── images/                   # Badges (Oracle DC Ops, Lenel Certified, etc.)
├── docs/                         # Replicated bundle for GitHub Pages (/docs deployment mode)
└── README.md                     # Complete documentation & deployment guide
```

---

## 🛠️ Features Breakdown

### 1. Targeted Resume Hub (3 Specialized Formats)
- Direct one-click download for **3 distinct, ATS-optimized PDF resumes** (`assets/resumes/`).
- Includes online HTML preview with executive styling and printable A4 specifications (`@page { margin: 12mm 14mm; }`).

### 2. One-Click Deep-Search Portal Launchpad
- Dynamically updates URLs based on the selected **Track** and **Location** (Bengaluru, Pune, Mumbai / Navi Mumbai, Hyderabad, All India / Remote):
  - **LinkedIn Jobs**: URL-encoded boolean string with exact city URN and past-month recency filter (`f_TPR=r2592000`).
  - **Naukri.com India**: Pre-filtered boolean queries targeting Indian IT & infrastructure recruiters.
  - **Google Jobs Engine**: Direct aggregator query (`ibp=htl;jobs`).
  - **Indeed India**: Recent postings sorted by date (`fromage=14`).
  - **Foundit (Monster India)**: Keyword and location-filtered SRP links.
  - **Google ATS X-Ray (Dork)**: Surfaces unadvertised postings directly indexed from **Workday**, **Greenhouse**, **Lever**, and **SmartRecruiters**.

### 3. Boolean Query Lab
- One-click copy buttons for:
  - Standard LinkedIn Recruiter / ATS Boolean string
  - Indian Job Portals (Naukri Resdex) string
  - Google Dork / ATS search string

### 4. Curated Company Portal Grid (29+ Employers)
- Categorized into:
  - **Colocation & Hyperscalers (11)**: Equinix, NTT Global Data Centers, STT GDC, CtrlS, Yotta, AdaniConneX, AWS DC Ops, Microsoft DC, Colt DCS, Digital Edge, Iron Mountain.
  - **Enterprise Tech & GCCs (10)**: Google, Cisco, Mastercard, Wells Fargo, Target, Uber, Walmart, JPMorgan Chase, Goldman Sachs, Apple.
  - **Security Integrators & EPCs (8)**: Honeywell, Johnson Controls, Schneider Electric, Siemens, CBRE, JLL, Cushman & Wakefield, Securitas.
- Highlights **Alumni Advantage** for companies where Avinash previously worked (Oracle, Mastercard, Wells Fargo, Target, Siemens, Tyco).
- Real-time search filter (keyboard shortcut: press `/` to instantly focus search).

### 5. Job Application Tracker & CRM (LocalStorage)
- **Kanban Board** & **Table View** modes.
- Track status: `Saved`, `Applied`, `Interviewing`, `Follow-up`, `Offer`, `Rejected`.
- Add, Edit, Delete, and live status change dropdowns.
- **Export to CSV**: Download full spreadsheet (`.csv`) for Excel or Google Sheets.
- **Backup & Restore**: Export full JSON backup or restore across devices.
- Auto-saves all changes in browser `localStorage`.

### 6. Cold InMail & Recruiter Outreach Studio
- Generates tailored messages for each of the 3 tracks.
- Live replacement of `[Target Company]` and `[Hiring Manager Name]`.
- One-click copy to clipboard with toast notifications.

---

## 💻 Local Preview & Usage

### Option 1: Direct File Opening
Simply double-click [`index.html`](file:///d:/AI_stuff/Avinash/index.html) in your file manager. It works right out of the box because all datasets are bundled in `data/portal_data.js` with zero external build requirements.

### Option 2: Local Python Server (Recommended)
From the project root:
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in any browser.

---

## 🚢 GitHub Deployment & Hosting Guide

Follow these steps to host this dashboard publicly (or privately) on **GitHub Pages**:

### Step 1: Initialize & Commit (Local Git)
Ensure your changes are committed:
```bash
git add .
git commit -m "Deploy Avinash Jadhav Career Search Dashboard & Target Portal Finder"
git branch -M main
```

### Step 2: Push to GitHub

#### Method A: Using GitHub CLI (`gh`)
If you have `gh` installed:
```bash
# 1. Authenticate with GitHub
gh auth login

# 2. Create a new public repository and push automatically
gh repo create avinash-career-portal --public --source=. --remote=origin --push
```

#### Method B: Using Standard Git
If creating via [github.com/new](https://github.com/new):
```bash
# 1. Create a repository named "avinash-career-portal" on GitHub
# 2. Link your remote repository and push:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/avinash-career-portal.git
git push -u origin main
```

### Step 3: Enable GitHub Pages in 30 Seconds
1. In your GitHub repository, click on **Settings** (top navigation tab).
2. On the left sidebar under *Code and automation*, click **Pages**.
3. Under **Build and deployment > Source**, select:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)` *(or `/docs` — both are pre-configured!)*
4. Click **Save**.
5. Within 1–2 minutes, GitHub will publish your live dashboard at:
   ```
   https://<YOUR_GITHUB_USERNAME>.github.io/avinash-career-portal/
   ```

---

## 🔄 Refreshing Links & Regenerating Resumes

To update keywords, add target companies, or regenerate the PDF resumes:

### 1. Update Portal Links & Boolean Datasets:
```bash
python scripts/generate_links.py
```
This updates both `data/links.json` and `data/portal_data.js`.

### 2. Re-compile PDF Resumes:
```bash
python scripts/generate_resumes.py
```
This automatically uses headless Chrome/Edge to re-generate ATS-compliant PDFs in `assets/resumes/`.

### 3. Sync changes to `docs/` for GitHub Pages:
```powershell
Copy-Item -Recurse -Force assets, data, index.html, styles.css, app.js docs\
```

---

## 👤 Candidate Contact & Professional Coordinates

- **Candidate**: Avinash Jadhav
- **Location**: Bengaluru, Karnataka, India *(Open to Relocation to Pune, Mumbai/Navi Mumbai, Hyderabad)*
- **Phone**: [+91 9901071166](tel:+919901071166)
- **Email**: [ajadhav311989@gmail.com](mailto:ajadhav311989@gmail.com)
- **LinkedIn**: [linkedin.com/in/avinash-jadhav-54a67645](https://www.linkedin.com/in/avinash-jadhav-54a67645)

---
*Built with ❤️ for Avinash Jadhav. Fast, automated, and calibrated for high-impact executive placement.*
