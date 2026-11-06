import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  Bot, 
  Phone, 
  Menu, 
  X, 
  Flame, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Activity, 
  Lock, 
  Target, 
  Cpu, 
  ShoppingBag, 
  Users, 
  Home, 
  GraduationCap
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/mockData';
import { PageRoute } from '../types/navigation';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenBooking: () => void;
  onOpenAICoach: () => void;
  onOpenPortal: () => void;
}

interface NavItem {
  id: PageRoute;
  name: string;
  badge?: string;
  icon: React.ElementType;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenAICoach,
  onOpenPortal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavItem[] = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'programs', name: 'Programs & Fees', badge: '2026', icon: Trophy },
    { id: 'ai-hub', name: 'AI Hub', badge: 'AI', icon: Cpu },
    { id: 'pitch', name: 'Hawk-Eye 3D', icon: Target },
    { id: 'matches', name: 'Match Center', icon: Activity },
    { id: 'store', name: 'Pro Store', icon: ShoppingBag },
    { id: 'about', name: 'About & Coaches', icon: Users },
    { id: 'contact', name: 'Contact', icon: Phone },
  ];

  const handleLinkClick = (id: PageRoute) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Flash Bar */}
      <div className="bg-gradient-to-r from-red-800 via-rose-700 to-amber-700 text-white text-xs font-semibold py-1.5 px-4 hidden md:flex items-center justify-between border-b border-red-500/30">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-red-950 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] animate-pulse">
              Admissions 2026
            </span>
            <span className="text-red-100">
              State & IPL Prep Trials | 8 Floodlit Turf Nets & 240FPS Biomechanics Hub
            </span>
          </div>
          <div className="flex items-center gap-4 text-red-100 text-xs">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300" /> Mon-Sun: 6:00 AM – 9:30 PM
            </span>
            <div className="flex items-center gap-2">
              <a 
                href={`tel:${ACADEMY_INFO.phone}`} 
                className="flex items-center gap-1 hover:text-white transition-colors underline font-medium"
                title="Call Senior Coach Shanmukha"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" /> {ACADEMY_INFO.phone}
              </a>
              <span className="text-red-300/60">•</span>
              <a 
                href={`tel:${ACADEMY_INFO.altPhone}`} 
                className="hover:text-white transition-colors underline font-medium"
                title="Call Academy Admissions Desk"
              >
                {ACADEMY_INFO.altPhone}
              </a>
            </div>
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
              title="Student & Admin Portal Sign In"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Student & Admin Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-md shadow-2xl border-b border-red-600/20 py-2.5'
            : 'bg-gradient-to-b from-slate-950/95 to-slate-950/80 backdrop-blur-md py-3.5 border-b border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => handleLinkClick('home')} 
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 via-rose-700 to-amber-600 p-0.5 shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-display text-2xl font-black bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    SCA
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                <ShieldCheck className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase group-hover:text-red-400 transition-colors">
                  Shanmukha
                </span>
                <span className="text-xs px-1.5 py-0.5 bg-red-600/30 border border-red-500/40 text-red-300 rounded font-bold uppercase tracking-wider hidden sm:inline-block">
                  Cricket Academy
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                BCCI Certified Elite Coaching Hub
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-red-600/20 border border-red-500/40 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-red-600/30 text-red-300 border border-red-500/30'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-red-500 to-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              title="Student Cadet & Admin Portal"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Portal Login</span>
            </button>

            <button
              onClick={onOpenAICoach}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all shadow-md hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>AI Coach</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 active:scale-95 border border-red-400/30 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Slot</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenPortal}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" /> Portal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => {
                  onOpenPortal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-slate-950 font-black text-xs uppercase shadow-md cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" /> Student & Admin
              </button>
              <button
                onClick={() => {
                  onOpenAICoach();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 bg-amber-950/40 border border-amber-500/30 rounded-xl text-amber-300 font-bold text-xs cursor-pointer"
              >
                <Bot className="w-4 h-4" /> AI Coach
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-600/20 text-white border border-red-500/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-slate-500'}`} />
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-red-600/30 text-red-300">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Book Turf Net / Bowling Machine Slot
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
