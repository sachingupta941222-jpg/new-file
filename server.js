const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Replace with your API key for Gemini or GPT-4
const AI_API_KEY = 'AIzaSyBzjgyr6WfiOxQ9hYNV0uVSKkY4VA2aMI8';

// Endpoint to handle chat queries
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Example for GPT-4 browsing API or Gemini browsing
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', // Replace with Gemini endpoint if using Google
            {
                model: 'gpt-4o-browsing', // Or Gemini browsing model
                messages: [{ role: 'user', content: userMessage }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${AI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiReply = response.data.choices[0].message.content;
        res.json({ reply: aiReply });
    } catch (error) {
        console.error('AI API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
