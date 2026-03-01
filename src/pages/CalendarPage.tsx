import { mockEvents } from "@/data/mockData";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // March 2026
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const getEventsForDay = (day: Date) =>
    mockEvents.filter((e) => isSameDay(new Date(e.startDate), day));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-muted-foreground text-sm mt-1">Church events and schedule overview</p>
      </div>

      <div className="stat-card">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="font-display text-lg font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
          <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="bg-secondary p-2 text-center text-xs font-medium text-muted-foreground">{d}</div>
          ))}
          {days.map((day) => {
            const events = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, new Date(2026, 2, 1)); // simulated today
            return (
              <div
                key={day.toString()}
                className={`bg-card p-2 min-h-[80px] md:min-h-[100px] ${
                  !isCurrentMonth ? "opacity-40" : ""
                } ${isToday ? "ring-2 ring-accent ring-inset" : ""}`}
              >
                <span className={`text-xs font-medium ${isToday ? "text-accent font-bold" : "text-muted-foreground"}`}>
                  {format(day, "d")}
                </span>
                <div className="mt-1 space-y-1">
                  {events.slice(0, 2).map((e) => (
                    <div key={e.id} className="text-[10px] bg-accent/10 text-accent-foreground px-1.5 py-0.5 rounded truncate font-medium">
                      {e.name}
                    </div>
                  ))}
                  {events.length > 2 && (
                    <span className="text-[10px] text-muted-foreground">+{events.length - 2} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="stat-card">
        <h3 className="font-semibold text-sm mb-3">This Month's Events</h3>
        <div className="space-y-3">
          {mockEvents
            .filter((e) => isSameMonth(new Date(e.startDate), currentMonth))
            .map((event) => (
              <div key={event.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(event.startDate), "EEEE, MMM d · h:mm a")} · {event.location}</p>
                </div>
                <StatusBadge status={event.type} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
