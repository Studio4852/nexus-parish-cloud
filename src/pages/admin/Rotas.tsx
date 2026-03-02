import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Users, Clock, Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RotaTeam {
  id: string;
  name: string;
  department: string;
  members: string[];
  frequency: string;
  nextServing: string;
}

const initialTeams: RotaTeam[] = [
  { id: "1", name: "Welcome Team A", department: "Outreach", members: ["Sarah Johnson", "Peter Eze"], frequency: "Bi-weekly", nextServing: "2026-03-09" },
  { id: "2", name: "Welcome Team B", department: "Outreach", members: ["Grace Adeyemi", "Ruth Okeke"], frequency: "Bi-weekly", nextServing: "2026-03-16" },
  { id: "3", name: "Media Team", department: "Media & Tech", members: ["David Mensah", "Esther Williams"], frequency: "Weekly", nextServing: "2026-03-02" },
  { id: "4", name: "Prayer Warriors", department: "Prayer Team", members: ["John Afolabi", "Michael Okonkwo"], frequency: "Monthly", nextServing: "2026-03-07" },
];

export default function Rotas() {
  const [teams, setTeams] = useState<RotaTeam[]>(initialTeams);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: "", department: "", frequency: "Weekly" });

  const handleCreate = () => {
    if (!form.name) { toast({ title: "Error", description: "Team name is required", variant: "destructive" }); return; }
    setTeams(prev => [...prev, { id: String(Date.now()), name: form.name, department: form.department, members: [], frequency: form.frequency, nextServing: "TBD" }]);
    toast({ title: "Rota Team Created" });
    setForm({ name: "", department: "", frequency: "Weekly" });
    setCreateOpen(false);
  };

  const handleNotify = (teamName: string) => {
    toast({ title: "Notification Sent", description: `Reminders sent to ${teamName} members.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rotas</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage serving teams and schedules · {teams.length} teams</p>
        </div>
        <Button size="sm" className="gradient-accent text-accent-foreground" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Create Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map(team => (
          <div key={team.id} className="stat-card space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{team.name}</h3>
                <p className="text-xs text-muted-foreground">{team.department}</p>
              </div>
              <span className="text-xs bg-secondary px-2 py-1 rounded-full">{team.frequency}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" /> {team.members.length} members
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" /> Next: {team.nextServing}
            </div>
            <div className="text-xs text-muted-foreground">
              {team.members.length > 0 ? team.members.join(", ") : "No members assigned"}
            </div>
            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleNotify(team.name)}>
                <Bell className="w-3.5 h-3.5 mr-1" /> Notify
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Create Rota Team</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Team Name *</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Welcome Team C" /></div>
            <div><Label>Department</Label><Input value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="e.g. Outreach" /></div>
            <div><Label>Frequency</Label><Input value={form.frequency} onChange={e => setForm(p => ({ ...p, frequency: e.target.value }))} placeholder="Weekly / Bi-weekly / Monthly" /></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button className="gradient-accent text-accent-foreground" onClick={handleCreate}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
