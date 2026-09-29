/**
 * User-Friendly Career Command Center & AI Job Match Engine
 * Candidate: Avinash Jadhav
 * Automates Job Recommendations, Match Likelihood Scoring, 1-Click Tracking & Resume Matching
 */

// Global State
const state = {
  activeFilter: 'all',
  activeCityFilter: 'all',
  searchTerm: '',
  trackerViewMode: 'kanban',
  theme: localStorage.getItem('avinash_dashboard_theme') || 'dark',
  matchedJobs: [],
  applications: [],
  candidateProfile: {
    name: "Avinash Jadhav",
    experienceYears: 14,
    certifications: [
      "Lenel OnGuard Certified Systems Engineer",
      "Genetec Security Center Certified Systems Engineer",
      "Oracle Cloud Infrastructure Data Center Operations Foundations Associate (2026)",
      "Oracle Cloud Infrastructure AI Foundations Associate (2025)",
      "Professional Scrum Master I (PSM I)",
      "ASIS CPP / PSP Alignment"
    ],
    skills: [
      "Physical Security", "Access Control (ACS)", "Video Management Systems (VMS)", "CCTV",
      "Perimeter Intrusion Detection (PIDS)", "RSOC / GSOC", "Incident Automation",
      "Data Center Infrastructure", "Hyperscale Colocation", "MEP Integration",
      "Building Management Systems (BMS)", "Power Redundancy (UPS/Generators)", "Liquid Cooling",
      "Site Turnover", "Testing & Acceptance (T&A)", "Punch List Verification",
      "AutoCAD Layouts", "SOW / RFP Technical Packages", "Client Technical Walkthroughs",
      "ISO 27001", "PCI DSS", "SOC 2", "Vendor SLA Governance", "Root Cause Analysis (RCA)"
    ],
    alumniCompanies: ["Oracle", "Mastercard", "Wells Fargo", "Target", "Siemens", "Tyco"]
  }
};

// Default applications in CRM
const DEFAULT_APPLICATIONS = [
  {
    id: "app-1",
    company: "Equinix India",
    role: "Lead Solutions Engineer – Data Center Infrastructure & Security",
    location: "Mumbai / Navi Mumbai",
    matchScore: 98,
    dateApplied: "2026-09-27",
    status: "Interviewing",
    portal: "Equinix Careers / Workday",
    jobUrl: "https://careers.equinix.com/jobs/search?q=India",
    resumeUsed: "Track 2: Data Center Solutions Resume",
    notes: "Technical interview scheduled. Focus on OCI DC Operations certification, MEP/BMS alignment, and client walkthroughs."
  },
  {
    id: "app-2",
    company: "Amazon Web Services (AWS)",
    role: "Cluster Security Manager – Infrastructure Physical Security",
    location: "Mumbai",
    matchScore: 97,
    dateApplied: "2026-09-28",
    status: "Applied",
    portal: "Amazon Jobs",
    jobUrl: "https://www.amazon.jobs/en/search?base_query=Data+Center+Security&country=IND",
    resumeUsed: "Track 1: Physical Security PM Resume",
    notes: "Submitted application for Cluster Security Manager. Highlighted Lenel/Genetec certs and Oracle T&A leadership."
  },
  {
    id: "app-3",
    company: "Mastercard",
    role: "Senior Program Manager – Corporate Security & Infrastructure (Alumni Re-hire)",
    location: "Pune",
    matchScore: 97,
    dateApplied: "2026-09-25",
    status: "Interviewing",
    portal: "Alumni Direct / Workday",
    jobUrl: "https://mastercard.wd1.myworkdayjobs.com",
    resumeUsed: "Track 1: Physical Security PM Resume",
    notes: "Connected with former director. Discussed returning with expanded hyperscale program leadership experience."
  },
  {
    id: "app-4",
    company: "Johnson Controls",
    role: "Critical Infrastructure Commissioning Lead / Project Manager",
    location: "Bengaluru",
    matchScore: 95,
    dateApplied: "2026-09-26",
    status: "Follow-up",
    portal: "JCI Careers",
    jobUrl: "https://jobs.johnsoncontrols.com",
    resumeUsed: "Track 3: Commissioning Lead Resume",
    notes: "Followed up on site turnover and punch-list defect closure experience across critical facilities."
  },
  {
    id: "app-5",
    company: "Microsoft",
    role: "Senior Security Program Manager – Datacenter Operations",
    location: "Pune / Bengaluru",
    matchScore: 96,
    dateApplied: "2026-09-29",
    status: "Saved",
    portal: "Microsoft Careers",
    jobUrl: "https://careers.microsoft.com",
    resumeUsed: "Track 1: Physical Security PM Resume",
    notes: "Targeting upcoming opening. Prepared tailored outreach pitch for Microsoft recruiter."
  }
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadJobsData();
  initApplications();
  setupEventListeners();
  renderAll();
  lucide.createIcons();
});

