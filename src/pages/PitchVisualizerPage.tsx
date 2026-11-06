import React from 'react';
import { Target, Calendar, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { InteractivePitchVisualizer } from '../components/InteractivePitchVisualizer';

interface PitchVisualizerPageProps {
  onNavigateHome: () => void;
  onOpenBooking: () => void;
}

export const PitchVisualizerPage: React.FC<PitchVisualizerPageProps> = ({
  onNavigateHome,
  onOpenBooking,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageHeader
        title="Hawk-Eye 3D Pitch Radar & Fielding Studio"
        subtitle="Explore interactive cricket pitch physics, line and length release coordinates, delivery swing vectors, wagon wheel telemetry, and custom fielding placements across red soil and black soil surfaces."
        badge="Interactive 3D Visualizer"
        badgeColor="text-amber-400 border-amber-500/30 bg-amber-500/10"
        onNavigateHome={onNavigateHome}
      >
        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Turf Match Net</span>
        </button>
      </PageHeader>

      <main>
        <InteractivePitchVisualizer />
      </main>
    </div>
  );
};
