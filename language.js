// ============================================
//   SKILLNOVA - NLP Language Support
//   Telugu + English Multi-language System
// ============================================

const SkillNovaLang = {

  // Current active language
  current: 'en',

  // ---- Language Detection ----
  detect(text) {
    // Telugu Unicode range: 0C00–0C7F
    const teluguPattern = /[\u0C00-\u0C7F]/;
    if (teluguPattern.test(text)) return 'te';
    return 'en';
  },

  // ---- UI Text Translations ----
  translations: {
    en: {
      // Navbar
      findWork: 'Find Work',
      postJob: 'Post a Job',
      login: 'Log In',
      getStarted: 'Get Started',
      logout: 'Logout',
      dashboard: 'Dashboard',
      myProfile: 'My Profile',
      messages: 'Messages',
      myPortfolio: 'My Portfolio',
      skillExchange: 'Skill Exchange',
      myRatings: 'My Ratings',
      findJobs: 'Find Jobs',

      // Dashboard
      goodMorning: 'Good morning',
      jobsNearYou: 'Jobs Near You',
      trustScore: 'Trust Score',
      jobsCompleted: 'Jobs Completed',
      totalEarned: 'Total Earned',
      aiAdvisor: 'AI Skill Advisor',
      askAI: 'Ask AI',
      aiPlaceholder: 'Ask anything... e.g. What skills should I learn to earn more?',
      nearbyJobs: 'Nearby Jobs',
      viewAll: 'View All',
      myStatus: 'My Status',
      availableForWork: 'Available for Work',
      currentlyBusy: 'Currently Busy',
      jobAlerts: 'Job Alerts',
      heatmap: 'Skill Demand Heatmap',
      inYourArea: 'In your area today',

      // Status messages
      statusAvailable: 'Status: Available 🟢',
      statusBusy: 'Status: Busy 🔴',

      // Common
      save: 'Save',
      cancel: 'Cancel',
      submit: 'Submit',
      back: 'Back',
      continue: 'Continue',
      loading: 'Loading...',
      search: 'Search',
      welcome: 'Welcome',
    },

    te: {
      // Navbar
      findWork: 'పని కనుగొనండి',
      postJob: 'పని పోస్ట్ చేయండి',
      login: 'లాగిన్',
      getStarted: 'ప్రారంభించండి',
      logout: 'లాగౌట్',
      dashboard: 'డాష్‌బోర్డ్',
      myProfile: 'నా ప్రొఫైల్',
      messages: 'సందేశాలు',
      myPortfolio: 'నా పోర్ట్‌ఫోలియో',
      skillExchange: 'నైపుణ్య మార్పిడి',
      myRatings: 'నా రేటింగ్‌లు',
      findJobs: 'ఉద్యోగాలు కనుగొనండి',

      // Dashboard
      goodMorning: 'శుభోదయం',
      jobsNearYou: 'మీ దగ్గర ఉద్యోగాలు',
      trustScore: 'నమ్మకం స్కోర్',
      jobsCompleted: 'పూర్తయిన పనులు',
      totalEarned: 'మొత్తం సంపాదన',
      aiAdvisor: 'AI నైపుణ్య సలహాదారు',
      askAI: 'AI ని అడగండి',
      aiPlaceholder: 'ఏదైనా అడగండి... ఉదా: నేను ఏ నైపుణ్యాలు నేర్చుకోవాలి?',
      nearbyJobs: 'దగ్గరలో ఉద్యోగాలు',
      viewAll: 'అన్నీ చూడండి',
      myStatus: 'నా స్థితి',
      availableForWork: 'పని కోసం అందుబాటులో ఉన్నాను',
      currentlyBusy: 'ప్రస్తుతం బిజీగా ఉన్నాను',
      jobAlerts: 'ఉద్యోగ హెచ్చరికలు',
      heatmap: 'నైపుణ్య డిమాండ్ హీట్‌మ్యాప్',
      inYourArea: 'మీ ప్రాంతంలో ఈరోజు',

      // Status messages
      statusAvailable: 'స్థితి: అందుబాటులో ఉన్నాను 🟢',
      statusBusy: 'స్థితి: బిజీగా ఉన్నాను 🔴',

      // Common
      save: 'సేవ్ చేయండి',
      cancel: 'రద్దు చేయండి',
      submit: 'సమర్పించండి',
      back: 'వెనుకకు',
      continue: 'కొనసాగించండి',
      loading: 'లోడవుతోంది...',
      search: 'వెతకండి',
      welcome: 'స్వాగతం',
    }
  },

  // ---- Get translation ----
  t(key) {
    const lang = this.current;
    return this.translations[lang]?.[key] || this.translations['en'][key] || key;
  },

  // ---- Telugu Job Keywords ----
  teluguKeywords: {
    // Skills
    'ప్లంబర్': 'plumber',
    'ఎలక్ట్రీషియన్': 'electrician',
    'కార్పెంటర్': 'carpenter',
    'పెయింటర్': 'painter',
    'వెల్డర్': 'welder',
    'మేసన్': 'mason',
    'డ్రైవర్': 'driver',
    'మెకానిక్': 'mechanic',
    'వంటవారు': 'cook',
    'తోటమాలి': 'gardener',
    'కూలీ': 'labour',
    'కాపలాదారు': 'security guard',

    // Job related
    'పని': 'job',
    'ఉద్యోగం': 'job',
    'సంపాదన': 'earn',
    'జీతం': 'salary',
    'డబ్బు': 'money',
    'నైపుణ్యం': 'skill',
    'నేర్చుకోవాలి': 'learn',
    'దగ్గర': 'nearby',
    'అత్యవసరం': 'emergency',
    'సహాయం': 'help',
    'పైపు లీకేజ్': 'pipe leak plumber',
    'కరెంట్ పని': 'electrical work',
    'రంగు వేయడం': 'painting',
    'నిర్మాణం': 'construction',
  },

  // ---- Translate Telugu to English for AI ----
  teluguToEnglish(text) {
    let translated = text;
    Object.entries(this.teluguKeywords).forEach(([te, en]) => {
      translated = translated.replace(new RegExp(te, 'g'), en);
    });
    return translated;
  },

  // ---- AI Prompt Builder ----
  buildPrompt(userInput, userSkills, userLocation) {
    const detectedLang = this.detect(userInput);
    let processedInput = userInput;
    let responseLanguage = 'English';

    if (detectedLang === 'te') {
      processedInput = this.teluguToEnglish(userInput);
      responseLanguage = 'Telugu (తెలుగు)';
    }

    return {
      prompt: `You are an AI advisor for SkillNova, a job platform for workers in rural India (Telangana/Andhra Pradesh).
Worker skills: ${userSkills}
Location: ${userLocation}
User question: ${processedInput}
IMPORTANT: Respond in ${responseLanguage} only. Keep response brief (3-4 lines). Be friendly and practical.`,
      detectedLang
    };
  },

  // ---- Apply translations to page ----
  applyToPage() {
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
      const key = el.getAttribute('data-lang');
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    });
  },

  // ---- Switch language ----
  switch(lang) {
    this.current = lang;
    localStorage.setItem('sn_lang', lang);
    this.applyToPage();
    // Update toggle button
    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = lang === 'te' ? '🌐 English' : '🌐 తెలుగు';
    }
    showToast(lang === 'te' ? 'తెలుగులోకి మారారు! 🎉' : 'Switched to English! 🎉', 'success');
  },

  // ---- Initialize ----
  init() {
    const saved = localStorage.getItem('sn_lang') || 'en';
    this.current = saved;
    this.applyToPage();
    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = saved === 'te' ? '🌐 English' : '🌐 తెలుగు';
    }
  }
};

// Auto-initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
  SkillNovaLang.init();
});

console.log('🌐 SkillNova NLP Language Support Loaded!');
console.log('Supported: English + తెలుగు (Telugu)');