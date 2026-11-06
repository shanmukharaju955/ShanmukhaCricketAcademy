import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Award, 
  Activity, 
  Bot, 
  Download, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Phone, 
  Mail, 
  LogOut, 
  Sparkles,
  User,
  Flame,
  Target,
  Printer,
  X,
  QrCode
} from 'lucide-react';
import { StudentAccount } from '../types/portal';
import { ACADEMY_INFO } from '../data/mockData';

interface StudentPortalViewProps {
  student: StudentAccount;
  onLogout: () => void;
  onOpenBooking: () => void;
  onOpenAICoach: () => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  student,
  onLogout,
  onOpenBooking,
  onOpenAICoach,
}) => {
  const [drills, setDrills] = useState(student.assignedDrills);
  const [showIDCardModal, setShowIDCardModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const toggleDrill = (drillId: string) => {
    setDrills(prev => 
      prev.map(d => d.id === drillId ? { ...d, completed: !d.completed } : d)
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100">
      
      {/* 1. Digital Cadet ID Card Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950/80 border border-red-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl shrink-0 group">
              <img
                src={student.photoUrl}
                alt={student.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                  {student.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold uppercase tracking-wider">
                  {student.status} Cadet
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  Batch: {student.batch}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {student.name}
              </h2>

              <p className="text-xs sm:text-sm text-amber-300 font-bold flex items-center justify-center md:justify-start gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span>{student.category}</span>
                <span className="text-slate-400">• Age {student.age}</span>
              </p>

              <p className="text-[11px] text-slate-400">
                Mentor: <span className="text-slate-200 font-semibold">{student.assignedCoach}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
            <button
              onClick={() => setShowIDCardModal(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>View Player ID Card</span>
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-rose-950/60 text-rose-400 border border-rose-500/30 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Telemetry & Performance Radar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance */}
        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Net Attendance</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">{student.attendanceRate}%</p>
          <p className="text-[10px] text-emerald-300 font-semibold">● Eligible for Selection Trials</p>
        </div>

        {/* Batting Rating */}
        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Stroke Rating</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-400">{student.battingRating}<span className="text-xs text-slate-400 font-normal">/100</span></p>
          <p className="text-[10px] text-slate-400">AI Biomechanics Audited</p>
        </div>

        {/* Bowling Speed / Metric */}
        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Peak Speed / Revs</span>
            <Zap className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-white">{student.bowlingSpeed || 'N/A'}</p>
          <p className="text-[10px] text-slate-400">240FPS High-Speed Radar</p>
        </div>

        {/* Fitness Score */}
        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Fitness Benchmark</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-sm sm:text-base font-black text-blue-300">{student.fitnessScore}</p>
          <p className="text-[10px] text-blue-400 font-semibold">NCA Fitness Standard Met</p>
        </div>
      </div>

      {/* 3. Next Training Session Alert */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-600/20 via-slate-900 to-amber-500/10 border border-red-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-3 rounded-xl bg-red-600 text-white shadow-lg shrink-0">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Next Scheduled Practice Net</span>
            <h4 className="text-base font-black text-white">{student.nextSession}</h4>
            <p className="text-xs text-slate-400">Please report in full whites with pads 15 minutes before warm-up.</p>
          </div>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 whitespace-nowrap cursor-pointer"
        >
          Book Extra Net Slot
        </button>
      </div>

      {/* 4. Coach's Personal Notes & Recent Match Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Coach Feedback Box */}
        <div className="lg:col-span-7 bg-slate-950/70 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Coach Shanmukha's Technical Evaluation</h4>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Updated This Week
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
            "{student.coachFeedback}"
          </p>

          {student.recentScore && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <span className="text-xs text-amber-300 font-bold">Recent Match Performance:</span>
              <span className="text-xs font-black text-white">{student.recentScore}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">Need real-time batting cues or mindset advice?</span>
            <button
              onClick={onOpenAICoach}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask Coach AI</span>
            </button>
          </div>
        </div>

        {/* Assigned Drills Homework */}
        <div className="lg:col-span-5 bg-slate-950/70 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Assigned Practice Drills</h4>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">
              {drills.filter(d => d.completed).length} / {drills.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {drills.map((drill) => (
              <div
                key={drill.id}
                onClick={() => toggleDrill(drill.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  drill.completed
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <p className={`text-xs font-bold ${drill.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                    {drill.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{drill.target}</p>
                </div>
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                  drill.completed
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  {drill.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-500 text-center">
            Tap a drill to mark it complete after practice.
          </p>
        </div>

      </div>

      {/* 5. Tuition Fees & Official Receipt */}
      <div className="bg-slate-950/70 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            student.feesPaid
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
          }`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h4 className="text-base font-black text-white">Academy Tuition Fee Record</h4>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                student.feesPaid
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {student.feesPaid ? '✓ All Fees Paid' : '✕ Payment Due'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Receipt No: <span className="text-slate-300 font-mono">{student.feeInvoice.receiptNo}</span> • Amount: <span className="text-amber-400 font-bold">₹{student.feeInvoice.amount.toLocaleString('en-IN')}</span> ({student.feeInvoice.billingCycle})
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowReceiptModal(true)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>View / Print Fee Receipt</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: OFFICIAL DIGITAL CADET ID CARD                   */}
      {/* ======================================================== */}
      {showIDCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-md w-full bg-slate-900 rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden p-6 space-y-6">
            
            {/* ID Card Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Official Cadet Player Card
              </span>
              <button 
                onClick={() => setShowIDCardModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable ID Card Body */}
            <div id="printable-id-card" className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 p-6 border-2 border-amber-400/80 shadow-2xl relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center font-display text-xl font-black text-white">
                    SCA
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">Shanmukha Cricket Academy</h3>
                    <p className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">BCCI Certified High-Performance Hub</p>
                  </div>
                </div>
                <QrCode className="w-8 h-8 text-slate-400 shrink-0" />
              </div>

              <div className="flex gap-4 items-center">
                <img 
                  src={student.photoUrl} 
                  alt={student.name} 
                  className="w-20 h-24 rounded-xl object-cover border-2 border-amber-400 shrink-0 shadow-lg"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                    ID: {student.id}
                  </span>
                  <h4 className="text-lg font-black text-white uppercase leading-tight mt-1">{student.name}</h4>
                  <p className="text-[11px] text-amber-300 font-bold">{student.category}</p>
                  <p className="text-[10px] text-slate-400">Batch: {student.batch}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-400 block font-semibold">Mentor:</span>
                  <p className="text-slate-200 font-bold">{student.assignedCoach}</p>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Academy Helpline:</span>
                  <p className="text-amber-400 font-bold">{ACADEMY_INFO.phone}</p>
                  <p className="text-amber-300/80 text-[9px] font-medium">{ACADEMY_INFO.altPhone}</p>
                </div>
              </div>

              <div className="text-[8px] text-slate-500 text-center tracking-wider uppercase border-t border-slate-800/60 pt-2">
                Authorized Signature • Valid for 2026 Season • Non-Transferable
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Player Card</span>
              </button>
              <button
                onClick={() => setShowIDCardModal(false)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: OFFICIAL TUITION FEE RECEIPT                     */}
      {/* ======================================================== */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Official Academy Receipt
              </span>
              <button 
                onClick={() => setShowReceiptModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Invoice */}
            <div className="rounded-2xl bg-white text-slate-950 p-6 shadow-2xl space-y-5">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-base font-black text-red-950 uppercase tracking-tight">Shanmukha Cricket Academy</h3>
                  <p className="text-[10px] text-slate-600">Reg. High-Performance Center • BCCI Affiliated</p>
                  <p className="text-[9px] text-slate-500">{ACADEMY_INFO.address}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] uppercase">
                    PAID & VERIFIED
                  </span>
                  <p className="text-[10px] font-mono text-slate-600 mt-1">{student.feeInvoice.receiptNo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Billed To (Cadet):</p>
                  <p className="font-bold text-slate-900">{student.name}</p>
                  <p className="text-[11px] text-slate-600">ID: {student.id} • {student.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Billing Cycle:</p>
                  <p className="font-bold text-slate-900">{student.feeInvoice.billingCycle}</p>
                  <p className="text-[11px] text-slate-600">Term: {student.program}</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5 text-right">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-medium">Turf Match Coaching & Net Maintenance</td>
                      <td className="p-2.5 text-right font-bold">₹{student.feeInvoice.amount.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-600 text-[11px]">240FPS Biomechanics Video Audit Included</td>
                      <td className="p-2.5 text-right text-emerald-700 font-bold">WAIVED (₹0)</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-200 font-black text-xs">
                    <tr>
                      <td className="p-2.5">Total Paid:</td>
                      <td className="p-2.5 text-right text-red-900">₹{student.feeInvoice.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex justify-between items-end pt-2 text-[10px] text-slate-600">
                <div>
                  <p>Payment: Verified UPI / Bank Transfer</p>
                  <p>Academy Phone: {ACADEMY_INFO.phone} / {ACADEMY_INFO.altPhone}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900">Coach Shanmukha V.</p>
                  <p className="text-[9px] text-slate-500">Chief Coach & Founder (SCA)</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Receipt</span>
              </button>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
