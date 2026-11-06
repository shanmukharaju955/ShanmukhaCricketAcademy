import React, { useState } from 'react';
import { Bot, Sparkles, Cpu, Award } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { AIShotAnalyzer } from '../components/AIShotAnalyzer';
import { AITrainingPlanGenerator } from '../components/AITrainingPlanGenerator';

interface AIHubPageProps {
  onNavigateHome: () => void;
  onOpenAICoach: () => void;
}

export const AIHubPage: React.FC<AIHubPageProps> = ({
  onNavigateHome,
  onOpenAICoach,
}) => {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'planner' | 'all'>('all');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageHeader
        title="AI Biomechanics & Smart Training Hub"
        subtitle="Harness elite computer vision and Google Gemini 3.7 AI to dissect your batting stance, bat swing arc, bowling release mechanics, and generate personalized 7-day training drills."
        badge="Gemini 3.7 Vision Engine"
        badgeColor="text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
        onNavigateHome={onNavigateHome}
      >
        <button
          onClick={onOpenAICoach}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all flex items-center gap-2"
        >
          <Bot className="w-4 h-4" />
          <span>Ask Coach Shanmukha AI</span>
        </button>
      </PageHeader>

      {/* Hub Navigation Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('all');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All AI Tools
            </button>
            <button
              onClick={() => {
                setActiveTab('analyzer');
                const el = document.getElementById('ai-analysis');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Stroke & Action Biomechanics
            </button>
            <button
              onClick={() => {
                setActiveTab('planner');
                const el = document.getElementById('ai-training-plan');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'planner'
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. 7-Day Custom Training Planner
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Telemetry Server Online</span>
          </div>
        </div>
      </div>

      <main>
        {/* 1. Biomechanics Stroke & Bowling Analyzer */}
        {(activeTab === 'all' || activeTab === 'analyzer') && (
          <AIShotAnalyzer />
        )}

        {/* 2. 7-Day High Performance Training Plan Generator */}
        {(activeTab === 'all' || activeTab === 'planner') && (
          <div id="ai-training-plan">
            <AITrainingPlanGenerator />
          </div>
        )}
      </main>
    </div>
  );
};
