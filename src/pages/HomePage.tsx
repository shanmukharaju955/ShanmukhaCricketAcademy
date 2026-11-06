import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Calendar, 
  Bot, 
  Play, 
  Users, 
  Award, 
  Flame, 
  ChevronRight,
  ArrowRight,
  Clock,
  Compass,
  Cpu,
  ShoppingBag,
  Video,
  Target
} from 'lucide-react';
import { Hero3DBall } from '../components/Hero3DBall';
import { TestimonialsAndAlumni } from '../components/TestimonialsAndAlumni';
import { PageRoute } from '../types/navigation';
import { TrainingProgram } from '../types';
import { PROGRAMS_DATA } from '../data/mockData';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenBooking: () => void;
  onOpenAICoach: () => void;
  onSelectProgram: (program: TrainingProgram) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenAICoach,
  onSelectProgram,
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

  const featuredPrograms = programs.slice(0, 3);

  return (
    <div className="relative">
      {/* 1. Hero Section with 3D Interactive Cricket Ball Physics */}
      <Hero3DBall
        onOpenBooking={onOpenBooking}
        onOpenAICoach={onOpenAICoach}
      />

      {/* Quick Highlights Counter Bar */}
      <section className="bg-slate-900 border-y border-slate-800 py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-2 md:pt-0">
              <p className="font-display text-4xl sm:text-5xl font-black text-amber-400">14+</p>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mt-1">Years of Legacy</p>
              <p className="text-[11px] text-slate-400">Established in 2012</p>
            </div>

            <div className="pt-2 md:pt-0">
              <p className="font-display text-4xl sm:text-5xl font-black text-red-500">8</p>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mt-1">Turf Match Wickets</p>
              <p className="text-[11px] text-slate-400">Red & Black Soil Pitches</p>
            </div>

            <div className="pt-2 md:pt-0">
              <p className="font-display text-4xl sm:text-5xl font-black text-emerald-400">42+</p>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mt-1">State & Ranji Cadets</p>
              <p className="text-[11px] text-slate-400">KSCA League First Division</p>
            </div>

            <div className="pt-2 md:pt-0">
              <p className="font-display text-4xl sm:text-5xl font-black text-blue-400">100%</p>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mt-1">BCCI Certified Panel</p>
              <p className="text-[11px] text-slate-400">Level 2 & Level 3 Mentors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Portal Navigation Grid */}
      <section className="py-16 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Explore Academy Portals
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-display">
              Dedicated Training & Tech Hubs
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              Explore specialized portals designed for pro coaching, AI stroke diagnostics, interactive Hawk-Eye simulations, and official kit gear.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Programs & Fees */}
            <div 
              onClick={() => onNavigate('programs')}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-600/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Admissions 2026</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-red-400 transition-colors flex items-center justify-between">
                <span>Programs & Fees</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Junior grassroots to Ranji & IPL high-performance batches with instant tuition fee estimation.
              </p>
            </div>

            {/* Card 2: AI Hub */}
            <div 
              onClick={() => onNavigate('ai-hub')}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-600/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Gemini 3.7 AI</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>AI Biomechanics Hub</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Upload your stroke or bowling release for biomechanical ratings and custom 7-day drill schedules.
              </p>
            </div>

            {/* Card 3: Hawk-Eye Pitch */}
            <div 
              onClick={() => onNavigate('pitch')}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-600/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Interactive 3D</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>Hawk-Eye Pitch Radar</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Interactive pitch zones, bowling trajectory simulation, wagon wheels, and dynamic fielding placements.
              </p>
            </div>

            {/* Card 4: Matches & Drills */}
            <div 
              onClick={() => onNavigate('matches')}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-600/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">Telemetry & Video</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>Match Center & Drills</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Live tournament ball-by-ball scorecards, player wagon wheels, and 240FPS coach drill masterclasses.
              </p>
            </div>

            {/* Card 5: Pro Kit Store */}
            <div 
              onClick={() => onNavigate('store')}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-600/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">Official SCA Gear</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-purple-400 transition-colors flex items-center justify-between">
                <span>Academy Pro Store</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Custom English Willow bats, match jerseys, protective gear, and professional leather balls.
              </p>
            </div>

            {/* Card 6: About & Coaches */}
            <div 
              onClick={() => onNavigate('about')}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-600/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-600/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">Certified Panel</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-rose-400 transition-colors flex items-center justify-between">
                <span>About, Coaches & Turf</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Meet Founder Coach Shanmukha, BCCI Level 3 coaches, 8 floodlit turf nets, and media gallery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section Preview */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 mb-3">
                <Flame className="w-3.5 h-3.5" /> High Performance
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display">
                Featured Coaching Curriculums
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                BCCI certified coaching plans with video analysis, fitness training, and match simulations.
              </p>
            </div>

            <button
              onClick={() => onNavigate('programs')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs font-black uppercase tracking-wider transition-all"
            >
              <span>View All Programs & Fees</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => (
              <div 
                key={program.id}
                className="rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                      {program.level}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{program.ageGroup}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {program.tagline}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{program.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{program.features[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Monthly Tuition</span>
                    <p className="text-lg font-black text-amber-400">₹{program.monthlyFee.toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    onClick={() => onSelectProgram(program)}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 cursor-pointer"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Coach Floating Banner */}
      <section className="py-16 bg-gradient-to-r from-red-950 via-slate-950 to-amber-950 border-y border-red-500/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-3">
              <Bot className="w-3.5 h-3.5" /> 24/7 AI Cricket Assistant
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display tracking-tight">
              Get Instant Technique & Tactical Advice
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Powered by Coach Shanmukha's 18+ years of BCCI coaching insights and Google Gemini AI. Analyze bat grip, swing lines, spin revs, and match mindsets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenAICoach}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-2xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Chat with AI Coach</span>
            </button>
            <button
              onClick={() => onNavigate('ai-hub')}
              className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Explore AI Studio</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials & Alumni Spotlight */}
      <TestimonialsAndAlumni />

      {/* Final Call to Action */}
      <section className="py-20 bg-slate-950 text-center relative overflow-hidden border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
            Start Your Journey to the State & IPL Arena
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Book a complimentary technical assessment session with our BCCI Level 3 coaches. Experience our high-speed cameras, Bola bowling machines, and floodlit turf nets.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition-all"
            >
              Book Complimentary Assessment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider hover:border-slate-600 transition-all"
            >
              Visit Academy & Contact
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
