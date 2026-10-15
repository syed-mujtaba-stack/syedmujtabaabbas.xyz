import { PORTFOLIO_DATA, PortfolioProject } from '../data/portfolioData';
import { SPECIAL_OFFERS } from '../components/SpecialOffersPopupModal';

export interface AgentMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterModelOption {
  id: string;
  label: string;
  provider: string;
  badge: string;
}

/**
 * Verified active & fast `:free` models on OpenRouter (Benchmarked live with the configured API key)
 */
export const OPENROUTER_FREE_MODELS: OpenRouterModelOption[] = [
  {
    id: 'cohere/north-mini-code:free',
    label: 'Cohere North Mini Code (1.3s Fast Free)',
    provider: 'Cohere via OpenRouter',
    badge: '1.3s FAST FREE',
  },
  {
    id: 'nvidia/nemotron-3-super-120b-a12b:free',
    label: 'NVIDIA Nemotron 3 Super 120B (Free)',
    provider: 'NVIDIA via OpenRouter',
    badge: '120B FREE',
  },
  {
    id: 'liquid/lfm-2.5-2.6b:free',
    label: 'Liquid LFM 2.5 (1.2s Ultra-Fast Free)',
    provider: 'Liquid AI via OpenRouter',
    badge: '1.2s FREE',
  },
  {
    id: 'openrouter/free',
    label: 'OpenRouter Official Auto-Free Router',
    provider: 'OpenRouter Free',
    badge: 'AUTO FREE',
  },
  {
    id: 'google/gemma-4-31b-it:free',
    label: 'Google Gemma 4 31B Instruct (Free)',
    provider: 'Google via OpenRouter',
    badge: '31B FREE',
  },
];

const STORAGE_KEY_API = 'mujtaba_openrouter_api_key';
const STORAGE_KEY_MODEL = 'mujtaba_openrouter_model';

export function getSavedOpenRouterKey(): string {
  try {
    const localKey = localStorage.getItem(STORAGE_KEY_API);
    if (localKey && localKey.trim().startsWith('sk-or-')) {
      return localKey.trim();
    }
    return '';
  } catch {
    return '';
  }
}

export function saveOpenRouterKey(key: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_API, key.trim());
  } catch {
    // ignore storage errors
  }
}

export function getSavedOpenRouterModel(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_MODEL);
    if (saved && OPENROUTER_FREE_MODELS.some((m) => m.id === saved)) {
      return saved;
    }
    return OPENROUTER_FREE_MODELS[0].id;
  } catch {
    return OPENROUTER_FREE_MODELS[0].id;
  }
}

export function saveOpenRouterModel(modelId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODEL, modelId);
  } catch {
    // ignore storage errors
  }
}

