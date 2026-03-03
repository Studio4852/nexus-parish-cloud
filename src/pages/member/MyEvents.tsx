import { useState } from "react";
import { mockEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Clock, Users, Search, Plus, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Event } from "@/types/platform";

interface PersonalEvent {
  id: string;
  title: string;
  type: "holiday" | "personal" | "anniversary" | "other";
  startDate: string;
  endDate: string;
  notes: string;
}

export default function MyEvents() {
  const [events] = useState<Event[]>(mockEvents);
  const [registered, setRegistered] = useState<Set<string>>(new Set(["1"]));
  const [attended, setAttended] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [showAddPersonal, setShowAddPersonal] = useState(false);

  const [personalEvents, setPersonalEvents] = useState<PersonalEvent[]>([
    { id: "pe1", title: "Family Holiday", type: "holiday", startDate: "2025-08-01", endDate: "2025-08-14", notes: "Summer break" },
  ]);
  const [newPersonal, setNewPersonal] = useState<Omit<PersonalEvent, "id">>({ title: "", type: "personal", startDate: "", endDate: "", notes: "" });

  const upcoming = events.filter(e => new Date(e.startDate) > new Date());
  const filtered = upcoming.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  const handleRegister = (id: string) => {
    setRegistered(prev => new Set(prev).add(id));
    toast({ title: "Registered!", description: "You've been registered for this event." });
  };

  const handleCancel = (id: string) => {
    setRegistered(prev => { const n = new Set(prev); n.delete(id); return n; });
    setAttended(prev => { const n = new Set(prev); n.delete(id); return n; });
    toast({ title: "Registration Cancelled" });
  };

  const handleMarkAttendance = (id: string) => {
    setAttended(prev => new Set(prev).add(id));
    toast({ title: "Attendance Marked", description: "Thank you for checking in!" });
  };

  const handleAddPersonal = () => {
    if (!newPersonal.title || !newPersonal.startDate) {
      toast({ title: "Missing Info", description: "Please provide a title and start date.", variant: "destructive" });
      return;
    }
    setPersonalEvents(prev => [...prev, { ...newPersonal, id: Date.now().toString() }]);
    setNewPersonal({ title: "", type: "personal", startDate: "", endDate: "", notes: "" });
    setShowAddPersonal(false);
    toast({ title: "Personal Event Added" });
  };

  const handleRemovePersonal = (id: string) => {
    setPersonalEvents(prev => prev.filter(e => e.id !== id));
    toast({ title: "Event Removed" });
  };

  const myRegistered = events.filter(e => registered.has(e.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Events</h1>
        <p className="text-muted-foreground text-sm mt-1">Browse church events and manage your personal calendar</p>
      </div>

      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">Browse Events</TabsTrigger>
          <TabsTrigger value="registered">My Registrations ({myRegistered.length})</TabsTrigger>
          <TabsTrigger value="personal">Personal Events ({personalEvents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4 mt-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search events..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(event => (
              <div key={event.id} className="stat-card space-y-3">
                <h3 className="font-semibold text-sm">{event.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{format(new Date(event.startDate), "MMM d, yyyy · h:mm a")}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{event.location}</div>
                  <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" />{event.registeredCount}/{event.capacity} spots</div>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min((event.registeredCount / event.capacity) * 100, 100)}%` }} />
                </div>
                {registered.has(event.id) ? (
                  <div className="flex gap-2">
                    {!attended.has(event.id) ? (
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => handleMarkAttendance(event.id)}>
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Mark Attendance
                      </Button>
                    ) : (
                      <span className="flex-1 text-xs text-center py-2 text-green-600 font-medium flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Attended
                      </span>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleCancel(event.id)}>Cancel</Button>
                  </div>
                ) : (
                  <Button size="sm" className="w-full gradient-accent text-accent-foreground" onClick={() => handleRegister(event.id)} disabled={event.registeredCount >= event.capacity}>
                    {event.registeredCount >= event.capacity ? "Full" : "Register"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="registered" className="mt-4">
          {myRegistered.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground">No registrations yet.</p>
          ) : (
            <div className="space-y-3">
              {myRegistered.map(event => (
                <div key={event.id} className="stat-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold text-sm">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(event.startDate), "MMM d, yyyy")} · {event.location}</p>
                    </div>
                    {attended.has(event.id) && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Attended</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!attended.has(event.id) && (
                      <Button variant="outline" size="sm" onClick={() => handleMarkAttendance(event.id)}>
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Check In
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleCancel(event.id)}>Cancel</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="personal" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Add holidays, anniversaries, or personal events</p>
            <Button size="sm" onClick={() => setShowAddPersonal(!showAddPersonal)}>
              <Plus className="w-4 h-4 mr-1" /> Add Event
            </Button>
          </div>

          {showAddPersonal && (
            <div className="stat-card space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2"><CalendarDays className="w-4 h-4" /> New Personal Event</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Title</Label><Input value={newPersonal.title} onChange={e => setNewPersonal(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Family Holiday" /></div>
                <div>
                  <Label>Type</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={newPersonal.type} onChange={e => setNewPersonal(p => ({ ...p, type: e.target.value as PersonalEvent["type"] }))}>
                    <option value="holiday">Holiday</option><option value="personal">Personal</option><option value="anniversary">Anniversary</option><option value="other">Other</option>
                  </select>
                </div>
                <div><Label>Start Date</Label><Input type="date" value={newPersonal.startDate} onChange={e => setNewPersonal(p => ({ ...p, startDate: e.target.value }))} /></div>
                <div><Label>End Date</Label><Input type="date" value={newPersonal.endDate} onChange={e => setNewPersonal(p => ({ ...p, endDate: e.target.value }))} /></div>
                <div className="md:col-span-2"><Label>Notes</Label><Input value={newPersonal.notes} onChange={e => setNewPersonal(p => ({ ...p, notes: e.target.value }))} placeholder="Optional notes" /></div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowAddPersonal(false)}>Cancel</Button>
                <Button size="sm" className="gradient-accent text-accent-foreground" onClick={handleAddPersonal}>Add Event</Button>
              </div>
            </div>
          )}

          {personalEvents.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground text-sm">No personal events added yet.</p>
          ) : (
            <div className="space-y-2">
              {personalEvents.map(pe => (
                <div key={pe.id} className="stat-card flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{pe.title}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="capitalize">{pe.type}</span> · {pe.startDate}{pe.endDate ? ` to ${pe.endDate}` : ""}
                      {pe.notes ? ` · ${pe.notes}` : ""}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleRemovePersonal(pe.id)}>Remove</Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
