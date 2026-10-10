# 🏥 AI Health Assistant

An AI-powered health assistant application built with HTML, CSS, JavaScript (frontend) and Node.js (backend). The application supports multiple AI providers including OpenAI and Google Generative AI.

## Features

✨ **Core Features:**
- 🤖 AI-powered health information chatbot
- 💬 Real-time conversational interface
- 🔄 Conversation history management
- ⚡ Multiple AI provider support (OpenAI, Google Gemini)
- 💡 Daily health tips and recommendations
- 🏥 Quick symptom shortcuts
- 📱 Fully responsive design
- ⚠️ Medical disclaimers and safety guidelines

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (Modern styling with CSS variables)
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- CORS support
- Environment variable management (dotenv)
- Axios for API calls

## Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- API keys from at least one of:
  - [OpenAI](https://platform.openai.com/api-keys) - for GPT-3.5
  - [Google Cloud](https://ai.google.dev/) - for Gemini

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/pandeyashutosh64013-tech/ai-health-assistant.git
cd ai-health-assistant
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
```

4. **Configure API keys:**
Edit `.env` file and add your API keys:
```
# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Google Generative AI
GOOGLE_API_KEY=your_google_api_key_here

# Server
PORT=5000
NODE_ENV=development
```

## Usage

1. **Start the server:**
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

2. **Open your browser:**
Navigate to `http://localhost:5000`

3. **Start chatting:**
- Choose your preferred AI provider from the dropdown
- Describe your symptoms or ask health-related questions
- Use quick symptom buttons for faster interaction
- Review daily health tips on the sidebar

## API Endpoints

### Initialize Conversation
```
POST /api/init-conversation
```
Initializes a new chat session.

**Response:**
```json
{
  "sessionId": "1234567890",
  "disclaimer": "Important medical disclaimer..."
}
```

### Send Message
```
POST /api/chat
```

**Request:**
```json
{
  "message": "I have a fever",
  "sessionId": "1234567890",
  "provider": "openai"
}
```

**Response:**
```json
{
  "response": "AI response about fever...",
  "sessionId": "1234567890"
}
```

### Get Health Tips
```
GET /api/health-tips
```

**Response:**
```json
[
  {
    "category": "Hydration",
    "tip": "Drink at least 8 glasses of water daily..."
  }
]
```

### Get Symptoms
```
GET /api/symptoms
```

**Response:**
```json
[
  "Fever",
  "Headache",
  "Cough",
  ...
]
```

## Configuration

### Environment Variables

```env
# OpenAI API Key
OPENAI_API_KEY=sk-...

# Google Generative AI Key
GOOGLE_API_KEY=AIza...

# Server Port (default: 5000)
PORT=5000

# Environment
NODE_ENV=development
```

## API Providers

### OpenAI (GPT-3.5)
- Model: `gpt-3.5-turbo`
- Max tokens: 500
- Temperature: 0.7

### Google Gemini
- Model: `gemini-pro`
- Max tokens: 500
- Temperature: 0.7

## Project Structure

```
ai-health-assistant/
├── public/
│   ├── index.html       # Main HTML file
│   ├── styles.css       # Styling
│   └── app.js           # Frontend JavaScript
├── server.js            # Express server & API endpoints
├── package.json         # Dependencies
├── .env.example         # Environment template
└── README.md            # This file
```

## Troubleshooting

### "API key not configured" error
- Ensure `.env` file exists and has valid API keys
- Restart the server after updating `.env`

### "Connection error" on frontend
- Make sure server is running on `http://localhost:5000`
- Check if port 5000 is already in use
- Try a different port by changing `PORT` in `.env`

### API requests failing
- Verify API keys are valid and not expired
- Check internet connection
- Ensure API account has sufficient credits/quota
- Review server logs for detailed error messages

## Important Disclaimer

⚠️ **This application is for educational and informational purposes only.**

- **NOT a substitute for professional medical advice**
- **NOT for emergency diagnosis or treatment**
- **Always consult with a qualified healthcare provider**
- **For emergencies, call emergency services immediately**

The AI provides general health information and should not be used for:
- Self-diagnosis of medical conditions
- Treatment planning without professional guidance
- Emergency medical situations
- Replacing regular medical checkups

## Security Considerations

1. **API Keys:** Never commit `.env` file to version control
2. **CORS:** Currently configured to accept requests from all origins (adjust for production)
3. **Input Validation:** Implement additional validation for production use
4. **Rate Limiting:** Consider adding rate limiting for production deployments
5. **HTTPS:** Use HTTPS in production environments

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Health history tracking
- [ ] BMI and vital signs calculator
- [ ] Doctor appointment booking
- [ ] Integration with medical databases
- [ ] Multi-language support
- [ ] Symptoms database with severity levels
- [ ] Medication interaction checker
- [ ] Health report generation
- [ ] Dark mode theme

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Author

Created with ❤️ for healthcare innovation

---

**Remember:** This tool is meant to empower people with health information, not replace professional medical judgment. Use responsibly! 🏥
