import React from 'react';
import { Users, Trophy, Sparkles, Building2, Image as ImageIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { CoachesShowcase } from '../components/CoachesShowcase';
import { FacilitiesShowcase } from '../components/FacilitiesShowcase';
import { AcademyGallery } from '../components/AcademyGallery';
import { TestimonialsAndAlumni } from '../components/TestimonialsAndAlumni';

interface AboutPageProps {
  onNavigateHome: () => void;
  onOpenBooking: () => void;
  onOpenAICoach: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onOpenBooking,
  onOpenAICoach,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageHeader
        title="About Academy, Faculty & Infrastructure"
        subtitle="Founded in 2012 by Coach Shanmukha, our academy is recognized across South India as an elite cricket finishing school producing IPL picks and KSCA First Division stalwarts."
        badge="14+ Years of Legacy"
        badgeColor="text-rose-400 border-rose-500/30 bg-rose-500/10"
        onNavigateHome={onNavigateHome}
      >
        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all flex items-center gap-2"
        >
          <Trophy className="w-4 h-4" />
          <span>Book Facility Tour</span>
        </button>
      </PageHeader>

      <main>
        {/* 1. BCCI Certified Mentors */}
        <CoachesShowcase
          onOpenBooking={onOpenBooking}
          onOpenAICoach={onOpenAICoach}
        />

        {/* 2. World-Class Infrastructure */}
        <FacilitiesShowcase
          onOpenBooking={onOpenBooking}
        />

        {/* 3. Media Gallery */}
        <AcademyGallery />

        {/* 4. Testimonials & Alumni */}
        <TestimonialsAndAlumni />
      </main>
    </div>
  );
};
