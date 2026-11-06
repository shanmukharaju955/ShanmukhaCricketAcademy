import React from 'react';
import { Trophy, Calendar, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ProgramsSection } from '../components/ProgramsSection';
import { FeeCalculator } from '../components/FeeCalculator';
import { PageRoute } from '../types/navigation';
import { TrainingProgram } from '../types';

interface ProgramsPageProps {
  onNavigateHome: () => void;
  onOpenBooking: () => void;
  onSelectProgram: (program: TrainingProgram) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigateHome,
  onOpenBooking,
  onSelectProgram,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Page Header */}
      <PageHeader
        title="Coaching Programs & Fee Structure"
        subtitle="Year-round professional cricket coaching tracks structured by age, skill grade, and competitive ambitions. From foundational junior batches to Ranji Trophy & IPL preparation."
        badge="Admissions 2026 Open"
        badgeColor="text-red-400 border-red-500/30 bg-red-500/10"
        onNavigateHome={onNavigateHome}
      >
        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Free Trial Net</span>
        </button>
      </PageHeader>

      {/* Main Programs Section */}
      <main>
        <ProgramsSection
          onSelectProgram={onSelectProgram}
          onOpenBooking={onOpenBooking}
        />

        {/* Dynamic Interactive Fee Calculator */}
        <FeeCalculator
          onOpenBooking={onOpenBooking}
        />
      </main>
    </div>
  );
};
