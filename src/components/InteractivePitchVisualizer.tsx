import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Target, 
  Shield, 
  Flame, 
  Sparkles, 
  Compass, 
  Users, 
  Award,
  ChevronRight,
  Info
} from 'lucide-react';

interface DeliveryPreset {
  id: string;
  name: string;
  bowlerType: 'Fast' | 'Spin' | 'Seam';
  speed: string;
  lengthZone: 'Yorker' | 'Full' | 'Good Length' | 'Short' | 'Bouncer';
  pitchSpotPercentY: number; // percentage from batting crease (0% = batsman, 100% = bowler)
  pitchSpotPercentX: number; // percentage from center (50% = center stump, <50% = off, >50% = leg)
  swingDirection: 'out' | 'in' | 'legbreak' | 'googly' | 'straight';
  outcome: string;
  coachCue: string;
  tacticalNote: string;
}

const PRESET_DELIVERIES: DeliveryPreset[] = [
  {
    id: 'outswing-good-length',
    name: '144 km/h Corridor of Uncertainty Outswinger',
    bowlerType: 'Fast',
    speed: '144 km/h',
    lengthZone: 'Good Length',
    pitchSpotPercentY: 28,
    pitchSpotPercentX: 42,
    swingDirection: 'out',
    outcome: 'Edged to 2nd Slip! Batsman squared up by late outward drift.',
    coachCue: 'Maintain high front elbow and play inside the line; never chase with reaching hands.',
    tacticalNote: 'Pitched on 5th stump channel, drawing forward defensive stroke before seam movement.',
  },
  {
    id: 'toe-crusher-yorker',
    name: '148 km/h Late Inswinging Base-of-Stumps Yorker',
    bowlerType: 'Fast',
    speed: '148 km/h',
    lengthZone: 'Yorker',
    pitchSpotPercentY: 8,
    pitchSpotPercentX: 52,
    swingDirection: 'in',
    outcome: 'Bowled! Base of middle and leg stump uprooted under the bat.',
    coachCue: 'Jam bat straight down into the crease blockhole without lifting backlift excessively.',
    tacticalNote: 'Ideal delivery for overs 18-20 in T20 match scenarios.',
  },
  {
    id: 'ripping-leg-break',
    name: '87 km/h Shane Warne Classic Drift & Sharp Leg Break',
    bowlerType: 'Spin',
    speed: '87 km/h',
    lengthZone: 'Good Length',
    pitchSpotPercentY: 24,
    pitchSpotPercentX: 62,
    swingDirection: 'legbreak',
    outcome: 'Pitched on leg-stump line, clipped top of off-stump! Pure magic.',
    coachCue: 'Use soft hands and read wrist orientation before pitch bounce.',
    tacticalNote: 'Drift into the right-hander with revolutions, then bite off the turf.',
  },
  {
    id: 'steep-bouncer',
    name: '138 km/h Rib-Cage Directed Throat Bouncer',
    bowlerType: 'Fast',
    speed: '138 km/h',
    lengthZone: 'Bouncer',
    pitchSpotPercentY: 48,
    pitchSpotPercentX: 48,
    swingDirection: 'straight',
    outcome: 'Hurry up the batsman! Top edge caught at deep fine leg.',
    coachCue: 'Sway back or duck under early; if pulling, roll wrists completely over the ball.',
    tacticalNote: 'Targeting badge on the helmet to push batsman onto back foot.',
  },
  {
    id: 'mystery-googly',
    name: '92 km/h Back-of-Hand Googly through the Gate',
    bowlerType: 'Spin',
    speed: '92 km/h',
    lengthZone: 'Full',
    pitchSpotPercentY: 18,
    pitchSpotPercentX: 38,
    swingDirection: 'googly',
    outcome: 'Bowled between bat and pad! Batsman failed to pick the wrist release.',
    coachCue: 'Watch the back of the bowler’s hand at release point, not the pitch.',
    tacticalNote: 'Deceptive variation after 3 consecutive stock leg-breaks.',
  },
];

type FieldPresetType = 'test-attack' | 't20-powerplay' | 't20-death' | 'spin-choke';

interface FielderPos {
  id: string;
  name: string;
  x: number; // 0 to 100%
  y: number; // 0 to 100%
  isRing: boolean;
}

