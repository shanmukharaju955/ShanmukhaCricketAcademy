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
  ArrowRight,
  GraduationCap,
  KeyRound,
  LogOut,
  Target
} from 'lucide-react';
import { COACHES_DATA, FACILITIES_DATA, ACADEMY_INFO, PROGRAMS_DATA } from '../data/mockData';
import { Coach, TrainingProgram } from '../types';
import { STUDENTS_DATA } from '../data/studentsData';
import { StudentAccount, PortalAuthUser } from '../types/portal';
import { StudentPortalView } from './StudentPortalView';

interface UnifiedPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenAICoach: () => void;
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

export const UnifiedPortalModal: React.FC<UnifiedPortalModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenBooking,
  onOpenAICoach,
}) => {
  // Login Role Tab (Student vs Admin on the exact same login screen)
  const [loginRole, setLoginRole] = useState<'student' | 'admin'>('student');

  // Unified Auth State
  const [authUser, setAuthUser] = useState<PortalAuthUser>(() => {
    try {
      const saved = localStorage.getItem('shanmukha_portal_auth_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  // Login Form States
  const [identifier, setIdentifier] = useState(''); // Cadet ID / mobile or admin username
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin Portal Tab
  const [adminTab, setAdminTab] = useState<'overview' | 'coaches' | 'programs' | 'students' | 'bookings' | 'store'>('overview');

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

  // Students State
  const [studentsList, setStudentsList] = useState<StudentAccount[]>(() => {
    try {
      const saved = localStorage.getItem('shanmukha_academy_students_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return STUDENTS_DATA;
  });
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: 14,
    phone: '',
    email: '',
    category: 'Top-Order Batsman / Right-Hand Bat',
    program: 'High Performance Academy',
    batch: 'Morning 6:00 AM - 8:30 AM',
  });

  // Bookings & Orders
  const [bookings, setBookings] = useState<SlotBooking[]>(() => {
    try {
      const saved = localStorage.getItem('shanmukha_admin_bookings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_BOOKINGS;
  });
  const [orders] = useState<StoreOrder[]>(DEFAULT_ORDERS);

  const [toastMsg, setToastMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync coach selection
  useEffect(() => {
    const found = coaches.find(c => c.id === selectedCoachId) || coaches[0];
    if (found) setCoachForm({ ...found });
  }, [selectedCoachId, coaches]);

  // Sync program selection
  useEffect(() => {
    const found = programs.find(p => p.id === selectedProgramId) || programs[0];
    if (found) setProgramForm({ ...found });
  }, [selectedProgramId, programs]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Unified Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const idClean = identifier.trim().toLowerCase();
    const passClean = password.trim().toLowerCase();

    if (loginRole === 'admin') {
      const validAdminUsers = ['shanmukha', 'shanmukh', 'admin', 'ceo', 'vaddeshanmukh781@gmail.com', 'sca', '9063183329', '6305001344'];
      const validAdminPass = ['shanmukha781', 'admin123', '78120', 'sca2026', 'admin', '9063183329', '6305001344'];

      if (validAdminUsers.includes(idClean) && validAdminPass.includes(passClean)) {
        const user: PortalAuthUser = { type: 'admin', username: idClean, displayName: 'Coach Shanmukha (CEO & Founder)' };
        setAuthUser(user);
        localStorage.setItem('shanmukha_portal_auth_user', JSON.stringify(user));
        setAuthError('');
        showToast('Welcome back, Coach Shanmukha!');
      } else {
        setAuthError('Invalid Admin credentials! Use username: "shanmukha" and password: "admin123".');
      }
    } else {
      // Student Login
      const matched = studentsList.find(s => 
        s.id.toLowerCase() === idClean || 
        s.phone.toLowerCase().includes(idClean) ||
        s.name.toLowerCase().includes(idClean)
      );

      if (matched) {
        if (passClean === matched.passcode.toLowerCase() || passClean === '1234' || passClean === 'student' || passClean === 'sca') {
          const user: PortalAuthUser = { type: 'student', student: matched };
          setAuthUser(user);
          localStorage.setItem('shanmukha_portal_auth_user', JSON.stringify(user));
          setAuthError('');
          showToast(`Welcome back, ${matched.name}!`);
        } else {
          setAuthError('Incorrect Student PIN / Passcode! (Default demo PIN is 1234)');
        }
      } else {
        setAuthError('Cadet record not found! Try Cadet ID "SCA-101" or phone "9845122334".');
      }
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem('shanmukha_portal_auth_user');
    setIdentifier('');
    setPassword('');
    setAuthError('');
    showToast('Successfully logged out.');
  };

  const handleQuickDemoStudent = (st: StudentAccount) => {
    setLoginRole('student');
    setIdentifier(st.id);
    setPassword(st.passcode);
    setAuthError('');
  };

  const handleQuickDemoAdmin = () => {
    setLoginRole('admin');
    setIdentifier('shanmukha');
    setPassword('admin123');
    setAuthError('');
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
    showToast('Coach profile updated successfully!');
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
    showToast('Program fee structure updated successfully!');
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.phone) return;

    const newRec: StudentAccount = {
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
      passcode: '1234',
      photoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400',
      assignedCoach: 'Coach Shanmukha V.',
      attendanceRate: 92,
      battingRating: 85,
      fitnessScore: 'Yo-Yo Test: 17.8',
      coachFeedback: 'New trainee inducted. Recommended 3 days per week net practice.',
      nextSession: 'Upcoming batch practice scheduled.',
      assignedDrills: [
        { id: 'd-new-1', title: 'Basic Forward Defense & Stance Balance', target: '30 reps', completed: false }
      ],
      feeInvoice: {
        receiptNo: `SCA-REC-2026-${Math.floor(100 + Math.random() * 899)}`,
        amount: 4500,
        billingCycle: 'Monthly First Term',
        dueDate: '10-07-2026',
        status: 'Paid'
      }
    };

    const updated = [newRec, ...studentsList];
    setStudentsList(updated);
    try {
      localStorage.setItem('shanmukha_academy_students_v1', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }
    setNewStudent({
      name: '',
      age: 14,
      phone: '',
      email: '',
      category: 'Top-Order Batsman / Right-Hand Bat',
      program: 'High Performance Academy',
      batch: 'Morning 6:00 AM - 8:30 AM',
    });
    setShowAddStudent(false);
    showToast('New Cadet Enrolled Successfully!');
  };

  const handleToggleFeeStatus = (id: string) => {
    const updated = studentsList.map(s => s.id === id ? { ...s, feesPaid: !s.feesPaid } : s);
    setStudentsList(updated);
    try {
      localStorage.setItem('shanmukha_academy_students_v1', JSON.stringify(updated));
    } catch (err) {}
    showToast('Fee payment status updated!');
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to remove this cadet record?')) {
      const updated = studentsList.filter(s => s.id !== id);
      setStudentsList(updated);
      try {
        localStorage.setItem('shanmukha_academy_students_v1', JSON.stringify(updated));
      } catch (err) {}
      showToast('Cadet record removed.');
    }
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-700 to-amber-600 p-0.5 shadow-lg flex items-center justify-center text-white font-display text-xl font-black">
              SCA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-white">Shanmukha Cricket Academy Portal</span>
                {authUser ? (
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    authUser.type === 'admin'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {authUser.type === 'admin' ? '🛡️ Admin Session' : '🎓 Cadet Session'}
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Unified Login
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">Single Access Hub for Cadets, Mentors, and Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {toastMsg && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 animate-pulse">
                <Check className="w-3.5 h-3.5" />
                {toastMsg}
              </span>
            )}
            {authUser && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        {!authUser ? (
          /* ======================================================== */
          /* UNIFIED LOGIN SCREEN (STUDENTS & ADMIN ON SAME PAGE)     */
          /* ======================================================== */
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center my-auto overflow-y-auto">
            <div className="max-w-md w-full space-y-6">
              
              {/* Role Toggle Switcher */}
              <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    setLoginRole('student');
                    setAuthError('');
                    setIdentifier('SCA-101');
                    setPassword('1234');
                  }}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    loginRole === 'student'
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student / Cadet</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoginRole('admin');
                    setAuthError('');
                    setIdentifier('shanmukha');
                    setPassword('admin123');
                  }}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    loginRole === 'admin'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>CEO & Admin</span>
                </button>
              </div>

              {/* Login Description */}
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {loginRole === 'student' ? 'Cadet Student Portal Sign In' : 'CEO & Head Coach Admin Access'}
                </h3>
                <p className="text-xs text-slate-400">
                  {loginRole === 'student'
                    ? 'Access your training schedule, coach biomechanics reports, fee receipts, and homework drills.'
                    : 'Manage coach faculty, tuition fee slabs, student registrations, and turf net bookings.'}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {loginRole === 'student' ? 'Cadet ID or Registered Mobile No' : 'Admin Username / Email'}
                  </label>
                  <input
                    type="text"
                    autoFocus
                    placeholder={loginRole === 'student' ? 'e.g. SCA-101 or 9845122334' : 'e.g. shanmukha or admin'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none font-medium placeholder:text-slate-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {loginRole === 'student' ? '4-Digit Student PIN' : 'Admin Security Key'}
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none tracking-widest font-mono font-bold placeholder:text-slate-600"
                    required
                  />
                  {authError && (
                    <p className="text-xs text-rose-400 font-bold mt-2.5 flex items-center gap-1.5 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/40 animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{authError}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full mt-2 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                    loginRole === 'student'
                      ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-red-600/30'
                      : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black shadow-amber-500/30'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{loginRole === 'student' ? 'Sign In to Cadet Dashboard' : 'Sign In as Administrator'}</span>
                </button>
              </form>

              {/* Quick One-Click Demo Accounts */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Quick Demo One-Click Sign In:
                </span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoStudent(studentsList[0])}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-white font-medium cursor-pointer"
                  >
                    🎓 Rohan (SCA-101)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoStudent(studentsList[1])}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-white font-medium cursor-pointer"
                  >
                    ⚡ Aditya (Fast Bowler)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoStudent(studentsList[2])}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-white font-medium cursor-pointer"
                  >
                    🎯 Pooja (Spin Wing)
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickDemoAdmin}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-[11px] text-amber-300 font-bold cursor-pointer"
                  >
                    🛡️ Coach Shanmukha (Admin)
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : authUser.type === 'student' ? (
          /* ======================================================== */
          /* STUDENT / CADET PORTAL VIEW                              */
          /* ======================================================== */
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto">
            <StudentPortalView
              student={authUser.student}
              onLogout={handleLogout}
              onOpenBooking={onOpenBooking}
              onOpenAICoach={onOpenAICoach}
            />
          </div>
        ) : (
          /* ======================================================== */
          /* ADMIN / CEO OPERATIONS VIEW                              */
          /* ======================================================== */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-slate-950/80 border-r border-slate-800 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setAdminTab('overview')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'overview'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => setAdminTab('coaches')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'coaches'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Manage Coaches & Photos</span>
              </button>

              <button
                onClick={() => setAdminTab('programs')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'programs'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Programs & Fee Settings ({programs.length})</span>
              </button>

              <button
                onClick={() => setAdminTab('students')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'students'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Cadets & Students ({studentsList.length})</span>
              </button>

              <button
                onClick={() => setAdminTab('bookings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'bookings'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Turf Net Bookings ({bookings.length})</span>
              </button>

              <button
                onClick={() => setAdminTab('store')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'store'
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
                  <p className="text-xs font-extrabold text-white">Coach Shanmukha (CEO)</p>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] text-rose-400 hover:underline pt-1 block w-full text-center cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 sm:p-7 overflow-y-auto max-h-[82vh]">
              
              {/* TAB 1: OVERVIEW */}
              {adminTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Academy Operations Dashboard</h3>
                    <p className="text-xs text-slate-400">Real-time overview of trainee registrations, bookings, and revenue.</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Active Enrolled Cadets</p>
                      <p className="text-2xl font-black text-white mt-1">{studentsList.length}</p>
                      <span className="text-[10px] text-emerald-400 font-bold">● KSCA League Batch</span>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Monthly Fee Collections</p>
                      <p className="text-2xl font-black text-amber-400 mt-1">₹3,45,000</p>
                      <span className="text-[10px] text-slate-400 font-semibold">96% Collection Rate</span>
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
                          onClick={() => setAdminTab('coaches')}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                        >
                          Modify Coaches
                        </button>
                        <button
                          onClick={() => setAdminTab('programs')}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer"
                        >
                          Modify Fees
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: COACHES & PHOTOS */}
              {adminTab === 'coaches' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Coaches & Mentors Management</h3>
                    <p className="text-xs text-slate-400">కోచ్‌ల ఫోటోలను మీ మొబైల్/ల్యాప్‌టాప్ నుండి అప్‌లోడ్ చేయండి లేదా లింక్ మార్చండి</p>
                  </div>

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
                        <label className="block text-xs font-bold text-slate-300">Upload Coach Photo</label>
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

              {/* TAB 3: PROGRAMS & FEES */}
              {adminTab === 'programs' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Programs & Tuition Fee Management</h3>
                    <p className="text-xs text-slate-400">Modify coaching curriculums, batch timings, and tuition fees published on the website.</p>
                  </div>

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
              {adminTab === 'students' && (
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
                          <option>Top-Order Batsman / Right-Hand Bat</option>
                          <option>Right-Arm Fast Seam (Outswing)</option>
                          <option>Left-Arm Orthodox Spin</option>
                          <option>Wicket-Keeper Batsman</option>
                          <option>Middle-Order All-Rounder</option>
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
                          <option>Girls Elite Excellence Wing</option>
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
                        {studentsList.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-3">
                              <p className="font-bold text-white">{st.name}</p>
                              <p className="text-[10px] text-slate-400">{st.id} • Age {st.age} • PIN: {st.passcode}</p>
                            </td>
                            <td className="p-3 text-slate-300">{st.category}</td>
                            <td className="p-3">
                              <p className="text-white font-medium">{st.program}</p>
                              <p className="text-[10px] text-slate-400">{st.batch}</p>
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => handleToggleFeeStatus(st.id)}
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

              {/* TAB 5: NET BOOKINGS */}
              {adminTab === 'bookings' && (
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
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: STORE ORDERS */}
              {adminTab === 'store' && (
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
