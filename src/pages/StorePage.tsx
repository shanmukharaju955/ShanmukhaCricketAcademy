import React from 'react';
import { ShoppingBag, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { AcademyStore } from '../components/AcademyStore';

interface StorePageProps {
  onNavigateHome: () => void;
  onOpenBooking: () => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  onNavigateHome,
  onOpenBooking,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageHeader
        title="Official Academy Pro Store & Kit Hub"
        subtitle="Match-grade English Willow cricket bats, BCCI compliant moisture-wicking jerseys, titanium helmets, high-rebound leather balls, and premium kit bags tested by Ranji stars."
        badge="Pro Grade Cricket Gear"
        badgeColor="text-purple-400 border-purple-500/30 bg-purple-500/10"
        onNavigateHome={onNavigateHome}
      >
        <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
          <Truck className="w-4 h-4 text-amber-400" />
          <span>Pan-India Delivery & Academy Locker Pickup</span>
        </div>
      </PageHeader>

      <main>
        <AcademyStore
          onOpenBooking={onOpenBooking}
        />
      </main>
    </div>
  );
};