// Load Jobs Data
function loadJobsData() {
  if (window.MATCHED_JOBS && Array.isArray(window.MATCHED_JOBS)) {
    state.matchedJobs = window.MATCHED_JOBS;
  } else {
    console.warn('Fallback: MATCHED_JOBS not found on window, attempting fetch');
    fetch('data/matched_jobs.json')
      .then(res => res.json())
      .then(data => {
        state.matchedJobs = data;
        renderJobs();
        updateMetricCounters();
      })
      .catch(err => console.error(err));
  }
}

// Applications CRM Storage
function initApplications() {
  const stored = localStorage.getItem('avinash_applications_v2');
  if (stored) {
    try {
      state.applications = JSON.parse(stored);
    } catch (e) {
      state.applications = [...DEFAULT_APPLICATIONS];
      saveApplications();
    }
  } else {
    state.applications = [...DEFAULT_APPLICATIONS];
    saveApplications();
  }
}

function saveApplications() {
  localStorage.setItem('avinash_applications_v2', JSON.stringify(state.applications));
}

// Theme handling
function initTheme() {
  if (state.theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
  updateThemeIcon();
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('avinash_dashboard_theme', state.theme);
  if (state.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const iconEl = document.getElementById('theme-toggle-icon');
  if (!iconEl) return;
  if (state.theme === 'dark') {
    iconEl.innerHTML = '<i data-lucide="sun" class="w-5 h-5 text-amber-400"></i>';
  } else {
    iconEl.innerHTML = '<i data-lucide="moon" class="w-5 h-5 text-slate-700"></i>';
  }
  lucide.createIcons();
}

// Setup Event Listeners
function setupEventListeners() {
  // Theme Toggle
  document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);

  // Filter Pills
  document.querySelectorAll('[data-filter-pill]').forEach(pill => {
    pill.addEventListener('click', (e) => {
      const filter = e.currentTarget.getAttribute('data-filter-pill');
      setActiveFilter(filter);
    });
  });

  // City Filter Dropdown
  document.getElementById('city-filter-select')?.addEventListener('change', (e) => {
    state.activeCityFilter = e.target.value;
    renderJobs();
  });

  // Search Input
  document.getElementById('job-search-input')?.addEventListener('input', (e) => {
    state.searchTerm = e.target.value.toLowerCase().trim();
    renderJobs();
  });

  // Application Tracker Views
  document.getElementById('kanban-view-btn')?.addEventListener('click', () => {
    state.trackerViewMode = 'kanban';
    updateTrackerViewButtons();
    renderApplications();
  });

  document.getElementById('table-view-btn')?.addEventListener('click', () => {
    state.trackerViewMode = 'table';
    updateTrackerViewButtons();
    renderApplications();
  });

  // Export CSV
  document.getElementById('export-csv-btn')?.addEventListener('click', exportToCSV);

  // Instant Job Match Calculator Button
  document.getElementById('analyze-match-btn')?.addEventListener('click', handleJobDescriptionAnalysis);
  document.getElementById('load-sample-jd-btn')?.addEventListener('click', loadSampleJobDescription);

  // Add Job Modal
  document.getElementById('add-job-manual-btn')?.addEventListener('click', openAddApplicationModal);
  document.getElementById('close-modal-btn')?.addEventListener('click', closeModal);
  document.getElementById('cancel-modal-btn')?.addEventListener('click', closeModal);
  document.getElementById('job-modal-form')?.addEventListener('submit', handleSaveApplication);
  document.getElementById('close-details-modal-btn')?.addEventListener('click', closeDetailsModal);

  // Keyboard shortcut: Press / to search
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === '/') {
      e.preventDefault();
      document.getElementById('job-search-input')?.focus();
    }
  });
}

function updateTrackerViewButtons() {
  const kBtn = document.getElementById('kanban-view-btn');
  const tBtn = document.getElementById('table-view-btn');
  if (state.trackerViewMode === 'kanban') {
    kBtn?.classList.add('bg-sky-500', 'text-white');
    kBtn?.classList.remove('bg-slate-800', 'text-slate-400');
    tBtn?.classList.remove('bg-sky-500', 'text-white');
    tBtn?.classList.add('bg-slate-800', 'text-slate-400');
  } else {
    tBtn?.classList.add('bg-sky-500', 'text-white');
    tBtn?.classList.remove('bg-slate-800', 'text-slate-400');
    kBtn?.classList.remove('bg-sky-500', 'text-white');
    kBtn?.classList.add('bg-slate-800', 'text-slate-400');
  }
}

