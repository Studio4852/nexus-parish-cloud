import { Member, Event, Cohort, Message, Department, DashboardStats } from "@/types/platform";

export const mockDepartments: Department[] = [
  { id: "1", name: "Worship", head: "Pastor James", memberCount: 45, color: "hsl(42, 92%, 55%)" },
  { id: "2", name: "Youth Ministry", head: "Sister Grace", memberCount: 32, color: "hsl(210, 80%, 52%)" },
  { id: "3", name: "Children's Ministry", head: "Brother David", memberCount: 28, color: "hsl(152, 60%, 40%)" },
  { id: "4", name: "Media & Tech", head: "Deacon Mark", memberCount: 18, color: "hsl(280, 60%, 50%)" },
  { id: "5", name: "Outreach", head: "Sister Mary", memberCount: 24, color: "hsl(0, 72%, 51%)" },
  { id: "6", name: "Prayer Team", head: "Elder Paul", memberCount: 35, color: "hsl(190, 70%, 45%)" },
];

export const mockMembers: Member[] = [
  { id: "1", fullName: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1 555-0101", gender: "Female", dob: "1990-03-15", address: "123 Faith St", maritalStatus: "Married", status: "member", department: "Worship", joinDate: "2020-01-15", serviceAttended: "Sunday First Service", engagementScore: 92, lastActivity: "2026-02-28", attendanceFrequency: "Weekly", photo: "" },
  { id: "2", fullName: "Michael Okonkwo", email: "michael.o@email.com", phone: "+1 555-0102", gender: "Male", dob: "1985-07-22", address: "456 Grace Ave", maritalStatus: "Single", status: "leader", department: "Youth Ministry", joinDate: "2018-06-10", serviceAttended: "Sunday Second Service", engagementScore: 88, lastActivity: "2026-02-27", attendanceFrequency: "Weekly", photo: "" },
  { id: "3", fullName: "Grace Adeyemi", email: "grace.a@email.com", phone: "+1 555-0103", gender: "Female", dob: "1992-11-08", address: "789 Hope Blvd", maritalStatus: "Married", status: "volunteer", department: "Children's Ministry", joinDate: "2019-09-20", serviceAttended: "Sunday First Service", engagementScore: 75, lastActivity: "2026-02-25", attendanceFrequency: "Bi-weekly", photo: "" },
  { id: "4", fullName: "David Mensah", email: "david.m@email.com", phone: "+1 555-0104", gender: "Male", dob: "1988-01-30", address: "321 Mercy Lane", maritalStatus: "Married", status: "member", department: "Media & Tech", joinDate: "2021-03-05", serviceAttended: "Sunday Second Service", engagementScore: 65, lastActivity: "2026-02-20", attendanceFrequency: "Weekly", photo: "" },
  { id: "5", fullName: "Esther Williams", email: "esther.w@email.com", phone: "+1 555-0105", gender: "Female", dob: "1995-05-17", address: "654 Blessing Dr", maritalStatus: "Single", status: "student", department: "Youth Ministry", joinDate: "2023-01-12", serviceAttended: "Sunday First Service", engagementScore: 80, lastActivity: "2026-02-28", attendanceFrequency: "Weekly", photo: "" },
  { id: "6", fullName: "John Afolabi", email: "john.a@email.com", phone: "+1 555-0106", gender: "Male", dob: "1978-09-03", address: "987 Covenant Rd", maritalStatus: "Married", status: "leader", department: "Prayer Team", joinDate: "2015-04-18", serviceAttended: "Sunday First Service", engagementScore: 95, lastActivity: "2026-02-28", attendanceFrequency: "Weekly", photo: "" },
  { id: "7", fullName: "Ruth Okeke", email: "ruth.o@email.com", phone: "+1 555-0107", gender: "Female", dob: "1993-12-25", address: "147 Victory St", maritalStatus: "Single", status: "visitor", department: "", joinDate: "2026-02-01", serviceAttended: "Sunday Second Service", engagementScore: 20, lastActivity: "2026-02-15", attendanceFrequency: "First-time", photo: "" },
  { id: "8", fullName: "Peter Eze", email: "peter.e@email.com", phone: "+1 555-0108", gender: "Male", dob: "1982-06-14", address: "258 Harvest Blvd", maritalStatus: "Married", status: "volunteer", department: "Outreach", joinDate: "2019-11-03", serviceAttended: "Sunday First Service", engagementScore: 70, lastActivity: "2026-02-22", attendanceFrequency: "Weekly", photo: "" },
];

export const mockEvents: Event[] = [
  { id: "1", name: "Sunday Worship Service", description: "Weekly Sunday worship service", department: "Worship", location: "Main Auditorium", startDate: "2026-03-02T09:00:00", endDate: "2026-03-02T11:30:00", capacity: 500, type: "service", registeredCount: 350, attendedCount: 320 },
  { id: "2", name: "Youth Conference 2026", description: "Annual youth empowerment conference", department: "Youth Ministry", location: "Conference Hall", startDate: "2026-03-15T08:00:00", endDate: "2026-03-17T17:00:00", capacity: 200, type: "conference", registeredCount: 180, attendedCount: 0 },
  { id: "3", name: "Marriage Enrichment Seminar", description: "Weekend seminar for married couples", department: "Outreach", location: "Fellowship Hall", startDate: "2026-03-22T10:00:00", endDate: "2026-03-22T16:00:00", capacity: 60, type: "program", registeredCount: 42, attendedCount: 0 },
  { id: "4", name: "Children's Easter Program", description: "Special Easter program for children", department: "Children's Ministry", location: "Children's Wing", startDate: "2026-04-05T10:00:00", endDate: "2026-04-05T13:00:00", capacity: 100, type: "program", registeredCount: 65, attendedCount: 0 },
  { id: "5", name: "Night of Prayer", description: "Monthly prayer vigil", department: "Prayer Team", location: "Main Auditorium", startDate: "2026-03-07T21:00:00", endDate: "2026-03-08T05:00:00", capacity: 300, type: "service", registeredCount: 120, attendedCount: 0 },
  { id: "6", name: "Tech Workshop", description: "Media and technology training", department: "Media & Tech", location: "Media Suite", startDate: "2026-03-10T14:00:00", endDate: "2026-03-10T17:00:00", capacity: 30, type: "program", registeredCount: 22, attendedCount: 0 },
];

export const mockCohorts: Cohort[] = [
  { id: "1", name: "Believers Foundation Class", program: "New Believers Program", startDate: "2026-01-10", endDate: "2026-04-10", instructor: "Pastor James", capacity: 30, enrolledCount: 25, completedCount: 0, status: "active" },
  { id: "2", name: "Leadership Academy Q1", program: "Leadership Development", startDate: "2026-01-15", endDate: "2026-06-15", instructor: "Elder Paul", capacity: 20, enrolledCount: 18, completedCount: 0, status: "active" },
  { id: "3", name: "Marriage Prep 2026", program: "Pre-Marriage Counseling", startDate: "2026-02-01", endDate: "2026-05-01", instructor: "Pastor & Mrs James", capacity: 12, enrolledCount: 10, completedCount: 0, status: "active" },
  { id: "4", name: "Youth Discipleship", program: "Youth Growth Track", startDate: "2025-09-01", endDate: "2025-12-15", instructor: "Sister Grace", capacity: 25, enrolledCount: 22, completedCount: 20, status: "completed" },
];

export const mockMessages: Message[] = [
  { id: "1", subject: "Sunday Service Reminder", body: "Join us this Sunday...", channel: "email", recipients: "All Members", sentDate: "2026-02-28T08:00:00", status: "delivered", sentCount: 450 },
  { id: "2", subject: "Youth Conference Registration", body: "Register now for...", channel: "sms", recipients: "Youth Ministry", sentDate: "2026-02-27T10:00:00", status: "delivered", sentCount: 32 },
  { id: "3", subject: "Prayer Meeting Tonight", body: "Don't miss tonight's...", channel: "email", recipients: "Prayer Team", sentDate: "2026-02-26T14:00:00", status: "delivered", sentCount: 35 },
  { id: "4", subject: "Easter Program Volunteer Call", body: "We need volunteers...", channel: "email", recipients: "All Members", sentDate: "2026-02-25T09:00:00", status: "scheduled", sentCount: 0 },
];

export const mockDashboardStats: DashboardStats = {
  totalMembers: 482,
  newMembersThisMonth: 12,
  activeMembers: 380,
  inactiveMembers: 102,
  upcomingEvents: 6,
  eventAttendanceRate: 85,
  totalDepartments: 6,
  messagesThisMonth: 24,
  activeCohorts: 3,
  cohortEnrollments: 53,
};

export const mockAttendanceData = [
  { month: "Sep", attendance: 310 },
  { month: "Oct", attendance: 340 },
  { month: "Nov", attendance: 325 },
  { month: "Dec", attendance: 380 },
  { month: "Jan", attendance: 350 },
  { month: "Feb", attendance: 365 },
];

export const mockMemberGrowthData = [
  { month: "Sep", members: 420 },
  { month: "Oct", members: 435 },
  { month: "Nov", members: 442 },
  { month: "Dec", members: 458 },
  { month: "Jan", members: 470 },
  { month: "Feb", members: 482 },
];

export const mockDepartmentData = [
  { name: "Worship", members: 45 },
  { name: "Youth", members: 32 },
  { name: "Children", members: 28 },
  { name: "Outreach", members: 24 },
  { name: "Prayer", members: 35 },
  { name: "Media", members: 18 },
];