function buildSystemPrompt(mode: 'text' | 'voice'): string {
  const projectSummaries = PORTFOLIO_DATA.projects
    .map(
      (p) =>
        `- ${p.name} (ID: ${p.id}, Category: ${p.category}${
          p.liveUrl ? `, Live: ${p.liveUrl}` : ''
        }): ${p.summary}`
    )
    .join('\n');

  const offerSummaries = SPECIAL_OFFERS.map(
    (o) =>
      `- ${o.title}: Special Price ${o.priceUSD} (${o.pricePKR}, was ${o.originalUSD}, ${o.discountBadge}) | Code: ${o.promoCode} | Delivery: ${o.deliveryEstimate} | ${o.freeBonus}`
  ).join('\n');

  const voiceInstructions =
    mode === 'voice'
      ? `IMPORTANT VOICE CALL RULES:
- You are currently on a REALTIME LIVE VOICE CALL with the user.
- Keep your response concise, warm, natural, and spoken-friendly (2 to 3 short sentences max, around 30–50 words).
- Do NOT use markdown bullets, asterisks (*), hashtags (#), or code blocks because your text will be spoken aloud by a voice synthesizer.
- Match the user's language naturally: if the user speaks in Roman Urdu / Urdu / Hindi (e.g. "kya haal hai", "offers batao", "Mujtaba kya karta hai"), reply in natural conversational Roman Urdu mixed with English tech terms. If they speak in English, reply in natural conversational English.`
      : `TEXT CHAT RULES:
- Keep responses helpful, clear, and concise (2–5 sentences).
- Match the user's language: if they write in Roman Urdu / Urdu (e.g. "bhai offers dikhao", "Mujtaba ka whatsapp kya hai"), reply warmly in Roman Urdu + English. If they write in English, reply in crisp professional English.`;

  return `You are the official AI Agent & Realtime Voice Assistant for Syed Mujtaba Abbas on his developer portfolio (syedmujtabaabbas.xyz).

${voiceInstructions}

VERIFIED PROFILE OF SYED MUJTABA ABBAS:
- Name: Syed Mujtaba Abbas
- Roles: Full-Stack Developer, Agentic AI Engineer, DevOps & Cloud Engineer, Founder
- Present Work (Active Roles):
  1. Independent Tech Consultant — Full-Stack & AI Developer (Jan 2024 — Present)
  2. Founder — AlphaMind (AI Product Studio & Agentic Research, 2025 — Present)
  3. Founder — AlphaTech AI (AI Automation & Software Solutions, 2025 — Present)
  4. Founder & Creator — SetupCI & MJ FTE (Published Python CLI packages on PyPI, 2025 — Present)
- Previous Career Progression: 6-step progression at AlphaTach (Full Stack & Agentic AI Developer, Full Stack Developer, Junior Agentic AI, Junior Full Stack, Junior Backend, Junior Frontend).
- Education: B.S. in Robotics at Superior University (Karachi), Intermediate Pre-Engineering, Matriculation CS, plus Agentic AI training at GIAIC (Governor Sindh Initiative).
- Location: Karachi, Pakistan (PKT / UTC+5)
- Contact: Email: abbasmujtaba125@gmail.com | Phone & WhatsApp: +92 346 0630802

SPECIAL DISCOUNTED CLIENT OFFERS (Available in the Offers Popup):
${offerSummaries}

ALL 25 SHIPPED PROJECTS ON GITHUB (@syed-mujtaba-stack):
${projectSummaries}

OPTIONAL UI ACTION TAGS (You may append ONE tag at the very end of your message if relevant):
- If the user asks about offers, pricing, packages, or deals, append: [ACTION:OPEN_OFFERS]
- If the user asks to see all projects, append: [ACTION:OPEN_ALL_PROJECTS]
- If the user asks for the resume or CV, append: [ACTION:OPEN_RESUME]`;
}

export function findMatchingProjectsForQuery(
  query: string,
  replyText: string
): PortfolioProject[] {
  const combined = `${query} ${replyText}`.toLowerCase();
  const matches: PortfolioProject[] = [];

  for (const proj of PORTFOLIO_DATA.projects) {
    const idMatch = combined.includes(proj.id.toLowerCase());
    const nameMatch = combined.includes(proj.name.toLowerCase().split('—')[0].trim());
    if (idMatch || nameMatch) {
      matches.push(proj);
    }
  }

  if (matches.length === 0) {
    if (
      combined.includes('sanity') ||
      combined.includes('store') ||
      combined.includes('ecommerce') ||
      combined.includes('e-commerce')
    ) {
      return PORTFOLIO_DATA.projects
        .filter((p) =>
          ['quantumbyte', 'fujifenix', 'norvia', 'festive-occasions'].includes(p.id)
        )
        .slice(0, 3);
    }
    if (
      combined.includes('whatsapp') ||
      combined.includes('agent') ||
      combined.includes('lead')
    ) {
      return PORTFOLIO_DATA.projects
        .filter((p) => ['whatsapp-bot', 'leadshunter', 'edugenius'].includes(p.id))
        .slice(0, 3);
    }
  }

  return matches.slice(0, 3);
}

export interface AgentCompletionResult {
  text: string;
  cleanSpokenText: string;
  modelUsed: string;
  matchedProjects: PortfolioProject[];
  triggeredAction?: 'OPEN_OFFERS' | 'OPEN_ALL_PROJECTS' | 'OPEN_RESUME';
}