function setActiveFilter(filter) {
  state.activeFilter = filter;
  document.querySelectorAll('[data-filter-pill]').forEach(btn => {
    const isCurrent = btn.getAttribute('data-filter-pill') === filter;
    if (isCurrent) {
      btn.classList.add('bg-sky-600', 'text-white', 'shadow');
      btn.classList.remove('bg-slate-900', 'text-slate-400', 'hover:bg-slate-800');
    } else {
      btn.classList.remove('bg-sky-600', 'text-white', 'shadow');
      btn.classList.add('bg-slate-900', 'text-slate-400', 'hover:bg-slate-800');
    }
  });
  renderJobs();
}

function renderAll() {
  updateMetricCounters();
  renderJobs();
  renderApplications();
  updateTrackerViewButtons();
}

function updateMetricCounters() {
  const jobs = state.matchedJobs || [];
  
  // Total matches
  const totalEl = document.getElementById('stat-total-matches');
  if (totalEl) totalEl.textContent = jobs.length;

  // Elite matches (95%+)
  const eliteEl = document.getElementById('stat-elite-matches');
  if (eliteEl) eliteEl.textContent = jobs.filter(j => j.matchScore >= 95).length;

  // Data center roles
  const dcEl = document.getElementById('stat-dc-matches');
  if (dcEl) dcEl.textContent = jobs.filter(j => j.trackId === 'track-2').length;

  // Alumni advantage
  const alumniEl = document.getElementById('stat-alumni-matches');
  if (alumniEl) alumniEl.textContent = jobs.filter(j => j.alumniAdvantage).length;
}

