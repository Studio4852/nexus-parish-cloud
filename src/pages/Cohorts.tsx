import { useState } from "react";
import { mockCohorts as initialCohorts } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { CreateCohortDialog } from "@/components/CreateCohortDialog";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Users, Calendar as CalIcon, Trash2, UserPlus } from "lucide-react";
import { Cohort } from "@/types/platform";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

export default function Cohorts() {
  const [cohorts, setCohorts] = useState<Cohort[]>(initialCohorts);
  const [createOpen, setCreateOpen] = useState(false);

  const handleAdd = (cohort: Cohort) => setCohorts((prev) => [cohort, ...prev]);
  const handleDelete = (id: string) => {
    setCohorts((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Cohort Deleted" });
  };
  const handleEnroll = (id: string) => {
    setCohorts((prev) => prev.map((c) => c.id === id && c.enrolledCount < c.capacity ? { ...c, enrolledCount: c.enrolledCount + 1 } : c));
    toast({ title: "Enrolled!", description: "Member enrolled in cohort." });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cohorts & Learning</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage learning programs and cohort groups · {cohorts.length} total</p>
        </div>
        <Button size="sm" className="gradient-accent text-accent-foreground" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Create Cohort
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cohorts.map((cohort) => (
          <div key={cohort.id} className="stat-card space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{cohort.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{cohort.program}</p>
              </div>
              <StatusBadge status={cohort.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{cohort.instructor}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{cohort.enrolledCount}/{cohort.capacity} enrolled</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                <CalIcon className="w-4 h-4" />
                <span>{cohort.startDate ? format(new Date(cohort.startDate), "MMM d") : "TBD"} – {cohort.endDate ? format(new Date(cohort.endDate), "MMM d, yyyy") : "TBD"}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Enrollment</span>
                <span>{Math.round((cohort.enrolledCount / cohort.capacity) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${(cohort.enrolledCount / cohort.capacity) * 100}%` }} />
              </div>
            </div>

            {cohort.completedCount > 0 && (
              <p className="text-xs text-success font-medium">{cohort.completedCount} completed</p>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                variant="outline" size="sm" className="flex-1"
                onClick={() => handleEnroll(cohort.id)}
                disabled={cohort.enrolledCount >= cohort.capacity || cohort.status === "completed"}
              >
                <UserPlus className="w-3.5 h-3.5 mr-1" />
                {cohort.enrolledCount >= cohort.capacity ? "Full" : "Enroll"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(cohort.id)}>
                <Trash2 className="w-3.5 h-3.5 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreateCohortDialog open={createOpen} onOpenChange={setCreateOpen} onAdd={handleAdd} />
    </div>
  );
}
