/**
 * Career Search Dashboard & Target Portal Finder
 * Candidate: Avinash Jadhav
 * Logic Engine for Deep-Link Generation, Multi-Track Switching, Company Directory & Application Tracker
 */

// Global State
const state = {
  currentTrackId: 'track-1',
  currentLocationId: 'bengaluru',
  companyCategory: 'all',
  companySearchTerm: '',
  trackerStatusFilter: 'all',
  trackerViewMode: 'kanban', // 'kanban' or 'table'
  theme: localStorage.getItem('avinash_dashboard_theme') || 'dark',
  portalData: null,
  applications: []
};

// Default seed applications for Avinash's tracker
const DEFAULT_APPLICATIONS = [
  {
    id: 'app-1',
    company: 'Equinix India',
    role: 'Solutions Engineer – Data Center Infrastructure',
    track: 'track-2',
    trackName: 'Data Center Infrastructure & Solutions',
    location: 'Mumbai / Navi Mumbai',
    portal: 'Company Career Site',
    jobUrl: 'https://careers.equinix.com/jobs/search?q=India',
    dateApplied: '2026-09-24',
    status: 'Interviewing',
    notes: 'Technical discussion scheduled. Emphasize OCI DC Operations certification, MEP/BMS alignment and hyperscale fitout experience.',
    contact: 'Talent Acquisition Director'
  },
  {
    id: 'app-2',
    company: 'Microsoft',
    role: 'Senior Security Program Manager – Datacenter Operations',
    track: 'track-1',
    trackName: 'Physical Security Program Manager',
    location: 'Pune',
    portal: 'LinkedIn',
    jobUrl: 'https://careers.microsoft.com',
    dateApplied: '2026-09-26',
    status: 'Applied',
    notes: 'Submitted customized Physical Security resume highlighting Lenel & Genetec certifications and Oracle program management.',
    contact: 'Recruiter via LinkedIn'
  },
  {
    id: 'app-3',
    company: 'Johnson Controls',
    role: 'Critical Infrastructure Commissioning Lead',
    track: 'track-3',
    trackName: 'Critical Infrastructure & Commissioning Lead',
    location: 'Bengaluru',
    portal: 'Workday',
    jobUrl: 'https://jobs.johnsoncontrols.com',
    dateApplied: '2026-09-22',
    status: 'Follow-up',
    notes: 'Followed up with hiring manager regarding site turnover & T&A experience for large-scale enterprise campuses.',
    contact: 'Engineering Delivery Head'
  },
  {
    id: 'app-4',
    company: 'NTT Global Data Centers',
    role: 'Security Operations & Infrastructure Lead',
    track: 'track-2',
    trackName: 'Data Center Infrastructure & Solutions',
    location: 'Bengaluru',
    portal: 'Direct Referral',
    jobUrl: 'https://datacenter.hello.global.ntt',
    dateApplied: '2026-09-28',
    status: 'Applied',
    notes: 'Referred by ex-colleague. Shared tailored resume with OCI DC badge and client walkthrough expertise.',
    contact: 'VP of Data Center Operations'
  },
  {
    id: 'app-5',
    company: 'Cisco Systems',
    role: 'Global Workplace Physical Security Specialist',
    track: 'track-1',
    trackName: 'Physical Security Program Manager',
    location: 'Bengaluru',
    portal: 'Cisco Careers',
    jobUrl: 'https://jobs.cisco.com',
    dateApplied: '2026-09-20',
    status: 'Saved',
    notes: 'Targeting upcoming RSOC integration opening. Alumni connection identified on LinkedIn.',
    contact: 'Corporate Security Lead'
  }
];

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  await loadPortalData();
  initTrackerData();
  setupEventListeners();
  renderAll();
  lucide.createIcons();
});

// Load Portal Data from JS or JSON
async function loadPortalData() {
  if (window.PORTAL_DATA) {
    state.portalData = window.PORTAL_DATA;
    return;
  }
  try {
    const res = await fetch('data/links.json');
    if (res.ok) {
      state.portalData = await res.json();
    } else {
      throw new Error('Could not fetch data/links.json');
    }
  } catch (err) {
    console.warn('Fallback: loading inline minimal data', err);
    // Minimal fallback if accessed with restrictive file:// protocol without JS file
    state.portalData = window.PORTAL_DATA || {};
  }
}

// Local Storage for Applications Tracker
function initTrackerData() {
  const stored = localStorage.getItem('avinash_job_tracker_v1');
  if (stored) {
    try {
      state.applications = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored applications, resetting to default', e);
      state.applications = [...DEFAULT_APPLICATIONS];
      saveApplications();
    }
  } else {
    state.applications = [...DEFAULT_APPLICATIONS];
    saveApplications();
  }
}

function saveApplications() {
  localStorage.setItem('avinash_job_tracker_v1', JSON.stringify(state.applications));
}

