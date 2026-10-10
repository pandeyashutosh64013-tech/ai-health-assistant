const state = {
  user: null,
  activePanel: 'chatPanel',
  darkMode: localStorage.getItem('health-assistant-theme') === 'dark',
};

const API_BASE = '';

const elements = {
  authView: document.getElementById('authView'),
  dashboardView: document.getElementById('dashboardView'),
  loginForm: document.getElementById('loginForm'),
  registerForm: document.getElementById('registerForm'),
  authMessage: document.getElementById('authMessage'),
  userLabel: document.getElementById('userLabel'),
  logoutBtn: document.getElementById('logoutBtn'),
  themeToggle: document.getElementById('themeToggle'),
  navItems: [...document.querySelectorAll('.nav-item')],
  panels: [...document.querySelectorAll('.content-panel')],
  tipsContainer: document.getElementById('tipsContainer'),
  chatMessages: document.getElementById('chatMessages'),
  chatForm: document.getElementById('chatForm'),
  chatInput: document.getElementById('chatInput'),
  bmiForm: document.getElementById('bmiForm'),
  bmiResult: document.getElementById('bmiResult'),
  journalForm: document.getElementById('journalForm'),
  journalEntries: document.getElementById('journalEntries'),
  appointmentForm: document.getElementById('appointmentForm'),
  appointmentList: document.getElementById('appointmentList'),
  appointmentCount: document.getElementById('appointmentCount'),
  recordCount: document.getElementById('recordCount'),
  consultCount: document.getElementById('consultCount'),
  aiProvider: document.getElementById('aiProvider'),
};

function init() {
  applyTheme();
  bindAuthTabs();
  bindNavigation();
  bindQuickSymptoms();
  bindForms();
  loadTips();
  checkSession();
}

function applyTheme() {
  document.body.classList.toggle('dark-mode', state.darkMode);
  elements.themeToggle.textContent = state.darkMode ? '☀️' : '🌙';
  localStorage.setItem('health-assistant-theme', state.darkMode ? 'dark' : 'light');
}

function setMessage(type, message) {
  elements.authMessage.classList.remove('hidden');
  elements.authMessage.classList.remove('success', 'error');
  elements.authMessage.classList.add(type === 'success' ? 'success' : 'error');
  elements.authMessage.textContent = message;
}

function hideMessage() {
  elements.authMessage.classList.add('hidden');
  elements.authMessage.textContent = '';
}

function bindAuthTabs() {
  document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach((b) => b.classList.toggle('active', b === button));
      const activeTab = button.dataset.tab;
      document.getElementById('loginForm').classList.toggle('hidden', activeTab !== 'login');
      document.getElementById('registerForm').classList.toggle('hidden', activeTab !== 'register');
      hideMessage();
    });
  });
}

function bindNavigation() {
  elements.navItems.forEach((button) => {
    button.addEventListener('click', () => {
      elements.navItems.forEach((item) => item.classList.toggle('active', item === button));
      const panelName = button.dataset.panel;
      state.activePanel = panelName;
      elements.panels.forEach((panel) => panel.classList.toggle('active', panel.id === panelName));
    });
  });
}

function bindQuickSymptoms() {
  document.querySelectorAll('.quick-button').forEach((button) => {
    button.addEventListener('click', () => {
      const symptom = button.dataset.symptom;
      elements.chatInput.value = `I am experiencing ${symptom}. Can you provide general guidance?`;
      elements.chatInput.focus();
    });
  });
}

