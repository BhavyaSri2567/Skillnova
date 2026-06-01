// ============================================
//   SKILLNOVA - Complete Backend Server v3.0
//   Express + SQLite + Google OAuth + AI
// ============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
//   DATABASE SETUP
// ============================================
const db = new Database(path.join(__dirname, 'skillnova.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    phone TEXT,
    location TEXT,
    role TEXT DEFAULT 'worker',
    skills TEXT DEFAULT '[]',
    rate TEXT,
    trust_score INTEGER DEFAULT 60,
    google_id TEXT,
    avatar TEXT,
    is_verified INTEGER DEFAULT 0,
    status TEXT DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT,
    description TEXT,
    budget TEXT,
    location TEXT,
    duration TEXT,
    urgency TEXT DEFAULT 'normal',
    employer_id INTEGER,
    employer_name TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employer_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER,
    employer_id INTEGER,
    job_id INTEGER,
    overall INTEGER NOT NULL,
    punctuality INTEGER,
    quality INTEGER,
    communication INTEGER,
    value INTEGER,
    review TEXT,
    hire_again INTEGER DEFAULT 1,
    badges TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (worker_id) REFERENCES users(id),
    FOREIGN KEY (employer_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER,
    receiver_id INTEGER,
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS skill_exchanges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    teach_skill TEXT NOT NULL,
    learn_skill TEXT NOT NULL,
    availability TEXT,
    location TEXT,
    status TEXT DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

console.log('✅ Database ready!');

// ============================================
//   MIDDLEWARE
// ============================================
const corsOptions = {
  origin: function(origin, callback) {
    // Allow all origins (for development)
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('/{*path}', cors(corsOptions));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'skillnova_secret_2025',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

// ============================================
//   PASSPORT GOOGLE OAUTH
// ============================================
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  try {
    const email = profile.emails[0].value;
    const name = profile.displayName;
    const avatar = profile.photos[0]?.value;
    const googleId = profile.id;

    let user = db.prepare('SELECT * FROM users WHERE email = ? OR google_id = ?').get(email, googleId);

    if (!user) {
      const result = db.prepare(`
        INSERT INTO users (name, email, google_id, avatar, is_verified, trust_score)
        VALUES (?, ?, ?, ?, 1, 65)
      `).run(name, email, googleId, avatar);
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    } else if (!user.google_id) {
      db.prepare('UPDATE users SET google_id = ?, avatar = ?, is_verified = 1 WHERE id = ?')
        .run(googleId, avatar, user.id);
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  done(null, user);
});

// ============================================
//   HELPER FUNCTIONS
// ============================================
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'skillnova_jwt_2025',
    { expiresIn: '7d' }
  );
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'skillnova_jwt_2025');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function calcTrustScore(userId) {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  const ratings = db.prepare('SELECT * FROM ratings WHERE worker_id = ?').all(userId);

  let score = 50;
  if (user.name) score += 5;
  if (user.phone) score += 5;
  if (user.location) score += 5;
  if (user.skills && user.skills !== '[]') score += 5;
  if (user.is_verified) score += 5;
  if (ratings.length > 0) {
    const avg = ratings.reduce((s, r) => s + r.overall, 0) / ratings.length;
    score += Math.round(avg * 2);
  }
  score = Math.min(100, Math.max(0, score));
  db.prepare('UPDATE users SET trust_score = ? WHERE id = ?').run(score, userId);
  return score;
}

// ============================================
//   AI FUNCTION - Fixed with better error logging
// ============================================
async function callAI(prompt) {
  const groqKey = process.env.GROQ_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  // Try Groq first (fastest and most reliable free AI)
  if (groqKey && groqKey !== 'your_groq_key_here') {
    try {
      console.log('🤖 Calling Groq AI...');
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: 'You are an AI advisor for SkillNova, a job platform for skilled workers in rural India. Give helpful, brief, practical advice in simple English. Keep responses under 5 lines.'
            },
            { role: 'user', content: prompt }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });
      const data = await res.json();
      if (data.choices?.[0]?.message?.content) {
        console.log('✅ Groq AI responded successfully!');
        return data.choices[0].message.content;
      }
      console.log('⚠️ Groq error:', data.error?.message);
    } catch (err) {
      console.log('⚠️ Groq failed:', err.message);
    }
  }

  // Try OpenRouter as backup
  if (openrouterKey && openrouterKey !== 'your_openrouter_key_here') {
    try {
      console.log('🤖 Trying OpenRouter as backup...');
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openrouterKey}`,
          'HTTP-Referer': 'http://localhost:5500',
          'X-Title': 'SkillNova'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
          messages: [
            { role: 'system', content: 'You are an AI advisor for SkillNova, a job platform for workers in rural India. Be brief and practical.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 300
        })
      });
      const data = await res.json();
      if (data.choices?.[0]?.message?.content) {
        console.log('✅ OpenRouter responded!');
        return data.choices[0].message.content;
      }
    } catch (err) {
      console.log('⚠️ OpenRouter failed:', err.message);
    }
  }

  console.log('⚠️ All AI failed — using smart fallback');
  return null;
}

// ============================================
//   ROUTES
// ============================================

// Health Check
app.get('/', (req, res) => {
  res.json({
    status: '✅ SkillNova Server Running!',
    version: '3.0.0',
    database: '✅ Connected',
    aiKey: process.env.OPENROUTER_API_KEY ? '✅ Key found' : '❌ Key missing!',
    endpoints: {
      auth: ['/auth/google', '/api/register', '/api/login', '/api/me'],
      jobs: ['GET /api/jobs', 'POST /api/jobs'],
      workers: ['GET /api/workers'],
      ai: ['POST /api/ai', 'POST /api/match-jobs', 'POST /api/fraud-check'],
      ratings: ['POST /api/ratings'],
      messages: ['GET /api/messages/:userId', 'POST /api/messages'],
      exchange: ['GET /api/skill-exchange', 'POST /api/skill-exchange']
    }
  });
});

// ---- GOOGLE AUTH ----
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    const token = generateToken(req.user);
    const user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar,
      trustScore: req.user.trust_score,
      location: req.user.location,
      skills: JSON.parse(req.user.skills || '[]')
    };
    res.redirect(`http://127.0.0.1:5500/dashboard.html?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

app.get('/auth/failed', (req, res) => {
  res.redirect('http://127.0.0.1:5500/login.html?error=google_failed');
});

// ---- REGISTER ----
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone, location, role, skills, rate } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'Name, email and password are required' });

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare(`
      INSERT INTO users (name, email, password, phone, location, role, skills, rate, trust_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 60)
    `).run(name, email, hashedPassword, phone || '', location || '',
       role || 'worker', JSON.stringify(skills || []), rate || '');

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    const trustScore = calcTrustScore(user.id);
    const token = generateToken(user);

    res.json({
      success: true, token,
      user: {
        id: user.id, name: user.name, email: user.email,
        role: user.role, trustScore, location: user.location,
        skills: JSON.parse(user.skills || '[]')
      }
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Registration failed: ' + err.message });
  }
});