// Theme handling
function initTheme() {
  if (state.theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
  updateThemeToggleIcon();
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('avinash_dashboard_theme', state.theme);
  if (state.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
  const iconSpan = document.getElementById('theme-toggle-icon');
  if (!iconSpan) return;
  if (state.theme === 'dark') {
    iconSpan.innerHTML = '<i data-lucide="sun" class="w-5 h-5 text-amber-400"></i>';
  } else {
    iconSpan.innerHTML = '<i data-lucide="moon" class="w-5 h-5 text-slate-700"></i>';
  }
  lucide.createIcons();
}

// Setup Event Listeners
function setupEventListeners() {
  // Theme toggle
  document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);

  // Track switcher tabs
  document.querySelectorAll('[data-track-tab]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const trackId = e.currentTarget.getAttribute('data-track-tab');
      setTrack(trackId);
    });
  });

  // Location selector pills
  document.querySelectorAll('[data-location-pill]').forEach(pill => {
    pill.addEventListener('click', (e) => {
      const locId = e.currentTarget.getAttribute('data-location-pill');
      setLocation(locId);
    });
  });

  // Company category filters
  document.querySelectorAll('[data-company-cat]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-company-cat');
      setCompanyCategory(cat);
    });
  });

  // Company search input
  const compSearch = document.getElementById('company-search-input');
  if (compSearch) {
    compSearch.addEventListener('input', (e) => {
      state.companySearchTerm = e.target.value.toLowerCase().trim();
      renderCompanies();
    });
  }

  // Application tracker filters
  document.querySelectorAll('[data-tracker-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.getAttribute('data-tracker-filter');
      setTrackerFilter(filter);
    });
  });

  // Tracker View Mode Switcher (Kanban vs Table)
  document.getElementById('view-kanban-btn')?.addEventListener('click', () => {
    state.trackerViewMode = 'kanban';
    updateTrackerViewModeButtons();
    renderApplications();
  });
  document.getElementById('view-table-btn')?.addEventListener('click', () => {
    state.trackerViewMode = 'table';
    updateTrackerViewModeButtons();
    renderApplications();
  });

  // Add Application Modal Handlers
  document.getElementById('open-add-job-modal-btn')?.addEventListener('click', openAddApplicationModal);
  document.getElementById('close-job-modal-btn')?.addEventListener('click', closeJobModal);
  document.getElementById('cancel-job-modal-btn')?.addEventListener('click', closeJobModal);
  document.getElementById('job-form')?.addEventListener('submit', handleSaveApplication);

  // Export / Import Handlers
  document.getElementById('export-csv-btn')?.addEventListener('click', exportToCSV);
  document.getElementById('export-json-btn')?.addEventListener('click', exportToJSON);
  document.getElementById('import-json-btn')?.addEventListener('click', triggerImportJSON);
  document.getElementById('json-file-input')?.addEventListener('change', handleImportJSON);
  document.getElementById('reset-tracker-btn')?.addEventListener('click', resetTrackerDefaults);

  // Outreach Template Copy
  document.getElementById('copy-outreach-btn')?.addEventListener('click', copyActiveOutreachTemplate);
  document.getElementById('outreach-target-company')?.addEventListener('input', updateOutreachPreview);
  document.getElementById('outreach-hiring-manager')?.addEventListener('input', updateOutreachPreview);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === '1') setTrack('track-1');
    if (e.key === '2') setTrack('track-2');
    if (e.key === '3') setTrack('track-3');
    if (e.key === '/') {
      e.preventDefault();
      document.getElementById('company-search-input')?.focus();
    }
  });
}

function updateTrackerViewModeButtons() {
  const kanbanBtn = document.getElementById('view-kanban-btn');
  const tableBtn = document.getElementById('view-table-btn');
  if (state.trackerViewMode === 'kanban') {
    kanbanBtn?.classList.add('bg-sky-500', 'text-white');
    kanbanBtn?.classList.remove('bg-slate-800', 'text-slate-400');
    tableBtn?.classList.remove('bg-sky-500', 'text-white');
    tableBtn?.classList.add('bg-slate-800', 'text-slate-400');
  } else {
    tableBtn?.classList.add('bg-sky-500', 'text-white');
    tableBtn?.classList.remove('bg-slate-800', 'text-slate-400');
    kanbanBtn?.classList.remove('bg-sky-500', 'text-white');
    kanbanBtn?.classList.add('bg-slate-800', 'text-slate-400');
  }
}

// Track Control
function setTrack(trackId) {
  state.currentTrackId = trackId;
  document.querySelectorAll('[data-track-tab]').forEach(tab => {
    const isCurrent = tab.getAttribute('data-track-tab') === trackId;
    if (isCurrent) {
      tab.classList.add('border-sky-500', 'text-sky-400', 'bg-sky-500/10', 'shadow-sm');
      tab.classList.remove('border-transparent', 'text-slate-400', 'hover:text-slate-200');
    } else {
      tab.classList.remove('border-sky-500', 'text-sky-400', 'bg-sky-500/10', 'shadow-sm');
      tab.classList.add('border-transparent', 'text-slate-400', 'hover:text-slate-200');
    }
  });

  renderTrackDetails();
  updateOutreachPreview();
  lucide.createIcons();
}

