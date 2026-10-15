import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Bot,
  X,
  Send,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Layers,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Settings,
  KeyRound,
  Check,
  Loader2,
  Gift,
} from 'lucide-react';
import { PORTFOLIO_DATA, PortfolioProject } from '../data/portfolioData';
import {
  AgentMessage,
  OPENROUTER_FREE_MODELS,
  generateAgentResponse,
  getSavedOpenRouterKey,
  getSavedOpenRouterModel,
  saveOpenRouterKey,
  saveOpenRouterModel,
} from '../services/openRouterAgent';

interface ChatLogItem {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  modelBadge?: string;
  matchedProjects?: PortfolioProject[];
}

const QUICK_PROMPTS = [
  'Mujtaba ki special offers aur prices batao',
  'Show Next.js + Sanity CMS stores',
  'Tell me about WhatsApp AI & LeadHunter',
  'How can I hire Mujtaba?',
];

// Minimal TypeScript declarations for Web Speech Recognition API
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [altIndex: number]: { transcript: string };
    };
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

function createSpeechRecognition(): SpeechRecognitionInstance | null {
  if (typeof window === 'undefined') return null;
  const win = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  };
  const Ctor = win.SpeechRecognition || win.webkitSpeechRecognition;
  if (!Ctor) return null;
  try {
    return new Ctor();
  } catch {
    return null;
  }
}

interface MujtabaAICopilotProps {
  onSelectProject: (project: PortfolioProject) => void;
  onOpenAllProjects: () => void;
  onOpenOffersPopup?: () => void;
  onOpenDossier?: () => void;
}

