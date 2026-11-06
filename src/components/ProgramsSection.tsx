import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Check, 
  Sparkles, 
  Clock, 
  Calendar, 
  Users, 
  Zap, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import { PROGRAMS_DATA } from '../data/mockData';
import { TrainingProgram } from '../types';

interface ProgramsSectionProps {
  onSelectProgram: (program: TrainingProgram) => void;
  onOpenBooking: () => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSelectProgram,
  onOpenBooking,
}) => {
  const [programs, setPrograms] = useState<TrainingProgram[]>(() => {
    try {
      const saved = localStorage.getItem('shanmukha_academy_programs_custom_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return PROGRAMS_DATA;
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem('shanmukha_academy_programs_custom_v1');
        if (saved) setPrograms(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <section id="programs" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Structured Coaching Curriculums</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Championship Pathways for <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">Every Age & Skill</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From foundational hand-eye coordination for 6-year-olds to high-intensity Ranji Trophy & IPL trial preparation.
          </p>
        </div>

        {/* Programs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => {
            const isPopular = prog.popular;

            return (
              <div
                key={prog.id}
                className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-red-950/40 border-2 border-red-500 shadow-2xl shadow-red-600/20 lg:-translate-y-2'
                    : 'glass-card glass-card-hover border border-slate-800'
                }`}
              >
                {/* Popular Badge */}
                {prog.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg ${
                        isPopular
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border border-red-300'
                          : 'bg-slate-800 text-amber-300 border border-slate-700'
                      }`}
                    >
                      {prog.badge}
                    </span>
                  </div>
                )}

                {/* Card Top */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-800/80 text-amber-300 border border-slate-700">
                      {prog.ageGroup}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {prog.level}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white leading-tight">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {prog.tagline}
                    </p>
                  </div>

                  {/* Fee Display */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl font-black text-white">
                        ₹{prog.monthlyFee.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ month</span>
                    </div>
                    <p className="text-[10px] text-emerald-400 font-semibold">
                      ₹{prog.quarterlyFee.toLocaleString('en-IN')} / quarter (Save 10%)
                    </p>
                  </div>

                  {/* Schedule Details */}
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="text-[11px]">{prog.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-[11px]">{prog.duration}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Included in Program:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {prog.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="text-[11px] leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Button */}
                <div className="pt-6">
                  <button
                    onClick={() => onSelectProgram(prog)}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer ${
                      isPopular
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>Enroll / Book Free Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 p-6 rounded-3xl glass-card border border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                100% Free Initial Assessment & Trial Session
              </h4>
              <p className="text-xs text-slate-400">
                Meet Coach Shanmukha, get your batting/bowling speed measured, and receive a customized roadmap before enrolling.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/20 shrink-0 cursor-pointer"
          >
            Claim Free Assessment
          </button>
        </div>

      </div>
    </section>
  );
};