// Location Control
function setLocation(locId) {
  state.currentLocationId = locId;
  document.querySelectorAll('[data-location-pill]').forEach(pill => {
    const isCurrent = pill.getAttribute('data-location-pill') === locId;
    if (isCurrent) {
      pill.classList.add('bg-sky-600', 'text-white', 'shadow-md', 'scale-105');
      pill.classList.remove('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');
    } else {
      pill.classList.remove('bg-sky-600', 'text-white', 'shadow-md', 'scale-105');
      pill.classList.add('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');
    }
  });

  renderTrackLinks();
  lucide.createIcons();
}

// Company Category Filter
function setCompanyCategory(cat) {
  state.companyCategory = cat;
  document.querySelectorAll('[data-company-cat]').forEach(btn => {
    const isCurrent = btn.getAttribute('data-company-cat') === cat;
    if (isCurrent) {
      btn.classList.add('bg-sky-600', 'text-white', 'shadow');
      btn.classList.remove('bg-slate-800', 'text-slate-400', 'hover:bg-slate-700');
    } else {
      btn.classList.remove('bg-sky-600', 'text-white', 'shadow');
      btn.classList.add('bg-slate-800', 'text-slate-400', 'hover:bg-slate-700');
    }
  });
  renderCompanies();
}

// Tracker Filter
function setTrackerFilter(filter) {
  state.trackerStatusFilter = filter;
  document.querySelectorAll('[data-tracker-filter]').forEach(btn => {
    const isCurrent = btn.getAttribute('data-tracker-filter') === filter;
    if (isCurrent) {
      btn.classList.add('bg-sky-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-400');
    } else {
      btn.classList.remove('bg-sky-600', 'text-white');
      btn.classList.add('bg-slate-800', 'text-slate-400');
    }
  });
  renderApplications();
}

// Render All Components
function renderAll() {
  renderTrackDetails();
  renderCompanies();
  renderApplications();
  updateOutreachPreview();
  updateTrackerViewModeButtons();
}

// Render Active Track Details & Portal Deep Links
function renderTrackDetails() {
  if (!state.portalData || !state.portalData.tracks) return;
  const track = state.portalData.tracks.find(t => t.id === state.currentTrackId);
  if (!track) return;

  // Title & Summary
  document.getElementById('track-title').textContent = track.title;
  document.getElementById('track-badge').textContent = track.badge;
  document.getElementById('track-summary').textContent = track.summary;

  // Target Roles Tags
  const rolesContainer = document.getElementById('target-roles-container');
  if (rolesContainer) {
    rolesContainer.innerHTML = track.target_roles.map(role => `
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
        <i data-lucide="crosshair" class="w-3.5 h-3.5 mr-1 text-sky-400"></i> ${escapeHtml(role)}
      </span>
    `).join('');
  }

  // Core Keywords Tags
  const keywordsContainer = document.getElementById('core-keywords-container');
  if (keywordsContainer) {
    keywordsContainer.innerHTML = track.core_keywords.map(kw => `
      <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:border-sky-500/50 transition">
        ${escapeHtml(kw)}
      </span>
    `).join('');
  }

  // Target Employers Samples
  const employersContainer = document.getElementById('target-employers-container');
  if (employersContainer) {
    employersContainer.innerHTML = track.target_employers_sample.map(emp => `
      <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
        <i data-lucide="building" class="w-3 h-3 mr-1 text-indigo-400"></i> ${escapeHtml(emp)}
      </span>
    `).join('');
  }

  // Render Boolean Query Box
  renderBooleanQueries(track);

  // Render Portal Deep Links for current location
  renderTrackLinks();
}

function renderBooleanQueries(track) {
  const queryBox = document.getElementById('boolean-queries-container');
  if (!queryBox) return;

  queryBox.innerHTML = `
    <div class="space-y-3">
      <!-- Standard Boolean -->
      <div class="bg-slate-900/90 rounded-lg p-3.5 border border-slate-800">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <i data-lucide="terminal" class="w-3.5 h-3.5"></i> LinkedIn Recruiter & ATS Boolean (Recommended)
          </span>
          <button onclick="copyToClipboard('${escapeJsString(track.search_queries.boolean_standard)}', 'Standard Boolean Query Copied!')" 
                  class="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-300 transition flex items-center gap-1">
            <i data-lucide="copy" class="w-3 h-3"></i> Copy String
          </button>
        </div>
        <p class="font-mono text-xs text-emerald-400 bg-slate-950 p-2.5 rounded border border-slate-800/80 break-words select-all">
          ${escapeHtml(track.search_queries.boolean_standard)}
        </p>
      </div>

      <!-- Naukri / Indeed Query -->
      <div class="bg-slate-900/90 rounded-lg p-3.5 border border-slate-800">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <i data-lucide="search" class="w-3.5 h-3.5"></i> Naukri Resdex & Indian Job Portals Query
          </span>
          <button onclick="copyToClipboard('${escapeJsString(track.search_queries.naukri_query)}', 'Naukri Boolean Query Copied!')" 
                  class="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-600 hover:text-white text-slate-300 transition flex items-center gap-1">
            <i data-lucide="copy" class="w-3 h-3"></i> Copy String
          </button>
        </div>
        <p class="font-mono text-xs text-amber-300 bg-slate-950 p-2.5 rounded border border-slate-800/80 break-words select-all">
          ${escapeHtml(track.search_queries.naukri_query)}
        </p>
      </div>

      <!-- Google X-Ray ATS Dork -->
      <div class="bg-slate-900/90 rounded-lg p-3.5 border border-slate-800">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <i data-lucide="radar" class="w-3.5 h-3.5"></i> Google X-Ray Dork (Workday, Greenhouse, Lever ATS)
          </span>
          <button onclick="copyToClipboard('${escapeJsString(track.search_queries.boolean_standard + ' (site:jobs.lever.co OR site:boards.greenhouse.io OR site:myworkdayjobs.com)')}', 'ATS Google Dork Copied!')" 
                  class="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 transition flex items-center gap-1">
            <i data-lucide="copy" class="w-3 h-3"></i> Copy Dork
          </button>
        </div>
        <p class="font-mono text-xs text-purple-300 bg-slate-950 p-2.5 rounded border border-slate-800/80 break-words select-all">
          (${escapeHtml(track.search_queries.boolean_standard)}) AND ("India" OR "Bengaluru") (site:jobs.lever.co OR site:boards.greenhouse.io OR site:myworkdayjobs.com)
        </p>
      </div>
    </div>
  `;
}

