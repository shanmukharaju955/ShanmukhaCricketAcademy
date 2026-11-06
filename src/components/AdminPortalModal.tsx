import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Camera, 
  Upload, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle2, 
  Users, 
  Calendar, 
  ShoppingBag, 
  DollarSign, 
  Activity, 
  RefreshCw, 
  Sparkles, 
  X, 
  Search, 
  Filter, 
  Eye, 
  Check, 
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Trophy,
  Award,
  Package,
  Layers,
  ArrowRight
} from 'lucide-react';
import { COACHES_DATA, FACILITIES_DATA, ACADEMY_INFO, PROGRAMS_DATA } from '../data/mockData';
import { Coach, TrainingProgram } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StudentEnrollment {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  category: string;
  program: string;
  batch: string;
  status: 'Active' | 'Pending Assessment' | 'Completed';
  feesPaid: boolean;
  joinDate: string;
}

interface SlotBooking {
  id: string;
  name: string;
  phone: string;
  netType: string;
  date: string;
  time: string;
  coachAssigned: string;
  amount: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

interface StoreOrder {
  id: string;
  customerName: string;
  items: string;
  totalAmount: number;
  paymentMethod: string;
  status: 'Delivered' | 'In Process' | 'Ready for Pickup';
  date: string;
}

const DEFAULT_ENROLLMENTS: StudentEnrollment[] = [
  { id: 'SCA-101', name: 'Rohan Sharma', age: 14, phone: '+91 98451 22334', email: 'rohan.cricket@gmail.com', category: 'Batting / All-rounder', program: 'High Performance Academy', batch: 'Morning 6:00 AM - 8:30 AM', status: 'Active', feesPaid: true, joinDate: '2026-06-10' },
  { id: 'SCA-102', name: 'Aditya Reddy', age: 16, phone: '+91 94401 88722', email: 'aditya.fastbowl@gmail.com', category: 'Right-Arm Fast Seam', program: 'State & Ranji Trophy Prep', batch: 'Evening 4:30 PM - 7:30 PM', status: 'Active', feesPaid: true, joinDate: '2026-05-18' },
  { id: 'SCA-103', name: 'Karthik Varma', age: 11, phone: '+91 99882 11099', email: 'varma.parents@gmail.com', category: 'Wicket-keeper Batsman', program: 'Junior Foundation Under-13', batch: 'Weekend Intensive', status: 'Pending Assessment', feesPaid: false, joinDate: '2026-08-12' },
  { id: 'SCA-104', name: 'Pooja Deshmukh', age: 17, phone: '+91 97003 44551', email: 'pooja.spin@gmail.com', category: 'Left-Arm Orthodox Spin', program: 'Girls Elite Excellence Wing', batch: 'Evening 4:30 PM - 7:30 PM', status: 'Active', feesPaid: true, joinDate: '2026-04-02' },
  { id: 'SCA-105', name: 'Nikhil Chowdary', age: 13, phone: '+91 91234 56780', email: 'nikhil.chowdary@gmail.com', category: 'Middle-order Batsman', program: 'Weekend Warriors & Fitness', batch: 'Sat-Sun 7:00 AM - 10:00 AM', status: 'Active', feesPaid: true, joinDate: '2026-07-01' },
];

const DEFAULT_BOOKINGS: SlotBooking[] = [
  { id: 'BK-9021', name: 'Suresh Kumar', phone: '+91 98480 12345', netType: 'Red Soil Turf Net #1', date: '2026-08-16', time: '06:30 AM - 07:30 AM', coachAssigned: 'Shanmukha V. (Head Coach)', amount: 1200, status: 'Confirmed' },
  { id: 'BK-9022', name: 'Vikramaditya', phone: '+91 97001 98765', netType: 'Bola 283 Bowling Machine Net #4', date: '2026-08-16', time: '05:00 PM - 06:00 PM', coachAssigned: 'Imran Khan (Fast Bowling)', amount: 1500, status: 'Confirmed' },
  { id: 'BK-9023', name: 'Rajesh G.', phone: '+91 94411 22334', netType: 'Black Soil Spin Track Net #3', date: '2026-08-17', time: '07:00 AM - 08:00 AM', coachAssigned: 'Vikram Rathour (Spin Coach)', amount: 1000, status: 'Pending' },
];

const DEFAULT_ORDERS: StoreOrder[] = [
  { id: 'ORD-701', customerName: 'Ramesh Babu', items: 'SCA Pro English Willow Match Bat (Grade-1)', totalAmount: 8999, paymentMethod: 'UPI (PhonePe)', status: 'Ready for Pickup', date: '2026-08-14' },
  { id: 'ORD-702', customerName: 'Praveen K.', items: 'SCA Official Academy Complete Cadet Kit Bag', totalAmount: 12999, paymentMethod: 'Razorpay / Card', status: 'Delivered', date: '2026-08-13' },
  { id: 'ORD-703', customerName: 'Anand V.', items: 'SCA Pro Matrix Turf Spikes Shoes (Size 8)', totalAmount: 3799, paymentMethod: 'Cash at Academy', status: 'Delivered', date: '2026-08-11' },
];

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'coaches' | 'programs' | 'students' | 'bookings' | 'store'>('overview');

