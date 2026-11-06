import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Download,
  Flame,
  Zap,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NetBooking } from '../types';
import { ACADEMY_INFO } from '../data/mockData';

interface NetBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NET_TYPES = [
  { id: 'turf-pace', name: 'Turf Net 1-4 (Red Soil Pace & Bounce)', pricePerHour: 800, badge: 'Popular' },
  { id: 'turf-spin', name: 'Turf Net 5-8 (Black Soil Spin Wicket)', pricePerHour: 800 },
  { id: 'astro-turf', name: 'AstroTurf Net 9-12 (Consistent Pace)', pricePerHour: 600 },
  { id: 'bola-machine', name: 'Bola Pro 283 Bowling Machine Net (150 km/h)', pricePerHour: 1200, badge: 'Fastest' },
  { id: 'vip-coach', name: '1-on-1 VIP Net with Coach Shanmukha + 240FPS Video', pricePerHour: 2500, badge: 'VIP' },
];

const TIME_SLOTS = [
  '06:00 AM - 07:00 AM',
  '07:00 AM - 08:00 AM',
  '08:00 AM - 09:00 AM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM (Floodlights)',
  '07:00 PM - 08:00 PM (Floodlights)',
  '08:00 PM - 09:00 PM (Floodlights)',
];

export const NetBookingModal: React.FC<NetBookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedNet, setSelectedNet] = useState(NET_TYPES[0]);
  const [bookingDate, setBookingDate] = useState('2026-08-18');
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[5]);
  const [durationHours, setDurationHours] = useState(1);
  const [addSpeedGun, setAddSpeedGun] = useState(true);
  const [addBalls, setAddBalls] = useState(true);
  
  // User info
  const [playerName, setPlayerName] = useState('');
  const [playerPhone, setPlayerPhone] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<NetBooking | null>(null);

  if (!isOpen) return null;

  const basePrice = selectedNet.pricePerHour * durationHours;
  const speedGunFee = addSpeedGun ? 200 : 0;
  const ballsFee = addBalls ? 150 : 0;
  const totalPrice = basePrice + speedGunFee + ballsFee;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !playerPhone) {
      alert('Please provide your name and phone number to complete booking.');
      return;
    }

    const booking: NetBooking = {
      id: `SCA-NET-${Math.floor(100000 + Math.random() * 900000)}`,
      netType: selectedNet.name,
      date: bookingDate,
      timeSlot: selectedSlot,
      durationHours,
      playerName,
      playerPhone,
      playerEmail,
      addBowlingMachine: selectedNet.id === 'bola-machine',
      addSpeedGunTracking: addSpeedGun,
      addCoachAssistance: selectedNet.id === 'vip-coach',
      totalPrice,
      status: 'Confirmed',
    };

    setConfirmedBooking(booking);
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] glass-card rounded-3xl border border-red-500/30 shadow-2xl flex flex-col overflow-hidden bg-slate-950">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Reserve Turf Net / Bowling Machine
              </h3>
              <p className="text-xs text-slate-400">
                Floodlit Practice Sessions • Instant Digital Confirmation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!confirmedBooking ? (
            <form onSubmit={handleConfirmBooking} className="space-y-5">
              
              {/* Net Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  1. Choose Pitch / Net Category:
                </label>
                <div className="space-y-2">
                  {NET_TYPES.map((net) => (
                    <button
                      type="button"
                      key={net.id}
                      onClick={() => setSelectedNet(net)}
                      className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between ${
                        selectedNet.id === net.id
                          ? 'bg-slate-800/90 border-red-500 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="text-xs sm:text-sm font-bold text-white">{net.name}</p>
                          {net.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-red-950 text-red-300 rounded font-bold border border-red-500/30">
                              {net.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-400 font-display text-base">
                        ₹{net.pricePerHour}/hr
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Practice Date:</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Time Slot:</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-red-500"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Match Gear & Telemetry Add-ons:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addSpeedGun}
                      onChange={(e) => setAddSpeedGun(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 bg-slate-950 border-slate-700"
                    />
                    <span className="text-slate-200">Radar Speed Gun (+₹200)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addBalls}
                      onChange={(e) => setAddBalls(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 bg-slate-950 border-slate-700"
                    />
                    <span className="text-slate-200">Box of 6 Match Balls (+₹150)</span>
                  </label>
                </div>
              </div>

              {/* Player Contact Details */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Player Contact Information:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={playerPhone}
                    onChange={(e) => setPlayerPhone(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={playerEmail}
                    onChange={(e) => setPlayerEmail(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Price & Submit */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Session Amount</p>
                  <p className="font-display text-3xl font-black text-amber-400">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all"
                >
                  Confirm & Reserve
                </button>
              </div>

            </form>
          ) : (
            /* Confirmed Pass Receipt */
            <div className="space-y-6 text-center animate-fadeIn py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">
                  Turf Net Slot Confirmed!
                </h3>
                <p className="text-xs text-slate-400">
                  Pass Reference: <strong className="text-amber-400 font-mono">{confirmedBooking.id}</strong>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Player:</span>
                  <span className="font-bold text-white">{confirmedBooking.playerName} ({confirmedBooking.playerPhone})</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Pitch Reserved:</span>
                  <span className="font-bold text-amber-300">{confirmedBooking.netType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-bold text-white">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Paid at Academy:</span>
                  <span className="font-display text-xl font-black text-emerald-400">₹{confirmedBooking.totalPrice}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/${ACADEMY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi Coach Shanmukha, I have booked a turf net slot on the website.\n\n` +
                    `*Pass ID:* ${confirmedBooking.id}\n` +
                    `*Player:* ${confirmedBooking.playerName}\n` +
                    `*Phone:* ${confirmedBooking.playerPhone}\n` +
                    `*Net:* ${confirmedBooking.netType}\n` +
                    `*Slot:* ${confirmedBooking.date} at ${confirmedBooking.timeSlot}\n` +
                    `*Fee:* ₹${confirmedBooking.totalPrice}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp</span>
                </a>
                <button
                  onClick={() => alert(`Digital Pass ${confirmedBooking.id} downloaded successfully!`)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Pass</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