function parseReplyAndActions(
  rawReply: string,
  userQuery: string,
  modelUsed: string
): AgentCompletionResult {
  let triggeredAction: AgentCompletionResult['triggeredAction'] = undefined;
  let cleaned = rawReply;

  if (cleaned.includes('[ACTION:OPEN_OFFERS]')) {
    triggeredAction = 'OPEN_OFFERS';
    cleaned = cleaned.replace(/\[ACTION:OPEN_OFFERS\]/g, '').trim();
  }
  if (cleaned.includes('[ACTION:OPEN_ALL_PROJECTS]')) {
    triggeredAction = 'OPEN_ALL_PROJECTS';
    cleaned = cleaned.replace(/\[ACTION:OPEN_ALL_PROJECTS\]/g, '').trim();
  }
  if (cleaned.includes('[ACTION:OPEN_RESUME]')) {
    triggeredAction = 'OPEN_RESUME';
    cleaned = cleaned.replace(/\[ACTION:OPEN_RESUME\]/g, '').trim();
  }

  cleaned = cleaned.replace(/\[ACTION:[^\]]+\]/g, '').trim();

  const cleanSpokenText = cleaned
    .replace(/https?:\/\/[^\s)]+/g, '')
    .replace(/[*#_`~]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return {
    text: cleaned,
    cleanSpokenText,
    modelUsed,
    matchedProjects: findMatchingProjectsForQuery(userQuery, cleaned),
    triggeredAction,
  };
}

/**
 * Generates a real AI Agent response via OpenRouter API (`https://openrouter.ai/api/v1/chat/completions`)
 * with automatic multi-model `:free` failover (`cohere/north-mini-code:free` -> `nvidia/nemotron-3-super-120b-a12b:free` -> `liquid/lfm-2.5-2.6b:free` -> `openrouter/free`).
 */
export async function generateAgentResponse(
  history: AgentMessage[],
  mode: 'text' | 'voice'
): Promise<AgentCompletionResult> {
  const systemMessage: AgentMessage = {
    role: 'system',
    content: buildSystemPrompt(mode),
  };

  const recentHistory = history.slice(-8);
  const lastUserMessage =
    [...recentHistory].reverse().find((m) => m.role === 'user')?.content || '';

  const openRouterKey = getSavedOpenRouterKey();
  const preferredModel = getSavedOpenRouterModel();

  const candidateModels = Array.from(
    new Set([
      preferredModel,
      'cohere/north-mini-code:free',
      'nvidia/nemotron-3-super-120b-a12b:free',
      'liquid/lfm-2.5-2.6b:free',
      'openrouter/free',
    ])
  );

  for (const modelId of candidateModels) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Syed Mujtaba Abbas Portfolio AI Agent',
        },
        body: JSON.stringify({
          model: modelId,
          messages: [systemMessage, ...recentHistory],
          temperature: 0.6,
          max_tokens: mode === 'voice' ? 200 : 420,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return parseReplyAndActions(
            reply,
            lastUserMessage,
            data?.model || modelId
          );
        }
      }
    } catch {
      // try next fast free model on OpenRouter
    }
  }

  // Secondary cloud fallback if all OpenRouter free tiers are temporarily rate-limited
  try {
    const res = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai',
        messages: [systemMessage, ...recentHistory],
        temperature: 0.6,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (reply) {
        return parseReplyAndActions(
          reply,
          lastUserMessage,
          'OpenRouter Cloud Fallback'
        );
      }
    }
  } catch {
    // offline fallback below
  }

  return parseReplyAndActions(
    'Assalam o Alaikum! I am Syed Mujtaba Abbas’s AI Agent. Mujtaba has 4 special discounted offers starting at $69 (Rs. 19,500) up to $149 (Rs. 42,000) for full Next.js + Sanity CMS e-commerce stores and 24/7 WhatsApp AI bots. You can message him directly on WhatsApp at +92 346 0630802!',
    lastUserMessage,
    'Local Portfolio Engine'
  );
}
