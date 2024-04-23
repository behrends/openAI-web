import express from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.static('public'));

const personas = {
  pirate:
    'Benutze Piratensprache und sprich, als wärst du ein Pirat von den hohen Meeren.',
  yoda: 'In umgekehrter Satzanordnung du sprechen musst, wie Yoda.',
  oracle:
    'Benutze die geheimnisvolle, vage Sprache eines griechischen Orakels.',
};

const topics = {
  weather:
    'Erfinde eine kurze Wettervorhersage für morgen (max. 30 Wörter).',
  horoscope:
    'Erfinde ein kurzes positives Horoskop (max. 30 Wörter).',
  news: 'Erfinde eine kurze kuriose Nachrichtenmeldung (max. 30 Wörter).',
};

app.get('/api/chat', async (req, res) => {
  const { persona, topic } = req.query;
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `${personas[persona]} ${topics[topic]}`,
      },
    ],
    model: 'gpt-4-turbo',
  });

  res.json({ message: chatCompletion.choices[0].message.content });
});

app.get('/api/speech', async (req, res) => {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    input: req.query.text,
    voice: req.query.voice,
  });
  res.set('Content-Type', 'audio/mpeg');
  response.body.pipe(res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
