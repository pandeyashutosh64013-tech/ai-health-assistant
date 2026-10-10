:root {
  --bg: #eef4ff;
  --bg-radial: radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 35%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.12), transparent 30%);
  --panel: rgba(255, 255, 255, 0.78);
  --panel-strong: #ffffff;
  --panel-alt: #f5f8ff;
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --accent: #14b8a6;
  --secondary: #10b981;
  --text: #0f172a;
  --muted: #475569;
  --border: rgba(148, 163, 184, 0.32);
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
  --danger: #dc2626;
  --success: #047857;
  --warning: #f59e0b;
}

body.dark-mode {
  --bg: #07111f;
  --bg-radial: radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.18), transparent 28%);
  --panel: rgba(15, 23, 42, 0.8);
  --panel-strong: #111827;
  --panel-alt: #0f172a;
  --primary: #60a5fa;
  --primary-dark: #3b82f6;
  --accent: #2dd4bf;
  --secondary: #34d399;
  --text: #e2e8f0;
  --muted: #a5b4cf;
  --border: rgba(148, 163, 184, 0.28);
  --shadow: 0 18px 45px rgba(2, 6, 23, 0.7);
  --danger: #f87171;
  --success: #6ee7b7;
  --warning: #fbbf24;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Inter, 'Segoe UI', sans-serif;
  background: var(--bg-radial), var(--bg);
  color: var(--text);
}

button, input, select, textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.auth-view {
  width: min(100%, 520px);
}

.auth-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 26px;
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow);
  padding: 30px 26px;
}

.logo-block {
  text-align: center;
  margin-bottom: 22px;
}

.brand-icon {
  width: 74px;
  height: 74px;
  display: grid;
  place-items: center;
  margin: 0 auto 12px;
  border-radius: 22px;
  font-size: 2rem;
  color: white;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.4);
}

.brand-icon.small {
  width: 52px;
  height: 52px;
  border-radius: 15px;
  font-size: 1.5rem;
}

.logo-block h1 {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.3rem);
}

.auth-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 6px;
  margin-bottom: 18px;
}

.tab-button {
  border: none;
  padding: 11px 14px;
  border-radius: 10px;
  background: transparent;
  color: var(--muted);
  font-weight: 700;
}

.tab-button.active {
  background: var(--panel-strong);
  color: var(--text);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

.auth-form, .stacked-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 0.95rem;
  font-weight: 600;
}

.field input, .field textarea, .field select {
  width: 100%;
  border: 1px solid var(--border);
  background: var(--panel-alt);
  color: var(--text);
  border-radius: 12px;
  padding: 12px 14px;
}

.field textarea {
  resize: vertical;
  min-height: 110px;
}

.primary-button, .secondary-button, .quick-button, .nav-item, .icon-button {
  border: none;
  border-radius: 12px;
  transition: transform 0.18s ease, filter 0.18s ease;
}

.primary-button {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  font-weight: 700;
  padding: 12px 16px;
}

.primary-button:hover,
.secondary-button:hover,
.quick-button:hover,
.nav-item:hover,
.icon-button:hover {
  transform: translateY(-1px);
  filter: brightness(1.02);
}

.secondary-button {
  background: rgba(20, 184, 166, 0.12);
  color: var(--text);
  border: 1px solid rgba(20, 184, 166, 0.3);
  font-weight: 700;
  padding: 12px 16px;
}

.full-width { width: 100%; }

.message-box {
  margin-top: 18px;
  padding: 12px 14px;
  font-size: 0.95rem;
  border-radius: 12px;
}

.message-box.success {
  background: rgba(16, 185, 129, 0.12);
  color: var(--success);
}

.message-box.error {
  background: rgba(220, 38, 38, 0.08);
  color: var(--danger);
}

.hidden { display: none !important; }

.dashboard-view {
  width: min(1450px, 100%);
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
}

.sidebar {
  background: var(--panel);
  border-right: 1px solid var(--border);
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.brand-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 12px 14px;
}

.brand-box h2 {
  margin: 0;
  font-size: 1.08rem;
}

.brand-box small {
  color: var(--muted);
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text);
  text-align: left;
  padding: 12px 14px;
  font-weight: 700;
}

.nav-item.active {
  background: var(--panel-alt);
  border-color: var(--border);
}

.sidebar-card {
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
}

.sidebar-card h3 {
  margin: 0 0 12px;
}

#tipsContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tip-item {
  background: rgba(37, 99, 235, 0.06);
  border-left: 3px solid var(--primary);
  border-radius: 10px;
  padding: 10px 12px;
}

.tip-item strong {
  display: block;
  margin-bottom: 5px;
}

.main-panel {
  padding: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.topbar h3 {
  margin: 0;
  font-size: clamp(1.8rem, 2vw, 2.2rem);
}

.icon-button {
  width: 42px;
  height: 42px;
  background: var(--panel);
  border: 1px solid var(--border);
  font-size: 1.2rem;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.metric-card {
  padding: 18px 20px;
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-card span {
  font-size: 0.86rem;
  color: var(--muted);
}

.metric-card strong {
  font-size: clamp(1.8rem, 2vw, 2.3rem);
}

.accent-blue { background: rgba(59, 130, 246, 0.12); }
.accent-green { background: rgba(16, 185, 129, 0.12); }
.accent-orange { background: rgba(245, 158, 11, 0.12); }

.content-panel {
  display: none;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
  padding: 20px;
}

.content-panel.active {
  display: block;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.4rem;
}

#aiProvider {
  border: 1px solid var(--border);
  background: var(--panel-alt);
  color: var(--text);
  border-radius: 10px;
  padding: 10px 12px;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

.quick-button {
  background: var(--panel-alt);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 14px;
  font-weight: 600;
}

.chat-box {
  min-height: 330px;
  max-height: 430px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px;
}

.message {
  display: flex;
}

.message.user { justify-content: flex-end; }
.message.assistant { justify-content: flex-start; }

.message-content {
  max-width: 85%;
  padding: 12px 14px;
  border-radius: 14px;
  line-height: 1.6;
}

.message.assistant .message-content {
  background: var(--panel-strong);
  border: 1px solid var(--border);
}

.message.user .message-content {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.chat-form {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.chat-form input {
  flex: 1;
  border: 1px solid var(--border);
  background: var(--panel-alt);
  color: var(--text);
  border-radius: 12px;
  padding: 12px 14px;
}

.field-inline {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.result-card {
  margin-top: 18px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px;
}

.entries-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
}

.entry-card {
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
}

.entry-card h4 {
  margin: 0 0 8px;
}

.empty-state {
  color: var(--muted);
  padding: 10px 0;
}

@media (max-width: 980px) {
  .dashboard-view {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .app-shell {
    padding: 14px;
  }

  .auth-card, .main-panel, .sidebar {
    padding-left: 16px;
    padding-right: 16px;
  }

  .field-inline {
    grid-template-columns: 1fr;
  }

  .chat-form {
    flex-direction: column;
  }
}