export const MujtabaAICopilot: React.FC<MujtabaAICopilotProps> = ({
  onSelectProject,
  onOpenAllProjects,
  onOpenOffersPopup,
  onOpenDossier,
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'call'>('chat');
  const [showSettings, setShowSettings] = useState(false);

  // OpenRouter settings
  const [apiKeyInput, setApiKeyInput] = useState<string>(() => getSavedOpenRouterKey());
  const [selectedModel, setSelectedModel] = useState<string>(() =>
    getSavedOpenRouterModel()
  );
  const [savedKeyNotice, setSavedKeyNotice] = useState(false);

  // Chat state
  const [voiceReadoutInChat, setVoiceReadoutInChat] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatLogItem[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Assalam o Alaikum! I'm Syed Mujtaba Abbas's real OpenRouter AI Agent. You can chat with me here in English or Roman Urdu, or click 'Live Voice Call' above to talk to me on a realtime call!",
      modelBadge: 'OpenRouter Free Agent',
      matchedProjects: PORTFOLIO_DATA.projects.filter((p) => p.featured).slice(0, 2),
    },
  ]);

  // Realtime Voice Call state
  const [callActive, setCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<
    'idle' | 'listening' | 'thinking' | 'speaking'
  >('idle');
  const [callSeconds, setCallSeconds] = useState(0);
  const [callLang, setCallLang] = useState<'en-US' | 'ur-PK'>('en-US');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [lastAgentVoiceText, setLastAgentVoiceText] = useState(
    'Call connected! Speak naturally—ask about Mujtaba’s projects, Sanity CMS stores, WhatsApp AI bots, or discounted offers ($69–$149).'
  );
  const [micMuted, setMicMuted] = useState(false);
  const [micSupported, setMicSupported] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const callActiveRef = useRef(false);
  const micMutedRef = useRef(false);
  const historyRef = useRef<AgentMessage[]>([
    {
      role: 'assistant',
      content:
        "Assalam o Alaikum! I'm Syed Mujtaba Abbas's real OpenRouter AI Agent. How can I help you today?",
    },
  ]);

  useEffect(() => {
    callActiveRef.current = callActive;
  }, [callActive]);

  useEffect(() => {
    micMutedRef.current = micMuted;
  }, [micMuted]);

  // Keyboard shortcut Cmd+J / Ctrl+J
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, open, activeTab]);

  // Call duration timer
  useEffect(() => {
    if (!callActive) {
      setCallSeconds(0);
      return;
    }
    const interval = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callActive]);

  const formatCallTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const rem = (secs % 60).toString().padStart(2, '0');
    return `${mins}:${rem}`;
  };

  // Pick best natural browser voice
  const speakWithCallback = useCallback(
    (text: string, onFinished?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        onFinished?.();
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const preferred =
          voices.find(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Natural') ||
                v.name.includes('Google') ||
                v.name.includes('Online') ||
                v.name.includes('Samantha'))
          ) || voices.find((v) => v.lang.startsWith('en'));

        if (preferred) utterance.voice = preferred;
        utterance.rate = 1.03;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          onFinished?.();
        };
        utterance.onerror = () => {
          onFinished?.();
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        onFinished?.();
      }
    },
    []
  );

  // Start microphone listening during an active voice call
  const startListeningTurn = useCallback(() => {
    if (!callActiveRef.current || micMutedRef.current) return;

    const rec = createSpeechRecognition();
    if (!rec) {
      setMicSupported(false);
      setCallStatus('listening');
      return;
    }

    recognitionRef.current = rec;
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = callLang;

    let finalSpoken = '';

    rec.onresult = (event: SpeechRecognitionEventLike) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalSpoken += chunk + ' ';
        } else {
          interim += chunk;
        }
      }
      setLiveTranscript((finalSpoken + interim).trim());
    };

    rec.onerror = () => {
      // If no speech detected, gently restart listening if call is still active
      if (callActiveRef.current && !micMutedRef.current) {
        setTimeout(() => {
          if (callActiveRef.current && !micMutedRef.current) {
            setCallStatus('listening');
          }
        }, 600);
      }
    };

    rec.onend = () => {
      const captured = finalSpoken.trim();
      if (captured && callActiveRef.current) {
        handleVoiceTurnSubmit(captured);
      } else if (callActiveRef.current && !micMutedRef.current) {
        // Keep listening if user hasn't spoken yet
        try {
          rec.start();
        } catch {
          // ignore if already started
        }
      }
    };

    try {
      setLiveTranscript('');
      setCallStatus('listening');
      rec.start();
    } catch {
      setCallStatus('listening');
    }
  }, [callLang]);

  const executeTriggeredAction = useCallback(
    (action?: 'OPEN_OFFERS' | 'OPEN_ALL_PROJECTS' | 'OPEN_RESUME') => {
      if (!action) return;
      if (action === 'OPEN_OFFERS' && onOpenOffersPopup) {
        onOpenOffersPopup();
      } else if (action === 'OPEN_ALL_PROJECTS') {
        onOpenAllProjects();
      } else if (action === 'OPEN_RESUME' && onOpenDossier) {
        onOpenDossier();
      }
    },
    [onOpenOffersPopup, onOpenAllProjects, onOpenDossier]
  );

  // Process a spoken turn during a Realtime Voice Call
  const handleVoiceTurnSubmit = async (spokenText: string) => {
    const trimmed = spokenText.trim();
    if (!trimmed) return;

    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }

    setLiveTranscript(trimmed);
    setCallStatus('thinking');

    const userMsg: ChatLogItem = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    historyRef.current = [...historyRef.current, { role: 'user', content: trimmed }];

    const result = await generateAgentResponse(historyRef.current, 'voice');

    historyRef.current = [
      ...historyRef.current,
      { role: 'assistant', content: result.text },
    ];

    const botMsg: ChatLogItem = {
      id: `b-${Date.now() + 1}`,
      sender: 'assistant',
      text: result.text,
      modelBadge: result.modelUsed,
      matchedProjects: result.matchedProjects,
    };
    setMessages((prev) => [...prev, botMsg]);
    setLastAgentVoiceText(result.cleanSpokenText);
    executeTriggeredAction(result.triggeredAction);

    if (!callActiveRef.current) return;

    setCallStatus('speaking');
    speakWithCallback(result.cleanSpokenText, () => {
      if (callActiveRef.current && !micMutedRef.current) {
        startListeningTurn();
      } else if (callActiveRef.current) {
        setCallStatus('listening');
      }
    });
  };

  // Start the Realtime Voice Call
  const startRealtimeCall = () => {
    setOpen(true);
    setActiveTab('call');
    setCallActive(true);
    callActiveRef.current = true;
    setMicMuted(false);
    micMutedRef.current = false;

    const greeting =
      "Assalam o Alaikum! You're on a live voice call with Syed Mujtaba Abbas's AI Agent. Ask me anything about his projects, Sanity CMS stores, or special offers!";
    setLastAgentVoiceText(greeting);
    setCallStatus('speaking');

    speakWithCallback(greeting, () => {
      if (callActiveRef.current) {
        startListeningTurn();
      }
    });
  };

  // End the Realtime Voice Call
  const endRealtimeCall = () => {
    setCallActive(false);
    callActiveRef.current = false;
    setCallStatus('idle');
    setLiveTranscript('');
    try {
      recognitionRef.current?.abort();
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Interrupt AI Speech & Listen Immediately (Barge-In)
  const handleInterruptAndListen = () => {
    if (!callActive) {
      startRealtimeCall();
      return;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    startListeningTurn();
  };

  // Standard Text Chat Submit
  const handleSendText = async (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || isLoading) return;

    // If user is currently in the Call tab and types a message, process it as a Voice Call turn!
    if (activeTab === 'call' && callActive) {
      setInput('');
      await handleVoiceTurnSubmit(trimmed);
      return;
    }

    const userMsg: ChatLogItem = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    historyRef.current = [...historyRef.current, { role: 'user', content: trimmed }];

    const result = await generateAgentResponse(historyRef.current, 'text');

    historyRef.current = [
      ...historyRef.current,
      { role: 'assistant', content: result.text },
    ];

    const botMsg: ChatLogItem = {
      id: `b-${Date.now() + 1}`,
      sender: 'assistant',
      text: result.text,
      modelBadge: result.modelUsed,
      matchedProjects: result.matchedProjects,
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
    executeTriggeredAction(result.triggeredAction);

    if (voiceReadoutInChat) {
      speakWithCallback(result.cleanSpokenText);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveOpenRouterKey(apiKeyInput);
    saveOpenRouterModel(selectedModel);
    setSavedKeyNotice(true);
    setTimeout(() => {
      setSavedKeyNotice(false);
      setShowSettings(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      {!open ? (
        <div className="flex items-center gap-2">
          {/* Direct 1-Click Realtime Voice Call Launcher */}
          <button
            type="button"
            onClick={startRealtimeCall}
            title="Start a Realtime Voice Call with Mujtaba's AI Agent"
            className="group flex items-center gap-2 rounded-full border border-emerald-500/40 bg-[#0D1311]/95 px-4 py-2.5 text-xs font-semibold text-emerald-300 shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl hover:border-emerald-400 hover:bg-emerald-500/15 transition-all cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
            <span>Live AI Call</span>
          </button>

          {/* Text + Voice Copilot Launcher */}
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setActiveTab('chat');
            }}
            className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-[#0E0E12]/95 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl hover:border-white/45 hover:bg-[#16161D] transition-all cursor-pointer"
          >
            <Bot className="h-4 w-4 text-zinc-200" />
            <span>Ask Mujtaba AI</span>
            <span className="hidden sm:inline rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono-tech text-[10px] text-zinc-400">
              ⌘J
            </span>
          </button>
        </div>
      ) : (
        <div className="w-[94vw] sm:w-[430px] rounded-2xl border border-white/15 bg-[#0A0A0E]/98 shadow-[0_32px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden flex flex-col">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#121218] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-[#1B1B24] text-white">
                <Sparkles className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">
                    Mujtaba AI Agent
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono-tech text-[9px] font-semibold text-emerald-300">
                    OpenRouter Free
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400">
                  Real LLM Chat + Realtime Voice Call
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowSettings((prev) => !prev)}
                title="OpenRouter Model & API Key Settings"
                className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs transition-colors cursor-pointer ${
                  showSettings
                    ? 'border-white bg-white text-black'
                    : 'border-white/10 bg-[#0D0D11] text-zinc-400 hover:text-white'
                }`}
              >
                <Settings className="h-3.5 w-3.5" />
              </button>

              {activeTab === 'chat' && (
                <button
                  type="button"
                  onClick={() => {
                    const next = !voiceReadoutInChat;
                    setVoiceReadoutInChat(next);
                    if (!next && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  title={
                    voiceReadoutInChat
                      ? 'Mute chat voice readout'
                      : 'Speak chat replies aloud'
                  }
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs transition-colors cursor-pointer ${
                    voiceReadoutInChat
                      ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300'
                      : 'border-white/10 bg-[#0D0D11] text-zinc-400 hover:text-white'
                  }`}
                >
                  {voiceReadoutInChat ? (
                    <Volume2 className="h-3.5 w-3.5" />
                  ) : (
                    <VolumeX className="h-3.5 w-3.5" />
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  endRealtimeCall();
                  setOpen(false);
                }}
                aria-label="Close AI Agent"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-[#0D0D11] text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Bar: Text Chat vs Realtime Voice Call */}
          <div className="grid grid-cols-2 gap-1.5 border-b border-white/[0.08] bg-[#0E0E14] p-2">
            <button
              type="button"
              onClick={() => {
                endRealtimeCall();
                setActiveTab('chat');
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Text Chat</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('call');
                if (!callActive) {
                  startRealtimeCall();
                }
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'call'
                  ? 'bg-emerald-400 text-black shadow-sm'
                  : 'border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
              }`}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Realtime Voice Call</span>
            </button>
          </div>

          {/* Optional OpenRouter Model & API Key Settings Drawer */}
          {showSettings && (
            <form
              onSubmit={handleSaveSettings}
              className="border-b border-white/10 bg-[#111118] p-4 space-y-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-emerald-400" />
                  <span>OpenRouter Free Model Configuration</span>
                </span>
                <span className="font-mono-tech text-[10px] text-emerald-400">
                  Zero-Key Cloud Active
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  Select Free OpenRouter Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#09090D] px-3 py-2 text-xs text-white focus:border-white/40 focus:outline-none"
                >
                  {OPENROUTER_FREE_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label} [{m.badge}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  OpenRouter API Key (Optional — works automatically even if left blank)
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="sk-or-v1-... (Optional from openrouter.ai/keys)"
                  className="w-full rounded-lg border border-white/15 bg-[#09090D] px-3 py-2 font-mono-tech text-xs text-white placeholder:text-zinc-500 focus:border-white/40 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-zinc-400">
                  Uses OpenRouter `:free` models + automatic cloud LLM fallback.
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 cursor-pointer"
                >
                  {savedKeyNotice ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <span>Save Settings</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* =============================================================== */}
          {/* VIEW A: REALTIME VOICE CALL STUDIO                              */}
          {/* =============================================================== */}
          {activeTab === 'call' ? (
            <div className="p-5 space-y-5 bg-[#08080C]">
              {/* Top Call Telemetry Row */}
              <div className="flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#121218] px-3 py-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      callActive
                        ? 'bg-emerald-400 animate-ping'
                        : 'bg-zinc-500'
                    }`}
                  />
                  <span className="font-mono-tech text-[11px] text-zinc-200">
                    {callActive
                      ? `LIVE CALL · ${formatCallTime(callSeconds)}`
                      : 'CALL ENDED'}
                  </span>
                </div>

                {/* Call Language Switcher */}
                <div className="inline-flex items-center rounded-lg border border-white/10 bg-[#121218] p-0.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setCallLang('en-US')}
                    className={`rounded-md px-2 py-1 font-medium cursor-pointer ${
                      callLang === 'en-US'
                        ? 'bg-white text-black font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    EN / Roman Urdu
                  </button>
                  <button
                    type="button"
                    onClick={() => setCallLang('ur-PK')}
                    className={`rounded-md px-2 py-1 font-medium cursor-pointer ${
                      callLang === 'ur-PK'
                        ? 'bg-white text-black font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    اردو (UR-PK)
                  </button>
                </div>
              </div>

              {/* Central Reactive Voice Orb & Equalizer */}
              <div className="flex flex-col items-center justify-center py-4">
                <button
                  type="button"
                  onClick={handleInterruptAndListen}
                  title="Tap orb to interrupt and speak immediately"
                  className="group relative flex h-32 w-32 items-center justify-center rounded-full cursor-pointer focus:outline-none"
                >
                  {/* Outer Pulsing Rings */}
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      callStatus === 'listening'
                        ? 'animate-ping bg-emerald-500/20 border border-emerald-400/40'
                        : callStatus === 'speaking'
                        ? 'animate-pulse bg-white/15 border border-white/40 scale-110'
                        : callStatus === 'thinking'
                        ? 'animate-spin border-2 border-dashed border-zinc-400/50'
                        : 'bg-zinc-800/30 border border-white/10'
                    }`}
                  />
                  <span
                    className={`relative flex h-24 w-24 flex-col items-center justify-center rounded-full border transition-all duration-300 shadow-2xl ${
                      callStatus === 'listening'
                        ? 'border-emerald-400 bg-[#0F241D] text-emerald-300'
                        : callStatus === 'speaking'
                        ? 'border-white bg-[#1B1B24] text-white'
                        : callStatus === 'thinking'
                        ? 'border-zinc-500 bg-[#14141C] text-zinc-200'
                        : 'border-white/15 bg-[#121218] text-zinc-400'
                    }`}
                  >
                    {callStatus === 'thinking' ? (
                      <Loader2 className="h-7 w-7 animate-spin text-white" />
                    ) : callStatus === 'speaking' ? (
                      <div className="flex items-end gap-1 h-7">
                        <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.55s_infinite] h-6" />
                        <span className="w-1.5 bg-white rounded-full animate-[bounce_0.45s_infinite] h-7" />
                        <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.65s_infinite] h-4" />
                        <span className="w-1.5 bg-white rounded-full animate-[bounce_0.5s_infinite] h-6" />
                      </div>
                    ) : (
                      <Mic className="h-7 w-7" />
                    )}
                    <span className="mt-1.5 font-mono-tech text-[9px] uppercase tracking-wider">
                      {callStatus === 'listening'
                        ? 'Listening'
                        : callStatus === 'speaking'
                        ? 'Speaking'
                        : callStatus === 'thinking'
                        ? 'Thinking'
                        : 'Paused'}
                    </span>
                  </span>
                </button>

                <div className="mt-3 text-center">
                  <div className="text-xs font-semibold text-white">
                    {callStatus === 'listening'
                      ? 'Listening to you... Speak naturally'
                      : callStatus === 'thinking'
                      ? 'OpenRouter AI is thinking...'
                      : callStatus === 'speaking'
                      ? 'Mujtaba AI is speaking (Tap orb to interrupt)'
                      : 'Tap Start Call to talk'}
                  </div>
                </div>
              </div>

              {/* Live Transcript & Spoken Response Subtitle Box */}
              <div className="rounded-xl border border-white/10 bg-[#111117] p-3.5 space-y-2 text-xs">
                {liveTranscript && (
                  <div className="border-b border-white/[0.07] pb-2">
                    <span className="text-[10px] font-mono-tech uppercase text-emerald-400">
                      You said:
                    </span>
                    <p className="text-white font-medium mt-0.5">{liveTranscript}</p>
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-mono-tech uppercase text-zinc-400">
                    Mujtaba AI Voice:
                  </span>
                  <p className="text-zinc-200 leading-relaxed mt-0.5">
                    {lastAgentVoiceText}
                  </p>
                </div>
              </div>

              {/* Call Controls Bar */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const nextMute = !micMuted;
                    setMicMuted(nextMute);
                    micMutedRef.current = nextMute;
                    if (nextMute) {
                      try {
                        recognitionRef.current?.stop();
                      } catch {
                        // ignore
                      }
                      setCallStatus('idle');
                    } else {
                      startListeningTurn();
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                    micMuted
                      ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                      : 'border-white/15 bg-[#15151D] text-white hover:border-white/35'
                  }`}
                >
                  {micMuted ? (
                    <>
                      <MicOff className="h-4 w-4" />
                      <span>Unmute Mic</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 text-emerald-400" />
                      <span>Mic Active</span>
                    </>
                  )}
                </button>

                {callActive ? (
                  <button
                    type="button"
                    onClick={endRealtimeCall}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-red-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-600 transition-all cursor-pointer"
                  >
                    <PhoneOff className="h-4 w-4" />
                    <span>End Call</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startRealtimeCall}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-400 px-5 py-2.5 text-xs font-bold text-black hover:bg-emerald-300 transition-all cursor-pointer"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>Start Call</span>
                  </button>
                )}
              </div>

              {/* Optional Type-During-Call Input (also works if Mic isn't granted) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendText(input);
                }}
                className="flex items-center gap-2 pt-1 border-t border-white/[0.08]"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    micSupported
                      ? 'Or type during the call and hear AI speak back...'
                      : 'Mic blocked by browser — type here to hear AI speak!'
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0D0D12] px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-white/30 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send to voice call"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black hover:bg-zinc-200 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          ) : (
            /* =============================================================== */
            /* VIEW B: REAL OPENROUTER TEXT CHAT                               */
            /* =============================================================== */
            <>
              <div
                ref={scrollRef}
                className="max-h-[340px] overflow-y-auto p-4 space-y-3.5 text-xs"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[90%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-white text-black font-medium'
                          : 'border border-white/10 bg-[#131319] text-zinc-200'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.modelBadge && msg.sender === 'assistant' && (
                      <span className="mt-1 font-mono-tech text-[9px] text-zinc-500">
                        via {msg.modelBadge}
                      </span>
                    )}

                    {msg.matchedProjects && msg.matchedProjects.length > 0 && (
                      <div className="mt-2 w-full space-y-1.5">
                        {msg.matchedProjects.map((proj) => (
                          <button
                            key={proj.id}
                            type="button"
                            onClick={() => {
                              onSelectProject(proj);
                              setOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#101015] p-2 text-left hover:border-white/30 transition-all cursor-pointer"
                          >
                            <img
                              src={proj.previewImage}
                              alt={proj.name}
                              className="h-10 w-14 rounded-md object-cover object-top border border-white/10 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-white truncate">
                                {proj.name}
                              </div>
                              <div className="text-[10px] text-zinc-400 truncate">
                                {proj.category}
                              </div>
                            </div>
                            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#131319] px-3.5 py-2.5 text-xs text-zinc-300 w-fit">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                    <span>Thinking via OpenRouter Free LLM...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Chips */}
              <div className="border-t border-white/[0.07] bg-[#0E0E13] px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {QUICK_PROMPTS.map((qp) => (
                  <button
                    key={qp}
                    type="button"
                    onClick={() => handleSendText(qp)}
                    className="shrink-0 rounded-full border border-white/10 bg-[#16161D] px-2.5 py-1 text-[10px] text-zinc-300 hover:border-white/30 hover:text-white cursor-pointer"
                  >
                    {qp}
                  </button>
                ))}
              </div>

              {/* Bottom Chat Input & Quick Links */}
              <div className="border-t border-white/10 bg-[#111116] p-3 space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendText(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything in English or Roman Urdu..."
                    className="w-full rounded-lg border border-white/10 bg-[#09090C] px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-white/30 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={startRealtimeCall}
                    title="Switch to Realtime Voice Call"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/35 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 cursor-pointer"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    aria-label="Send message"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black hover:bg-zinc-200 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>

                <div className="flex items-center justify-between pt-1 text-[10px] text-zinc-400">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        onOpenAllProjects();
                      }}
                      className="inline-flex items-center gap-1 hover:text-white cursor-pointer"
                    >
                      <Layers className="h-3 w-3" />
                      <span>All 25 Projects</span>
                    </button>
                    {onOpenOffersPopup && (
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          onOpenOffersPopup();
                        }}
                        className="inline-flex items-center gap-1 text-emerald-400 hover:underline cursor-pointer"
                      >
                        <Gift className="h-3 w-3" />
                        <span>Offers ($69+)</span>
                      </button>
                    )}
                  </div>

                  <a
                    href={PORTFOLIO_DATA.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
