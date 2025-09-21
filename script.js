const chatbox = document.getElementById('chatbox');
const input = document.getElementById('userInput');
const button = document.getElementById('sendBtn');

button.addEventListener('click', async () => {
    const userMessage = input.value;
    chatbox.innerHTML += `<p class="user">You: ${userMessage}</p>`;
    input.value = '';

    // Call AI API
    const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    const aiMessage = data.reply;
    chatbox.innerHTML += `<p class="ai">AI: ${aiMessage}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
});

// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    });

    const data = await response.json();
    const aiReply = data.choices[0].message.content;
    res.json({ reply: aiReply });
});

app.listen(3000, () => console.log("Server running on port 3000"));
const response = await fetch('https://api.gemini.google.com/v1/query', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer AIzaSyBktXlMyHgqJ_-_d0ZtSeC8Zv4JMqutocg`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'YOUR_USER_QUERY',
    context: 'web',
  }),
});
const data = await response.json();
displayResults(data);

