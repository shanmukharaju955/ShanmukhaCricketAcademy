import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  ShieldCheck, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { ALUMNI_TESTIMONIALS, FAQS } from '../data/mockData';

export const TestimonialsAndAlumni: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-900/40 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: Alumni & Wall of Fame */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Proven Track Record of Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            SCA Cadets on the <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-red-400 bg-clip-text text-transparent">National Stage</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Over 42 state selections, 14 Ranji Trophy & Vijay Hazare debutants, and countless tournament champions since 2012.
          </p>
        </div>

        {/* Alumni Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {ALUMNI_TESTIMONIALS.map((alumni) => (
            <div
              key={alumni.id}
              className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group shadow-xl"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-red-500/40" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{alumni.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <img
                  src={alumni.avatar}
                  alt={alumni.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/60 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {alumni.name}
                  </h4>
                  <p className="text-[11px] text-amber-400 font-semibold truncate">
                    {alumni.achievement}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {alumni.role} • Batch of {alumni.yearEnrolled}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Got Questions?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-sm font-bold text-white hover:text-amber-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
