import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Star, 
  ShieldCheck, 
  Users, 
  Calendar, 
  Sparkles, 
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { COACHES_DATA } from '../data/mockData';
import { Coach } from '../types';
import { TiltCard } from './TiltCard';

interface CoachesShowcaseProps {
  onOpenBooking: () => void;
  onOpenAICoach: () => void;
}

const LOCAL_STORAGE_KEY = 'shanmukha_academy_coaches_custom_v1';

export const CoachesShowcase: React.FC<CoachesShowcaseProps> = ({
  onOpenBooking,
  onOpenAICoach,
}) => {
  const [coaches, setCoaches] = useState<Coach[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to mock
    }
    return COACHES_DATA;
  });

  // Keep coaches synced if updated in Admin Portal
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          setCoaches(JSON.parse(saved));
        }
      } catch (err) {
        console.warn(err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section id="coaches" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Master Tacticians & Mentors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Elite <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">BCCI & ICC Certified</span> Coaching Panel
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Learn under ex-First Class players, National Cricket Academy specialists, and certified sports biomechanists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% BCCI Certified Faculty</span>
            </div>
          </div>
        </div>

        {/* 3D Tilt Coach Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((coach) => (
            <TiltCard
              key={coach.id}
              className="glass-card rounded-3xl p-5 border border-red-500/20 shadow-2xl flex flex-col justify-between group hover:border-red-500/50"
            >
              <div className="space-y-4">
                
                {/* Coach Portrait with Badges */}
                <div className="relative rounded-2xl overflow-hidden h-64 border border-slate-800 shadow-lg group/img">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Founder Badge */}
                  {coach.id === 'coach-shanmukha' && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-1 rounded-full border border-amber-300 text-[10px] font-black text-slate-950 uppercase tracking-wider shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-slate-950" />
                      <span>Founder & CEO</span>
                    </div>
                  )}

                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/40 flex items-center gap-1 text-[11px] font-bold text-amber-300 shadow-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{coach.rating}</span>
                  </div>

                  {/* Experience Tag */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] text-slate-300 font-semibold">
                    {coach.experience} Experience
                  </div>
                </div>

                {/* Coach Name & Designation */}
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-400 mt-0.5">
                    {coach.role}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{coach.certification}</span>
                  </p>
                </div>

                {/* Bio Snippet */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {coach.bio}
                </p>

                {/* Specializations Tags */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Specializations:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {coach.specialty.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Career Highlights */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Career Milestones:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {coach.careerHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] leading-tight">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 space-y-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book 1-on-1 Session</span>
                </button>
                {coach.id === 'coach-shanmukha' && (
                  <button
                    onClick={onOpenAICoach}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Chat with AI Coach</span>
                  </button>
                )}
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
