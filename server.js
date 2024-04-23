import express from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.static('public'));

const pirate = 'Benutze Piratensprache und sprich, als wärst du ein Pirat von den hohen Meeren.'

const weather = 'Erfinde eine kurze Wettervorhersage für morgen (max. 30 Wörter).'

app.get('/api/chat', async (req, res) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `${pirate} ${weather}`,
      },
    ],
    model: 'gpt-4-turbo',
  });

  res.json({ message: chatCompletion.choices[0].message.content });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