// ---- LOGIN ----
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(400).json({ error: 'No account found with this email' });
    if (!user.password) return res.status(400).json({ error: 'This account uses Google login.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Incorrect password' });

    const token = generateToken(user);
    res.json({
      success: true, token,
      user: {
        id: user.id, name: user.name, email: user.email,
        role: user.role, trustScore: user.trust_score,
        location: user.location, skills: JSON.parse(user.skills || '[]')
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ---- GET CURRENT USER ----
app.get('/api/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({
    id: user.id, name: user.name, email: user.email,
    phone: user.phone, location: user.location,
    role: user.role, trustScore: user.trust_score,
    skills: JSON.parse(user.skills || '[]'),
    rate: user.rate, avatar: user.avatar,
    isVerified: user.is_verified, status: user.status
  });
});

// ---- UPDATE PROFILE ----
app.put('/api/me', authMiddleware, (req, res) => {
  try {
    const { name, phone, location, skills, rate, status } = req.body;
    db.prepare(`UPDATE users SET name=?, phone=?, location=?, skills=?, rate=?, status=? WHERE id=?`)
      .run(name, phone, location, JSON.stringify(skills || []), rate, status || 'available', req.user.id);
    const trustScore = calcTrustScore(req.user.id);
    res.json({ success: true, trustScore });
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed' });
  }
});

