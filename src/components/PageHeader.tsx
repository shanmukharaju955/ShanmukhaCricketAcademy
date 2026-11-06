import React from 'react';
import { ChevronRight, Home, Sparkles } from 'lucide-react';
import { PageRoute } from '../types/navigation';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  onNavigateHome: () => void;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge = 'Shanmukha Cricket Academy',
  badgeColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  onNavigateHome,
  children
}) => {
  return (
    <div className="relative pt-32 pb-12 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-amber-300 font-bold">{title}</span>
        </div>

        {/* Title & Badge */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            {badge && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border mb-3 ${badgeColor}`}>
                <Sparkles className="w-3.5 h-3.5" />
                {badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-display">
              {title}
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>
          </div>

          {children && (
            <div className="flex-shrink-0 flex items-center gap-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
