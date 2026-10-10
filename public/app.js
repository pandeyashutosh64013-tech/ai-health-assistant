:root {
  --bg: #f3f6fb;
  --panel: #ffffff;
  --panel-alt: #eef4ff;
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #10b981;
  --secondary-soft: #d1fae5;
  --text: #1f2937;
  --muted: #6b7280;
  --border: #dfe7f1;
  --shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
  --danger: #dc2626;
  --warning: #f59e0b;
  --blue-soft: #dbeafe;
  --green-soft: #dcfce7;
  --orange-soft: #ffedd5;
}

body.dark-mode {
  --bg: #0f172a;
  --panel: #111827;
  --panel-alt: #1f2937;
  --primary: #60a5fa;
  --primary-dark: #3b82f6;
  --secondary: #34d399;
  --secondary-soft: #064e3b;
  --text: #e5e7eb;
  --muted: #9ca3af;
  --border: #374151;
  --shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  --danger: #f87171;
  --warning: #fbbf24;
  --blue-soft: rgba(59,130,246,0.15);
  --green-soft: rgba(16,185,129,0.12);
  --orange-soft: rgba(249,115,22,0.12);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: Inter, 'Segoe UI', sans-serif;
  background: var(--bg);
  color: var(--text);
}

body {
  min-height: 100vh;
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
  background: linear-gradient(135deg, rgba(37,99,235,0.12), rgba(16,185,129,0.1));
}

.auth-view {
  width: min(100%, 500px);
  padding: 24px;
}

.auth-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 32px 24px;
}

.logo-block {
  text-align: center;
  margin-bottom: 24px;
}

.brand-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 12px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  font-size: 2rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  box-shadow: var(--shadow);
}

.brand-icon.small {
  width: 52px;
  height: 52px;
  font-size: 1.5rem;
  border-radius: 14px;
}

.logo-block h1 {
  margin: 0;
  font-size: 2rem;
}

.auth-tabs {
  display: flex;
  gap: 8px;
  background: var(--panel-alt);
  border-radius: 10px;
  padding: 6px;
  margin-bottom: 20px;
}

.tab-button {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--muted);
  padding: 10px 12px;
  border-radius: 8px;
  font-weight: 600;
}

.tab-button.active {
  background: var(--panel);
  color: var(--text);
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
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
  font-weight: 600;
}

.field input, .field textarea, .field select {
  width: 100%;
  border: 1px solid var(--border);
  background: var(--panel-alt);
  color: var(--text);
  border-radius: 10px;
  padding: 12px 14px;
}

.field textarea {
  resize: vertical;
}

.primary-button, .secondary-button, .quick-button, .nav-item, .icon-button {
  border: none;
  border-radius: 10px;
  transition: 0.2s ease;
}

.primary-button {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  font-weight: 700;
  padding: 12px 18px;
}

.primary-button:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.secondary-button {
  background: var(--secondary-soft);
  color: var(--text);
  padding: 12px 18px;
  font-weight: 600;
}

.full-width {
  width: 100%;
}

.message-box {
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 0.95rem;
}

.message-box.success {
  background: var(--green-soft);
  color: #166534;
}

.message-box.error {
  background: rgba(220, 38, 38, 0.08);
  color: var(--danger);
}

.hidden {
  display: none !important;
}

.dashboard-view {
  width: min(1400px, 100%);
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
}

.sidebar {
  background: var(--panel);
  border-right: 1px solid var(--border);
  padding: 24px 18px;
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
  border-radius: 14px;
  padding: 12px 14px;
}

.brand-box h2 {
  margin: 0;
  font-size: 1.1rem;
}

.brand-box small {
  color: var(--muted);
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  background: transparent;
  color: var(--text);
  text-align: left;
  padding: 12px 14px;
  border: 1px solid transparent;
  font-weight: 600;
}

.nav-item.active {
  background: var(--panel-alt);
  border-color: var(--border);
}

.sidebar-card {
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
}

.sidebar-card h3 {
  margin-top: 0;
  margin-bottom: 12px;
}

#tipsContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tip-item {
  background: rgba(37,99,235,0.05);
  border-left: 3px solid var(--primary);
  border-radius: 8px;
  padding: 10px 12px;
  color: var(--text);
}

.tip-item strong {
  display: block;
  margin-bottom: 4px;
}

.main-panel {
  padding: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.topbar h3 {
  margin: 0;
  font-size: 2rem;
}

.topbar-actions {
  display: flex;
  gap: 10px;
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
  margin-bottom: 22px;
}

.metric-card {
  border-radius: 16px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.metric-card span {
  color: var(--muted);
  font-size: 0.9rem;
}

.metric-card strong {
  font-size: 2rem;
}

.accent-blue { background: var(--blue-soft); }
.accent-green { background: var(--green-soft); }
.accent-orange { background: var(--orange-soft); }

.content-panel {
  display: none;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px;
  box-shadow: var(--shadow);
}

.content-panel.active {
  display: block;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.panel-header h3 {
  margin: 0;
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
  margin-bottom: 20px;
}

.quick-button {
  background: var(--panel-alt);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 14px;
}

.chat-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  min-height: 320px;
  max-height: 420px;
  overflow-y: auto;
}

.message {
  display: flex;
}

.message.assistant {
  justify-content: flex-start;
}

.message.user {
  justify-content: flex-end;
}

.message-content {
  max-width: 85%;
  padding: 12px 14px;
  border-radius: 12px;
  line-height: 1.6;
}

.message.assistant .message-content {
  background: var(--panel);
  border: 1px solid var(--border);
}

.message.user .message-content {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.chat-form {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}

.chat-form input {
  flex: 1;
  border: 1px solid var(--border);
  background: var(--panel-alt);
  color: var(--text);
  border-radius: 10px;
  padding: 12px 14px;
}

.field-inline {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.result-card {
  margin-top: 18px;
  padding: 18px;
  border-radius: 14px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
}

.entries-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
}

.entry-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--panel-alt);
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
