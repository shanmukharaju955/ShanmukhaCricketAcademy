import React, { useState } from 'react';
import { 
  Flame, 
  Activity, 
  Trophy, 
  PieChart as PieChartIcon, 
  ChevronRight, 
  Zap, 
  Play, 
  RefreshCw,
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LIVE_MATCH_DATA } from '../data/mockData';
import { LiveMatchData } from '../types';

export const LiveMatchCenter: React.FC = () => {
  const [matchState, setMatchState] = useState<LiveMatchData>(LIVE_MATCH_DATA);
  const [activeTab, setActiveTab] = useState<'scorecard' | 'wagonwheel' | 'commentary'>('scorecard');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Simulate Next Ball
  const handleSimulateBall = () => {
    const ballOutcomes = ['1', '2', '4', '6', '1', '0', 'W', '4', '1', '6'];
    const randomBall = ballOutcomes[Math.floor(Math.random() * ballOutcomes.length)];

    if (randomBall === '6' || randomBall === '4') {
      confetti({
        particleCount: randomBall === '6' ? 40 : 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ef4444', '#f59e0b', '#10b981', '#ffffff'],
      });
    }

    setMatchState((prev) => {
      const runsToAdd = randomBall === 'W' ? 0 : parseInt(randomBall, 10) || 0;
      const [currentRuns, currentWickets] = prev.teamA.score.split('/').map(Number);
      const newScore = `${currentRuns + runsToAdd}/${randomBall === 'W' ? currentWickets + 1 : currentWickets}`;
      
      const newRecentBalls = [...prev.recentBalls.slice(1), randomBall];
      
      // Update batsman runs
      const updatedBatsmen = prev.currentBatsmen.map((bat) => {
        if (bat.isOnStrike) {
          const newRuns = bat.runs + runsToAdd;
          const newBalls = bat.balls + 1;
          return {
            ...bat,
            runs: newRuns,
            balls: newBalls,
            fours: randomBall === '4' ? bat.fours + 1 : bat.fours,
            sixes: randomBall === '6' ? bat.sixes + 1 : bat.sixes,
            strikeRate: Number(((newRuns / newBalls) * 100).toFixed(1)),
            isOnStrike: runsToAdd % 2 === 0 ? true : false,
          };
        } else {
          return {
            ...bat,
            isOnStrike: runsToAdd % 2 !== 0 ? true : false,
          };
        }
      });

      return {
        ...prev,
        teamA: {
          ...prev.teamA,
          score: newScore,
        },
        currentBatsmen: updatedBatsmen,
        recentBalls: newRecentBalls,
      };
    });
  };

  return (
    <section id="match-center" className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>SCA Tournament Match Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Live Academy Match <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">Telemetry & Scorecard</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Watch our junior and senior cadets execute match skills under pressure with live ball-by-ball analysis.
          </p>
        </div>

        {/* Main Scorecard Header Banner */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-red-500/30 shadow-2xl space-y-6 bg-gradient-to-br from-slate-900 via-slate-950 to-red-950/30 mb-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-black text-[10px] uppercase tracking-wider animate-pulse">
                {matchState.status}
              </span>
              <span className="font-bold text-white text-sm">{matchState.tournament}</span>
            </div>
            <span className="text-slate-400">{matchState.venue}</span>
          </div>

          {/* Teams Score Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Team A (Titans) */}
            <div className="md:col-span-5 p-4 rounded-2xl bg-slate-900/90 border border-red-500/30 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Batting Team</p>
                <h3 className="text-lg sm:text-xl font-black text-white">{matchState.teamA.name}</h3>
                <p className="text-xs text-amber-400 font-semibold">CRR: {matchState.teamA.runRate}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-4xl sm:text-5xl font-black text-white">
                  {matchState.teamA.score}
                </p>
                <p className="text-xs text-slate-400 font-bold font-display">
                  ({matchState.teamA.overs} Ovs)
                </p>
              </div>
            </div>

            {/* VS Divider & Simulator Button */}
            <div className="md:col-span-2 text-center space-y-2">
              <span className="font-display text-2xl font-black text-slate-500">VS</span>
              <div>
                <button
                  onClick={handleSimulateBall}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 active:scale-95 flex items-center gap-1.5 mx-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Next Ball</span>
                </button>
              </div>
            </div>

            {/* Team B (Strikers) */}
            <div className="md:col-span-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bowling Team</p>
                <h3 className="text-lg sm:text-xl font-black text-white">{matchState.teamB.name}</h3>
                <p className="text-xs text-slate-400">1st Innings: {matchState.teamB.overs} Ovs</p>
              </div>
              <div className="text-right">
                <p className="font-display text-4xl sm:text-5xl font-black text-slate-300">
                  {matchState.teamB.score}
                </p>
                <p className="text-xs text-emerald-400 font-bold">
                  {matchState.teamB.target}
                </p>
              </div>
            </div>

          </div>

          {/* Recent Over Strip */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider shrink-0">
              Current Over:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto">
              {matchState.recentBalls.map((b, i) => (
                <span
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-md border ${
                    b === '6'
                      ? 'bg-purple-600 text-white border-purple-400 animate-bounce'
                      : b === '4'
                      ? 'bg-blue-600 text-white border-blue-400'
                      : b === 'W'
                      ? 'bg-rose-600 text-white border-rose-400'
                      : 'bg-slate-800 text-white border-slate-700'
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
            <span className="text-slate-500 text-[11px] hidden sm:inline">
              Click 'Next Ball' to advance match simulation
            </span>
          </div>
        </div>

        {/* Tab Controls & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Batsmen & Bowler Performance Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Batsmen Table */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
              <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Live Crease Status
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                      <th className="pb-2">Batsman</th>
                      <th className="pb-2 text-right">R</th>
                      <th className="pb-2 text-right">B</th>
                      <th className="pb-2 text-right">4s</th>
                      <th className="pb-2 text-right">6s</th>
                      <th className="pb-2 text-right">SR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {matchState.currentBatsmen.map((bat, idx) => (
                      <tr key={idx} className={bat.isOnStrike ? 'bg-red-950/20' : ''}>
                        <td className="py-3 flex items-center gap-1.5 font-bold text-white">
                          <span>{bat.name}</span>
                          {bat.isOnStrike && (
                            <span className="text-amber-400 text-xs">🏏*</span>
                          )}
                        </td>
                        <td className="py-3 text-right font-display text-lg font-black text-amber-300">
                          {bat.runs}
                        </td>
                        <td className="py-3 text-right text-slate-400">{bat.balls}</td>
                        <td className="py-3 text-right text-slate-300">{bat.fours}</td>
                        <td className="py-3 text-right text-slate-300">{bat.sixes}</td>
                        <td className="py-3 text-right text-emerald-400 font-bold">{bat.strikeRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bowler Details */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-400" />
                Active Bowler
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white text-sm">{matchState.currentBowler.name}</p>
                  <p className="text-slate-400 text-[11px]">Right-Arm Express Seam</p>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase">Overs</p>
                    <p className="font-bold text-white">{matchState.currentBowler.overs}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase">Runs</p>
                    <p className="font-bold text-white">{matchState.currentBowler.runs}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase">Wkts</p>
                    <p className="font-bold text-red-400 font-display text-lg">{matchState.currentBowler.wickets}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase">Econ</p>
                    <p className="font-bold text-emerald-400">{matchState.currentBowler.economy}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Interactive Wagon Wheel Analyzer */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-5 border border-red-500/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-emerald-400" />
                360° Wagon Wheel Scoring Zones
              </span>
              <span className="text-[10px] text-amber-400 font-bold">
                Rohan Shanmukha (76*)
              </span>
            </div>

            {/* Wagon Wheel Visual Circular Chart */}
            <div className="relative w-full h-[280px] bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-center p-4">
              {/* Outer boundary circle */}
              <div className="w-56 h-56 rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center relative">
                
                {/* Center Pitch Marker */}
                <div className="w-4 h-8 bg-amber-500/80 rounded-sm z-10 shadow-lg shadow-amber-500/50" />

                {/* Wagon Wheel Rays / Radii */}
                {matchState.wagonWheelZones.map((zone, idx) => {
                  const angle = (idx / matchState.wagonWheelZones.length) * 360;
                  return (
                    <div
                      key={zone.zone}
                      onClick={() => setSelectedZone(zone.zone)}
                      className={`absolute w-24 h-0.5 origin-left cursor-pointer transition-all duration-300 hover:h-1.5 ${
                        selectedZone === zone.zone ? 'bg-amber-400 h-1.5' : 'bg-red-500/70'
                      }`}
                      style={{
                        transform: `rotate(${angle}deg)`,
                        left: '50%',
                        top: '50%',
                      }}
                    >
                      <span
                        className="absolute right-0 -top-5 text-[9px] font-extrabold text-white bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700 whitespace-nowrap"
                        style={{ transform: `rotate(-${angle}deg)` }}
                      >
                        {zone.runs}r ({zone.percentage}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scoring Zone Breakdown List */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Run Distribution by Region:
              </p>
              <div className="space-y-1.5">
                {matchState.wagonWheelZones.map((zone) => (
                  <div
                    key={zone.zone}
                    onClick={() => setSelectedZone(zone.zone)}
                    className={`p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-all border ${
                      selectedZone === zone.zone
                        ? 'bg-amber-950/40 border-amber-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <span className="font-semibold">{zone.zone}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-amber-400 font-bold">{zone.runs} Runs</span>
                      <span className="text-slate-400 text-[10px]">({zone.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
