import { StatCard } from "@/components/StatCard";
import { mockDashboardStats, mockAttendanceData, mockMemberGrowthData, mockDepartmentData } from "@/data/mockData";
import { Users, Activity, CalendarDays, GraduationCap, MessageSquare, Building2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(42,92%,55%)", "hsl(210,80%,52%)", "hsl(152,60%,40%)", "hsl(280,60%,50%)", "hsl(0,72%,51%)", "hsl(190,70%,45%)"];

export default function Reports() {
  const s = mockDashboardStats;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Intelligence</h1>
        <p className="text-muted-foreground text-sm mt-1">Comprehensive analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Members" value={s.totalMembers} change={`${s.activeMembers} active`} changeType="positive" icon={Users} />
        <StatCard title="New This Month" value={s.newMembersThisMonth} change="+2.5% growth" changeType="positive" icon={Activity} iconColor="hsl(152,60%,40%)" />
        <StatCard title="Attendance Rate" value={`${s.eventAttendanceRate}%`} change="Avg across events" icon={CalendarDays} iconColor="hsl(210,80%,52%)" />
        <StatCard title="Active Cohorts" value={s.activeCohorts} change={`${s.cohortEnrollments} enrolled`} icon={GraduationCap} iconColor="hsl(42,92%,55%)" />
        <StatCard title="Messages Sent" value={s.messagesThisMonth} change="This month" icon={MessageSquare} iconColor="hsl(280,60%,50%)" />
        <StatCard title="Departments" value={s.totalDepartments} icon={Building2} iconColor="hsl(190,70%,45%)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Member Growth (6 months)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockMemberGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Line type="monotone" dataKey="members" stroke="hsl(42,92%,55%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(42,92%,55%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="attendance" fill="hsl(222,60%,20%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={mockDepartmentData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="members" paddingAngle={3}>
                {mockDepartmentData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {mockDepartmentData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                {d.name} ({d.members})
              </span>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Key Insights</h3>
          <div className="space-y-4">
            {[
              { label: "Active Member Rate", value: `${Math.round((s.activeMembers / s.totalMembers) * 100)}%`, color: "bg-success" },
              { label: "Event Attendance Rate", value: `${s.eventAttendanceRate}%`, color: "bg-info" },
              { label: "Cohort Fill Rate", value: `${Math.round((s.cohortEnrollments / (s.activeCohorts * 25)) * 100)}%`, color: "bg-accent" },
            ].map((insight) => (
              <div key={insight.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{insight.label}</span>
                  <span className="font-semibold">{insight.value}</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${insight.color}`} style={{ width: insight.value }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
