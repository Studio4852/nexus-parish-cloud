import { useState } from "react";
import { mockEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Clock, Users, Search } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Event } from "@/types/platform";

export default function MyEvents() {
  const [events] = useState<Event[]>(mockEvents);
  const [registered, setRegistered] = useState<Set<string>>(new Set(["1"]));
  const [search, setSearch] = useState("");

  const upcoming = events.filter(e => new Date(e.startDate) > new Date());
  const filtered = upcoming.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  const handleRegister = (id: string) => {
    setRegistered(prev => new Set(prev).add(id));
    toast({ title: "Registered!", description: "You've been registered for this event." });
  };

  const handleCancel = (id: string) => {
    setRegistered(prev => { const n = new Set(prev); n.delete(id); return n; });
    toast({ title: "Registration Cancelled" });
  };

  const myRegistered = events.filter(e => registered.has(e.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Events</h1>
        <p className="text-muted-foreground text-sm mt-1">Browse and register for upcoming events</p>
      </div>

      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">Browse Events</TabsTrigger>
          <TabsTrigger value="registered">My Registrations ({myRegistered.length})</TabsTrigger>
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
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleCancel(event.id)}>Cancel Registration</Button>
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
                  <div>
                    <p className="font-semibold text-sm">{event.name}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(event.startDate), "MMM d, yyyy")} · {event.location}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleCancel(event.id)}>Cancel</Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
