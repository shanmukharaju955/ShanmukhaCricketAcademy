import React from 'react';
import { Phone, MapPin, Clock, Calendar, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { EnquiryAndContact } from '../components/EnquiryAndContact';
import { ACADEMY_INFO } from '../data/mockData';

interface ContactPageProps {
  onNavigateHome: () => void;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onOpenBooking,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageHeader
        title="Contact Academy & Schedule Visit"
        subtitle="Get in touch with our admissions desk, speak directly with Senior Coach Shanmukha, or schedule a free assessment session at our floodlit cricket complex."
        badge="Admissions Desk Open"
        badgeColor="text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
        onNavigateHome={onNavigateHome}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`tel:${ACADEMY_INFO.phone}`}
            className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {ACADEMY_INFO.phone}</span>
          </a>
          <a
            href={`tel:${ACADEMY_INFO.altPhone}`}
            className="px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call: {ACADEMY_INFO.altPhone}</span>
          </a>
        </div>
      </PageHeader>

      <main>
        <EnquiryAndContact />
      </main>
    </div>
  );
};
