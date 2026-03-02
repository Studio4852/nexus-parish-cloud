import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Clock, Calendar as CalIcon, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockRotas = [
  { id: "1", team: "Welcome Team", nextServing: "2026-03-09", frequency: "Bi-weekly", role: "Greeter" },
  { id: "2", team: "Media Team", nextServing: "2026-03-16", frequency: "Monthly", role: "Camera Operator" },
];

const mockSchedule = [
  { date: "2026-03-09", team: "Welcome Team", role: "Greeter", service: "Sunday First Service" },
  { date: "2026-03-16", team: "Media Team", role: "Camera Operator", service: "Sunday Second Service" },
  { date: "2026-03-23", team: "Welcome Team", role: "Greeter", service: "Sunday First Service" },
  { date: "2026-04-06", team: "Welcome Team", role: "Greeter", service: "Sunday First Service" },
];

export default function MyRotas() {
  const [availability, setAvailability] = useState<Record<string, boolean>>({ "2026-03-09": true, "2026-03-16": true, "2026-03-23": true, "2026-04-06": true });

  const toggleAvailability = (date: string) => {
    setAvailability(prev => {
      const next = { ...prev, [date]: !prev[date] };
      toast({ title: next[date] ? "Available" : "Unavailable", description: `You're ${next[date] ? "available" : "unavailable"} for ${date}` });
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Rotas</h1>
        <p className="text-muted-foreground text-sm mt-1">View your serving schedule and set availability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRotas.map(r => (
          <div key={r.id} className="stat-card space-y-2">
            <h3 className="font-semibold">{r.team}</h3>
            <p className="text-xs text-muted-foreground">Role: {r.role}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" /> Next: {r.nextServing} · {r.frequency}
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule">Upcoming Schedule</TabsTrigger>
          <TabsTrigger value="availability">Set Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-4">
          <div className="stat-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 font-medium text-muted-foreground">Team</th>
                  <th className="pb-3 font-medium text-muted-foreground">Role</th>
                  <th className="pb-3 font-medium text-muted-foreground">Service</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockSchedule.map((s, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3">{s.date}</td>
                    <td className="py-3">{s.team}</td>
                    <td className="py-3">{s.role}</td>
                    <td className="py-3">{s.service}</td>
                    <td className="py-3">
                      {availability[s.date] ? (
                        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3" />Available</span>
                      ) : (
                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full w-fit">Unavailable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="availability" className="mt-4">
          <div className="stat-card space-y-4">
            <p className="text-sm text-muted-foreground">Toggle your availability for upcoming serving dates</p>
            {mockSchedule.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{s.date} · {s.team}</p>
                  <p className="text-xs text-muted-foreground">{s.role} – {s.service}</p>
                </div>
                <Switch checked={availability[s.date] ?? true} onCheckedChange={() => toggleAvailability(s.date)} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
