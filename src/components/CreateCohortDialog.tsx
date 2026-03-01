import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cohort } from "@/types/platform";
import { toast } from "@/hooks/use-toast";

interface CreateCohortDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (cohort: Cohort) => void;
}

export function CreateCohortDialog({ open, onOpenChange, onAdd }: CreateCohortDialogProps) {
  const [form, setForm] = useState({
    name: "", program: "", startDate: "", endDate: "", instructor: "", capacity: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.program) {
      toast({ title: "Error", description: "Cohort name and program are required", variant: "destructive" });
      return;
    }
    const newCohort: Cohort = {
      id: String(Date.now()),
      name: form.name,
      program: form.program,
      startDate: form.startDate,
      endDate: form.endDate,
      instructor: form.instructor,
      capacity: parseInt(form.capacity) || 20,
      enrolledCount: 0,
      completedCount: 0,
      status: "upcoming",
    };
    onAdd(newCohort);
    toast({ title: "Cohort Created", description: `"${form.name}" has been created successfully.` });
    setForm({ name: "", program: "", startDate: "", endDate: "", instructor: "", capacity: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Create New Cohort</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label>Cohort Name *</Label>
              <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Leadership Academy Q2" />
            </div>
            <div className="col-span-2">
              <Label>Program *</Label>
              <Input value={form.program} onChange={(e) => update("program", e.target.value)} placeholder="e.g. Leadership Development" />
            </div>
            <div>
              <Label>Instructor</Label>
              <Input value={form.instructor} onChange={(e) => update("instructor", e.target.value)} placeholder="Instructor name" />
            </div>
            <div>
              <Label>Capacity</Label>
              <Input type="number" value={form.capacity} onChange={(e) => update("capacity", e.target.value)} placeholder="20" />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="gradient-accent text-accent-foreground">Create Cohort</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
