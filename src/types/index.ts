export interface Coach {
  id: string;
  name: string;
  role: string;
  designation: string;
  experience: string;
  certification: string;
  specialty: string[];
  careerHighlights: string[];
  bio: string;
  image: string;
  rating: number;
  studentsTrained: number;
}

export interface TrainingProgram {
  id: string;
  title: string;
  tagline: string;
  ageGroup: string;
  level: 'Beginner' | 'Intermediate' | 'Elite / Pro' | 'All Levels';
  duration: string;
  schedule: string;
  monthlyFee: number;
  quarterlyFee: number;
  annualFee: number;
  features: string[];
  badge?: string;
  color: string;
  popular?: boolean;
}

export interface Facility {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  specs: string[];
  tag: string;
}

export interface Drill {
  id: string;
  title: string;
  category: 'Batting' | 'Bowling' | 'Fielding' | 'Wicketkeeping' | 'Fitness';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  targetSkill: string;
  durationMinutes: number;
  reps: string;
  equipment: string[];
  steps: string[];
  keyCoachingPoint: string;
  commonMistake: string;
  videoPlaceholderUrl?: string;
}

export interface ShotAnalysisResult {
  shotName: string;
  overallScore: number;
  executionRating: 'Elite' | 'Advanced' | 'Developing' | 'Needs Correction';
  keyStrengths: string[];
  biomechanicalFlaws: string[];
  headAndEyePosition: string;
  footworkAndWeightTransfer: string;
  batOrArmSwingMechanics: string;
  followThroughAndBalance: string;
  tacticalApplication: string;
  recommendedDrills: {
    drillName: string;
    objective: string;
    reps: string;
    instructions: string;
  }[];
  coachShanmukhaTip: string;
}

export interface TrainingPlanDay {
  day: string;
  focus: string;
  netSession: {
    drill: string;
    duration: string;
    intensity: 'High' | 'Medium' | 'Low';
  };
  fitnessAndStrength: {
    routine: string;
    setsAndReps: string;
  };
  mentalOrTacticalPrep: string;
}

export interface TrainingPlanResponse {
  planTitle: string;
  targetOverview: string;
  weeklySchedule: TrainingPlanDay[];
  nutritionAndRecoveryTips: string[];
  coachShanmukhaWeeklyChallenge: string;
}

export interface NetBooking {
  id: string;
  netType: string;
  date: string;
  timeSlot: string;
  durationHours: number;
  playerName: string;
  playerPhone: string;
  playerEmail: string;
  addBowlingMachine: boolean;
  addSpeedGunTracking: boolean;
  addCoachAssistance: boolean;
  totalPrice: number;
  status: 'Confirmed' | 'Pending';
}

export interface LiveMatchData {
  id: string;
  tournament: string;
  matchType: string;
  venue: string;
  status: 'LIVE' | 'COMPLETED' | 'UPCOMING';
  teamA: {
    name: string;
    shortName: string;
    score: string;
    overs: string;
    runRate: string;
    logoColor: string;
  };
  teamB: {
    name: string;
    shortName: string;
    score: string;
    overs: string;
    runRate: string;
    target?: string;
    logoColor: string;
  };
  currentBatsmen: {
    name: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    isOnStrike: boolean;
  }[];
  currentBowler: {
    name: string;
    overs: string;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
  };
  recentBalls: string[];
  wagonWheelZones: {
    zone: string;
    percentage: number;
    runs: number;
  }[];
}