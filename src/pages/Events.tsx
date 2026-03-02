import { useState } from "react";
import { mockEvents as initialEvents } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { CreateEventDialog } from "@/components/CreateEventDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, MapPin, Clock, Users, Archive, XCircle, LockKeyhole, RotateCcw } from "lucide-react";
import { Event } from "@/types/platform";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

type EventStatus = "active" | "archived" | "cancelled";

interface AdminEvent extends Event {
  adminStatus: EventStatus;
  registrationOpen: boolean;
}

export default function Events() {
  const [events, setEvents] = useState<AdminEvent[]>(
    initialEvents.map(e => ({ ...e, adminStatus: "active" as EventStatus, registrationOpen: true }))
  );
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = events.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || e.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleAddEvent = (event: Event) => setEvents((prev) => [{ ...event, adminStatus: "active", registrationOpen: true }, ...prev]);

  const handleArchive = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, adminStatus: "archived" as EventStatus } : e));
    toast({ title: "Event Archived" });
  };

  const handleCancel = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, adminStatus: "cancelled" as EventStatus } : e));
    toast({ title: "Event Cancelled" });
  };

  const handleCloseRegistration = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, registrationOpen: false } : e));
    toast({ title: "Registrations Closed" });
  };

  const handleRestore = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, adminStatus: "active" as EventStatus, registrationOpen: true } : e));
    toast({ title: "Event Restored" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage church events · {events.length} total</p>
        </div>
        <Button size="sm" className="gradient-accent text-accent-foreground" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Create Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="program">Program</SelectItem>
            <SelectItem value="conference">Conference</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((event) => (
          <div key={event.id} className={`stat-card space-y-3 ${event.adminStatus !== "active" ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm">{event.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{event.department}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={event.type} />
                {event.adminStatus !== "active" && (
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${event.adminStatus === "archived" ? "bg-muted text-muted-foreground" : "bg-destructive/10 text-destructive"}`}>
                    {event.adminStatus}
                  </span>
                )}
                {!event.registrationOpen && event.adminStatus === "active" && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-warning/10 text-warning">Closed</span>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {format(new Date(event.startDate), "MMM d, yyyy · h:mm a")}</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {event.location}</div>
              <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {event.registeredCount}/{event.capacity} registered</div>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min((event.registeredCount / event.capacity) * 100, 100)}%` }} />
            </div>
            <div className="flex gap-2 pt-1 flex-wrap">
              {event.adminStatus === "active" ? (
                <>
                  {event.registrationOpen && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleCloseRegistration(event.id)}>
                      <LockKeyhole className="w-3.5 h-3.5 mr-1" /> Close Reg.
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleArchive(event.id)}>
                    <Archive className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleCancel(event.id)}>
                    <XCircle className="w-3.5 h-3.5" />
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleRestore(event.id)}>
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Restore
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No events found.</div>
      )}

      <CreateEventDialog open={createOpen} onOpenChange={setCreateOpen} onAdd={handleAddEvent} />
    </div>
  );
}
