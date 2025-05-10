require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: userMessage })
    });

    const data = await response.json();
    const reply = data.generated_text || "Sorry, I'm not sure how to reply.";

    res.json({ reply });
  } catch (err) {
    console.error("Error talking to HF:", err);
    res.status(500).json({ reply: "Something went wrong, bruh!" });
  }
});

app.listen(PORT, () => {
  console.log(`Gabimaru Chat AI running on http://localhost:${PORT}`);
});