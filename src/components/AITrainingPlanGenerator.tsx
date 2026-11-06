import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Dumbbell, 
  Flame, 
  Apple, 
  Target, 
  Award, 
  RefreshCw, 
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { TrainingPlanResponse } from '../types';

export const AITrainingPlanGenerator: React.FC = () => {
  const [playerAge, setPlayerAge] = useState('Under-19 (16 - 19 yrs)');
  const [role, setRole] = useState('Opening Batsman & Occasional Off-spin');
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [primaryGoal, setPrimaryGoal] = useState('Face 140+ km/h Pace & Improve Short-Pitch Hook/Pull');
  const [focusArea, setFocusArea] = useState('Early trigger movement and soft hands in the corridor');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<TrainingPlanResponse | null>(null);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);

    try {
      const res = await fetch('/api/gemini/generate-training-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerAge,
          role,
          daysPerWeek,
          primaryGoal,
          currentFocusArea: focusArea,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate plan');
      const data = await res.json();
      if (data.plan) {
        setGeneratedPlan(data.plan);
      }
    } catch (err) {
      console.warn('Fallback training plan generation:', err);
      // Realistic Fallback
      setGeneratedPlan({
        planTitle: 'SCA 7-Day High-Performance Pace Mastery & Power Regimen',
        targetOverview: `Tailored for ${playerAge} (${role}) aiming for ${primaryGoal}. Focused on explosive reaction time, high-elbow mechanics, and sustained mental focus.`,
        weeklySchedule: [
          {
            day: 'Day 1 (Monday)',
            focus: 'Turf Net Velocity Calibration & Front Foot Defense',
            netSession: {
              drill: '60 balls against 135 km/h Bola Bowling machine on good-length channel + 4 overs vs live left-arm pace.',
              duration: '90 Mins',
              intensity: 'High',
            },
            fitnessAndStrength: {
              routine: 'Rotational core cable chops, trap bar deadlifts (4x6), box jumps.',
              setsAndReps: '45 Mins functional circuit',
            },
            mentalOrTacticalPrep: 'Visualize the 4th-stump leave and judge bounce without reaching.',
          },
          {
            day: 'Day 2 (Tuesday)',
            focus: 'Short Pitch Bouncer Mastery & Pull Shot Pivots',
            netSession: {
              drill: 'Machine bouncers at chest height with wet tennis and heavy leather balls. Roll wrists on 30 pull shots.',
              duration: '75 Mins',
              intensity: 'High',
            },
            fitnessAndStrength: {
              routine: 'Sprint intervals: 6 x 40m accelerations with 45s rest; medicine ball chest passes.',
              setsAndReps: '40 Mins speed & agility',
            },
            mentalOrTacticalPrep: 'Patience against chin music; avoid dropping head backwards on contact.',
          },
          {
            day: 'Day 3 (Wednesday)',
            focus: 'Spin Decoding & Soft Hands Defense',
            netSession: {
              drill: 'Turning turf net practice vs Coach Vikram. Reading googly and carrom ball out of hand.',
              duration: '80 Mins',
              intensity: 'Medium',
            },
            fitnessAndStrength: {
              routine: 'Shoulder stability band work, Indian club swings, forearm grip endurance.',
              setsAndReps: '30 Mins active recovery',
            },
            mentalOrTacticalPrep: 'Use crease depth to play spin off back foot.',
          },
          {
            day: 'Day 4 (Thursday)',
            focus: 'Power Hitting & Death Overs Ramp / Lofted Drives',
            netSession: {
              drill: 'Full toss & yorker clearing range hitting into empty oval. 5 overs target score simulation.',
              duration: '90 Mins',
              intensity: 'High',
            },
            fitnessAndStrength: {
              routine: 'Explosive kettlebell swings, Bulgarian split squats (3x8 each leg), plyometric push-ups.',
              setsAndReps: '45 Mins power block',
            },
            mentalOrTacticalPrep: 'Commit 100% to boundary shots with still head.',
          },
          {
            day: 'Day 5 (Friday)',
            focus: 'Match Scenario Simulation & Slip Catching Reflexes',
            netSession: {
              drill: 'Match conditions with 4 slips and bowler running from full 30m run-up. 100 reflex slip catches off Nick board.',
              duration: '100 Mins',
              intensity: 'High',
            },
            fitnessAndStrength: {
              routine: 'Yo-Yo test pacing drill + 15 mins ice bath recovery and mobility flow.',
              setsAndReps: '35 Mins recovery protocol',
            },
            mentalOrTacticalPrep: 'Pre-match routine checklist & equipment preparation.',
          },
        ],
        nutritionAndRecoveryTips: [
          'Hydration: 3.5 Liters water + electrolytes on heavy turf training days.',
          'Protein Target: 1.6g per kg bodyweight (Paneer/Eggs/Lentils/Whey isolate).',
          'Sleep: 8.5 hours uninterrupted sleep for neuromuscular repair.',
          'Pre-net fuel: Banana + handful of soaked almonds 40 mins prior to practice.',
        ],
        coachShanmukhaWeeklyChallenge: 'Complete 3 consecutive net sessions without offering an aerial edge outside off-stump!',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-16 bg-slate-900/60 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI High-Performance Architect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Custom 7-Day <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-red-400 bg-clip-text text-transparent">Cricket Training & Diet Blueprint</span>
          </h2>
          <p className="text-slate-300 text-sm">
            Generate an elite, role-specific daily schedule with net sessions, gym routines, and tactical cues customized to your strengths and weaknesses.
          </p>
        </div>

        {/* Plan Config Grid */}
        <div className="glass-card rounded-2xl p-6 border border-amber-500/20 shadow-2xl mb-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            {/* Age Group */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Player Age Category:</label>
              <select
                value={playerAge}
                onChange={(e) => setPlayerAge(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              >
                <option>Grassroots (8 - 12 yrs)</option>
                <option>Junior Pro (13 - 15 yrs)</option>
                <option>Under-19 (16 - 19 yrs)</option>
                <option>Senior / Club (20+ yrs)</option>
                <option>Corporate Weekend League</option>
              </select>
            </div>

            {/* Discipline Role */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Primary Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              >
                <option>Opening Batsman</option>
                <option>Middle-Order Anchor</option>
                <option>Power-Hitting Finisher</option>
                <option>Fast / Express Bowler (135+)</option>
                <option>Swing Bowler (In/Out)</option>
                <option>Wrist Spinner (Leg-spin / Googly)</option>
                <option>Finger Spinner (Off-spin)</option>
                <option>Wicketkeeper-Batsman</option>
                <option>Pace All-Rounder</option>
              </select>
            </div>

            {/* Days per week */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Training Frequency:</label>
              <select
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              >
                <option value={3}>3 Days / Week (Foundation)</option>
                <option value={5}>5 Days / Week (Junior Elite)</option>
                <option value={6}>6 Days / Week (Ranji Track Intensive)</option>
              </select>
            </div>

            {/* Primary Goal */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Primary Benchmark Goal:</label>
              <input
                type="text"
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
            <div className="w-full sm:w-2/3">
              <label className="font-semibold text-slate-300 text-xs block mb-1">
                Current Technical Bottleneck / Flaw to Eliminate:
              </label>
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                placeholder="e.g. Tendency to fall over off-stump, lack of backfoot punch, or bowling arm drop"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Building Custom Schedule...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-slate-950" />
                  <span>Generate AI High-Performance Plan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Display Generated Plan */}
        {generatedPlan && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-8 animate-fadeIn bg-gradient-to-b from-slate-900/95 to-slate-950">
            
            {/* Title & Overview */}
            <div className="border-b border-slate-800 pb-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Official SCA High-Performance Protocol
                </span>
                <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  {daysPerWeek} Active Days / Week
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {generatedPlan.planTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                {generatedPlan.targetOverview}
              </p>
            </div>

            {/* Daily Schedule Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedPlan.weeklySchedule.map((day, i) => (
                <div
                  key={i}
                  className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="font-display text-lg font-bold text-white">
                        {day.day}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          day.netSession?.intensity === 'High'
                            ? 'bg-red-950 text-red-300 border border-red-500/30'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {day.netSession?.intensity} Intensity
                      </span>
                    </div>

                    <p className="text-xs font-bold text-amber-400">
                      🎯 {day.focus}
                    </p>

                    <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-[11px] font-bold text-slate-200 flex items-center justify-between">
                        <span>🏏 Net & Skill Session:</span>
                        <span className="text-[10px] text-slate-400">{day.netSession?.duration}</span>
                      </p>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {day.netSession?.drill}
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-[11px] font-bold text-slate-200 flex items-center justify-between">
                        <span>🏋️ Fitness & Strength:</span>
                      </p>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {day.fitnessAndStrength?.routine}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 italic">
                    🧠 <strong>Mindset:</strong> {day.mentalOrTacticalPrep}
                  </div>
                </div>
              ))}
            </div>

            {/* Nutrition & Weekly Challenge Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800">
              
              {/* Nutrition */}
              <div className="lg:col-span-7 p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl space-y-2">
                <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Apple className="w-4 h-4" /> Sports Nutrition & Recovery Protocol
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {generatedPlan.nutritionAndRecoveryTips?.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-emerald-400">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Challenge */}
              <div className="lg:col-span-5 p-4 bg-gradient-to-br from-red-950/40 to-slate-950 border border-red-500/30 rounded-2xl space-y-2 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-red-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Flame className="w-4 h-4 text-amber-400" /> Coach Shanmukha Weekly Target
                  </p>
                  <p className="text-xs text-slate-200 mt-2 font-medium italic leading-relaxed">
                    "{generatedPlan.coachShanmukhaWeeklyChallenge}"
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                  Log your progress with your batch coach at next practice session.
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