const FIELD_PRESETS: Record<FieldPresetType, { title: string; description: string; fielders: FielderPos[] }> = {
  'test-attack': {
    title: 'Test Red-Ball Aggressive (3 Slips + Gully)',
    description: 'Maximum pressure cordon attacking outside off-stump channel with new ball swing.',
    fielders: [
      { id: 'wk', name: 'Keeper', x: 50, y: 32, isRing: true },
      { id: 's1', name: '1st Slip', x: 42, y: 30, isRing: true },
      { id: 's2', name: '2nd Slip', x: 36, y: 28, isRing: true },
      { id: 's3', name: '3rd Slip', x: 30, y: 26, isRing: true },
      { id: 'gul', name: 'Gully', x: 22, y: 36, isRing: true },
      { id: 'pt', name: 'Point', x: 18, y: 52, isRing: true },
      { id: 'cov', name: 'Cover', x: 28, y: 68, isRing: true },
      { id: 'moff', name: 'Mid-Off', x: 40, y: 82, isRing: true },
      { id: 'mon', name: 'Mid-On', x: 60, y: 82, isRing: true },
      { id: 'msq', name: 'Mid-Wicket', x: 74, y: 66, isRing: true },
      { id: 'fleg', name: 'Fine Leg', x: 78, y: 22, isRing: false },
    ],
  },
  't20-powerplay': {
    title: 'T20 Powerplay (2 Deep Boundary Protectors)',
    description: 'Mandatory 2 fielders outside 30-yard circle. Deep Third Man & Deep Mid-Wicket.',
    fielders: [
      { id: 'wk', name: 'Keeper', x: 50, y: 32, isRing: true },
      { id: 's1', name: '1st Slip', x: 40, y: 30, isRing: true },
      { id: 'pt', name: 'Back Point', x: 22, y: 44, isRing: true },
      { id: 'cov', name: 'Extra Cover', x: 26, y: 66, isRing: true },
      { id: 'moff', name: 'Mid-Off', x: 42, y: 78, isRing: true },
      { id: 'mon', name: 'Mid-On', x: 58, y: 78, isRing: true },
      { id: 'sqleg', name: 'Square Leg', x: 78, y: 48, isRing: true },
      { id: 'dpt', name: 'Deep 3rd Man', x: 18, y: 16, isRing: false },
      { id: 'dmw', name: 'Deep Mid-Wicket', x: 84, y: 74, isRing: false },
      { id: 'shleg', name: 'Short Fine', x: 64, y: 28, isRing: true },
      { id: 'covp', name: 'Cover Point', x: 30, y: 52, isRing: true },
    ],
  },
  't20-death': {
    title: 'T20 Death Overs (5 Boundary Protectors)',
    description: 'Protecting Long-On, Long-Off, Deep Point, Deep Square, and Deep Mid-Wicket for yorkers.',
    fielders: [
      { id: 'wk', name: 'Keeper', x: 50, y: 32, isRing: true },
      { id: 'dpt', name: 'Deep Point', x: 14, y: 48, isRing: false },
      { id: 'dlo', name: 'Long-Off', x: 36, y: 92, isRing: false },
      { id: 'dln', name: 'Long-On', x: 64, y: 92, isRing: false },
      { id: 'dmw', name: 'Deep Mid-Wicket', x: 86, y: 72, isRing: false },
      { id: 'dfl', name: 'Deep Fine Leg', x: 82, y: 18, isRing: false },
      { id: 'cov', name: 'Extra Cover', x: 30, y: 64, isRing: true },
      { id: 'midw', name: 'Mid Wicket', x: 70, y: 64, isRing: true },
      { id: 'pt', name: 'Short Point', x: 28, y: 44, isRing: true },
      { id: 'sh3rd', name: 'Short 3rd Man', x: 36, y: 24, isRing: true },
      { id: 'sqleg', name: 'Short Square', x: 72, y: 44, isRing: true },
    ],
  },
  'spin-choke': {
    title: 'Spin Squeeze & Catching Trap (Bat-Pad)',
    description: 'Silly point and short leg placed right in batsman’s face to catch inside/outside edges.',
    fielders: [
      { id: 'wk', name: 'Keeper', x: 50, y: 30, isRing: true },
      { id: 's1', name: 'Slip', x: 42, y: 28, isRing: true },
      { id: 'silp', name: 'Silly Point', x: 40, y: 46, isRing: true },
      { id: 'shlg', name: 'Short Leg', x: 60, y: 46, isRing: true },
      { id: 'pt', name: 'Point', x: 22, y: 52, isRing: true },
      { id: 'cov', name: 'Cover', x: 28, y: 72, isRing: true },
      { id: 'moff', name: 'Mid-Off', x: 42, y: 80, isRing: true },
      { id: 'mon', name: 'Mid-On', x: 58, y: 80, isRing: true },
      { id: 'dmw', name: 'Deep Mid-Wicket', x: 86, y: 70, isRing: false },
      { id: 'dco', name: 'Deep Cover', x: 14, y: 70, isRing: false },
      { id: 'sh3r', name: 'Short 3rd', x: 34, y: 22, isRing: true },
    ],
  },
};