function bindForms() {
  elements.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      setMessage('success', 'Login successful!');
      await checkSession();
    } catch (error) {
      setMessage('error', error.message);
    }
  });

  elements.registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;

    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      setMessage('success', 'Account created successfully!');
      await checkSession();
    } catch (error) {
      setMessage('error', error.message);
    }
  });

  elements.chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = elements.chatInput.value.trim();
    if (!message) return;

    addMessage('user', message);
    elements.chatInput.value = '';

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ message, provider: elements.aiProvider.value }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to get health advice');

      addMessage('assistant', data.response || 'No response received.');
      updateStats();
    } catch (error) {
      addMessage('assistant', `Unable to get a reply right now. ${error.message}`);
    }
  });

  elements.bmiForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const heightCm = Number(document.getElementById('heightCm').value);
    const weightKg = Number(document.getElementById('weightKg').value);

    try {
      const response = await fetch(`${API_BASE}/api/bmi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ heightCm, weightKg }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to calculate BMI');

      elements.bmiResult.classList.remove('hidden');
      elements.bmiResult.innerHTML = `
        <h4>BMI: ${data.bmi}</h4>
        <p><strong>Category:</strong> ${data.category}</p>
        <p>${data.recommendation}</p>
      `;
    } catch (error) {
      elements.bmiResult.classList.remove('hidden');
      elements.bmiResult.innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
  });

  elements.journalForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = {
      date: document.getElementById('journalDate').value,
      bloodPressure: document.getElementById('bloodPressure').value,
      heartRate: document.getElementById('heartRate').value,
      sleepHours: document.getElementById('sleepHours').value,
      hydration: document.getElementById('hydration').value,
      notes: document.getElementById('notes').value,
    };

    try {
      const response = await fetch(`${API_BASE}/api/health-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save health record');

      elements.journalForm.reset();
      await loadHealthRecords();
      updateStats();
    } catch (error) {
      alert(error.message);
    }
  });

  elements.appointmentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = {
      doctorName: document.getElementById('doctorName').value.trim(),
      specialty: document.getElementById('specialty').value.trim(),
      appointmentDate: document.getElementById('appointmentDate').value,
      appointmentTime: document.getElementById('appointmentTime').value,
      reason: document.getElementById('appointmentReason').value.trim(),
    };

    try {
      const response = await fetch(`${API_BASE}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to book appointment');

      elements.appointmentForm.reset();
      await loadAppointments();
      updateStats();
    } catch (error) {
      alert(error.message);
    }
  });

  elements.logoutBtn.addEventListener('click', async () => {
    await fetch(`${API_BASE}/api/logout`, { method: 'POST', credentials: 'include' });
    state.user = null;
    showAuth();
  });

  elements.themeToggle.addEventListener('click', () => {
    state.darkMode = !state.darkMode;
    applyTheme();
  });
}

async function checkSession() {
  try {
    const response = await fetch(`${API_BASE}/api/session`, { credentials: 'include' });
    const data = await response.json();

    if (data.authenticated) {
      state.user = data.user;
      showDashboard();
      await Promise.all([loadTips(), loadHealthRecords(), loadAppointments(), updateStats()]);
    } else {
      state.user = null;
      showAuth();
    }
  } catch (error) {
    state.user = null;
    showAuth();
  }
}

function showAuth() {
  elements.authView.classList.remove('hidden');
  elements.dashboardView.classList.add('hidden');
}

function showDashboard() {
  elements.authView.classList.add('hidden');
  elements.dashboardView.classList.remove('hidden');
  elements.userLabel.textContent = `Hi, ${state.user?.name || 'User'}`;
}

async function loadTips() {
  try {
    const response = await fetch(`${API_BASE}/api/health-tips`);
    const tips = await response.json();
    elements.tipsContainer.innerHTML = tips.slice(0, 4).map((tip) => `
      <div class="tip-item">
        <strong>${tip.category}</strong>
        <span>${tip.tip}</span>
      </div>
    `).join('');
  } catch (error) {
    console.error('Unable to load tips', error);
  }
}

function addMessage(role, content) {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${role}`;

  const bubble = document.createElement('div');
  bubble.className = 'message-content';
  bubble.innerHTML = formatContent(content);

  wrapper.appendChild(bubble);
  elements.chatMessages.appendChild(wrapper);
  elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function formatContent(content) {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

async function loadHealthRecords() {
  if (!state.user) return;

  try {
    const response = await fetch(`${API_BASE}/api/health-records`, { credentials: 'include' });
    const records = await response.json();

    if (!records.length) {
      elements.journalEntries.innerHTML = '<div class="empty-state">No health records yet. Save your first journal entry.</div>';
      return;
    }

    elements.journalEntries.innerHTML = records.map((record) => `
      <div class="entry-card">
        <h4>${record.date}</h4>
        <p><strong>Blood Pressure:</strong> ${record.bloodPressure || 'N/A'}</p>
        <p><strong>Heart Rate:</strong> ${record.heartRate || 'N/A'} bpm</p>
        <p><strong>Sleep:</strong> ${record.sleepHours || 'N/A'} hours</p>
        <p><strong>Hydration:</strong> ${record.hydration || 'N/A'}</p>
        <p><strong>Notes:</strong> ${record.notes || 'No notes'}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading health records:', error);
  }
}

async function loadAppointments() {
  if (!state.user) return;

  try {
    const response = await fetch(`${API_BASE}/api/appointments`, { credentials: 'include' });
    const appointments = await response.json();

    if (!appointments.length) {
      elements.appointmentList.innerHTML = '<div class="empty-state">No appointments scheduled.</div>';
      return;
    }

    elements.appointmentList.innerHTML = appointments.map((appointment) => `
      <div class="entry-card">
        <h4>${appointment.doctorName} - ${appointment.specialty}</h4>
        <p><strong>Date:</strong> ${appointment.appointmentDate}</p>
        <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
        <p><strong>Reason:</strong> ${appointment.reason}</p>
        <p><strong>Status:</strong> ${appointment.status}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading appointments:', error);
  }
}

async function updateStats() {
  if (!state.user) return;

  try {
    const [recordsRes, appointmentsRes, chatRes] = await Promise.all([
      fetch(`${API_BASE}/api/health-records`, { credentials: 'include' }),
      fetch(`${API_BASE}/api/appointments`, { credentials: 'include' }),
      fetch(`${API_BASE}/api/chat-history`, { credentials: 'include' }),
    ]);

    const records = await recordsRes.json();
    const appointments = await appointmentsRes.json();
    const chats = await chatRes.json();

    elements.recordCount.textContent = Array.isArray(records) ? records.length : 0;
    elements.appointmentCount.textContent = Array.isArray(appointments) ? appointments.length : 0;
    elements.consultCount.textContent = Array.isArray(chats) ? chats.filter((item) => item.role === 'user').length : 0;
  } catch (error) {
    console.error('Stats update failed', error);
  }
}

init();
