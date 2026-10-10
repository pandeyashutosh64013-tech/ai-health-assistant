// Global variables
let sessionId = null;
let apiProvider = 'openai';
const API_BASE_URL = 'http://localhost:5000';

// Initialize the application
window.addEventListener('DOMContentLoaded', () => {
    initializeChat();
    loadHealthTips();
    setupEventListeners();
});

// Initialize chat session
async function initializeChat() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/init-conversation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        sessionId = data.sessionId;
        console.log('Chat session initialized:', sessionId);
    } catch (error) {
        console.error('Error initializing chat:', error);
        showError('Failed to initialize chat. Please refresh the page.');
    }
}

// Setup event listeners
function setupEventListeners() {
    const apiSelect = document.getElementById('apiProvider');
    apiSelect.addEventListener('change', (e) => {
        apiProvider = e.target.value;
        addAssistantMessage(`Switched to ${apiProvider === 'openai' ? 'OpenAI (GPT-3.5)' : 'Google Gemini'} API`);
    });
}

// Send message
async function sendMessage(event) {
    event.preventDefault();
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to chat
    addUserMessage(message);
    input.value = '';

    // Show loading spinner
    showLoadingSpinner(true);

    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                sessionId: sessionId,
                provider: apiProvider
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        addAssistantMessage(data.response);
    } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = getErrorMessage(error);
        addAssistantMessage(`❌ ${errorMessage}`);
    } finally {
        showLoadingSpinner(false);
    }
}

// Get appropriate error message
function getErrorMessage(error) {
    if (error.message.includes('API key')) {
        return `${apiProvider === 'openai' ? 'OpenAI' : 'Google'} API key is not configured. Please set it in the .env file and restart the server.`;
    }
    if (error.message.includes('Failed to fetch')) {
        return 'Connection error. Make sure the server is running on http://localhost:5000';
    }
    return error.message || 'Failed to get response. Please try again.';
}

// Add user message to chat
function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    const timestampDiv = document.createElement('span');
    timestampDiv.className = 'timestamp';
    timestampDiv.textContent = getCurrentTime();
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timestampDiv);
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add assistant message to chat
function addAssistantMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Parse message with HTML support for formatting
    contentDiv.innerHTML = formatMessage(message);
    
    const timestampDiv = document.createElement('span');
    timestampDiv.className = 'timestamp';
    timestampDiv.textContent = getCurrentTime();
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timestampDiv);
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Format message with markdown-like support
function formatMessage(message) {
    let html = message;
    
    // Escape HTML
    html = html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');
    
    // Convert line breaks
    html = html.replace(/\n/g, '<br>');
    
    // Bold text **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic text *text*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Lists - simple bullet points
    html = html.replace(/^- /gm, '<br>• ');
    html = html.replace(/^\* /gm, '<br>• ');
    html = html.replace(/^\d+\. /gm, '<br>');
    
    return html;
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Show/hide loading spinner
function showLoadingSpinner(show) {
    const spinner = document.getElementById('spinner');
    const sendBtn = document.querySelector('.send-btn');
    const input = document.getElementById('messageInput');
    
    if (show) {
        spinner.style.display = 'inline-block';
        sendBtn.disabled = true;
        input.disabled = true;
    } else {
        spinner.style.display = 'none';
        sendBtn.disabled = false;
        input.disabled = false;
        input.focus();
    }
}

// Load quick symptom
function loadSymptom(symptom) {
    const input = document.getElementById('messageInput');
    input.value = `I'm experiencing ${symptom}. Can you provide some information?`;
    input.focus();
}

// Load health tips
async function loadHealthTips() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health-tips`);
        const tips = await response.json();
        const tipsContainer = document.getElementById('tipsContainer');
        
        tips.slice(0, 3).forEach(tip => {
            const tipDiv = document.createElement('div');
            tipDiv.className = 'tip';
            tipDiv.innerHTML = `
                <div class="tip-category">${tip.category}</div>
                <div>${tip.tip}</div>
            `;
            tipsContainer.appendChild(tipDiv);
        });
    } catch (error) {
        console.error('Error loading health tips:', error);
    }
}

// Clear chat
function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="message assistant-message">
            <div class="message-content">
                <p>👋 Hello! I'm your AI Health Assistant. I'm here to provide general health information and wellness guidance.</p>
                <p>You can:</p>
                <ul>
                    <li>Describe your symptoms</li>
                    <li>Ask about health conditions</li>
                    <li>Get wellness tips</li>
                    <li>Learn about preventive care</li>
                </ul>
                <p><em>Remember: For emergencies, call emergency services. For serious concerns, consult a healthcare professional.</em></p>
            </div>
            <span class="timestamp">Just now</span>
        </div>
    `;
    
    // Reinitialize chat session
    initializeChat();
    document.getElementById('messageInput').value = '';
    document.getElementById('messageInput').focus();
}

// Show error message
function showError(message) {
    alert(message);
}
