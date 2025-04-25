/*  ========================================================================  *\
    S T Y L E M O D I F Y . J S (refactored with immediate title update)
\*  ========================================================================  */

// --- Constants & mappings -------------------------------------------------
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthToStyle = [
    'css/months/001-components-january.css',
    'css/months/002-components-february.css',
    'css/months/003-components-march.css',
    'css/months/004-components-april.css',
    'css/months/005-components-may.css',
    'css/months/006-components-june.css',
    'css/months/007-components-july.css',
    'css/months/008-components-august.css',
    'css/months/009-components-september.css',
    'css/months/010-components-october.css',
    'css/months/011-components-november.css',
    'css/months/012-components-december.css'
  ];
  
  const defaultStyle = 'css/default-style.css';
  const FADE_DURATION = 1000; // ms, match your CSS transition time
  
  // --- Initialization ------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEventListeners();
  });
  
  function initTheme() {
    const currentMonth = new Date().getMonth();
    const savedStyle = localStorage.getItem('selectedStyle');
    const valid = savedStyle && (monthToStyle.includes(savedStyle) || savedStyle === defaultStyle);
    const theme = valid ? savedStyle : (monthToStyle[currentMonth] || defaultStyle);
    loadTheme(theme);
  }
  
  // --- Theme loading helper ------------------------------------------------
  function loadTheme(href) {
    const linkEl = document.getElementById('theme-style');
    if (!linkEl) {
      console.error('Theme <link> element not found!');
      return;
    }
  
    // Setup load/error handlers for fallback
    linkEl.onload = () => {
      // do nothing extra for success
    };
    linkEl.onerror = () => {
      console.warn(`Failed to load: ${href}, falling back to default.`);
      linkEl.setAttribute('href', defaultStyle);
      localStorage.setItem('selectedStyle', defaultStyle);
      applyActiveAndTitle(defaultStyle);
    };
  
    // Apply theme, active state, title, and persist
    linkEl.setAttribute('href', href);
    localStorage.setItem('selectedStyle', href);
    applyActiveAndTitle(href);
  }
  
  // Combined helper to set active UI and header title
  function applyActiveAndTitle(sheet) {
    setActiveTheme(sheet);
    updateHeaderTitle(sheet);
  }
  
  // --- Event listeners -----------------------------------------------------
  function setupEventListeners() {
    const items = document.querySelectorAll('.style-selector-list li');
    if (!items.length) return console.warn('No style selector items found!');
  
    items.forEach(li => li.addEventListener('click', () => {
      const path = li.dataset.style;
      if (!path) return;
      loadTheme(path);
    }));
  }
  
  // --- Header title animation ---------------------------------------------
  function updateHeaderTitle(sheet) {
    const header = document.getElementById('header-title');
    if (!header) {
      console.error('Header title element not found!');
      return;
    }
  
    const idx = monthToStyle.indexOf(sheet);
    const text = idx !== -1 ? `${monthNames[idx]} Style` : 'Months in Styles';
  
    header.classList.add('fade-out');
    const fallback = setTimeout(() => {
      header.textContent = text;
      header.classList.replace('fade-out', 'fade-in');
    }, FADE_DURATION);
  
    header.addEventListener('transitionend', () => {
      clearTimeout(fallback);
      header.textContent = text;
      header.classList.replace('fade-out', 'fade-in');
    }, { once: true });
  }
  
  // --- Active theme UI update ---------------------------------------------
  function setActiveTheme(theme) {
    const items = document.querySelectorAll('.style-selector-list li');
    items.forEach(li => {
      li.classList.remove('active');
      li.setAttribute('aria-selected', 'false');
    });
  
    const match = document.querySelector(`.style-selector-list li[data-style="${theme}"]`);
    if (match) {
      match.classList.add('active');
      match.setAttribute('aria-selected', 'true');
    }
  }
  
  /*  ========================================================================  *\
      E N D   O F   S T Y L E M O D I F Y . J S
  \*  ========================================================================  */
  