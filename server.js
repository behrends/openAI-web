import Fastify from 'fastify'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fastify = Fastify({
  logger: true
})

fastify.get('/api', async function handler (request, reply) {
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

  return { answer: chatCompletion.choices[0].message.content };
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