// Render Job Recommendations Cards
function renderJobs() {
  const container = document.getElementById('matched-jobs-container');
  if (!container) return;

  const filtered = (state.matchedJobs || []).filter(job => {
    // Category filter
    let catMatch = true;
    if (state.activeFilter === 'elite') catMatch = job.matchScore >= 95;
    else if (state.activeFilter === 'dc') catMatch = job.trackId === 'track-2';
    else if (state.activeFilter === 'security') catMatch = job.trackId === 'track-1';
    else if (state.activeFilter === 'commissioning') catMatch = job.trackId === 'track-3';
    else if (state.activeFilter === 'alumni') catMatch = job.alumniAdvantage === true;

    // City filter
    let cityMatch = true;
    if (state.activeCityFilter !== 'all') {
      cityMatch = job.location.toLowerCase().includes(state.activeCityFilter.toLowerCase());
    }

    // Search term
    let searchMatch = true;
    if (state.searchTerm) {
      const term = state.searchTerm;
      searchMatch = job.company.toLowerCase().includes(term) ||
                    job.role.toLowerCase().includes(term) ||
                    job.location.toLowerCase().includes(term) ||
                    (job.skillsMatched && job.skillsMatched.some(s => s.toLowerCase().includes(term)));
    }

    return catMatch && cityMatch && searchMatch;
  });

  const countEl = document.getElementById('job-results-count');
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${state.matchedJobs.length} Verified Openings`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 text-slate-600"></i>
        <h4 class="text-base font-bold text-white">No jobs match your filter criteria</h4>
        <p class="text-xs text-slate-400 mt-1">Try switching to "All Matches" or clearing your search term.</p>
        <button onclick="resetFilters()" class="mt-4 px-4 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition">
          Reset All Filters
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(job => {
    // Score ring styling
    let scoreColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    let badgeText = '⭐ Elite Match';
    if (job.matchScore < 95 && job.matchScore >= 92) {
      scoreColor = 'text-sky-400 border-sky-500/40 bg-sky-500/10';
      badgeText = '🔥 High Match';
    } else if (job.matchScore < 92) {
      scoreColor = 'text-amber-400 border-amber-500/40 bg-amber-500/10';
      badgeText = 'Good Match';
    }

    const isAlumni = job.alumniAdvantage;

    return `
      <div class="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/60 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-200">
        <div>
          <!-- Header with Match Score & Company -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-sky-400 text-base shadow-inner group-hover:scale-105 transition">
                ${escapeHtml(job.company.substring(0, 2).toUpperCase())}
              </div>
              <div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <h4 class="font-extrabold text-white text-base leading-snug group-hover:text-sky-300 transition">
                    ${escapeHtml(job.company)}
                  </h4>
                  ${isAlumni ? `
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" title="Avinash previously worked here!">
                      <i data-lucide="award" class="w-3 h-3 text-emerald-400"></i> Alumni Advantage
                    </span>
                  ` : ''}
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3 text-slate-500"></i> ${escapeHtml(job.location)}</span>
                  <span>•</span>
                  <span class="text-slate-400 font-mono text-[11px]">${escapeHtml(job.salaryBand || 'Competitive Tech CTC')}</span>
                </div>
              </div>
            </div>

            <!-- Match Score Badge -->
            <div class="flex flex-col items-end">
              <div class="px-2.5 py-1 rounded-xl border ${scoreColor} text-center shadow-sm">
                <span class="text-base font-black tracking-tight block">${job.matchScore}%</span>
                <span class="text-[9px] font-bold uppercase tracking-wider block opacity-90">Likelihood</span>
              </div>
            </div>
          </div>

          <!-- Job Role Title -->
          <h5 class="text-sm font-bold text-sky-400 mb-2.5 leading-snug">
            ${escapeHtml(job.role)}
          </h5>

          <!-- Top 3 Reasons Why He Matches -->
          <div class="mb-3.5 space-y-1.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
              <i data-lucide="sparkles" class="w-3 h-3 text-amber-400"></i> Why Avinash is Recommended:
            </span>
            ${job.keyReasons.slice(0, 3).map(reason => `
              <div class="flex items-start gap-1.5 text-xs text-slate-300 leading-snug">
                <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5"></i>
                <span>${escapeHtml(reason)}</span>
              </div>
            `).join('')}
          </div>

          <!-- Skills Matched Pills -->
          <div class="flex flex-wrap gap-1 mb-3">
            ${job.skillsMatched.slice(0, 5).map(skill => `
              <span class="text-[10.5px] px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60 font-medium">
                ${escapeHtml(skill)}
              </span>
            `).join('')}
            ${job.skillsMatched.length > 5 ? `
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400">
                +${job.skillsMatched.length - 5} more
              </span>
            ` : ''}
          </div>

          <!-- Recommended Resume to Send -->
          <div class="flex items-center justify-between p-2 rounded-lg bg-sky-950/30 border border-sky-500/20 text-xs mb-4">
            <div class="flex items-center gap-1.5 text-sky-300 font-semibold text-[11px]">
              <i data-lucide="file-check" class="w-3.5 h-3.5 text-sky-400"></i>
              <span>Attach: <strong>${escapeHtml(job.recommendedResumeTitle)}</strong></span>
            </div>
            <a href="assets/resumes/${job.recommendedResume}" download="${job.recommendedResume}" 
               class="text-[10px] text-sky-400 hover:text-white font-bold underline flex items-center gap-0.5">
              Download PDF <i data-lucide="download" class="w-2.5 h-2.5"></i>
            </a>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-3 border-t border-slate-800 space-y-2">
          <div class="grid grid-cols-2 gap-2">
            <!-- Apply Link -->
            <a href="${job.applyUrl}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-sm shadow-sky-600/30">
              <span>Apply on Portal</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>

            <!-- Quick Track Button -->
            <button onclick="quickTrackJob('${job.id}')" 
                    class="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition">
              <i data-lucide="bookmark-plus" class="w-3.5 h-3.5 text-emerald-400"></i>
              <span>Add to Tracker</span>
            </button>
          </div>

          <!-- Secondary Actions: InMail Pitch & Details -->
          <div class="flex items-center justify-between text-xs pt-1">
            <button onclick="copyJobPitch('${job.id}')" 
                    class="text-indigo-400 hover:text-indigo-300 text-[11px] font-semibold flex items-center gap-1 transition">
              <i data-lucide="mail" class="w-3 h-3"></i> Copy Tailored InMail Pitch
            </button>
            <button onclick="openJobDetailsModal('${job.id}')" 
                    class="text-slate-400 hover:text-white text-[11px] font-medium flex items-center gap-1 transition">
              <i data-lucide="info" class="w-3 h-3"></i> Full Rationale
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function resetFilters() {
  state.activeFilter = 'all';
  state.activeCityFilter = 'all';
  state.searchTerm = '';
  const searchInput = document.getElementById('job-search-input');
  if (searchInput) searchInput.value = '';
  const citySelect = document.getElementById('city-filter-select');
  if (citySelect) citySelect.value = 'all';
  setActiveFilter('all');
}

// 1-Click Quick Track from Recommendation Card
function quickTrackJob(jobId) {
  const job = state.matchedJobs.find(j => j.id === jobId);
  if (!job) return;

  const existing = state.applications.find(a => a.company === job.company && a.role === job.role);
  if (existing) {
    showToast(`Already tracked: ${job.company}`);
    return;
  }

  const newApp = {
    id: 'app-' + Date.now(),
    company: job.company,
    role: job.role,
    location: job.location,
    matchScore: job.matchScore,
    dateApplied: new Date().toISOString().split('T')[0],
    status: 'Saved',
    portal: job.portalType,
    jobUrl: job.applyUrl,
    resumeUsed: job.recommendedResumeTitle,
    notes: `Matched automatically with ${job.matchScore}% likelihood. ${job.keyReasons[0]}`
  };

  state.applications.unshift(newApp);
  saveApplications();
  renderApplications();
  showToast(`Added ${job.company} to your Application Tracker!`);
}

// 1-Click Copy InMail Pitch
function copyJobPitch(jobId) {
  const job = state.matchedJobs.find(j => j.id === jobId);
  if (!job || !job.outreachTemplate) return;

  copyToClipboard(job.outreachTemplate, `InMail pitch for ${job.company} copied to clipboard!`);
}

// Open Match Details Modal
function openJobDetailsModal(jobId) {
  const job = state.matchedJobs.find(j => j.id === jobId);
  if (!job) return;

  document.getElementById('details-company-name').textContent = job.company;
  document.getElementById('details-job-role').textContent = job.role;
  document.getElementById('details-match-score').textContent = `${job.matchScore}% Likelihood Fit`;
  document.getElementById('details-location').textContent = job.location;
  document.getElementById('details-resume-text').textContent = job.recommendedResumeTitle;
  
  const resumeDownloadBtn = document.getElementById('details-resume-download-btn');
  if (resumeDownloadBtn) {
    resumeDownloadBtn.href = `assets/resumes/${job.recommendedResume}`;
    resumeDownloadBtn.setAttribute('download', job.recommendedResume);
  }

  const applyBtn = document.getElementById('details-apply-btn');
  if (applyBtn) applyBtn.href = job.applyUrl;

  const reasonsList = document.getElementById('details-reasons-list');
  if (reasonsList) {
    reasonsList.innerHTML = job.keyReasons.map(r => `
      <li class="flex items-start gap-2 text-xs text-slate-300">
        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
        <span>${escapeHtml(r)}</span>
      </li>
    `).join('');
  }

  const skillsList = document.getElementById('details-skills-list');
  if (skillsList) {
    skillsList.innerHTML = job.skillsMatched.map(s => `
      <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-sky-400 border border-slate-700">
        ${escapeHtml(s)}
      </span>
    `).join('');
  }

  document.getElementById('job-details-modal')?.classList.remove('hidden');
  lucide.createIcons();
}

function closeDetailsModal() {
  document.getElementById('job-details-modal')?.classList.add('hidden');
}

// Application CRM Rendering
function renderApplications() {
  const kanban = document.getElementById('crm-kanban-board');
  const table = document.getElementById('crm-table-container');

  if (state.trackerViewMode === 'kanban') {
    if (kanban) kanban.classList.remove('hidden');
    if (table) table.classList.add('hidden');
    renderKanbanCRM();
  } else {
    if (kanban) kanban.classList.add('hidden');
    if (table) table.classList.remove('hidden');
    renderTableCRM();
  }
}

function renderKanbanCRM() {
  const board = document.getElementById('crm-kanban-board');
  if (!board) return;

  const columns = [
    { id: 'Saved', title: 'Saved / Target', color: 'border-slate-500 text-slate-400' },
    { id: 'Applied', title: 'Applied', color: 'border-sky-500 text-sky-400' },
    { id: 'Interviewing', title: 'Interviewing', color: 'border-amber-500 text-amber-400' },
    { id: 'Follow-up', title: 'Follow-up', color: 'border-purple-500 text-purple-400' },
    { id: 'Offer', title: 'Offer / Final', color: 'border-emerald-500 text-emerald-400' }
  ];

  board.innerHTML = columns.map(col => {
    const apps = state.applications.filter(a => a.status === col.id);
    return `
      <div class="bg-slate-900/60 rounded-2xl p-3.5 border border-slate-800 flex flex-col min-w-[260px] max-w-[320px] flex-1">
        <div class="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
          <span class="text-xs font-extrabold uppercase tracking-wider ${col.color} flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-current"></span> ${col.title}
          </span>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            ${apps.length}
          </span>
        </div>

        <div class="space-y-3 flex-1 overflow-y-auto max-h-[520px] pr-1">
          ${apps.length === 0 ? `
            <div class="py-8 text-center text-slate-500 text-xs italic">
              No applications in this stage
            </div>
          ` : apps.map(app => `
            <div class="bg-slate-950 p-3.5 rounded-xl border border-slate-800 hover:border-sky-500/40 transition group space-y-2">
              <div class="flex items-start justify-between gap-1">
                <h6 class="font-bold text-white text-xs group-hover:text-sky-300 transition line-clamp-1">
                  ${escapeHtml(app.company)}
                </h6>
                <button onclick="deleteApplication('${app.id}')" class="text-slate-500 hover:text-red-400 p-0.5 transition" title="Delete">
                  <i data-lucide="trash-2" class="w-3 h-3"></i>
                </button>
              </div>

              <p class="text-xs text-sky-400 font-semibold line-clamp-1">${escapeHtml(app.role)}</p>

              <div class="flex items-center justify-between text-[10px] text-slate-400">
                <span><i data-lucide="map-pin" class="w-2.5 h-2.5 inline mr-0.5"></i>${escapeHtml(app.location || 'India')}</span>
                <span>${escapeHtml(app.dateApplied || 'N/A')}</span>
              </div>

              ${app.matchScore ? `
                <div class="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <i data-lucide="zap" class="w-2.5 h-2.5"></i> ${app.matchScore}% Match
                </div>
              ` : ''}

              ${app.notes ? `
                <p class="text-[11px] text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 line-clamp-2">
                  ${escapeHtml(app.notes)}
                </p>
              ` : ''}

              <div class="flex items-center justify-between pt-1 border-t border-slate-800">
                <select onchange="updateApplicationStatus('${app.id}', this.value)" 
                        class="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 rounded px-1.5 py-0.5 font-semibold">
                  <option value="Saved" ${app.status === 'Saved' ? 'selected' : ''}>Saved</option>
                  <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
                  <option value="Interviewing" ${app.status === 'Interviewing' ? 'selected' : ''}>Interviewing</option>
                  <option value="Follow-up" ${app.status === 'Follow-up' ? 'selected' : ''}>Follow-up</option>
                  <option value="Offer" ${app.status === 'Offer' ? 'selected' : ''}>Offer</option>
                  <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                </select>

                ${app.jobUrl ? `
                  <a href="${app.jobUrl}" target="_blank" rel="noopener noreferrer" 
                     class="text-[10px] text-sky-400 hover:underline flex items-center gap-0.5">
                    Job Link <i data-lucide="external-link" class="w-2.5 h-2.5"></i>
                  </a>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function renderTableCRM() {
  const tbody = document.getElementById('crm-table-body');
  if (!tbody) return;

  if (state.applications.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-slate-500 italic">No job applications tracked yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.applications.map(app => `
    <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition">
      <td class="py-3 px-4 font-bold text-white text-xs">${escapeHtml(app.company)}</td>
      <td class="py-3 px-4 text-xs text-sky-400 font-semibold">${escapeHtml(app.role)}</td>
      <td class="py-3 px-4 text-xs text-slate-400">${escapeHtml(app.location || 'India')}</td>
      <td class="py-3 px-4 text-xs text-slate-400 font-mono">${escapeHtml(app.dateApplied || 'N/A')}</td>
      <td class="py-3 px-4">
        <select onchange="updateApplicationStatus('${app.id}', this.value)" 
                class="text-xs px-2 py-1 rounded font-bold bg-slate-900 border border-slate-700 text-slate-300">
          <option value="Saved" ${app.status === 'Saved' ? 'selected' : ''}>Saved</option>
          <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
          <option value="Interviewing" ${app.status === 'Interviewing' ? 'selected' : ''}>Interviewing</option>
          <option value="Follow-up" ${app.status === 'Follow-up' ? 'selected' : ''}>Follow-up</option>
          <option value="Offer" ${app.status === 'Offer' ? 'selected' : ''}>Offer</option>
          <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
        </select>
      </td>
      <td class="py-3 px-4 text-right">
        <div class="flex items-center justify-end gap-1">
          ${app.jobUrl ? `<a href="${app.jobUrl}" target="_blank" class="p-1 text-slate-400 hover:text-sky-400"><i data-lucide="external-link" class="w-3.5 h-3.5"></i></a>` : ''}
          <button onclick="deleteApplication('${app.id}')" class="p-1 text-slate-400 hover:text-red-400"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
}

function updateApplicationStatus(id, newStatus) {
  const app = state.applications.find(a => a.id === id);
  if (app) {
    app.status = newStatus;
    saveApplications();
    renderApplications();
    showToast(`Updated status to "${newStatus}" for ${app.company}`);
  }
}

function deleteApplication(id) {
  const app = state.applications.find(a => a.id === id);
  if (!app) return;
  if (confirm(`Remove "${app.company}" application?`)) {
    state.applications = state.applications.filter(a => a.id !== id);
    saveApplications();
    renderApplications();
    showToast(`Removed application for ${app.company}`);
  }
}

function exportToCSV() {
  if (state.applications.length === 0) {
    alert('No applications to export.');
    return;
  }
  const headers = ['Company', 'Role', 'Location', 'Match Score', 'Date Applied', 'Status', 'Portal', 'Notes'];
  const rows = state.applications.map(a => [
    `"${(a.company || '').replace(/"/g, '""')}"`,
    `"${(a.role || '').replace(/"/g, '""')}"`,
    `"${(a.location || '').replace(/"/g, '""')}"`,
    `"${a.matchScore || 'N/A'}"`,
    `"${(a.dateApplied || '').replace(/"/g, '""')}"`,
    `"${(a.status || '').replace(/"/g, '""')}"`,
    `"${(a.portal || '').replace(/"/g, '""')}"`,
    `"${(a.notes || '').replace(/"/g, '""')}"`
  ]);

  const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encoded = encodeURI(csv);
  const link = document.createElement('a');
  link.setAttribute('href', encoded);
  link.setAttribute('download', `Avinash_Jadhav_Job_Applications_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Exported applications to CSV spreadsheet');
}

// Instant Job Fit Calculator Engine
function handleJobDescriptionAnalysis() {
  const text = document.getElementById('jd-input-text')?.value.trim();
  if (!text) {
    alert('Please paste a job description or title to analyze.');
    return;
  }

  const resultContainer = document.getElementById('match-analysis-result');
  if (!resultContainer) return;

  // Keyword scoring algorithm
  const textLower = text.toLowerCase();
  const profile = state.candidateProfile;

  let matchedKeywords = [];
  let scorePoints = 50; // base score for 14+ years experience

  const criticalKeywords = [
    { kw: "physical security", weight: 8 },
    { kw: "lenel", weight: 10 },
    { kw: "genetec", weight: 10 },
    { kw: "access control", weight: 6 },
    { kw: "vms", weight: 6 },
    { kw: "cctv", weight: 5 },
    { kw: "data center", weight: 9 },
    { kw: "datacenter", weight: 9 },
    { kw: "hyperscale", weight: 7 },
    { kw: "mep", weight: 7 },
    { kw: "bms", weight: 6 },
    { kw: "power", weight: 4 },
    { kw: "liquid cooling", weight: 8 },
    { kw: "commissioning", weight: 8 },
    { kw: "site turnover", weight: 8 },
    { kw: "punch list", weight: 7 },
    { kw: "autocad", weight: 6 },
    { kw: "rsoc", weight: 7 },
    { kw: "gsoc", weight: 7 },
    { kw: "iso 27001", weight: 6 },
    { kw: "pci dss", weight: 6 },
    { kw: "soc 2", weight: 6 },
    { kw: "vendor", weight: 4 },
    { kw: "sla", weight: 5 },
    { kw: "scrum", weight: 5 }
  ];

  criticalKeywords.forEach(item => {
    if (textLower.includes(item.kw)) {
      matchedKeywords.push(item.kw.toUpperCase());
      scorePoints += item.weight;
    }
  });

  // Check alumni advantage
  let alumniCompanyFound = null;
  profile.alumniCompanies.forEach(co => {
    if (textLower.includes(co.toLowerCase())) {
      alumniCompanyFound = co;
      scorePoints += 10;
    }
  });

  // Normalize score between 75 and 99
  let finalScore = Math.min(99, Math.max(76, scorePoints));

  // Determine best resume recommendation
  let bestResume = "Track 1: Physical Security Program Manager";
  let resumeFile = "Avinash_Jadhav_Resume_Physical_Security_Program_Manager.pdf";
  if (textLower.includes("data center") || textLower.includes("datacenter") || textLower.includes("mep") || textLower.includes("cooling")) {
    bestResume = "Track 2: Data Center Solutions & Infrastructure Engineer";
    resumeFile = "Avinash_Jadhav_Resume_Data_Center_Infrastructure_Engineer.pdf";
  } else if (textLower.includes("commissioning") || textLower.includes("turnover") || textLower.includes("punch list")) {
    bestResume = "Track 3: Critical Infrastructure Commissioning Lead";
    resumeFile = "Avinash_Jadhav_Resume_Critical_Infrastructure_Commissioning_Lead.pdf";
  }

  resultContainer.innerHTML = `
    <div class="p-5 rounded-2xl bg-slate-900 border border-sky-500/50 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Match Calculation:</span>
          <h4 class="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
            <span class="text-emerald-400 text-2xl font-black">${finalScore}%</span>
            <span>Estimated Candidate Likelihood</span>
          </h4>
        </div>
        <div class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          Strong Fit Profile
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <span class="font-bold text-slate-300 block mb-1.5">Matching Core Competencies:</span>
          <div class="flex flex-wrap gap-1">
            ${matchedKeywords.length ? matchedKeywords.map(k => `
              <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono text-[11px]">
                ✓ ${k}
              </span>
            `).join('') : '<span class="text-slate-400">14+ Years Enterprise Engineering baseline match</span>'}
          </div>
          ${alumniCompanyFound ? `
            <div class="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <i data-lucide="award" class="w-3.5 h-3.5"></i> Alumni Advantage detected for <strong>${alumniCompanyFound}</strong>!
            </div>
          ` : ''}
        </div>

        <div>
          <span class="font-bold text-slate-300 block mb-1.5">Recommended Resume to Submit:</span>
          <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <p class="text-sky-300 font-bold mb-2">${bestResume}</p>
            <a href="assets/resumes/${resumeFile}" download="${resumeFile}" 
               class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition">
              <i data-lucide="download" class="w-3.5 h-3.5"></i> Download PDF Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  resultContainer.classList.remove('hidden');
  lucide.createIcons();
  showToast(`Match score calculated: ${finalScore}%`);
}

function loadSampleJobDescription() {
  const sample = `Role: Senior Manager - Data Center Infrastructure & Physical Security Operations
Location: Mumbai / Bengaluru
Experience: 10-15 Years
Key Responsibilities:
- Oversee physical security systems, access control (Lenel / Genetec), VMS, and perimeter intrusion detection.
- Coordinate with MEP, facility operations, and cooling teams for fault-tolerant hyperscale data center operations.
- Direct operational acceptance, commissioning, and site turnover with third-party EPC contractors.
- Ensure strict compliance with ISO 27001, SOC 2, and PCI DSS standards.`;

  const input = document.getElementById('jd-input-text');
  if (input) {
    input.value = sample;
    handleJobDescriptionAnalysis();
  }
}

// Modal Form Operations
function openAddApplicationModal() {
  document.getElementById('job-modal-form')?.reset();
  document.getElementById('manual-date-applied').value = new Date().toISOString().split('T')[0];
  document.getElementById('add-job-modal')?.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('add-job-modal')?.classList.add('hidden');
}

function handleSaveApplication(e) {
  e.preventDefault();
  const company = document.getElementById('manual-company').value.trim();
  const role = document.getElementById('manual-role').value.trim();
  const location = document.getElementById('manual-location').value.trim();
  const status = document.getElementById('manual-status').value;
  const dateApplied = document.getElementById('manual-date-applied').value;
  const notes = document.getElementById('manual-notes').value.trim();

  if (!company || !role) {
    alert('Please enter both Company and Role.');
    return;
  }

  const newApp = {
    id: 'app-' + Date.now(),
    company,
    role,
    location,
    status,
    dateApplied,
    notes,
    portal: 'Manual Entry'
  };

  state.applications.unshift(newApp);
  saveApplications();
  renderApplications();
  closeModal();
  showToast(`Logged application for ${company}`);
}

// Clipboard & Toast Utilities
function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => showToast(successMsg)).catch(() => fallbackCopy(text, successMsg));
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (e) {
    prompt('Copy to clipboard:', text);
  }
  document.body.removeChild(ta);
}

function showToast(msg) {
  const c = document.getElementById('toast-container');
  if (!c) return;

  const t = document.createElement('div');
  t.className = 'toast-animate flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold border border-sky-500/50 shadow-2xl';
  t.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i><span>${escapeHtml(msg)}</span>`;
  c.appendChild(t);
  lucide.createIcons();

  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    t.style.transition = 'all 0.3s ease';
    setTimeout(() => t.remove(), 300);
  }, 2600);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Window exports
window.setActiveFilter = setActiveFilter;
window.resetFilters = resetFilters;
window.quickTrackJob = quickTrackJob;
window.copyJobPitch = copyJobPitch;
window.openJobDetailsModal = openJobDetailsModal;
window.closeDetailsModal = closeDetailsModal;
window.updateApplicationStatus = updateApplicationStatus;
window.deleteApplication = deleteApplication;
