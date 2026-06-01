// ============================================
//   SKILLNOVA - Backend API Connection
// ============================================
const API_URL = 'http://127.0.0.1:3000';

// Save token to localStorage
function saveToken(token) {
  localStorage.setItem('sn_token', token);
}

// Get token
function getToken() {
  return localStorage.getItem('sn_token');
}

// API call helper
async function apiCall(endpoint, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(API_URL + endpoint, options);
  return res.json();
}
// ============================================
//   SKILLNOVA - Global Script
//   Shared utilities used across all pages
// ============================================

// ---- Navbar scroll effect ----
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

// ---- Toast Notifications ----
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Toggle Password Visibility ----
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    input.type = 'password';
    btn.innerHTML = '<i class="fas fa-eye"></i>';
  }
}

// ---- Check if user is logged in ----
function getUser() {
  try {
    const u = localStorage.getItem('sn_user');
    return u ? JSON.parse(u) : null;
  } catch { return null; }
}

// ---- Redirect to login if not logged in ----
function requireAuth() {
  const user = getUser();
  if (!user) {
    showToast('Please log in first', 'warning');
    setTimeout(() => window.location.href = 'login.html', 1000);
    return false;
  }
  return true;
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Check URL params (e.g. ?role=employer) ----
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// On register page, auto-select employer if ?role=employer
window.addEventListener('DOMContentLoaded', () => {
  const role = getParam('role');
  if (role === 'employer') {
    const employerCard = document.getElementById('regRoleEmployer');
    const workerCard = document.getElementById('regRoleWorker');
    if (employerCard && workerCard) {
      workerCard.classList.remove('selected');
      employerCard.classList.add('selected');
      document.querySelector('input[value="employer"]').checked = true;
    }
  }
});

console.log('%c⚡ SkillNova Loaded', 'color:#1a6bff;font-size:1.2rem;font-weight:bold');
console.log('%cA Unified Platform for Decent Work & Economic Growth', 'color:#6b7280;font-size:0.85rem');
