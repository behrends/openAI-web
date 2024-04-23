import express from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.static('public'));

app.get('/api/chat', async (req, res) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'Du bist ein hilfreicher KI-Assistent',
        role: 'user',
        content: 'Was ist die Hauptstadt von Frankreich?',
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
