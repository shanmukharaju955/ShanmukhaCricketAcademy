import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  Tag, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Download, 
  Flame, 
  Zap 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROGRAMS_DATA } from '../data/mockData';
import { TrainingProgram } from '../types';

interface FeeCalculatorProps {
  onOpenBooking: () => void;
}

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({ onOpenBooking }) => {
  const [programs, setPrograms] = useState<TrainingProgram[]>(() => {
    try {
      const saved = localStorage.getItem('shanmukha_academy_programs_custom_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return PROGRAMS_DATA;
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem('shanmukha_academy_programs_custom_v1');
        if (saved) setPrograms(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const [selectedProgramId, setSelectedProgramId] = useState<string>(programs[1]?.id || programs[0]?.id || 'junior');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  const [includeKit, setIncludeKit] = useState<boolean>(true);
  const [includeMachineTokens, setIncludeMachineTokens] = useState<boolean>(false);
  const [includeVIPCoaching, setIncludeVIPCoaching] = useState<boolean>(false);
  const [hasSiblingDiscount, setHasSiblingDiscount] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCouponDiscount, setAppliedCouponDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  const selectedProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];

  // Calculate Base Fee
  let baseFee = 0;
  if (billingCycle === 'monthly') baseFee = selectedProgram.monthlyFee;
  else if (billingCycle === 'quarterly') baseFee = selectedProgram.quarterlyFee;
  else baseFee = selectedProgram.annualFee;

  // Add-on calculations
  const kitCost = includeKit ? 2500 : 0;
  const machineTokensCost = includeMachineTokens ? 1500 : 0;
  const vipCoachingCost = includeVIPCoaching ? 3000 : 0;
  const subtotal = baseFee + kitCost + machineTokensCost + vipCoachingCost;

  // Sibling Discount (15% off base fee)
  const siblingDiscountAmount = hasSiblingDiscount ? Math.round(baseFee * 0.15) : 0;

  // Total
  const finalTotal = Math.max(0, subtotal - siblingDiscountAmount - appliedCouponDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (code === 'SCACHAMP2026' || code === 'SCA2026') {
      setAppliedCouponDiscount(1500);
      setCouponMessage({ text: '🎉 Coupon SCACHAMP2026 applied! ₹1,500 Instant Scholarship Discount', isError: false });
      confetti({ particleCount: 30, spread: 60 });
    } else if (code === 'RANJI50') {
      setAppliedCouponDiscount(Math.round(baseFee * 0.2));
      setCouponMessage({ text: '⚡ Scholarship RANJI50 applied! 20% Talent Merit Waiver', isError: false });
      confetti({ particleCount: 40, spread: 70 });
    } else {
      setAppliedCouponDiscount(0);
      setCouponMessage({ text: '❌ Invalid coupon code. Try SCACHAMP2026', isError: true });
    }
  };

  const handleEnrollNow = () => {
    setIsEnrolled(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  return (
    <section id="fees" className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-800">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent Pricing & Scholarships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Interactive <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">Fee & Package Calculator</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Customize your training frequency, duration, gear package, and calculate instant scholarship savings.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Options & Customization Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-red-500/20 shadow-2xl space-y-6">
            
            {/* Step 1: Select Program */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Select Coaching Pathway:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {programs.map((prog) => (
                  <button
                    key={prog.id}
                    onClick={() => setSelectedProgramId(prog.id)}
                    className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                      selectedProgramId === prog.id
                        ? 'bg-slate-800/90 border-red-500 shadow-lg text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-900 text-amber-300">
                        {prog.ageGroup}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-white mt-1.5 leading-snug">
                        {prog.title}
                      </p>
                    </div>
                    <p className="text-xs text-amber-400 font-extrabold mt-3">
                      ₹{prog.monthlyFee.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-normal">/ mo</span>
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Billing Cycle */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Choose Commitment Duration:
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-red-600/20 border-red-500 text-white font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold">Monthly</p>
                  <span className="text-[10px] text-slate-400">Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBillingCycle('quarterly')}
                  className={`p-3 rounded-2xl text-center border transition-all relative cursor-pointer ${
                    billingCycle === 'quarterly'
                      ? 'bg-red-600/20 border-red-500 text-white font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded bg-emerald-500 text-[9px] font-black text-slate-950 uppercase">
                    Save 10%
                  </span>
                  <p className="text-xs font-bold">Quarterly</p>
                  <span className="text-[10px] text-emerald-400">Popular</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`p-3 rounded-2xl text-center border transition-all relative cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-red-600/20 border-red-500 text-white font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded bg-amber-400 text-[9px] font-black text-slate-950 uppercase">
                    Save 20%
                  </span>
                  <p className="text-xs font-bold">Annual</p>
                  <span className="text-[10px] text-amber-300">Pro Cadets</span>
                </button>
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                3. Equipment & Performance Add-ons:
              </label>
              
              <div className="space-y-2">
                {/* Kit Addon */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeKit}
                      onChange={(e) => setIncludeKit(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-950 border-slate-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Official SCA Match Kit Package</p>
                      <p className="text-[11px] text-slate-400">2 Customized Dry-Fit Jerseys, SCA Cap & Cricket Bag</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+₹2,500</span>
                </label>

                {/* Bola Machine Tokens */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeMachineTokens}
                      onChange={(e) => setIncludeMachineTokens(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-950 border-slate-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">10x Bola Bowling Machine Pass (500 Balls)</p>
                      <p className="text-[11px] text-slate-400">140+ km/h pace & swing simulation slots</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+₹1,500</span>
                </label>

                {/* VIP Session */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeVIPCoaching}
                      onChange={(e) => setIncludeVIPCoaching(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-950 border-slate-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">1-on-1 Video Biomechanics Session with Coach Shanmukha</p>
                      <p className="text-[11px] text-slate-400">240FPS high-speed shutter camera technique audit</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+₹3,000</span>
                </label>
              </div>
            </div>

            {/* Sibling Discount Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Sibling / Family Discount</p>
                <p className="text-[11px] text-slate-400">Enrolling two or more children receives 15% waiver</p>
              </div>
              <button
                type="button"
                onClick={() => setHasSiblingDiscount(!hasSiblingDiscount)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  hasSiblingDiscount ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    hasSiblingDiscount ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Right: Summary Invoice & Checkout Card */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-red-500/30 shadow-2xl space-y-6 sticky top-28">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Tuition Fee Estimate
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">
                {selectedProgram.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {selectedProgram.schedule} • {billingCycle.toUpperCase()} Billing
              </p>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base Tuition ({billingCycle})</span>
                <span className="font-bold text-white">₹{baseFee.toLocaleString('en-IN')}</span>
              </div>

              {includeKit && (
                <div className="flex justify-between text-slate-300">
                  <span>Official Kit & Apparel</span>
                  <span className="font-bold text-white">₹2,500</span>
                </div>
              )}

              {includeMachineTokens && (
                <div className="flex justify-between text-slate-300">
                  <span>Bola Bowling Machine Pass</span>
                  <span className="font-bold text-white">₹1,500</span>
                </div>
              )}

              {includeVIPCoaching && (
                <div className="flex justify-between text-slate-300">
                  <span>1-on-1 Biomechanics Session</span>
                  <span className="font-bold text-white">₹3,000</span>
                </div>
              )}

              {hasSiblingDiscount && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Sibling Discount (15%)</span>
                  <span>-₹{siblingDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {appliedCouponDiscount > 0 && (
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>Scholarship Waiver</span>
                  <span>-₹{appliedCouponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-slate-800 space-y-2">
              <label className="text-[11px] font-bold text-slate-400 block">
                Scholarship Voucher / Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SCACHAMP2026"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white uppercase tracking-wider font-bold focus:border-red-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[11px] font-semibold ${couponMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {couponMessage.text}
                </p>
              )}
            </form>

            {/* Total Fee Due */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-red-950/40 border border-red-500/40 space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-300 uppercase">Estimated Total Fee</span>
                <span className="font-display text-3xl font-black text-amber-400">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Includes all coaching drills, turf net maintenance, and video audits.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleEnrollNow}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 transition-transform active:scale-95 cursor-pointer"
              >
                {isEnrolled ? '✓ Admission Slot Reserved!' : 'Lock In Scholarship & Enroll'}
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Book Free Assessment First
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
