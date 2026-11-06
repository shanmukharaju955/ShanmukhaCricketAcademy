import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '20mb' }));

// Server-side Google GenAI initialization with required user-agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', academy: 'Shanmukha Cricket Academy', timestamp: new Date().toISOString() });
});

// AI Coach Chat Endpoint
app.post('/api/gemini/coach-chat', async (req: Request, res: Response) => {
  try {
    const { messages, userRole, experienceLevel, topic } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const systemInstruction = `You are Coach Shanmukha, the chief high-performance cricket coach and founder of Shanmukha Cricket Academy (SCA).
You have over 18 years of coaching experience at state and national levels, mentoring IPL prospects, Ranji Trophy stars, and grassroots youngsters.
Your coaching style is encouraging, highly technical yet easy to understand, disciplined, and passionate about cricketing excellence.

Context:
- Player Role: ${userRole || 'All-Rounder'}
- Experience: ${experienceLevel || 'Intermediate / Club'}
- Current Topic: ${topic || 'General Cricket Development'}

Rules:
1. Provide actionable, practical advice on batting stance, grip, trigger movements, shot selection, swing bowling (in/out/reverse), spin bowling (grip, wrist position, revs), wicketkeeping footwork, match mindset, cricket fitness, or match tactics.
2. If the user asks about Shanmukha Cricket Academy (SCA), highlight our state-of-the-art turf nets, Bola bowling machines, 240FPS biomechanics video hub, high-performance coaching programs, and certified BCCI coaching staff.
3. Use realistic cricket terminology (e.g., 'seam presentation', 'high elbow', 'weight transfer', 'corridor of uncertainty', 'soft hands', 'braced front leg', 'top-hand dominance').
4. Keep answers engaging with clear bullet points, drills, and key coaching cues.`;

    const chat = ai.chats.create({
      model: 'gemini-3.7-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Feed conversation history
    for (let i = 0; i < messages.length - 1; i++) {
      const msg = messages[i];
      if (msg.role === 'user') {
        await chat.sendMessage({ message: msg.content });
      }
    }

    const lastMessage = messages[messages.length - 1].content;
    const response = await chat.sendMessage({ message: lastMessage });

    return res.json({ response: response.text });
  } catch (error: any) {
    console.error('Error in coach-chat:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to generate coaching response',
      fallback: "Keep your head still, maintain a balanced base, and focus on the ball right till release point! How can I assist your technique today?"
    });
  }
});

// AI Shot & Bowling Action Analyzer
app.post('/api/gemini/analyze-shot', async (req: Request, res: Response) => {
  try {
    const { shotType, discipline, userNotes, imageBase64, mimeType } = req.body;

    const promptText = `Perform a comprehensive elite biomechanical & technical cricket analysis for:
Discipline: ${discipline || 'Batting'}
Shot / Delivery Type: ${shotType || 'Cover Drive'}
Player Notes / Feedback Request: ${userNotes || 'General technique evaluation'}

Please analyze the action thoroughly and output in structured JSON format with the following schema:
{
  "shotName": string,
  "overallScore": number (out of 100),
  "executionRating": "Elite" | "Advanced" | "Developing" | "Needs Correction",
  "keyStrengths": string[],
  "biomechanicalFlaws": string[],
  "headAndEyePosition": string,
  "footworkAndWeightTransfer": string,
  "batOrArmSwingMechanics": string,
  "followThroughAndBalance": string,
  "tacticalApplication": string,
  "recommendedDrills": [
    {
      "drillName": string,
      "objective": string,
      "reps": string,
      "instructions": string
    }
  ],
  "coachShanmukhaTip": string
}

Ensure high technical accuracy according to modern BCCI/MCC coaching manual standards.`;

    let parts: any[] = [];
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
        },
      });
    }
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ analysis: parsed });
  } catch (error: any) {
    console.error('Error in analyze-shot:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to analyze shot' 
    });
  }
});

// AI Training & Fitness Plan Generator
app.post('/api/gemini/generate-training-plan', async (req: Request, res: Response) => {
  try {
    const { playerAge, role, daysPerWeek, primaryGoal, currentFocusArea } = req.body;

    const prompt = `Create a tailored 7-Day High-Performance Cricket Training, Skill & Fitness Regimen for:
- Age Category: ${playerAge || '16-19 years'}
- Primary Discipline: ${role || 'Top Order Batsman & Off-spinner'}
- Training Days Available: ${daysPerWeek || 5} days/week
- Primary Goal: ${primaryGoal || 'Improve power hitting & match temperament'}
- Specific Focus: ${currentFocusArea || 'Playing short pitch bowling and backfoot punch'}

Return the plan as a valid JSON object with the following schema:
{
  "planTitle": string,
  "targetOverview": string,
  "weeklySchedule": [
    {
      "day": string,
      "focus": string,
      "netSession": {
        "drill": string,
        "duration": string,
        "intensity": "High" | "Medium" | "Low"
      },
      "fitnessAndStrength": {
        "routine": string,
        "setsAndReps": string
      },
      "mentalOrTacticalPrep": string
    }
  ],
  "nutritionAndRecoveryTips": string[],
  "coachShanmukhaWeeklyChallenge": string
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ plan: parsed });
  } catch (error: any) {
    console.error('Error generating plan:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate training plan' });
  }
});

// Serve frontend
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In dev mode, use Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`🏏 Shanmukha Cricket Academy Server running at http://localhost:${PORT}`);
  });
}

startServer();
