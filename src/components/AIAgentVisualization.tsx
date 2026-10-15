import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Cpu,
  Database,
  ExternalLink,
  Play,
  Pause,
  ShieldCheck,
  Terminal,
  Wrench,
  Zap,
} from 'lucide-react';
import { PORTFOLIO_DATA, AgentNode, AgentWorkflowScenario } from '../data/portfolioData';
import { AgenticSynapseBg } from './SectionBackgrounds';

export const AIAgentVisualization: React.FC = () => {
  const scenarios = PORTFOLIO_DATA.agentWorkflows;
  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(scenarios[0].nodes[0].id);
  const [activePulseIndex, setActivePulseIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const currentScenario: AgentWorkflowScenario =
    scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const selectedNode: AgentNode =
    currentScenario.nodes.find((n) => n.id === selectedNodeId) ||
    currentScenario.nodes[activePulseIndex] ||
    currentScenario.nodes[0];

  useEffect(() => {
    setSelectedNodeId(currentScenario.nodes[0].id);
    setActivePulseIndex(0);
  }, [activeScenarioId, currentScenario.nodes]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActivePulseIndex((prev) => {
        const next = (prev + 1) % currentScenario.nodes.length;
        setSelectedNodeId(currentScenario.nodes[next].id);
        return next;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentScenario.nodes]);

  const getNodeIcon = (type: AgentNode['type']) => {
    switch (type) {
      case 'trigger':
        return Zap;
      case 'orchestrator':
        return Bot;
      case 'rag':
        return Database;
      case 'tool':
        return Wrench;
      case 'human':
        return ShieldCheck;
      case 'output':
        return Cpu;
    }
  };

  return (
    <section
      id="agentic-ai"
      aria-labelledby="agentic-heading"
      className="relative border-t border-white/[0.07] bg-[#050505] py-24 sm:py-32 overflow-hidden"
    >
      {/* SECTION 5 UNIQUE BACKGROUND ANIMATION: Synaptic Data Streams */}
      <AgenticSynapseBg />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
              Agentic AI Systems &amp; Architecture
            </span>
            <h2
              id="agentic-heading"
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white"
            >
              How my autonomous{' '}
              <span className="text-platinum">AI workflows</span> operate in production.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#121216] px-4 py-2.5 text-xs font-medium text-zinc-200 hover:border-white/35 hover:text-white transition-colors cursor-pointer self-start lg:self-end"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-zinc-400" />
                <span>Pause Step Simulation</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-zinc-400" />
                <span>Resume Step Simulation</span>
              </>
            )}
          </button>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {scenarios.map((scenario) => {
            const isSelected = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`rounded-xl text-left p-4 border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-white/40 bg-[#16161C] text-white shadow-lg'
                    : 'border-white/[0.08] bg-[#0C0C0F]/90 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                }`}
              >
                <div className="text-[11px] font-medium text-zinc-400 mb-1">
                  {scenario.linkedProjectName}
                </div>
                <div className="font-display text-sm font-bold text-white">
                  {scenario.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Clean Pipeline Stage + Live Payload Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-[#0B0B0E]/92 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4 mb-6">
              <div>
                <span className="text-xs text-zinc-400">
                  Pattern: {currentScenario.architecturePattern}
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">
                  {currentScenario.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {currentScenario.linkedLiveUrl && (
                  <a
                    href={currentScenario.linkedLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200"
                  >
                    <span>Live App</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 my-auto">
              {currentScenario.nodes.map((node, index) => {
                const Icon = getNodeIcon(node.type);
                const isSelected = node.id === selectedNode.id;

                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    whileHover={{ y: -3 }}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSelectedNodeId(node.id);
                      setActivePulseIndex(index);
                    }}
                    className={`relative text-left rounded-xl p-4 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-white/50 bg-[#18181F] shadow-md'
                        : 'border-white/[0.07] bg-[#111115] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-tech text-[11px] text-zinc-400">
                        Step 0{index + 1}
                      </span>
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          isSelected
                            ? 'bg-white text-black'
                            : 'bg-[#191920] text-zinc-300'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <div className="font-display text-sm font-bold text-white mb-1">
                      {node.label}
                    </div>
                    <div className="text-xs text-zinc-400 line-clamp-2 mb-3">
                      {node.sublabel}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] font-mono-tech text-[10px] text-zinc-400">
                      <span>{node.type}</span>
                      <span className="text-zinc-200">{node.latency}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <p className="mt-6 pt-4 border-t border-white/[0.07] text-xs sm:text-sm text-zinc-400">
              {currentScenario.summary}
            </p>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-[#0B0B0E]/92 p-6 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-zinc-400" />
                  <span className="text-xs font-semibold text-zinc-200">
                    Step Payload Inspector
                  </span>
                </div>
                <span className="font-mono-tech text-[11px] text-emerald-400">
                  {selectedNode.latency}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-display text-lg font-bold text-white">
                  {selectedNode.label}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">{selectedNode.sublabel}</p>
              </div>

              <div className="mb-4 rounded-xl border border-white/[0.07] bg-[#121216] p-3">
                <div className="text-[11px] text-zinc-400 mb-0.5">Status</div>
                <div className="text-xs font-medium text-zinc-200">
                  {selectedNode.statusText}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-zinc-400 mb-1.5">
                  Structured JSON Output
                </div>
                <pre className="rounded-xl border border-white/[0.07] bg-[#060608] p-3.5 font-mono-tech text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                  <code>{selectedNode.payloadSample}</code>
                </pre>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.07] text-[11px] text-zinc-500">
              Click any step on the left to inspect its structured payload.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
