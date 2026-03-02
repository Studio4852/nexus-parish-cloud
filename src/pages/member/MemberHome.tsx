import { useAuth } from "@/contexts/AuthContext";
import { CalendarDays, GraduationCap, Clock, Mail } from "lucide-react";
import { mockEvents, mockCohorts } from "@/data/mockData";

export default function MemberHome() {
  const { user } = useAuth();
  const upcomingEvents = mockEvents.filter(e => new Date(e.startDate) > new Date()).slice(0, 3);

  const cards = [
    { label: "Upcoming Events", value: upcomingEvents.length, icon: CalendarDays, color: "text-info" },
    { label: "My Cohorts", value: 2, icon: GraduationCap, color: "text-success" },
    { label: "Next Serving", value: "Mar 9", icon: Clock, color: "text-accent" },
    { label: "Unread Messages", value: 3, icon: Mail, color: "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hello, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your overview for today</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="stat-card flex items-center gap-3">
            <c.icon className={`w-8 h-8 ${c.color}`} />
            <div>
              <p className="text-xl font-bold">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="stat-card">
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {upcomingEvents.map((e) => (
            <div key={e.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium">{e.name}</p>
                <p className="text-xs text-muted-foreground">{e.location} · {new Date(e.startDate).toLocaleDateString()}</p>
              </div>
              <span className="text-xs bg-secondary px-2 py-1 rounded-full">{e.registeredCount}/{e.capacity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
