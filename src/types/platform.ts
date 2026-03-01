export interface Member {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
  maritalStatus: string;
  status: "visitor" | "member" | "volunteer" | "leader" | "student";
  department: string;
  joinDate: string;
  serviceAttended: string;
  engagementScore: number;
  lastActivity: string;
  attendanceFrequency: string;
  photo: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  department: string;
  location: string;
  startDate: string;
  endDate: string;
  capacity: number;
  type: "service" | "program" | "conference" | "cohort";
  registeredCount: number;
  attendedCount: number;
}

export interface Cohort {
  id: string;
  name: string;
  program: string;
  startDate: string;
  endDate: string;
  instructor: string;
  capacity: number;
  enrolledCount: number;
  completedCount: number;
  status: "active" | "completed" | "upcoming";
}

export interface Message {
  id: string;
  subject: string;
  body: string;
  channel: "email" | "sms" | "whatsapp";
  recipients: string;
  sentDate: string;
  status: "delivered" | "scheduled" | "failed";
  sentCount: number;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  memberCount: number;
  color: string;
}

export interface DashboardStats {
  totalMembers: number;
  newMembersThisMonth: number;
  activeMembers: number;
  inactiveMembers: number;
  upcomingEvents: number;
  eventAttendanceRate: number;
  totalDepartments: number;
  messagesThisMonth: number;
  activeCohorts: number;
  cohortEnrollments: number;
}
