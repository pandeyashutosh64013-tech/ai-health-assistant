const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Store conversation history
const conversationHistory = {};

// Health disclaimer
const HEALTH_DISCLAIMER = `
⚠️ IMPORTANT DISCLAIMER:
This is an AI health assistant for educational purposes only. It is NOT a substitute for professional medical advice.
Always consult with a qualified healthcare provider for medical diagnosis or treatment.
In case of emergency, call emergency services immediately.
`;

// Initialize conversation
app.post('/api/init-conversation', (req, res) => {
  const sessionId = Date.now().toString();
  conversationHistory[sessionId] = [];
  res.json({ sessionId, disclaimer: HEALTH_DISCLAIMER });
});

// Get AI response - supports both OpenAI and Google API
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, provider = 'openai' } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId are required' });
    }

    // Initialize session if not exists
    if (!conversationHistory[sessionId]) {
      conversationHistory[sessionId] = [];
    }

    // Add user message to history
    conversationHistory[sessionId].push({
      role: 'user',
      content: message
    });

    let aiResponse;

    if (provider === 'google') {
      aiResponse = await getGoogleAIResponse(message, conversationHistory[sessionId]);
    } else {
      aiResponse = await getOpenAIResponse(message, conversationHistory[sessionId]);
    }

    // Add assistant response to history
    conversationHistory[sessionId].push({
      role: 'assistant',
      content: aiResponse
    });

    res.json({ response: aiResponse, sessionId });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to get AI response' });
  }
});

// OpenAI API Handler
async function getOpenAIResponse(userMessage, history) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const systemPrompt = `You are a helpful health information assistant. You provide general health and wellness information based on symptoms and health concerns described by users. 

IMPORTANT GUIDELINES:
1. Always include a disclaimer that you are not a substitute for professional medical advice
2. Suggest consulting with healthcare professionals for serious symptoms
3. Provide general information about common health conditions
4. Never diagnose diseases - only provide educational information
5. For emergencies (chest pain, difficulty breathing, severe bleeding), recommend calling emergency services
6. Be empathetic and supportive
7. Provide practical wellness tips when appropriate
8. Ask clarifying questions to better understand the user's concern

Always respond in a professional and caring manner.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(msg => ({
      role: msg.role,
      content: msg.content
    }))
  ];

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid OpenAI API key');
    }
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

// Google Generative AI Handler
async function getGoogleAIResponse(userMessage, history) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error('Google API key not configured');
  }

  const systemPrompt = `You are a helpful health information assistant. You provide general health and wellness information based on symptoms and health concerns described by users. 

IMPORTANT GUIDELINES:
1. Always include a disclaimer that you are not a substitute for professional medical advice
2. Suggest consulting with healthcare professionals for serious symptoms
3. Provide general information about common health conditions
4. Never diagnose diseases - only provide educational information
5. For emergencies (chest pain, difficulty breathing, severe bleeding), recommend calling emergency services
6. Be empathetic and supportive
7. Provide practical wellness tips when appropriate
8. Ask clarifying questions to better understand the user's concern

Always respond in a professional and caring manner.`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              { text: systemPrompt },
              ...history.map(msg => ({
                text: msg.content
              }))
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid Google API key');
    }
    throw new Error(`Google API error: ${error.message}`);
  }
}

// Health tips endpoint
app.get('/api/health-tips', (req, res) => {
  const tips = [
    { category: 'Hydration', tip: 'Drink at least 8 glasses of water daily to stay hydrated.' },
    { category: 'Exercise', tip: 'Aim for 150 minutes of moderate-intensity aerobic activity per week.' },
    { category: 'Sleep', tip: 'Maintain a consistent sleep schedule - aim for 7-9 hours per night.' },
    { category: 'Nutrition', tip: 'Eat a balanced diet with plenty of fruits, vegetables, and whole grains.' },
    { category: 'Stress', tip: 'Practice meditation or deep breathing exercises to manage stress.' },
    { category: 'Mental Health', tip: 'Talk to someone you trust or seek professional help when needed.' }
  ];
  res.json(tips);
});

// Common symptoms endpoint
app.get('/api/symptoms', (req, res) => {
  const symptoms = [
    'Fever',
    'Headache',
    'Cough',
    'Sore Throat',
    'Fatigue',
    'Nausea',
    'Dizziness',
    'Body Ache',
    'Loss of Appetite',
    'Sleep Issues'
  ];
  res.json(symptoms);
});

app.listen(PORT, () => {
  console.log(`🏥 AI Health Assistant Server running on http://localhost:${PORT}`);
  console.log('Make sure to set up your .env file with API keys');
});
