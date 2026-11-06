import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Lock,
  ArrowUp,
  GraduationCap
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AICoachChat } from './components/AICoachChat';
import { NetBookingModal } from './components/NetBookingModal';
import { UnifiedPortalModal } from './components/UnifiedPortalModal';
import { PageRoute } from './types/navigation';
import { TrainingProgram } from './types';

// Dedicated Sub-Pages
import { HomePage } from './pages/HomePage';
import { ProgramsPage } from './pages/ProgramsPage';
import { AIHubPage } from './pages/AIHubPage';
import { PitchVisualizerPage } from './pages/PitchVisualizerPage';
import { MatchCenterPage } from './pages/MatchCenterPage';
import { StorePage } from './pages/StorePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Parse initial route from URL hash
  const parseRouteFromHash = (): PageRoute => {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (hash === 'portal' || hash === 'login' || hash === 'admin' || hash === 'student') {
      setIsPortalOpen(true);
      return 'home';
    }

    const validRoutes: PageRoute[] = [
      'home',
      'programs',
      'ai-hub',
      'pitch',
      'matches',
      'store',
      'about',
      'contact'
    ];
    if (validRoutes.includes(hash as PageRoute)) {
      return hash as PageRoute;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageRoute>(parseRouteFromHash);

  // Sync route with browser hash and Back/Forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
      if (hash === 'portal' || hash === 'login' || hash === 'admin' || hash === 'student') {
        setIsPortalOpen(true);
        return;
      }
      const route = parseRouteFromHash();
      setCurrentPage(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scroll for "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentPage(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProgram = (program: TrainingProgram) => {
    setSelectedProgram(program);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-600 selection:text-white relative">
      
      {/* Universal Topbar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenBooking={() => setIsBookingModalOpen(true)}
        onOpenAICoach={() => setIsAICoachOpen(true)}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Dynamic Page Content */}
      <div className="relative">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenBooking={() => setIsBookingModalOpen(true)}
            onOpenAICoach={() => setIsAICoachOpen(true)}
            onSelectProgram={handleSelectProgram}
          />
        )}

        {currentPage === 'programs' && (
          <ProgramsPage
            onNavigateHome={() => navigateTo('home')}
            onOpenBooking={() => setIsBookingModalOpen(true)}
            onSelectProgram={handleSelectProgram}
          />
        )}

        {currentPage === 'ai-hub' && (
          <AIHubPage
            onNavigateHome={() => navigateTo('home')}
            onOpenAICoach={() => setIsAICoachOpen(true)}
          />
        )}

        {currentPage === 'pitch' && (
          <PitchVisualizerPage
            onNavigateHome={() => navigateTo('home')}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {currentPage === 'matches' && (
          <MatchCenterPage
            onNavigateHome={() => navigateTo('home')}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {currentPage === 'store' && (
          <StorePage
            onNavigateHome={() => navigateTo('home')}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigateHome={() => navigateTo('home')}
            onOpenBooking={() => setIsBookingModalOpen(true)}
            onOpenAICoach={() => setIsAICoachOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigateHome={() => navigateTo('home')}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}
      </div>

      {/* Universal Footer */}
      <Footer
        onOpenBooking={() => setIsBookingModalOpen(true)}
        onOpenAICoach={() => setIsAICoachOpen(true)}
        onNavigate={navigateTo}
      />

      {/* Floating Bottom Action Buttons */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsPortalOpen(true)}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-900 text-amber-300 font-extrabold text-xs uppercase tracking-wider shadow-2xl shadow-slate-950/80 hover:scale-105 active:scale-95 transition-all border border-amber-500/40 backdrop-blur-md cursor-pointer"
          title="Student Cadet & Admin Portal"
        >
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline font-black">Student & Admin Portal</span>
          <span className="sm:hidden font-black">Portal</span>
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => setIsAICoachOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition-all border border-amber-300/40 cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-5 h-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="hidden sm:inline font-bold">Ask Coach Shanmukha AI</span>
          <span className="sm:hidden font-bold">AI Coach</span>
        </button>
      </div>

      {/* Unified Cadet & Admin Portal Modal */}
      <UnifiedPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        onOpenBooking={() => {
          setIsPortalOpen(false);
          setIsBookingModalOpen(true);
        }}
        onOpenAICoach={() => {
          setIsPortalOpen(false);
          setIsAICoachOpen(true);
        }}
      />

      {/* AI Coach Assistant Modal */}
      <AICoachChat
        isOpen={isAICoachOpen}
        onClose={() => setIsAICoachOpen(false)}
      />

      {/* Net Booking & Assessment Modal */}
      <NetBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

    </div>
  );
}

export default App;