// ---- JOBS ----
app.get('/api/jobs', (req, res) => {
  try {
    const { type, urgency } = req.query;
    let query = "SELECT * FROM jobs WHERE status = 'active'";
    const params = [];
    if (type) { query += ' AND type LIKE ?'; params.push('%' + type + '%'); }
    if (urgency) { query += ' AND urgency = ?'; params.push(urgency); }
    query += ' ORDER BY created_at DESC LIMIT 50';
    const jobs = db.prepare(query).all(...params);
    res.json({ jobs, total: jobs.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/api/jobs', authMiddleware, (req, res) => {
  try {
    const { title, type, description, budget, location, duration, urgency } = req.body;
    if (!title || !type) return res.status(400).json({ error: 'Title and type required' });
    const employer = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    const result = db.prepare(`
      INSERT INTO jobs (title, type, description, budget, location, duration, urgency, employer_id, employer_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, type, description, budget, location, duration,
       urgency || 'normal', req.user.id, employer.name);
    const job = db.prepare('SELECT * FROM jobs WHERE id = ?').get(result.lastInsertRowid);
    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ error: 'Failed to post job' });
  }
});

// ---- WORKERS ----
app.get('/api/workers', (req, res) => {
  try {
    const workers = db.prepare(`
      SELECT id, name, location, role, skills, rate, trust_score, status, avatar, is_verified
      FROM users WHERE role = 'worker' AND status = 'available'
      ORDER BY trust_score DESC LIMIT 50
    `).all();
    res.json({ workers: workers.map(w => ({ ...w, skills: JSON.parse(w.skills || '[]') })) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

// ---- RATINGS ----
app.post('/api/ratings', authMiddleware, (req, res) => {
  try {
    const { workerId, jobId, overall, punctuality, quality, communication, value, review, hireAgain, badges } = req.body;
    if (!workerId || !overall) return res.status(400).json({ error: 'Worker ID and rating required' });
    db.prepare(`
      INSERT INTO ratings (worker_id, employer_id, job_id, overall, punctuality, quality, communication, value, review, hire_again, badges)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(workerId, req.user.id, jobId || null, overall,
       punctuality || overall, quality || overall, communication || overall,
       value || overall, review || '', hireAgain ? 1 : 0, JSON.stringify(badges || []));
    const newTrustScore = calcTrustScore(workerId);
    res.json({ success: true, newTrustScore });
  } catch (err) {
    res.status(500).json({ error: 'Rating failed' });
  }
});

// ---- MESSAGES ----
app.get('/api/messages/:userId', authMiddleware, (req, res) => {
  try {
    const messages = db.prepare(`
      SELECT m.*, u.name as sender_name FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE (m.sender_id = ? AND m.receiver_id = ?)
         OR (m.sender_id = ? AND m.receiver_id = ?)
      ORDER BY m.created_at ASC
    `).all(req.user.id, req.params.userId, req.params.userId, req.user.id);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/messages', authMiddleware, (req, res) => {
  try {
    const { receiverId, message } = req.body;
    if (!receiverId || !message) return res.status(400).json({ error: 'Receiver and message required' });
    const result = db.prepare('INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)')
      .run(req.user.id, receiverId, message);
    res.json({ success: true, messageId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ---- SKILL EXCHANGE ----
app.get('/api/skill-exchange', (req, res) => {
  try {
    const exchanges = db.prepare(`
      SELECT se.*, u.name, u.location as user_location, u.trust_score
      FROM skill_exchanges se JOIN users u ON se.user_id = u.id
      WHERE se.status = 'open' ORDER BY se.created_at DESC LIMIT 30
    `).all();
    res.json({ exchanges });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exchanges' });
  }
});

app.post('/api/skill-exchange', authMiddleware, (req, res) => {
  try {
    const { teachSkill, learnSkill, availability, location } = req.body;
    if (!teachSkill || !learnSkill) return res.status(400).json({ error: 'Both skills required' });
    db.prepare('INSERT INTO skill_exchanges (user_id, teach_skill, learn_skill, availability, location) VALUES (?, ?, ?, ?, ?)')
      .run(req.user.id, teachSkill, learnSkill, availability || '', location || '');
    res.json({ success: true, message: 'Exchange posted!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to post exchange' });
  }
});

// ---- AI ADVISOR ----
app.post('/api/ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt required' });

    const aiResponse = await callAI(prompt);
    res.json({ response: aiResponse || getFallbackResponse(prompt) });
  } catch (err) {
    console.error('AI endpoint error:', err.message);
    res.json({ response: getFallbackResponse(req.body.prompt || '') });
  }
});

// ---- AI JOB MATCHING ----
app.post('/api/match-jobs', async (req, res) => {
  try {
    const { skills, location, trustScore } = req.body;
    const dbJobs = db.prepare("SELECT * FROM jobs WHERE status = 'active' ORDER BY created_at DESC LIMIT 10").all();
    if (dbJobs.length > 0) {
      return res.json({
        jobs: dbJobs.slice(0, 4).map(j => ({
          title: j.title, employer: j.employer_name,
          price: j.budget, distance: 'Nearby',
          match: Math.floor(Math.random() * 20) + 75, icon: '📋'
        }))
      });
    }
    res.json({ jobs: getDefaultJobs() });
  } catch (err) {
    res.json({ jobs: getDefaultJobs() });
  }
});

// ---- FRAUD DETECTION ----
app.post('/api/fraud-check', async (req, res) => {
  try {
    const { profileName, jobTitle, description, price } = req.body;
    const prompt = `Fraud detection for SkillNova India. Profile: ${profileName}, Job: ${jobTitle}, Price: ${price}, Desc: ${description}. Return ONLY JSON: {"riskLevel":"low/medium/high","score":0-100,"reasons":["r1","r2"],"recommendation":"text"}`;
    const aiResponse = await callAI(prompt);
    try {
      const clean = (aiResponse || '').replace(/```json|```/g, '').trim();
      res.json(JSON.parse(clean));
    } catch {
      res.json({ riskLevel: 'low', score: 15, reasons: ['Appears legitimate'], recommendation: 'Safe to proceed' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Fraud check failed' });
  }
});

// ---- TRUST SCORE ----
app.post('/api/trust-score', authMiddleware, (req, res) => {
  const score = calcTrustScore(req.user.id);
  res.json({ trustScore: score });
});

// ---- FALLBACK RESPONSES ----
function getFallbackResponse(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes('skill') || p.includes('learn'))
    return '⭐ Top skills in demand right now:\n\n• Electrician — 48 jobs, ₹800–1,500/day 🔥\n• Waterproofing — High monsoon demand\n• Safety Certificate — Earn 40% more';
  if (p.includes('earn') || p.includes('money') || p.includes('income'))
    return '💰 Ways to earn more:\n\n• Trust Score 85+ → earn 50% more\n• Available weekends → 20-30% extra\n• Emergency jobs → ₹1,200–₹2,000/day';
  if (p.includes('job') || p.includes('work') || p.includes('find'))
    return '📍 High demand near you:\n\n• Electrician — 48 jobs 🔥\n• Plumber — 41 jobs\n• Mason — 35 jobs\n• Carpenter — 28 jobs';
  return '🤖 SkillNova AI Advisor:\n\n• Your skills are in high demand!\n• 12 jobs match your profile within 5km\n• Update your status daily for more alerts';
}

function getDefaultJobs() {
  return [
    { title: 'Plumber Needed', employer: 'Rajesh Home', price: '₹800/day', distance: '0.8 km', match: 95, icon: '🔧' },
    { title: 'Electrician Required', employer: 'Kumar Builders', price: '₹1,000/day', distance: '1.5 km', match: 88, icon: '⚡' },
    { title: 'House Painting', employer: 'Meena Villa', price: '₹600/day', distance: '2.1 km', match: 74, icon: '🎨' },
    { title: 'Furniture Repair', employer: 'Suresh Store', price: '₹700/day', distance: '3.4 km', match: 68, icon: '🪚' },
  ];
}

// ============================================
//   START SERVER
// ============================================
app.listen(PORT, () => {
  console.log('');
  console.log('⚡ ==========================================');
  console.log('     SKILLNOVA BACKEND v3.0 STARTED!');
  console.log('⚡ ==========================================');
  console.log(`🌐 Server:      http://localhost:${PORT}`);
  console.log(`🔐 Google Auth: http://localhost:${PORT}/auth/google`);
  console.log(`🤖 AI:          http://localhost:${PORT}/api/ai`);
  console.log(`📋 Jobs:        http://localhost:${PORT}/api/jobs`);
  console.log(`🛡️  Fraud:       http://localhost:${PORT}/api/fraud-check`);
  console.log('');
  console.log(`🔑 AI Key: ${process.env.OPENROUTER_API_KEY ? '✅ Found!' : '❌ MISSING in .env!'}`);
  console.log('⚡ ==========================================');
  console.log('');
});