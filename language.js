// ============================================
//   SKILLNOVA - NLP Language Support v2.0
//   Telugu + English Multi-language System
//   Complete translations for ALL pages
// ============================================

const SkillNovaLang = {

  current: 'en',

  // ---- Language Detection ----
  detect(text) {
    const teluguPattern = /[\u0C00-\u0C7F]/;
    if (teluguPattern.test(text)) return 'te';
    return 'en';
  },

  // ---- Complete Translations ----
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
      languageSupport: 'Language Support',
      fraudCheck: 'Fraud Check',

      // Home Page
      heroTitle1: 'Find Work.',
      heroTitle2: 'Build Skills.',
      heroTitle3: 'Grow Together.',
      heroDesc: 'SkillNova connects skilled and unskilled workers in rural and semi-urban areas with verified job opportunities — powered by AI matching, trust scores, and real-time demand insights.',
      joinWorker: 'Join as Worker',
      postJobBtn: 'Post a Job',
      workersReady: 'Workers Ready',
      jobsPosted: 'Jobs Posted',
      skillTypes: 'Skill Types',
      howItWorks: 'How It Works',
      features: 'Features',
      about: 'About',

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
      currentlyBusy: 'Currently Busy 🔴',
      jobAlerts: 'Job Alerts',
      heatmap: 'Skill Demand Heatmap',
      inYourArea: 'In your area today',
      newToday: '↑ 3 new today',
      thisWeek: '↑ +5 this week',
      thisMonth: '↑ +1 this month',
      growing: '↑ Growing!',
      toggleOff: 'Toggle OFF when busy with a job',
      employersCanSee: 'Employers can see and contact you',

      // Job items
      plumberNeeded: 'Plumber Needed',
      electricianRequired: 'Electrician Required',
      housePainting: 'House Painting',
      furnitureRepair: 'Furniture Repair',

      // Alerts
      emergencyPlumber: 'Emergency! Plumber Needed',
      emergencyPlumberSub: '1.2km away · ₹1,200 · Right now!',
      newPaintingJob: 'New Painting Job Posted',
      newPaintingJobSub: '3km away · ₹700/day · 3 days work',
      fiveStarRating: 'You got a 5-star rating!',
      fiveStarRatingSub: 'From Suresh K. · Trust Score +3',

      // Login Page
      loginTitle: 'Log In',
      loginSub: "Don't have an account?",
      signUpFree: 'Sign up free →',
      emailAddress: 'Email Address',
      emailPlaceholder: 'yourname@example.com',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      loginBtn: 'Log In to SkillNova',
      orContinueWith: 'or continue with',
      continueGoogle: 'Continue with Google',
      worker: 'Worker',
      employer: 'Employer',
      findJobsNearMe: 'Find jobs near me',
      hireWorkers: 'Hire workers',

      // Register Page
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      loginArrow: 'Log in →',
      fullName: 'Full Name',
      namePlaceholder: 'e.g. Ravi Kumar',
      mobileNumber: 'Mobile Number',
      phonePlaceholder: '10-digit mobile number',
      location: 'Location (City / Village)',
      locationPlaceholder: 'e.g. Madurai, Tamil Nadu',
      dailyRate: 'Daily Rate / Pricing (₹)',
      ratePlaceholder: 'e.g. 500 per day',
      agreeTerms: 'I agree to the',
      terms: 'Terms',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
      createAccountBtn: 'Create Account',
      continueBtn: 'Continue',
      backBtn: 'Back',
      role: 'Role',
      info: 'Info',
      skills: 'Skills',
      done: 'Done',
      iWantToJoinAs: 'I want to join as a...',
      findJobsEarnMoney: 'I want to find jobs & earn money',
      postJobsHire: 'I want to post jobs & hire workers',

      // Common
      save: 'Save',
      cancel: 'Cancel',
      submit: 'Submit',
      back: 'Back',
      continue: 'Continue',
      loading: 'Loading...',
      search: 'Search',
      welcome: 'Welcome',
      poweredByAI: 'POWERED BY AI',

      // Status messages
      statusAvailable: 'Status: Available 🟢',
      statusBusy: 'Status: Busy 🔴',
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
      languageSupport: 'భాషా మద్దతు',
      fraudCheck: 'మోసం తనిఖీ',

      // Home Page
      heroTitle1: 'పని కనుగొనండి.',
      heroTitle2: 'నైపుణ్యాలు పెంచుకోండి.',
      heroTitle3: 'కలిసి అభివృద్ధి చెందండి.',
      heroDesc: 'స్కిల్‌నోవా గ్రామీణ మరియు పాక్షిక పట్టణ ప్రాంతాల్లోని నైపుణ్యవంతులైన మరియు అనుభవం లేని కార్మికులను ధృవీకరించబడిన ఉద్యోగ అవకాశాలతో అనుసంధానిస్తుంది.',
      joinWorker: 'కార్మికుడిగా చేరండి',
      postJobBtn: 'పని పోస్ట్ చేయండి',
      workersReady: 'కార్మికులు సిద్ధంగా ఉన్నారు',
      jobsPosted: 'పనులు పోస్ట్ అయ్యాయి',
      skillTypes: 'నైపుణ్య రకాలు',
      howItWorks: 'ఎలా పని చేస్తుంది',
      features: 'సేవలు',
      about: 'మా గురించి',

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
      currentlyBusy: 'ప్రస్తుతం బిజీగా ఉన్నాను 🔴',
      jobAlerts: 'ఉద్యోగ హెచ్చరికలు',
      heatmap: 'నైపుణ్య డిమాండ్ హీట్‌మ్యాప్',
      inYourArea: 'మీ ప్రాంతంలో ఈరోజు',
      newToday: '↑ ఈరోజు 3 కొత్తవి',
      thisWeek: '↑ ఈ వారం +5',
      thisMonth: '↑ ఈ నెల +1',
      growing: '↑ పెరుగుతోంది!',
      toggleOff: 'పని చేస్తున్నప్పుడు OFF చేయండి',
      employersCanSee: 'యజమానులు మీని చూసి సంప్రదించవచ్చు',

      // Job items
      plumberNeeded: 'ప్లంబర్ అవసరం',
      electricianRequired: 'ఎలక్ట్రీషియన్ కావాలి',
      housePainting: 'ఇంటి రంగు వేయడం',
      furnitureRepair: 'ఫర్నిచర్ రిపేర్',

      // Alerts
      emergencyPlumber: 'అత్యవసరం! ప్లంబర్ కావాలి',
      emergencyPlumberSub: '1.2km దూరం · ₹1,200 · ఇప్పుడే!',
      newPaintingJob: 'కొత్త పెయింటింగ్ పని పోస్ట్ అయింది',
      newPaintingJobSub: '3km దూరం · ₹700/రోజు · 3 రోజులు',
      fiveStarRating: 'మీకు 5 స్టార్ రేటింగ్ వచ్చింది!',
      fiveStarRatingSub: 'సురేష్ K. నుండి · నమ్మకం స్కోర్ +3',

      // Login Page
      loginTitle: 'లాగిన్ చేయండి',
      loginSub: 'అకౌంట్ లేదా?',
      signUpFree: 'ఉచితంగా నమోదు చేయండి →',
      emailAddress: 'ఇమెయిల్ చిరునామా',
      emailPlaceholder: 'మీపేరు@example.com',
      password: 'పాస్‌వర్డ్',
      passwordPlaceholder: 'పాస్‌వర్డ్ నమోదు చేయండి',
      rememberMe: 'నన్ను గుర్తుంచుకో',
      forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      loginBtn: 'స్కిల్‌నోవాలో లాగిన్ చేయండి',
      orContinueWith: 'లేదా ఇతర మార్గం',
      continueGoogle: 'గూగుల్‌తో కొనసాగండి',
      worker: 'కార్మికుడు',
      employer: 'యజమాని',
      findJobsNearMe: 'దగ్గరలో ఉద్యోగాలు కనుగొనండి',
      hireWorkers: 'కార్మికులను నియమించండి',

      // Register Page
      createAccount: 'అకౌంట్ తయారు చేయండి',
      alreadyHaveAccount: 'ఇప్పటికే అకౌంట్ ఉందా?',
      loginArrow: 'లాగిన్ చేయండి →',
      fullName: 'పూర్తి పేరు',
      namePlaceholder: 'ఉదా: రవి కుమార్',
      mobileNumber: 'మొబైల్ నంబర్',
      phonePlaceholder: '10 అంకెల మొబైల్ నంబర్',
      location: 'స్థానం (నగరం / గ్రామం)',
      locationPlaceholder: 'ఉదా: హైదరాబాద్, తెలంగాణ',
      dailyRate: 'రోజువారీ రేటు / ధర (₹)',
      ratePlaceholder: 'ఉదా: రోజుకు 500',
      agreeTerms: 'నేను అంగీకరిస్తున్నాను',
      terms: 'నిబంధనలు',
      and: 'మరియు',
      privacyPolicy: 'గోప్యతా విధానం',
      createAccountBtn: 'అకౌంట్ తయారు చేయండి',
      continueBtn: 'కొనసాగించండి',
      backBtn: 'వెనుకకు',
      role: 'పాత్ర',
      info: 'సమాచారం',
      skills: 'నైపుణ్యాలు',
      done: 'పూర్తయింది',
      iWantToJoinAs: 'నేను చేరాలనుకుంటున్నాను...',
      findJobsEarnMoney: 'నేను ఉద్యోగాలు కనుగొని డబ్బు సంపాదించాలనుకుంటున్నాను',
      postJobsHire: 'నేను పనులు పోస్ట్ చేసి కార్మికులను నియమించాలనుకుంటున్నాను',

      // Common
      save: 'సేవ్ చేయండి',
      cancel: 'రద్దు చేయండి',
      submit: 'సమర్పించండి',
      back: 'వెనుకకు',
      continue: 'కొనసాగించండి',
      loading: 'లోడవుతోంది...',
      search: 'వెతకండి',
      welcome: 'స్వాగతం',
      poweredByAI: 'AI చేత నడపబడుతోంది',

      // Status messages
      statusAvailable: 'స్థితి: అందుబాటులో ఉన్నాను 🟢',
      statusBusy: 'స్థితి: బిజీగా ఉన్నాను 🔴',
    }
  },

  // ---- Telugu Job Keywords ----
  teluguKeywords: {
    'ప్లంబర్': 'plumber', 'ఎలక్ట్రీషియన్': 'electrician',
    'కార్పెంటర్': 'carpenter', 'పెయింటర్': 'painter',
    'వెల్డర్': 'welder', 'మేసన్': 'mason',
    'డ్రైవర్': 'driver', 'మెకానిక్': 'mechanic',
    'వంటవారు': 'cook', 'తోటమాలి': 'gardener',
    'కూలీ': 'labour', 'కాపలాదారు': 'security guard',
    'పని': 'job', 'ఉద్యోగం': 'job',
    'సంపాదన': 'earn', 'జీతం': 'salary',
    'డబ్బు': 'money', 'నైపుణ్యం': 'skill',
    'నేర్చుకోవాలి': 'learn', 'దగ్గర': 'nearby',
    'అత్యవసరం': 'emergency', 'సహాయం': 'help',
    'పైపు లీకేజ్': 'pipe leak plumber',
    'కరెంట్ పని': 'electrical work',
    'రంగు వేయడం': 'painting',
    'నిర్మాణం': 'construction',
  },

  teluguToEnglish(text) {
    let translated = text;
    Object.entries(this.teluguKeywords).forEach(([te, en]) => {
      translated = translated.replace(new RegExp(te, 'g'), en);
    });
    return translated;
  },

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

  t(key) {
    const lang = this.current;
    return this.translations[lang]?.[key] || this.translations['en'][key] || key;
  },

  applyToPage() {
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

  switch(lang) {
    this.current = lang;
    localStorage.setItem('sn_lang', lang);
    this.applyToPage();
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'te' ? '🌐 English' : '🌐 తెలుగు';
    showToast(lang === 'te' ? 'తెలుగులోకి మారారు! 🎉' : 'Switched to English! 🎉', 'success');
  },

  init() {
    const saved = localStorage.getItem('sn_lang') || 'en';
    this.current = saved;
    setTimeout(() => {
      this.applyToPage();
      const btn = document.getElementById('langToggle');
      if (btn) btn.textContent = saved === 'te' ? '🌐 English' : '🌐 తెలుగు';
    }, 100);
  }
};

window.addEventListener('DOMContentLoaded', () => SkillNovaLang.init());
console.log('🌐 SkillNova NLP v2.0 Loaded! Telugu + English');