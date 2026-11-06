import React from 'react';
import { 
  Trophy, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Heart,
  Sparkles,
  Bot,
  Activity,
  Calendar
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/mockData';
import { PageRoute } from '../types/navigation';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAICoach: () => void;
  onOpenAIAnalyzer?: () => void;
  onNavigate?: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenAICoach,
  onNavigate,
}) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (route: PageRoute) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs relative overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Ready to elevate your game?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Join Shanmukha Cricket Academy Today
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Trial sessions available daily on our international-grade turf wickets.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAICoach}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold border border-amber-500/40 text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>Ask AI Coach</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 cursor-pointer"
            >
              Book Net Slot / Trial
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 p-0.5 shadow-lg shadow-red-600/30 flex items-center justify-center">
                <span className="font-display text-2xl font-black text-white">SCA</span>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white uppercase tracking-tight">
                  Shanmukha
                </span>
                <span className="text-xs font-bold text-red-400 ml-1">Cricket Academy</span>
                <p className="text-[10px] text-slate-400 font-medium">BCCI Level 3 High-Performance Center</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Founded by Coach Shanmukha, SCA is dedicated to crafting complete cricketers through world-class turf infrastructure, electronic bowling machines, and video biomechanics.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Affiliated with State Association & League Circuit</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Academy Portals
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-red-400 transition-colors text-left cursor-pointer">
                  Home (3D Ball)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="hover:text-red-400 transition-colors text-left cursor-pointer">
                  Programs & Fees
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ai-hub')} className="hover:text-red-400 transition-colors text-left cursor-pointer">
                  AI Biomechanics Hub
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pitch')} className="hover:text-red-400 transition-colors text-left cursor-pointer">
                  Hawk-Eye 3D Pitch
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('matches')} className="hover:text-red-400 transition-colors text-left cursor-pointer">
                  Match Center & Drills
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('store')} className="hover:text-red-400 transition-colors text-left cursor-pointer">
                  Pro Kit Store
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Facilities */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              About & Facilities
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  BCCI Coaching Panel
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  8 Floodlit Turf Nets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Media & Video Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Interactive Fee Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Admissions & Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Academy Office
            </p>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-snug">{ACADEMY_INFO.address}</p>
              <div className="space-y-1">
                <a href={`tel:${ACADEMY_INFO.phone}`} className="text-amber-300 font-bold hover:underline flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> {ACADEMY_INFO.phone}
                </a>
                <a href={`tel:${ACADEMY_INFO.altPhone}`} className="text-amber-200/90 font-bold hover:underline flex items-center gap-1.5 text-[11px]">
                  <Phone className="w-3.5 h-3.5 opacity-60" /> {ACADEMY_INFO.altPhone}
                </a>
              </div>
              <p className="text-slate-400">{ACADEMY_INFO.email}</p>
              <p className="text-emerald-400 font-semibold">Open 7 Days a Week (6 AM – 9:30 PM)</p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>
            © <span id="year">{currentYear}</span> Shanmukha Cricket Academy. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with cricketing passion & AI technology for champions.
          </p>
        </div>
      </div>
    </footer>
  );
};