function renderTrackLinks() {
  if (!state.portalData || !state.portalData.tracks) return;
  const track = state.portalData.tracks.find(t => t.id === state.currentTrackId);
  if (!track) return;

  const locObj = track.location_links.find(l => l.location_id === state.currentLocationId) || track.location_links[0];
  const container = document.getElementById('portal-launcher-buttons');
  if (!container || !locObj) return;

  container.innerHTML = `
    <!-- LinkedIn -->
    <a href="${locObj.linkedin_url}" target="_blank" rel="noopener noreferrer" 
       class="group relative flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900 border border-blue-500/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-black text-sm">
            in
          </div>
          <div>
            <h4 class="font-bold text-white text-sm group-hover:text-blue-300 transition">LinkedIn Jobs</h4>
            <span class="text-[11px] text-blue-400 font-medium">${escapeHtml(locObj.location_name)}</span>
          </div>
        </div>
        <i data-lucide="external-link" class="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"></i>
      </div>
      <p class="text-xs text-slate-400 mb-3">Targeted Boolean query with location URN & past-month recency filter.</p>
      <span class="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold group-hover:bg-blue-500 transition shadow">
        Launch LinkedIn Search <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </span>
    </a>

    <!-- Naukri -->
    <a href="${locObj.naukri_url}" target="_blank" rel="noopener noreferrer" 
       class="group relative flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/30 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/20 transition-all transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-black text-sm">
            N
          </div>
          <div>
            <h4 class="font-bold text-white text-sm group-hover:text-sky-300 transition">Naukri India</h4>
            <span class="text-[11px] text-sky-400 font-medium">${escapeHtml(locObj.location_name)}</span>
          </div>
        </div>
        <i data-lucide="external-link" class="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"></i>
      </div>
      <p class="text-xs text-slate-400 mb-3">India's largest corporate job board with pre-encoded keyword matrix.</p>
      <span class="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-sky-600 text-white text-xs font-semibold group-hover:bg-sky-500 transition shadow">
        Launch Naukri Search <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </span>
    </a>

    <!-- Google Jobs -->
    <a href="${locObj.google_jobs_url}" target="_blank" rel="noopener noreferrer" 
       class="group relative flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm">
            G
          </div>
          <div>
            <h4 class="font-bold text-white text-sm group-hover:text-emerald-300 transition">Google Jobs Engine</h4>
            <span class="text-[11px] text-emerald-400 font-medium">${escapeHtml(locObj.location_name)}</span>
          </div>
        </div>
        <i data-lucide="external-link" class="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"></i>
      </div>
      <p class="text-xs text-slate-400 mb-3">Direct Google Hire & Aggregated career portal schema crawler.</p>
      <span class="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold group-hover:bg-emerald-500 transition shadow">
        Launch Google Jobs <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </span>
    </a>

    <!-- Indeed India -->
    <a href="${locObj.indeed_url}" target="_blank" rel="noopener noreferrer" 
       class="group relative flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20 transition-all transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-black text-sm">
            id
          </div>
          <div>
            <h4 class="font-bold text-white text-sm group-hover:text-indigo-300 transition">Indeed India</h4>
            <span class="text-[11px] text-indigo-400 font-medium">${escapeHtml(locObj.location_name)}</span>
          </div>
        </div>
        <i data-lucide="external-link" class="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"></i>
      </div>
      <p class="text-xs text-slate-400 mb-3">Past 14 days postings sorted by newest date first.</p>
      <span class="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold group-hover:bg-indigo-500 transition shadow">
        Launch Indeed Search <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </span>
    </a>

    <!-- Foundit / Monster -->
    <a href="${locObj.foundit_url}" target="_blank" rel="noopener noreferrer" 
       class="group relative flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-black text-sm">
            fd
          </div>
          <div>
            <h4 class="font-bold text-white text-sm group-hover:text-purple-300 transition">Foundit (Monster)</h4>
            <span class="text-[11px] text-purple-400 font-medium">${escapeHtml(locObj.location_name)}</span>
          </div>
        </div>
        <i data-lucide="external-link" class="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"></i>
      </div>
      <p class="text-xs text-slate-400 mb-3">Direct SRP filtered search across enterprise & IT infrastructure employers.</p>
      <span class="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold group-hover:bg-purple-500 transition shadow">
        Launch Foundit Search <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </span>
    </a>

    <!-- Google ATS X-Ray Dork -->
    <a href="${locObj.google_xray_ats_url}" target="_blank" rel="noopener noreferrer" 
       class="group relative flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-sm">
            ⚡
          </div>
          <div>
            <h4 class="font-bold text-white text-sm group-hover:text-amber-300 transition">Google ATS X-Ray</h4>
            <span class="text-[11px] text-amber-400 font-medium">Unadvertised ATS Jobs</span>
          </div>
        </div>
        <i data-lucide="external-link" class="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"></i>
      </div>
      <p class="text-xs text-slate-400 mb-3">Unlocks direct Workday, Lever & Greenhouse job pages indexed by Google.</p>
      <span class="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold group-hover:bg-amber-500 transition shadow">
        Launch ATS X-Ray <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </span>
    </a>
  `;
}