export const InteractivePitchVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hawkeye' | 'fielding'>('hawkeye');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryPreset>(PRESET_DELIVERIES[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeFieldPreset, setActiveFieldPreset] = useState<FieldPresetType>('test-attack');

  const handleSimulateDelivery = (del: DeliveryPreset) => {
    setSelectedDelivery(del);
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <section id="pitch-visualizer" className="py-20 bg-slate-900/80 border-y border-red-500/20 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Match Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Pitch Trajectory & <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">Hawk-Eye Zone Map</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Understand line, length, seam deviation, and strategic field placements just like First-Class & International analysts.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('hawkeye')}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'hawkeye'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Hawk-Eye Pitch Trajectory</span>
            </button>
            <button
              onClick={() => setActiveTab('fielding')}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'fielding'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-400'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Field Placement Matrix</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Hawk-Eye Pitch Simulator */}
        {activeTab === 'hawkeye' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive 22-Yard Cricket Pitch Canvas Map */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-5 border border-emerald-500/20 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> 22-Yards Turf Length Grid
                </span>
                <span className="text-slate-400">
                  Click delivery on right to simulate ball flight
                </span>
              </div>

              {/* Pitch Visualizer Graphic */}
              <div className="relative w-full h-[460px] bg-gradient-to-b from-amber-950/30 via-emerald-950/30 to-amber-950/40 rounded-xl my-4 border-2 border-amber-800/40 flex flex-col justify-between p-4 overflow-hidden shadow-inner">
                
                {/* Grass texture grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Bowler End Crease */}
                <div className="relative w-full text-center border-b-2 border-white/80 pb-1">
                  <div className="flex justify-center items-center gap-4">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bowler Release (22 Yards)</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-3 bg-amber-400 rounded-t-sm" />
                      <div className="w-1.5 h-3 bg-amber-400 rounded-t-sm" />
                      <div className="w-1.5 h-3 bg-amber-400 rounded-t-sm" />
                    </div>
                  </div>
                </div>

                {/* Length Zones Bands */}
                <div className="relative w-full h-full flex flex-col justify-between py-2 text-[10px] font-semibold text-slate-400 select-none">
                  
                  {/* Bouncer Zone */}
                  <div className="h-[22%] border-b border-dashed border-red-500/30 flex items-center justify-between px-3 bg-red-950/10 rounded">
                    <span className="text-red-400 font-bold">Bouncer Zone (9 - 11m)</span>
                    <span className="text-slate-500 text-[9px]">Throat & Helmet Trap</span>
                  </div>

                  {/* Short of Length */}
                  <div className="h-[20%] border-b border-dashed border-amber-500/30 flex items-center justify-between px-3 bg-amber-950/10 rounded">
                    <span className="text-amber-400 font-bold">Short of Length (7 - 9m)</span>
                    <span className="text-slate-500 text-[9px]">Backfoot Punch / Pull</span>
                  </div>

                  {/* Good Length (Prism of Excellence) */}
                  <div className="h-[26%] border-b-2 border-emerald-500/60 flex items-center justify-between px-3 bg-emerald-950/30 rounded border border-emerald-500/40 relative">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-300 font-extrabold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300 animate-spin" /> Good Length Zone (4 - 7m)
                      </span>
                    </div>
                    <span className="text-emerald-400 text-[9px] font-bold bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-500/40">
                      Highest Wicket Probability
                    </span>
                  </div>

                  {/* Full Pitch / Half Volley */}
                  <div className="h-[18%] border-b border-dashed border-blue-500/30 flex items-center justify-between px-3 bg-blue-950/10 rounded">
                    <span className="text-blue-400 font-bold">Full Pitch / Driving Length (2 - 4m)</span>
                    <span className="text-slate-500 text-[9px]">Cover Drive / Straight Drive</span>
                  </div>

                  {/* Yorker Zone */}
                  <div className="h-[14%] flex items-center justify-between px-3 bg-rose-950/20 rounded">
                    <span className="text-rose-400 font-bold">Blockhole / Yorker Zone (0 - 2m)</span>
                    <span className="text-slate-500 text-[9px]">Base of Stumps</span>
                  </div>
                </div>

                {/* Stumps & Batting Crease */}
                <div className="relative w-full text-center border-t-2 border-white/90 pt-1">
                  <div className="flex justify-center items-center gap-3">
                    <div className="text-[10px] text-slate-300 font-bold uppercase">Off Stump</div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-5 bg-amber-300 rounded-t-sm shadow-md shadow-amber-300/50" />
                      <div className="w-2 h-5 bg-amber-300 rounded-t-sm shadow-md shadow-amber-300/50" />
                      <div className="w-2 h-5 bg-amber-300 rounded-t-sm shadow-md shadow-amber-300/50" />
                    </div>
                    <div className="text-[10px] text-slate-300 font-bold uppercase">Leg Stump</div>
                  </div>
                </div>

                {/* Dynamic Ball Pitch Bounce Point & Trajectory Arc Marker */}
                <div
                  className={`absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all duration-700 ${
                    isSimulating ? 'scale-150 ring-8 ring-amber-400/50' : 'scale-100'
                  } ${
                    selectedDelivery.swingDirection === 'out'
                      ? 'bg-red-600'
                      : selectedDelivery.swingDirection === 'in'
                      ? 'bg-rose-600'
                      : selectedDelivery.swingDirection === 'legbreak'
                      ? 'bg-emerald-600'
                      : 'bg-amber-600'
                  }`}
                  style={{
                    bottom: `${selectedDelivery.pitchSpotPercentY + 8}%`,
                    left: `${selectedDelivery.pitchSpotPercentX}%`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                </div>

                {/* Deviation Arrow Indicator */}
                <div
                  className="absolute text-xs font-black text-amber-300 px-2 py-0.5 rounded bg-slate-950/90 border border-amber-500/40 pointer-events-none transition-all duration-700"
                  style={{
                    bottom: `${selectedDelivery.pitchSpotPercentY + 16}%`,
                    left: `${selectedDelivery.pitchSpotPercentX}%`,
                  }}
                >
                  {selectedDelivery.swingDirection === 'out' && '↗ Seam away to slip'}
                  {selectedDelivery.swingDirection === 'in' && '↙ Inswing to pads'}
                  {selectedDelivery.swingDirection === 'legbreak' && '↗ Sharp turn off pitch'}
                  {selectedDelivery.swingDirection === 'googly' && '↙ Deceptive turn in'}
                  {selectedDelivery.swingDirection === 'straight' && '↑ Extra steep bounce'}
                </div>

              </div>

              {/* Pitch Legend */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Fast Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Spin Variation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Seam Movement
                </span>
              </div>
            </div>

            {/* Right: Delivery Presets & Technical Breakdown */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Master Delivery to Analyze:
                </p>
                <div className="space-y-2">
                  {PRESET_DELIVERIES.map((del) => (
                    <button
                      key={del.id}
                      onClick={() => handleSimulateDelivery(del)}
                      className={`w-full p-3.5 rounded-xl text-left transition-all border flex items-center justify-between ${
                        selectedDelivery.id === del.id
                          ? 'bg-slate-800/90 border-emerald-500 shadow-lg shadow-emerald-500/20 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                              del.bowlerType === 'Fast'
                                ? 'bg-red-900/60 text-red-300 border border-red-500/30'
                                : 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {del.speed}
                          </span>
                          <span className="text-[10px] text-amber-300 font-semibold uppercase">
                            {del.lengthZone}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {del.name}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          selectedDelivery.id === del.id ? 'text-emerald-400 translate-x-1' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Delivery Technical Card */}
              <div className="glass-card rounded-2xl p-4 sm:p-5 border border-emerald-500/30 space-y-3 bg-gradient-to-br from-slate-900/90 to-slate-950">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Biomechanical Outcome
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Zone: {selectedDelivery.lengthZone}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <p className="text-xs font-bold text-amber-300">
                    ⚡ Match Result:
                  </p>
                  <p className="text-xs text-slate-200 mt-0.5">
                    {selectedDelivery.outcome}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                  <p className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Coach Shanmukha Technical Cue:
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5 italic">
                    "{selectedDelivery.coachCue}"
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 flex items-start gap-1.5 pt-1">
                  <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{selectedDelivery.tacticalNote}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Strategic Field Placement Matrix */}
        {activeTab === 'fielding' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cricket Oval Ground with Fielders */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-5 border border-red-500/20 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> 360° Ground Field Layout
                </span>
                <span className="text-slate-400 text-[11px]">
                  11 Fielders Positioned
                </span>
              </div>

              {/* Cricket Ground Oval Map */}
              <div className="relative w-full h-[460px] bg-gradient-to-b from-emerald-900/40 via-emerald-950/60 to-emerald-900/40 rounded-full my-4 border-4 border-emerald-500/30 flex items-center justify-center overflow-hidden shadow-2xl">
                
                {/* 30-Yard Circle boundary */}
                <div className="absolute w-[62%] h-[62%] rounded-full border-2 border-dashed border-white/40 flex items-center justify-center pointer-events-none">
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest -translate-y-24">
                    30-Yard Circle
                  </span>
                </div>

                {/* Central Pitch Box */}
                <div className="w-10 h-24 bg-amber-900/60 border border-amber-400/60 rounded-sm flex flex-col justify-between items-center py-1 z-10 shadow-lg">
                  <div className="w-4 h-0.5 bg-white" />
                  <span className="text-[8px] font-bold text-amber-200 uppercase rotate-90">Pitch</span>
                  <div className="w-4 h-0.5 bg-white" />
                </div>

                {/* Render Fielders for Active Preset */}
                {FIELD_PRESETS[activeFieldPreset].fielders.map((f) => (
                  <div
                    key={f.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-500 hover:scale-125 z-20"
                    style={{ left: `${f.x}%`, top: `${f.y}%` }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg border ${
                        f.isRing
                          ? 'bg-red-600 text-white border-white'
                          : 'bg-amber-400 text-slate-950 border-white ring-2 ring-amber-400/50'
                      }`}
                    >
                      {f.name.substring(0, 2).toUpperCase()}
                    </div>
                    {/* Hover Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 px-2 py-0.5 rounded text-[9px] font-bold text-white whitespace-nowrap border border-slate-700 pointer-events-none shadow-xl">
                      {f.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Oval Legend */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-600 border border-white" /> Inside 30-Yard Circle
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 border border-white" /> Boundary Deep Defender
                </span>
                <span className="text-slate-500 text-[10px]">
                  Hover over fielders to see exact tactical positions
                </span>
              </div>
            </div>

            {/* Right: Field Preset Selection & Captaincy Breakdown */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Match Scenario Field Template:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                  {(Object.keys(FIELD_PRESETS) as FieldPresetType[]).map((key) => {
                    const preset = FIELD_PRESETS[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveFieldPreset(key)}
                        className={`p-3.5 rounded-xl text-left transition-all border ${
                          activeFieldPreset === key
                            ? 'bg-slate-800 border-red-500 shadow-lg shadow-red-500/20 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                        }`}
                      >
                        <p className="text-xs font-bold text-white">{preset.title}</p>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                          {preset.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Captaincy Tactical Wisdom */}
              <div className="glass-card rounded-2xl p-4 sm:p-5 border border-red-500/30 space-y-3 bg-gradient-to-br from-slate-900/90 to-slate-950">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> Captaincy & Bowler Agreement
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  At Shanmukha Cricket Academy, cadets are taught that <strong className="text-white">a field is only as good as the bowler’s execution</strong>. 
                  If you have 3 slips and a gully, the bowler must strictly commit to bowling on or outside the 4th stump channel.
                </p>

                <div className="p-3 bg-red-950/30 border border-red-500/20 rounded-xl space-y-1">
                  <p className="text-[11px] font-bold text-red-300">
                    SCA Match Rule:
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Never bowl onto batsman's pads when your boundary riders are stacked on the off-side. Bowling discipline dictates match control.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
