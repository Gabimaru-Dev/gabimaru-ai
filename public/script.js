const form = document.getElementById('chatForm');
const input = document.getElementById('userInput');
const chatbox = document.getElementById('chatbox');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = input.value;
  appendMessage(prompt, 'user');
  input.value = '';

  const reply = await getAIReply(prompt);
  appendMessage(reply, 'bot');
});

function appendMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function getAIReply(prompt) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    return data.reply;
  } catch {
    return 'Error getting reply. Server might be offline.';
  }
}