// Render Curated Company Grid
function renderCompanies() {
  if (!state.portalData || !state.portalData.companies) return;
  const container = document.getElementById('company-grid-container');
  if (!container) return;

  const filtered = state.portalData.companies.filter(c => {
    // Category match
    const catMatch = state.companyCategory === 'all' || 
      (state.companyCategory === 'dc' && c.category.includes('Data Center')) ||
      (state.companyCategory === 'tech' && c.category.includes('Enterprise Tech')) ||
      (state.companyCategory === 'integrators' && (c.category.includes('Integrators') || c.category.includes('EPC')));

    // Search term match
    const term = state.companySearchTerm;
    const searchMatch = !term || 
      c.name.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term) ||
      c.locations.some(loc => loc.toLowerCase().includes(term)) ||
      (c.search_hint && c.search_hint.toLowerCase().includes(term));

    return catMatch && searchMatch;
  });

  const countBadge = document.getElementById('company-count-badge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} of ${state.portalData.companies.length} Companies`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-2 text-slate-600"></i>
        <p class="font-medium">No target companies match your search "${escapeHtml(state.companySearchTerm)}".</p>
        <button onclick="clearCompanySearch()" class="mt-2 text-xs text-sky-400 hover:underline">Reset search filter</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // Alumni companies for Avinash
  const alumniCompanies = ['Oracle', 'Mastercard', 'Target in India', 'Wells Fargo', 'Siemens India'];

  container.innerHTML = filtered.map(co => {
    const isAlumni = alumniCompanies.some(a => co.name.toLowerCase().includes(a.toLowerCase()));
    const categoryBadgeClass = co.category.includes('Data Center') ? 'badge-colocation' :
                               co.category.includes('Enterprise Tech') ? 'badge-enterprise' : 'badge-integrator';

    return `
      <div class="group relative flex flex-col justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2.5">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 font-bold text-sm flex items-center justify-center text-sky-400 group-hover:scale-105 transition">
                ${escapeHtml(co.logo_text || co.name.substring(0, 2).toUpperCase())}
              </div>
              <div>
                <h4 class="font-bold text-white text-sm group-hover:text-sky-300 transition leading-tight flex items-center gap-1.5">
                  ${escapeHtml(co.name)}
                </h4>
                <span class="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${categoryBadgeClass}">
                  ${escapeHtml(co.category)}
                </span>
              </div>
            </div>
            ${isAlumni ? `
              <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" title="Avinash previously worked here!">
                <i data-lucide="award" class="w-3 h-3 text-emerald-400"></i> Alumni
              </span>
            ` : `
              <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                ${escapeHtml(co.portal_type)}
              </span>
            `}
          </div>

          <!-- Locations -->
          <div class="flex flex-wrap gap-1 mb-2.5">
            ${co.locations.map(loc => `
              <span class="text-[10.5px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                ${escapeHtml(loc)}
              </span>
            `).join('')}
          </div>

          <!-- Search Hint -->
          <p class="text-[11px] text-slate-400 mb-3 bg-slate-950/60 p-2 rounded border border-slate-800/60 font-mono">
            ${escapeHtml(co.search_hint || 'Direct Career Board')}
          </p>
        </div>

        <div class="flex items-center gap-2 pt-2 border-t border-slate-800">
          <a href="${co.careers_url}" target="_blank" rel="noopener noreferrer" 
             class="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition">
            <span>Open Career Site</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
          <button onclick="prefillApplicationForm('${escapeJsString(co.name)}', '${escapeJsString(co.careers_url)}')" 
                  title="Add to Application Tracker"
                  class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition">
            <i data-lucide="bookmark-plus" class="w-4 h-4 text-sky-400"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function clearCompanySearch() {
  state.companySearchTerm = '';
  const input = document.getElementById('company-search-input');
  if (input) input.value = '';
  renderCompanies();
}

// Render Application Tracker (Kanban or Table)
function renderApplications() {
  const countEl = document.getElementById('tracker-total-count');
  if (countEl) countEl.textContent = state.applications.length;

  const appliedCountEl = document.getElementById('tracker-applied-count');
  if (appliedCountEl) {
    appliedCountEl.textContent = state.applications.filter(a => a.status === 'Applied').length;
  }
  const interviewCountEl = document.getElementById('tracker-interview-count');
  if (interviewCountEl) {
    interviewCountEl.textContent = state.applications.filter(a => a.status === 'Interviewing').length;
  }
  const offerCountEl = document.getElementById('tracker-offer-count');
  if (offerCountEl) {
    offerCountEl.textContent = state.applications.filter(a => a.status === 'Offer').length;
  }

  const kanbanContainer = document.getElementById('kanban-view-container');
  const tableContainer = document.getElementById('table-view-container');

  if (state.trackerViewMode === 'kanban') {
    if (kanbanContainer) kanbanContainer.classList.remove('hidden');
    if (tableContainer) tableContainer.classList.add('hidden');
    renderKanbanBoard();
  } else {
    if (kanbanContainer) kanbanContainer.classList.add('hidden');
    if (tableContainer) tableContainer.classList.remove('hidden');
    renderApplicationsTable();
  }
}

function renderKanbanBoard() {
  const columns = [
    { id: 'Saved', title: 'Saved / Target', color: 'border-slate-500 text-slate-400' },
    { id: 'Applied', title: 'Applied', color: 'border-sky-500 text-sky-400' },
    { id: 'Interviewing', title: 'Interviewing / Active', color: 'border-amber-500 text-amber-400' },
    { id: 'Offer', title: 'Offer / Final', color: 'border-emerald-500 text-emerald-400' },
    { id: 'Follow-up', title: 'Follow-up', color: 'border-purple-500 text-purple-400' }
  ];

  const boardEl = document.getElementById('kanban-board');
  if (!boardEl) return;

  boardEl.innerHTML = columns.map(col => {
    const appsInCol = state.applications.filter(a => a.status === col.id);
    return `
      <div class="bg-slate-900/60 rounded-xl p-3 border border-slate-800 flex flex-col min-w-[260px] max-w-[320px] flex-1">
        <div class="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider ${col.color} flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-current"></span> ${col.title}
          </span>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            ${appsInCol.length}
          </span>
        </div>

        <div class="space-y-2.5 flex-1 overflow-y-auto max-h-[500px] pr-1">
          ${appsInCol.length === 0 ? `
            <div class="py-6 text-center text-slate-500 text-xs italic">
              No applications in this stage
            </div>
          ` : appsInCol.map(app => `
            <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 hover:border-sky-500/40 transition group">
              <div class="flex items-start justify-between gap-1 mb-1.5">
                <h5 class="font-bold text-white text-xs group-hover:text-sky-300 transition">
                  ${escapeHtml(app.company)}
                </h5>
                <div class="flex items-center gap-1">
                  <button onclick="editApplication('${app.id}')" class="text-slate-500 hover:text-slate-300 p-0.5">
                    <i data-lucide="edit-3" class="w-3 h-3"></i>
                  </button>
                  <button onclick="deleteApplication('${app.id}')" class="text-slate-500 hover:text-red-400 p-0.5">
                    <i data-lucide="trash-2" class="w-3 h-3"></i>
                  </button>
                </div>
              </div>

              <p class="text-xs text-sky-400 font-medium mb-1 line-clamp-1">${escapeHtml(app.role)}</p>
              
              <div class="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                <span><i data-lucide="map-pin" class="w-2.5 h-2.5 inline mr-0.5"></i>${escapeHtml(app.location || 'India')}</span>
                <span>${escapeHtml(app.dateApplied || 'N/A')}</span>
              </div>

              ${app.notes ? `
                <p class="text-[11px] text-slate-300 bg-slate-900/90 p-2 rounded border border-slate-800/80 mb-2 line-clamp-2">
                  ${escapeHtml(app.notes)}
                </p>
              ` : ''}

              <div class="flex items-center justify-between pt-1 border-t border-slate-800/60">
                <select onchange="updateApplicationStatus('${app.id}', this.value)" 
                        class="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 rounded px-1.5 py-0.5">
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

function renderApplicationsTable() {
  const tbody = document.getElementById('tracker-table-body');
  if (!tbody) return;

  const filtered = state.applications.filter(a => {
    return state.trackerStatusFilter === 'all' || a.status.toLowerCase() === state.trackerStatusFilter.toLowerCase();
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-slate-500 text-sm italic">
          No job applications match the selected status filter.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(app => {
    const statusClasses = {
      'Saved': 'bg-slate-700 text-slate-300',
      'Applied': 'bg-sky-500/20 text-sky-300 border border-sky-500/40',
      'Interviewing': 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
      'Offer': 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
      'Follow-up': 'bg-purple-500/20 text-purple-300 border border-purple-500/40',
      'Rejected': 'bg-red-500/20 text-red-300 border border-red-500/40'
    }[app.status] || 'bg-slate-700 text-slate-300';

    return `
      <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition">
        <td class="py-3 px-4 font-bold text-white text-xs">
          ${escapeHtml(app.company)}
        </td>
        <td class="py-3 px-4 text-xs text-sky-400 font-semibold">
          ${escapeHtml(app.role)}
        </td>
        <td class="py-3 px-4 text-xs text-slate-400">
          ${escapeHtml(app.location || 'India')}
        </td>
        <td class="py-3 px-4 text-xs text-slate-400 font-mono">
          ${escapeHtml(app.dateApplied || 'N/A')}
        </td>
        <td class="py-3 px-4 text-xs text-slate-300">
          <span class="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
            ${escapeHtml(app.portal || 'Direct')}
          </span>
        </td>
        <td class="py-3 px-4">
          <select onchange="updateApplicationStatus('${app.id}', this.value)" 
                  class="text-xs px-2 py-1 rounded font-bold ${statusClasses} bg-slate-900 border border-slate-700">
            <option value="Saved" ${app.status === 'Saved' ? 'selected' : ''}>Saved</option>
            <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
            <option value="Interviewing" ${app.status === 'Interviewing' ? 'selected' : ''}>Interviewing</option>
            <option value="Follow-up" ${app.status === 'Follow-up' ? 'selected' : ''}>Follow-up</option>
            <option value="Offer" ${app.status === 'Offer' ? 'selected' : ''}>Offer</option>
            <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
          </select>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            ${app.jobUrl ? `
              <a href="${app.jobUrl}" target="_blank" rel="noopener noreferrer" 
                 class="p-1 text-slate-400 hover:text-sky-400 transition" title="Open Job Link">
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            ` : ''}
            <button onclick="editApplication('${app.id}')" class="p-1 text-slate-400 hover:text-white transition" title="Edit Application">
              <i data-lucide="edit" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="deleteApplication('${app.id}')" class="p-1 text-slate-400 hover:text-red-400 transition" title="Delete">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  lucide.createIcons();
}

// Application CRUD Operations
function updateApplicationStatus(id, newStatus) {
  const app = state.applications.find(a => a.id === id);
  if (app) {
    app.status = newStatus;
    saveApplications();
    renderApplications();
    showToast(`Status updated to "${newStatus}" for ${app.company}`);
  }
}

function openAddApplicationModal() {
  document.getElementById('job-modal-title').textContent = 'Log New Job Application';
  document.getElementById('job-id-input').value = '';
  document.getElementById('job-company-input').value = '';
  document.getElementById('job-role-input').value = '';
  document.getElementById('job-location-input').value = 'Bengaluru';
  document.getElementById('job-portal-input').value = 'LinkedIn';
  document.getElementById('job-url-input').value = '';
  document.getElementById('job-date-input').value = new Date().toISOString().split('T')[0];
  document.getElementById('job-status-input').value = 'Applied';
  document.getElementById('job-notes-input').value = '';

  document.getElementById('job-modal').classList.remove('hidden');
  document.getElementById('job-company-input').focus();
}

function prefillApplicationForm(companyName, careersUrl) {
  openAddApplicationModal();
  document.getElementById('job-company-input').value = companyName;
  document.getElementById('job-url-input').value = careersUrl;
  document.getElementById('job-portal-input').value = 'Company Career Site';
}

function editApplication(id) {
  const app = state.applications.find(a => a.id === id);
  if (!app) return;

  document.getElementById('job-modal-title').textContent = `Edit Application: ${app.company}`;
  document.getElementById('job-id-input').value = app.id;
  document.getElementById('job-company-input').value = app.company;
  document.getElementById('job-role-input').value = app.role;
  document.getElementById('job-location-input').value = app.location || '';
  document.getElementById('job-portal-input').value = app.portal || 'LinkedIn';
  document.getElementById('job-url-input').value = app.jobUrl || '';
  document.getElementById('job-date-input').value = app.dateApplied || '';
  document.getElementById('job-status-input').value = app.status || 'Applied';
  document.getElementById('job-notes-input').value = app.notes || '';

  document.getElementById('job-modal').classList.remove('hidden');
}

function closeJobModal() {
  document.getElementById('job-modal').classList.add('hidden');
}

function handleSaveApplication(e) {
  e.preventDefault();
  const id = document.getElementById('job-id-input').value;
  const company = document.getElementById('job-company-input').value.trim();
  const role = document.getElementById('job-role-input').value.trim();
  const location = document.getElementById('job-location-input').value.trim();
  const portal = document.getElementById('job-portal-input').value;
  const jobUrl = document.getElementById('job-url-input').value.trim();
  const dateApplied = document.getElementById('job-date-input').value;
  const status = document.getElementById('job-status-input').value;
  const notes = document.getElementById('job-notes-input').value.trim();

  if (!company || !role) {
    alert('Please enter both Company Name and Role.');
    return;
  }

  if (id) {
    // Edit existing
    const appIndex = state.applications.findIndex(a => a.id === id);
    if (appIndex !== -1) {
      state.applications[appIndex] = {
        ...state.applications[appIndex],
        company, role, location, portal, jobUrl, dateApplied, status, notes
      };
      showToast(`Updated application for ${company}`);
    }
  } else {
    // New
    const newApp = {
      id: 'app-' + Date.now(),
      company, role, location, portal, jobUrl, dateApplied, status, notes,
      track: state.currentTrackId
    };
    state.applications.unshift(newApp);
    showToast(`Added application for ${company}`);
  }

  saveApplications();
  closeJobModal();
  renderApplications();
}

function deleteApplication(id) {
  const app = state.applications.find(a => a.id === id);
  if (!app) return;
  if (confirm(`Are you sure you want to remove the application for "${app.company}"?`)) {
    state.applications = state.applications.filter(a => a.id !== id);
    saveApplications();
    renderApplications();
    showToast(`Removed application for ${app.company}`);
  }
}

function resetTrackerDefaults() {
  if (confirm('Reset application tracker to default demonstration data? This will overwrite your current entries.')) {
    state.applications = [...DEFAULT_APPLICATIONS];
    saveApplications();
    renderApplications();
    showToast('Application tracker reset to defaults');
  }
}

// CSV Export
function exportToCSV() {
  if (state.applications.length === 0) {
    alert('No applications to export.');
    return;
  }

  const headers = ['Company', 'Role', 'Location', 'Date Applied', 'Portal/Source', 'Status', 'Job URL', 'Notes'];
  const rows = state.applications.map(a => [
    `"${(a.company || '').replace(/"/g, '""')}"`,
    `"${(a.role || '').replace(/"/g, '""')}"`,
    `"${(a.location || '').replace(/"/g, '""')}"`,
    `"${(a.dateApplied || '').replace(/"/g, '""')}"`,
    `"${(a.portal || '').replace(/"/g, '""')}"`,
    `"${(a.status || '').replace(/"/g, '""')}"`,
    `"${(a.jobUrl || '').replace(/"/g, '""')}"`,
    `"${(a.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Avinash_Jadhav_Job_Applications_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Exported applications to CSV file');
}

// JSON Export / Import
function exportToJSON() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.applications, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `Avinash_Jadhav_Job_Tracker_Backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Downloaded JSON backup');
}

function triggerImportJSON() {
  document.getElementById('json-file-input')?.click();
}

function handleImportJSON(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data)) {
        state.applications = data;
        saveApplications();
        renderApplications();
        showToast(`Successfully imported ${data.length} applications!`);
      } else {
        alert('Invalid JSON file format. Expected an array of job application records.');
      }
    } catch (err) {
      alert('Error parsing JSON file: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// Outreach Template Logic
function updateOutreachPreview() {
  if (!state.portalData || !state.portalData.outreach_templates) return;
  const tmpl = state.portalData.outreach_templates[state.currentTrackId];
  if (!tmpl) return;

  const coInput = document.getElementById('outreach-target-company');
  const hmInput = document.getElementById('outreach-hiring-manager');

  const co = (coInput && coInput.value.trim()) || '[Target Company]';
  const hm = (hmInput && hmInput.value.trim()) || '[Hiring Manager / Recruiter Name]';

  const previewSubject = tmpl.subject.replace(/\[Target Company\]/g, co);
  const previewBody = tmpl.body
    .replace(/\[Hiring Manager \/ Recruiter Name\]/g, hm)
    .replace(/\[Target Company\]/g, co);

  const subjectEl = document.getElementById('outreach-preview-subject');
  const bodyEl = document.getElementById('outreach-preview-body');

  if (subjectEl) subjectEl.textContent = previewSubject;
  if (bodyEl) bodyEl.textContent = previewBody;
}

function copyActiveOutreachTemplate() {
  const subjectEl = document.getElementById('outreach-preview-subject');
  const bodyEl = document.getElementById('outreach-preview-body');

  const fullText = `Subject: ${subjectEl?.textContent || ''}\n\n${bodyEl?.textContent || ''}`;
  copyToClipboard(fullText, 'Tailored Outreach Pitch Copied to Clipboard!');
}

// Clipboard & Toast Utilities
function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(err => {
      fallbackCopyText(text, successMsg);
    });
  } else {
    fallbackCopyText(text, successMsg);
  }
}

function fallbackCopyText(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    prompt('Copy to clipboard: Ctrl+C, Enter', text);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-animate flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold border border-sky-500/50 shadow-xl shadow-sky-500/10';
  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Helper escape functions
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeJsString(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

// Expose functions to window
window.setTrack = setTrack;
window.setLocation = setLocation;
window.setCompanyCategory = setCompanyCategory;
window.clearCompanySearch = clearCompanySearch;
window.prefillApplicationForm = prefillApplicationForm;
window.updateApplicationStatus = updateApplicationStatus;
window.editApplication = editApplication;
window.deleteApplication = deleteApplication;
window.copyToClipboard = copyToClipboard;
