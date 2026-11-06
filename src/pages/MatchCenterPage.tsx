import React, { useState } from 'react';
import { Activity, Play, Sparkles, Video } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { LiveMatchCenter } from '../components/LiveMatchCenter';
import { MasterclassDrills } from '../components/MasterclassDrills';

interface MatchCenterPageProps {
  onNavigateHome: () => void;
  onOpenBooking: () => void;
}

export const MatchCenterPage: React.FC<MatchCenterPageProps> = ({
  onNavigateHome,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'matches' | 'drills'>('all');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageHeader
        title="Live Match Center & Video Masterclasses"
        subtitle="Track live academy tournament fixture scores, telemetry analytics, and hone your technique with 240FPS high-speed drills curated by BCCI Level 3 master coaches."
        badge="Live Telemetry Hub"
        badgeColor="text-blue-400 border-blue-500/30 bg-blue-500/10"
        onNavigateHome={onNavigateHome}
      />

      {/* Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
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
              All Sections
            </button>
            <button
              onClick={() => {
                setActiveTab('matches');
                const el = document.getElementById('match-center');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'matches'
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Live Match Scorecards & Telemetry
            </button>
            <button
              onClick={() => {
                setActiveTab('drills');
                const el = document.getElementById('drills');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'drills'
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. 240FPS Masterclass Drills
            </button>
          </div>
        </div>
      </div>

      <main>
        {(activeTab === 'all' || activeTab === 'matches') && (
          <LiveMatchCenter />
        )}

        {(activeTab === 'all' || activeTab === 'drills') && (
          <MasterclassDrills />
        )}
      </main>
    </div>
  );
};
