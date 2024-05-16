import express from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Express-Webserver initialisieren
const app = express();

// Frontend-Code wird „statisch“ ausgeliefert
// HTML, CSS, JavaScript liegen im Ordner public
app.use(express.static('public'));

// Definition der System-Prompts für die Personas
const personas = {
  pirate:
    'Benutze Piratensprache und sprich, als wärst du ein Pirat von den hohen Meeren.',
  yoda: 'In umgekehrter Satzanordnung du sprechen musst, wie Yoda.',
  oracle:
    'Benutze die geheimnisvolle, vage Sprache eines griechischen Orakels.',
};

// Prompts für die kurzen Text der verschiedenen Themen
const topics = {
  weather:
    'Erfinde eine kurze Wettervorhersage für morgen (max. 30 Wörter).',
  horoscope:
    'Erfinde ein kurzes positives Horoskop (max. 30 Wörter).',
  news: 'Erfinde eine kurze kuriose Nachrichtenmeldung (max. 30 Wörter).',
};

// API-Endpunkt im Backend des Express-Webservers unter /api/chat
// (Anfrage an die Chat-API von OpenAI)
app.get('/api/chat', async (req, res) => {
  const { persona, topic } = req.query;
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `${personas[persona]} ${topics[topic]}`,
      },
    ],
    model: 'gpt-4o',
  });

  res.json({ message: chatCompletion.choices[0].message.content });
});

// API-Endpunkt im Backend des Express-Webservers unter /api/speech
// (Anfrage an die Text-to-speech-API von OpenAI (TTS))
app.get('/api/speech', async (req, res) => {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    input: req.query.text,
    voice: req.query.voice,
  });
  res.set('Content-Type', 'audio/mpeg');
  response.body.pipe(res);
});

// Express-Webserver unter Port 3000 starten
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
