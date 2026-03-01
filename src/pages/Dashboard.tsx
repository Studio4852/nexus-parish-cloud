import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { mockDashboardStats, mockAttendanceData, mockMemberGrowthData, mockDepartmentData, mockEvents, mockMembers } from "@/data/mockData";
import { Users, UserPlus, CalendarDays, MessageSquare, GraduationCap, TrendingUp, Activity, Building2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { format } from "date-fns";

const CHART_COLORS = [
  "hsl(42, 92%, 55%)",
  "hsl(210, 80%, 52%)",
  "hsl(152, 60%, 40%)",
  "hsl(280, 60%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(190, 70%, 45%)",
];

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back. Here's your church intelligence overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Members" value={stats.totalMembers} change="+12 this month" changeType="positive" icon={Users} />
        <StatCard title="Active Members" value={stats.activeMembers} change="78.8% active rate" changeType="positive" icon={Activity} iconColor="hsl(152, 60%, 40%)" />
        <StatCard title="Upcoming Events" value={stats.upcomingEvents} change="Next: Sunday Service" changeType="neutral" icon={CalendarDays} iconColor="hsl(210, 80%, 52%)" />
        <StatCard title="Messages Sent" value={stats.messagesThisMonth} change="This month" changeType="neutral" icon={MessageSquare} iconColor="hsl(280, 60%, 50%)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 stat-card">
          <h3 className="font-semibold text-sm mb-4">Member Growth</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={mockMemberGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="members" stroke="hsl(42, 92%, 55%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(42, 92%, 55%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Departments</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={mockDepartmentData} cx="50%" cy="50%" outerRadius={80} innerRadius={45} dataKey="members" paddingAngle={3}>
                {mockDepartmentData.map((_, idx) => (
                  <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {mockDepartmentData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="attendance" fill="hsl(222, 60%, 20%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Upcoming Events</h3>
            <a href="/events" className="text-xs text-accent hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {mockEvents.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(event.startDate), "MMM d, yyyy · h:mm a")}</p>
                </div>
                <StatusBadge status={event.type} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Departments" value={stats.totalDepartments} icon={Building2} iconColor="hsl(190, 70%, 45%)" />
        <StatCard title="Active Cohorts" value={stats.activeCohorts} icon={GraduationCap} iconColor="hsl(42, 92%, 55%)" />
        <StatCard title="Enrollments" value={stats.cohortEnrollments} change="Across all cohorts" icon={UserPlus} iconColor="hsl(152, 60%, 40%)" />
        <StatCard title="Attendance Rate" value={`${stats.eventAttendanceRate}%`} change="+3% from last month" changeType="positive" icon={TrendingUp} iconColor="hsl(210, 80%, 52%)" />
      </div>
    </div>
  );
}
