export interface StudentAccount {
  id: string; // e.g. 'SCA-101'
  name: string;
  age: number;
  phone: string;
  email: string;
  category: string; // e.g. 'Top-Order Batsman', 'Right-Arm Fast Seam'
  program: string;
  batch: string;
  status: 'Active' | 'Pending Assessment' | 'Completed';
  feesPaid: boolean;
  joinDate: string;
  passcode: string; // e.g. '1234' or 'student123'
  photoUrl: string;
  assignedCoach: string;
  attendanceRate: number; // percentage, e.g. 94
  battingRating: number; // e.g. 91
  bowlingSpeed?: string; // e.g. '132 km/h'
  fitnessScore: string; // e.g. 'Yo-Yo Test: 18.4 (Elite)'
  coachFeedback: string;
  nextSession: string; // e.g. 'Tomorrow, 6:00 AM (Turf Net #2 - Red Soil)'
  recentScore?: string; // e.g. '68* (44 balls) vs Bangalore Colts'
  assignedDrills: {
    id: string;
    title: string;
    target: string;
    completed: boolean;
  }[];
  feeInvoice: {
    receiptNo: string;
    amount: number;
    billingCycle: string;
    dueDate: string;
    status: 'Paid' | 'Due';
  };
}

export type PortalAuthUser = 
  | { type: 'admin'; username: string; displayName: string }
  | { type: 'student'; student: StudentAccount }
  | null;