  // Coaches State
  const [coaches, setCoaches] = useState<Coach[]>(() => {
    try {
      const saved = localStorage.getItem('shanmukha_academy_coaches_custom_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return COACHES_DATA;
  });
  const [selectedCoachId, setSelectedCoachId] = useState<string>(coaches[0]?.id || 'coach-shanmukha');
  const [coachForm, setCoachForm] = useState<Coach>(coaches[0] || COACHES_DATA[0]);

  // Programs State
  const [programs, setPrograms] = useState<TrainingProgram[]>(() => {
    try {
      const saved = localStorage.getItem('shanmukha_academy_programs_custom_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return PROGRAMS_DATA;
  });
  const [selectedProgramId, setSelectedProgramId] = useState<string>(programs[0]?.id || 'grassroots');
  const [programForm, setProgramForm] = useState<TrainingProgram>(programs[0] || PROGRAMS_DATA[0]);

  // Students & Bookings State
  const [students, setStudents] = useState<StudentEnrollment[]>(() => {
    try {
      const saved = localStorage.getItem('shanmukha_admin_students');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_ENROLLMENTS;
  });
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: 14,
    phone: '',
    email: '',
    category: 'Batting All-Rounder',
    program: 'High Performance Academy',
    batch: 'Morning 6:00 AM - 8:30 AM',
  });
  const [showAddStudent, setShowAddStudent] = useState(false);

  const [bookings, setBookings] = useState<SlotBooking[]>(() => {
    try {
      const saved = localStorage.getItem('shanmukha_admin_bookings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_BOOKINGS;
  });

  const [orders] = useState<StoreOrder[]>(DEFAULT_ORDERS);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync selected coach into form
  useEffect(() => {
    const found = coaches.find(c => c.id === selectedCoachId) || coaches[0];
    if (found) {
      setCoachForm({ ...found });
    }
  }, [selectedCoachId, coaches]);

  // Sync selected program into form
  useEffect(() => {
    const found = programs.find(p => p.id === selectedProgramId) || programs[0];
    if (found) {
      setProgramForm({ ...found });
    }
  }, [selectedProgramId, programs]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim().toLowerCase();
    const p = passcode.trim().toLowerCase();

    // Valid usernames: 'shanmukha', 'admin', 'ceo', 'vaddeshanmukh781@gmail.com', 'shanmukh', 'sca'
    const validUsers = ['shanmukha', 'shanmukh', 'admin', 'ceo', 'vaddeshanmukh781@gmail.com', 'sca', '9063183329', '6305001344'];
    // Valid passcodes
    const allowedPasscodes = ['shanmukha781', 'admin123', '78120', 'sca2026', 'admin', '9063183329', '6305001344'];

    if (validUsers.includes(u) && allowedPasscodes.includes(p)) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Username or Password! Please check your credentials.');
    }
  };

  const handleSaveCoach = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = coaches.map(c => c.id === coachForm.id ? coachForm : c);
    setCoaches(updated);
    try {
      localStorage.setItem('shanmukha_academy_coaches_custom_v1', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.warn(err);
    }
    showToast('Coach details & photo saved successfully!');
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = programs.map(p => p.id === programForm.id ? programForm : p);
    setPrograms(updated);
    try {
      localStorage.setItem('shanmukha_academy_programs_custom_v1', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.warn(err);
    }
    showToast('Program & Fee structure updated successfully!');
  };

  const handleCoachFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCoachForm(prev => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.phone) return;

    const newRec: StudentEnrollment = {
      id: `SCA-${Math.floor(100 + Math.random() * 900)}`,
      name: newStudent.name,
      age: Number(newStudent.age) || 14,
      phone: newStudent.phone,
      email: newStudent.email || 'student@academy.com',
      category: newStudent.category,
      program: newStudent.program,
      batch: newStudent.batch,
      status: 'Active',
      feesPaid: true,
      joinDate: new Date().toISOString().split('T')[0],
    };

    const updated = [newRec, ...students];
    setStudents(updated);
    try {
      localStorage.setItem('shanmukha_admin_students', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }
    setNewStudent({
      name: '',
      age: 14,
      phone: '',
      email: '',
      category: 'Batting All-Rounder',
      program: 'High Performance Academy',
      batch: 'Morning 6:00 AM - 8:30 AM',
    });
    setShowAddStudent(false);
    showToast('New Cadet Enrolled Successfully!');
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to remove this cadet record?')) {
      const updated = students.filter(s => s.id !== id);
      setStudents(updated);
      try {
        localStorage.setItem('shanmukha_admin_students', JSON.stringify(updated));
      } catch (err) {
        console.warn(err);
      }
      showToast('Cadet record removed.');
    }
  };

  const handleToggleFeePaid = (id: string) => {
    const updated = students.map(s => s.id === id ? { ...s, feesPaid: !s.feesPaid } : s);
    setStudents(updated);
    try {
      localStorage.setItem('shanmukha_admin_students', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }
    showToast('Fee status updated!');
  };

  const handleUpdateBookingStatus = (id: string, status: 'Confirmed' | 'Cancelled') => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    try {
      localStorage.setItem('shanmukha_admin_bookings', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }
    showToast(`Booking ${id} set to ${status}!`);
  };

  const showToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-0.5 shadow-lg flex items-center justify-center text-slate-950">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-white">CEO & Admin Portal</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Secure Access
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Shanmukha Cricket Academy — Operations, Coaching & Admissions</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveSuccessMsg && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 animate-pulse">
                <Check className="w-3.5 h-3.5" />
                {saveSuccessMsg}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="max-w-md w-full space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                <Lock className="w-8 h-8" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">CEO & Admin Access</h3>
                <p className="text-xs text-slate-400">
                  కోచ్‌ల ఫోటోలు, ప్రోగ్రామ్ ఫీజులు, విద్యార్థుల అడ్మిషన్లు, నెట్ బుకింగ్స్ & అకౌంట్స్ మేనేజ్ చేయడానికి లాగిన్ అవ్వండి.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Admin Username / ID
                  </label>
                  <input
                    type="text"
                    autoFocus
                    placeholder="e.g. shanmukha or admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none font-medium placeholder:text-slate-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Admin Password / Security Key
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none tracking-widest font-mono font-bold placeholder:text-slate-600"
                    required
                  />
                  {authError && (
                    <p className="text-xs text-rose-400 font-bold mt-2.5 flex items-center gap-1.5 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/40">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{authError}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Sign In as Admin</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-slate-950/80 border-r border-slate-800 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('coaches')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'coaches'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Manage Coaches & Photos</span>
              </button>

              <button
                onClick={() => setActiveTab('programs')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'programs'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Programs & Fee Settings ({programs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'students'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Students & Cadets ({students.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'bookings'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Turf Net Bookings ({bookings.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('store')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'store'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-purple-400" />
                <span>Store Orders ({orders.length})</span>
              </button>

              <div className="mt-auto pt-4 border-t border-slate-900 hidden md:block">
                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Logged in as</span>
                  <p className="text-xs font-extrabold text-white">Shanmukha V. (CEO)</p>
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="text-[10px] text-rose-400 hover:underline pt-1 block w-full text-center cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 sm:p-7 overflow-y-auto max-h-[82vh]">
              
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Academy Operations Dashboard</h3>
                    <p className="text-xs text-slate-400">Real-time overview of trainee registrations, bookings, and revenue.</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Active Enrolled Cadets</p>
                      <p className="text-2xl font-black text-white mt-1">{students.filter(s => s.status === 'Active').length}</p>
                      <span className="text-[10px] text-emerald-400 font-bold">● KSCA League Batch</span>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Monthly Fee Collections</p>
                      <p className="text-2xl font-black text-amber-400 mt-1">₹3,45,000</p>
                      <span className="text-[10px] text-slate-400 font-semibold">94% Collection Rate</span>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Turf Nets Reserved Today</p>
                      <p className="text-2xl font-black text-blue-400 mt-1">{bookings.length}</p>
                      <span className="text-[10px] text-blue-300 font-semibold">8 Wickets Active</span>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Faculty Members</p>
                      <p className="text-2xl font-black text-rose-400 mt-1">{coaches.length}</p>
                      <span className="text-[10px] text-emerald-400 font-semibold">100% Certified</span>
                    </div>
                  </div>

                  {/* Quick Actions Card */}
                  <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-amber-950/40 border border-slate-800 rounded-3xl p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-base font-black text-white">Central Academy Management</h4>
                        <p className="text-xs text-slate-300 mt-1">
                          Manage coach profiles, update program fee slabs, approve student trials, and assign turf nets.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveTab('coaches')}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                        >
                          Modify Coaches
                        </button>
                        <button
                          onClick={() => setActiveTab('programs')}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer"
                        >
                          Modify Fees
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: COACHES & PHOTOS MANAGEMENT */}
              {activeTab === 'coaches' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-white">Coaches & Mentors Management</h3>
                      <p className="text-xs text-slate-400">కోచ్‌ల ఫోటోలను మీ మొబైల్/ల్యాప్‌టాప్ నుండి అప్‌లోడ్ చేయండి లేదా లింక్ మార్చండి</p>
                    </div>
                  </div>

                  {/* Coach Selector */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
                    {coaches.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCoachId(c.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          selectedCoachId === c.id
                            ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-800'
                        }`}
                      >
                        <img src={c.image} alt={c.name} className="w-5 h-5 rounded-full object-cover" />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Coach Edit Form */}
                  <form onSubmit={handleSaveCoach} className="space-y-5 bg-slate-950/60 p-6 rounded-3xl border border-slate-800">
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
                      <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-xl shrink-0 group">
                        <img src={coachForm.image} alt={coachForm.name} className="w-full h-full object-cover" />
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity"
                        >
                          <Camera className="w-6 h-6 text-amber-400" />
                          <span className="text-[10px] font-bold mt-1">Change Photo</span>
                        </div>
                      </div>

                      <div className="space-y-2 flex-1 w-full">
                        <label className="block text-xs font-bold text-slate-300">Upload Coach Photo (From Device or Image Link)</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={coachForm.image}
                            onChange={(e) => setCoachForm(prev => ({ ...prev, image: e.target.value }))}
                            placeholder="Enter image URL..."
                            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleCoachFileUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-amber-300 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400">JPG, PNG, WebP supported. Max 5MB recommended.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Coach Full Name</label>
                        <input
                          type="text"
                          value={coachForm.name}
                          onChange={(e) => setCoachForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Designation / Role</label>
                        <input
                          type="text"
                          value={coachForm.role}
                          onChange={(e) => setCoachForm(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">BCCI / ICC Certification</label>
                        <input
                          type="text"
                          value={coachForm.certification}
                          onChange={(e) => setCoachForm(prev => ({ ...prev, certification: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Years of Coaching Experience</label>
                        <input
                          type="text"
                          value={coachForm.experience}
                          onChange={(e) => setCoachForm(prev => ({ ...prev, experience: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Coach Bio & Philosophy</label>
                      <textarea
                        rows={3}
                        value={coachForm.bio}
                        onChange={(e) => setCoachForm(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 flex items-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-slate-950" />
                        <span>Save & Publish Coach Updates</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: PROGRAMS & FEES MANAGEMENT */}
              {activeTab === 'programs' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Programs & Tuition Fee Management</h3>
                    <p className="text-xs text-slate-400">Modify coaching curriculums, batch timings, and tuition fees published on the website.</p>
                  </div>

                  {/* Program Selector Pills */}
                  <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
                    {programs.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProgramId(p.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          selectedProgramId === p.id
                            ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-800'
                        }`}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>

                  {/* Program Edit Form */}
                  <form onSubmit={handleSaveProgram} className="space-y-5 bg-slate-950/60 p-6 rounded-3xl border border-slate-800">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-wider text-amber-400">Editing Program ID: {programForm.id}</span>
                        <h4 className="text-lg font-black text-white">{programForm.title}</h4>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30">
                        {programForm.level}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Program Title</label>
                        <input
                          type="text"
                          value={programForm.title}
                          onChange={(e) => setProgramForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Age Group</label>
                        <input
                          type="text"
                          value={programForm.ageGroup}
                          onChange={(e) => setProgramForm(prev => ({ ...prev, ageGroup: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Tagline / Overview Description</label>
                      <input
                        type="text"
                        value={programForm.tagline}
                        onChange={(e) => setProgramForm(prev => ({ ...prev, tagline: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Training Schedule / Days</label>
                        <input
                          type="text"
                          value={programForm.schedule}
                          onChange={(e) => setProgramForm(prev => ({ ...prev, schedule: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Badge / Tag (Optional)</label>
                        <input
                          type="text"
                          value={programForm.badge || ''}
                          onChange={(e) => setProgramForm(prev => ({ ...prev, badge: e.target.value }))}
                          placeholder="e.g. Most Popular, Fast Track"
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Fees Grid */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Tuition Fee Structure (₹ INR)</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Monthly Fee (₹)</label>
                          <input
                            type="number"
                            value={programForm.monthlyFee}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, monthlyFee: Number(e.target.value) || 0 }))}
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 font-bold text-sm focus:border-amber-400 focus:outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Quarterly Fee (₹)</label>
                          <input
                            type="number"
                            value={programForm.quarterlyFee}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, quarterlyFee: Number(e.target.value) || 0 }))}
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 font-bold text-sm focus:border-amber-400 focus:outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Annual Fee (₹)</label>
                          <input
                            type="number"
                            value={programForm.annualFee}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, annualFee: Number(e.target.value) || 0 }))}
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 font-bold text-sm focus:border-amber-400 focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 flex items-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-slate-950" />
                        <span>Save & Publish Program Updates</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: STUDENTS MANAGEMENT */}
              {activeTab === 'students' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-white">Enrolled Cadets & Students</h3>
                      <p className="text-xs text-slate-400">Manage student profiles, batches, and fee status</p>
                    </div>
                    <button
                      onClick={() => setShowAddStudent(!showAddStudent)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-xs flex items-center gap-2 self-start cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showAddStudent ? 'Close Form' : 'Enroll New Cadet'}</span>
                    </button>
                  </div>

                  {/* Add Student Form */}
                  {showAddStudent && (
                    <form onSubmit={handleAddStudent} className="p-5 bg-slate-950/80 rounded-2xl border border-emerald-500/40 space-y-4 animate-fadeIn">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Add New Trainee Record</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Student Name"
                          value={newStudent.name}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                          required
                        />
                        <input
                          type="number"
                          placeholder="Age"
                          value={newStudent.age}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, age: Number(e.target.value) }))}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Guardian Phone"
                          value={newStudent.phone}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, phone: e.target.value }))}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <select
                          value={newStudent.category}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, category: e.target.value }))}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                        >
                          <option>Batting All-Rounder</option>
                          <option>Fast Seam Bowler</option>
                          <option>Spin Wizard</option>
                          <option>Wicket-keeper Batsman</option>
                        </select>
                        <select
                          value={newStudent.program}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, program: e.target.value }))}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                        >
                          <option>High Performance Academy</option>
                          <option>State & Ranji Trophy Prep</option>
                          <option>Junior Foundation Under-13</option>
                          <option>Weekend Warriors & Fitness</option>
                        </select>
                        <button
                          type="submit"
                          className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase cursor-pointer"
                        >
                          Save Cadet
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Student Table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                          <th className="p-3">Cadet ID / Name</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Batch & Program</th>
                          <th className="p-3">Fees Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {students.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-3">
                              <p className="font-bold text-white">{st.name}</p>
                              <p className="text-[10px] text-slate-400">{st.id} • Age {st.age} • {st.phone}</p>
                            </td>
                            <td className="p-3 text-slate-300">{st.category}</td>
                            <td className="p-3">
                              <p className="text-white font-medium">{st.program}</p>
                              <p className="text-[10px] text-slate-400">{st.batch}</p>
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => handleToggleFeePaid(st.id)}
                                className={`px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer ${
                                  st.feesPaid
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                }`}
                              >
                                {st.feesPaid ? '✓ Fees Paid' : '✕ Payment Due'}
                              </button>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleDeleteStudent(st.id)}
                                className="p-1.5 rounded-lg bg-slate-850 hover:bg-rose-600/30 text-rose-400 transition-colors cursor-pointer"
                                title="Remove Student"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: NET BOOKINGS MANAGEMENT */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Turf Net & Bowling Machine Reservations</h3>
                    <p className="text-xs text-slate-400">Review practice slot allocations, assigned mentors, and status.</p>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                          <th className="p-3">Booking ID / User</th>
                          <th className="p-3">Net Type</th>
                          <th className="p-3">Schedule Slot</th>
                          <th className="p-3">Assigned Mentor</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-3">
                              <p className="font-bold text-white">{b.name}</p>
                              <p className="text-[10px] text-slate-400">{b.id} • {b.phone}</p>
                            </td>
                            <td className="p-3 text-slate-300 font-medium">{b.netType}</td>
                            <td className="p-3">
                              <p className="text-white">{b.date}</p>
                              <p className="text-[10px] text-amber-400">{b.time}</p>
                            </td>
                            <td className="p-3 text-slate-300">{b.coachAssigned}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                b.status === 'Confirmed'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : b.status === 'Cancelled'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-1">
                              {b.status !== 'Confirmed' && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, 'Confirmed')}
                                  className="px-2 py-1 rounded-md bg-emerald-600/30 text-emerald-300 text-[10px] font-bold hover:bg-emerald-600 hover:text-white cursor-pointer"
                                >
                                  Confirm
                                </button>
                              )}
                              {b.status !== 'Cancelled' && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, 'Cancelled')}
                                  className="px-2 py-1 rounded-md bg-rose-600/30 text-rose-300 text-[10px] font-bold hover:bg-rose-600 hover:text-white cursor-pointer"
                                >
                                  Cancel
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: STORE ORDERS MANAGEMENT */}
              {activeTab === 'store' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Academy Kit & Equipment Orders</h3>
                    <p className="text-xs text-slate-400">Track orders for match bats, training kits, balls, and pads.</p>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                          <th className="p-3">Order ID / Buyer</th>
                          <th className="p-3">Items Purchased</th>
                          <th className="p-3">Total Amount</th>
                          <th className="p-3">Payment Method</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-3">
                              <p className="font-bold text-white">{o.customerName}</p>
                              <p className="text-[10px] text-slate-400">{o.id} • {o.date}</p>
                            </td>
                            <td className="p-3 text-slate-300">{o.items}</td>
                            <td className="p-3 font-bold text-amber-400">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                            <td className="p-3 text-slate-400">{o.paymentMethod}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
