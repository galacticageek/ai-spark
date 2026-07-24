/// <reference types="vite/client" />
import { OPENROUTER_API_URL, DEFAULT_AI_MODEL, APP_TITLE } from './constants';
import { TestPayload } from '../types';

const getApiKey = () => {
  return import.meta.env.VITE_OPENROUTER_API_KEY || '';
};

export const generatePitch = async (payload: TestPayload, onChunk: (text: string) => void): Promise<void> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('OpenRouter API key is missing. Add it to .env.local');

  const systemPrompt = `You are Yumnam Pukhrambam Rajshree, Lead Consultant at TalentBridge Systems. 
Write a personalized pitch email for a potential client.
Client details:
Name: ${payload.clientName}
Company: ${payload.company}
Email: ${payload.email}
Requirements: ${payload.requirements}
Budget: ${payload.budgetRange}

Format the email strictly with:
- A warm greeting using the client's first name.
- Mention their company and how TalentBridge can solve their specific requirements.
- Propose a 3-module training framework tailored to their requirements.
- Conclude with a call to action for a discovery call.
- Sign off with your name and title.
Keep it professional, empathetic, and concise.`;

  await streamOpenRouterResponse(systemPrompt, onChunk, apiKey);
};

export const explainStep = async (stepTitle: string, stepDescription: string, onChunk: (text: string) => void): Promise<void> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('OpenRouter API key is missing.');

  const prompt = `Explain the following technical step as if I am 5 years old. Keep it short, engaging, and use simple analogies.
Step Title: ${stepTitle}
Step Description: ${stepDescription}`;

  await streamOpenRouterResponse(prompt, onChunk, apiKey);
};

export const quizFeedback = async (question: string, userAnswer: string, correctAnswer: string, onChunk: (text: string) => void): Promise<void> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('OpenRouter API key is missing.');

  const prompt = `A student answered a quiz question. 
Question: ${question}
Their answer: ${userAnswer}
Correct answer: ${correctAnswer}

Provide brief, encouraging feedback explaining why the correct answer is right and correcting any misunderstandings. Keep it to 2-3 sentences max.`;

  await streamOpenRouterResponse(prompt, onChunk, apiKey);
};

async function streamOpenRouterResponse(prompt: string, onChunk: (text: string) => void, apiKey: string) {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': APP_TITLE,
      },
      body: JSON.stringify({
        model: DEFAULT_AI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        stream: true,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `OpenRouter API error: ${response.status} ${errorText}`;
      try {
        const parsed = JSON.parse(errorText);
        if (parsed.error && parsed.error.message) {
          errorMessage = `OpenRouter API error: ${parsed.error.message}`;
        }
      } catch (e) {
        // Not JSON, use raw text
      }
      throw new Error(errorMessage);
    }

    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line === 'data: [DONE]') return;
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                onChunk(data.choices[0].delta.content);
              }
            } catch (e) {
              // Ignore partial JSON parsing errors which can happen in streams
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Streaming error:', error);
    throw error;
  }
}
