const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  // Use a fake AI reply or public endpoint
  const response = `You: "${prompt}" — Gabimaru AI is thinking... 🔥`;

  // You can later replace this with a fetch to an open API.
  res.json({ reply: response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Gabimaru AI running on ${PORT}`));