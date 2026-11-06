import React from 'react';
import { 
  Building2, 
  Check, 
  Sparkles, 
  Zap, 
  Calendar, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { FACILITIES_DATA } from '../data/mockData';
import { TiltCard } from './TiltCard';

interface FacilitiesShowcaseProps {
  onOpenBooking: () => void;
}

export const FacilitiesShowcase: React.FC<FacilitiesShowcaseProps> = ({
  onOpenBooking,
}) => {
  return (
    <section id="facilities" className="py-20 bg-slate-900/40 relative overflow-hidden border-t border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Olympic & BCCI Level Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            World-Class <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-red-400 bg-clip-text text-transparent">Training Complex</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Equipped with 8 match-curated turf wickets, electronic bowling machines, 240FPS high-speed video capture, and high-performance recovery facilities.
          </p>
        </div>

        {/* 3D Tilt Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES_DATA.map((fac) => (
            <TiltCard
              key={fac.id}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 hover:border-red-500/40 shadow-2xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Image Banner */}
                <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 border border-slate-800 shadow-lg">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Tag Badge */}
                  <div className="absolute top-3 left-3 bg-red-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-red-500/40 text-[11px] font-extrabold text-red-200 uppercase tracking-wider">
                    {fac.tag}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                    {fac.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-400">
                    {fac.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {fac.description}
                  </p>
                </div>

                {/* Specs List */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Technical Specifications:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {fac.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-[11px]">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all border border-slate-700 hover:border-red-500/40 flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-red-400" />
                  <span>Reserve Turf Net / Facility Slot</span>
                </button>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
