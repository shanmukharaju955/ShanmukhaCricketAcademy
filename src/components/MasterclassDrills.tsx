import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Clock, 
  Sparkles, 
  Flame,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { DRILLS_DATA } from '../data/mockData';
import { Drill } from '../types';

export const MasterclassDrills: React.FC = () => {
  const [selectedDrill, setSelectedDrill] = useState<Drill>(DRILLS_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Batting' | 'Bowling' | 'Fielding'>('All');
  
  // Drill Rep / Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(selectedDrill.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setTimerSeconds(selectedDrill.durationMinutes * 60);
    setIsTimerRunning(false);
    setCompletedSteps({});
  }, [selectedDrill]);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const filteredDrills = activeCategory === 'All' 
    ? DRILLS_DATA 
    : DRILLS_DATA.filter((d) => d.category === activeCategory);

  return (
    <section id="drills" className="py-20 bg-slate-900/60 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>SCA Digital Playbook & Masterclasses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Professional <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-red-400 bg-clip-text text-transparent">Drills & Technique Vault</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Master the exact technical routines practiced daily by our state-level and Ranji Trophy cadets.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {(['All', 'Batting', 'Bowling', 'Fielding'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-400'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Drill Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Drill Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Curated Video Drills:
            </p>
            <div className="space-y-2.5">
              {filteredDrills.map((drill) => (
                <button
                  key={drill.id}
                  onClick={() => setSelectedDrill(drill)}
                  className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center justify-between ${
                    selectedDrill.id === drill.id
                      ? 'bg-slate-800/90 border-red-500 shadow-xl shadow-red-500/20 text-white'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-red-950/80 text-red-300 border border-red-500/30">
                        {drill.category}
                      </span>
                      <span className="text-[10px] text-amber-400 font-semibold">
                        {drill.difficulty}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {drill.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {drill.durationMinutes} mins • {drill.reps}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      selectedDrill.id === drill.id ? 'text-red-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Active Drill Interactive Guide */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 border border-red-500/30 shadow-2xl space-y-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
            
            {/* Header with Rep Timer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedDrill.category} Masterclass
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Difficulty: <strong className="text-white">{selectedDrill.difficulty}</strong>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {selectedDrill.title}
                </h3>
                <p className="text-xs text-emerald-400 font-semibold mt-1">
                  🎯 Target Skill: {selectedDrill.targetSkill}
                </p>
              </div>

              {/* Interactive Drill Timer Widget */}
              <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Drill Timer</p>
                  <p className="font-display text-2xl font-black text-amber-400">
                    {formatTime(timerSeconds)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`p-2.5 rounded-xl font-bold text-white transition-all shadow-md ${
                      isTimerRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-red-600 hover:bg-red-500'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(selectedDrill.durationMinutes * 60);
                    }}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Equipment Required */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                Required Equipment:
              </span>
              {selectedDrill.equipment.map((eq, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 border border-slate-800 font-medium text-[11px]"
                >
                  {eq}
                </span>
              ))}
            </div>

            {/* Step-by-Step Execution Sequence */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Execution Steps ({selectedDrill.steps.length} Steps):</span>
                <span className="text-[11px] text-slate-400 font-normal">Check off each step as you complete reps</span>
              </p>

              <div className="space-y-2">
                {selectedDrill.steps.map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      completedSteps[idx]
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                        completedSteps[idx]
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border-slate-700'
                      }`}
                    >
                      {completedSteps[idx] ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : idx + 1}
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${completedSteps[idx] ? 'line-through opacity-80' : ''}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coaching Tips & Common Mistakes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Key Coaching Cue
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {selectedDrill.keyCoachingPoint}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                <p className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" /> Common Fatal Flaw
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {selectedDrill.commonMistake}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
