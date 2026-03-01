import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockDepartments } from "@/data/mockData";
import { Event } from "@/types/platform";
import { toast } from "@/hooks/use-toast";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (event: Event) => void;
}

export function CreateEventDialog({ open, onOpenChange, onAdd }: CreateEventDialogProps) {
  const [form, setForm] = useState({
    name: "", description: "", department: "", location: "", startDate: "", endDate: "",
    capacity: "", type: "service" as Event["type"],
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.startDate) {
      toast({ title: "Error", description: "Event name and start date are required", variant: "destructive" });
      return;
    }
    const newEvent: Event = {
      id: String(Date.now()),
      name: form.name,
      description: form.description,
      department: form.department,
      location: form.location,
      startDate: form.startDate,
      endDate: form.endDate || form.startDate,
      capacity: parseInt(form.capacity) || 100,
      type: form.type,
      registeredCount: 0,
      attendedCount: 0,
    };
    onAdd(newEvent);
    toast({ title: "Event Created", description: `"${form.name}" has been created successfully.` });
    setForm({ name: "", description: "", department: "", location: "", startDate: "", endDate: "", capacity: "", type: "service" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label>Event Name *</Label>
              <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter event name" />
            </div>
            <div className="col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Event description..." rows={3} />
            </div>
            <div>
              <Label>Department</Label>
              <Select value={form.department} onValueChange={(v) => update("department", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {mockDepartments.map((d) => (
                    <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Event Type</Label>
              <Select value={form.type} onValueChange={(v) => update("type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="program">Program</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="cohort">Cohort</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Venue" />
            </div>
            <div>
              <Label>Capacity</Label>
              <Input type="number" value={form.capacity} onChange={(e) => update("capacity", e.target.value)} placeholder="100" />
            </div>
            <div>
              <Label>Start Date & Time *</Label>
              <Input type="datetime-local" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
            </div>
            <div>
              <Label>End Date & Time</Label>
              <Input type="datetime-local" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="gradient-accent text-accent-foreground">Create Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
