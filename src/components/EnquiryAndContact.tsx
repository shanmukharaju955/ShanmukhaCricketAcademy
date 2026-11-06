import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Calendar,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ACADEMY_INFO } from '../data/mockData';

export const EnquiryAndContact: React.FC = () => {
  const [formData, setFormData] = useState({
    parentOrPlayerName: '',
    phone: '',
    email: '',
    ageGroup: 'Junior (12-16 yrs)',
    primaryDiscipline: 'Batting / All-Rounder',
    preferredBatch: 'Evening Batch (4:30 PM - 7:00 PM)',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentOrPlayerName || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-800">
      {/* Ambience Background */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Visit Our Academy Complex</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Schedule a Free <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">Assessment & Trial Session</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Bring your cricket kit, step onto our turf nets, and get an honest technical evaluation from Coach Shanmukha.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-red-500/20 shadow-2xl space-y-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  Book Free Technical Trial & Net Assessment
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Player / Parent Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shanmukh V."
                      value={formData.parentOrPlayerName}
                      onChange={(e) => setFormData({ ...formData, parentOrPlayerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 90631 83329"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. player@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Age Bracket</label>
                    <select
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-red-500"
                    >
                      <option>Under-12 (6 - 12 yrs)</option>
                      <option>Junior (12 - 16 yrs)</option>
                      <option>Under-19 / Pro (16 - 19 yrs)</option>
                      <option>Adults & Weekend Corporate</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Primary Skill Focus</label>
                    <select
                      value={formData.primaryDiscipline}
                      onChange={(e) => setFormData({ ...formData, primaryDiscipline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-red-500"
                    >
                      <option>Batting (Top-Order / Power Hitter)</option>
                      <option>Fast Bowling (Inswing / Outswing / Pace)</option>
                      <option>Spin Bowling (Leg-spin / Off-spin)</option>
                      <option>Wicketkeeping & Batting</option>
                      <option>All-Rounder Foundation</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Preferred Batch Timing</label>
                    <select
                      value={formData.preferredBatch}
                      onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-red-500"
                    >
                      <option>Morning Batch (6:30 AM - 8:30 AM)</option>
                      <option>Evening Batch (4:30 PM - 7:00 PM)</option>
                      <option>Weekend Intensive (Sat & Sun)</option>
                      <option>Private 1-on-1 VIP Slot</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-slate-300">Additional Goals / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about previous club experience, bowling speed, or specific trial goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-600/30 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Submit Trial Request</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  Trial Assessment Scheduled!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.parentOrPlayerName}</strong>! Coach Shanmukha’s team will WhatsApp you within 2 hours with slot timing and cricket kit checklist.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 bg-slate-900 text-xs font-bold text-slate-300 rounded-xl border border-slate-800 hover:text-white"
                >
                  Submit Another Enquiry
                </button>
              </div>
            )}
          </div>

          {/* Right: Direct Contact Cards & Map Information */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Contact Box */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
              <h4 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                Direct Academy Hotlines
              </h4>

              <div className="space-y-3 text-xs">
                <a
                  href={`tel:${ACADEMY_INFO.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Head Coach Hotline (Primary)</p>
                    <p className="font-bold text-white text-sm">{ACADEMY_INFO.phone}</p>
                  </div>
                </a>

                <a
                  href={`tel:${ACADEMY_INFO.altPhone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Admissions & Info Desk</p>
                    <p className="font-bold text-white text-sm">{ACADEMY_INFO.altPhone}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${ACADEMY_INFO.whatsapp.replace(/\D/g, '')}?text=Hi%20Coach%20Shanmukha,%20I%20would%20like%20to%20enquire%20about%20cricket%20coaching%20admissions`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase font-semibold">WhatsApp Desk (Instant Chat)</p>
                    <p className="font-bold text-white text-sm">{ACADEMY_INFO.whatsapp} / {ACADEMY_INFO.altPhone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Net & Training Hours</p>
                    <p className="font-bold text-white">Mon – Sun: 6:00 AM – 9:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Location</p>
                    <p className="font-medium text-slate-200 leading-snug">{ACADEMY_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium Visual Badge */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 h-44 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80"
                alt="Academy Grounds"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  8 Turf Match Nets • 240FPS Biomechanics Hub
                </span>
                <p className="text-sm font-bold text-white">
                  State-of-the-Art Cricket Complex
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
