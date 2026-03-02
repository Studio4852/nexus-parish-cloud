import { useState } from "react";
import { mockCohorts as initialCohorts } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { CreateCohortDialog } from "@/components/CreateCohortDialog";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Users, Calendar as CalIcon, Archive, LockKeyhole, RotateCcw } from "lucide-react";
import { Cohort } from "@/types/platform";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

type CohortAdminStatus = "active" | "archived";

interface AdminCohort extends Cohort {
  adminStatus: CohortAdminStatus;
  enrolmentOpen: boolean;
}

export default function Cohorts() {
  const [cohorts, setCohorts] = useState<AdminCohort[]>(
    initialCohorts.map(c => ({ ...c, adminStatus: "active" as CohortAdminStatus, enrolmentOpen: c.status !== "completed" }))
  );
  const [createOpen, setCreateOpen] = useState(false);

  const handleAdd = (cohort: Cohort) => setCohorts((prev) => [{ ...cohort, adminStatus: "active", enrolmentOpen: true }, ...prev]);

  const handleArchive = (id: string) => {
    setCohorts(prev => prev.map(c => c.id === id ? { ...c, adminStatus: "archived" as CohortAdminStatus } : c));
    toast({ title: "Cohort Archived" });
  };

  const handleRestore = (id: string) => {
    setCohorts(prev => prev.map(c => c.id === id ? { ...c, adminStatus: "active" as CohortAdminStatus } : c));
    toast({ title: "Cohort Restored" });
  };

  const handleCloseEnrolment = (id: string) => {
    setCohorts(prev => prev.map(c => c.id === id ? { ...c, enrolmentOpen: false } : c));
    toast({ title: "Enrolments Closed" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cohorts & Learning</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage learning programs · {cohorts.length} total</p>
        </div>
        <Button size="sm" className="gradient-accent text-accent-foreground" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Create Cohort
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cohorts.map((cohort) => (
          <div key={cohort.id} className={`stat-card space-y-4 ${cohort.adminStatus !== "active" ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{cohort.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{cohort.program}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={cohort.status} />
                {cohort.adminStatus === "archived" && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground">Archived</span>
                )}
                {!cohort.enrolmentOpen && cohort.adminStatus === "active" && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-warning/10 text-warning">Closed</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><BookOpen className="w-4 h-4" /><span>{cohort.instructor}</span></div>
              <div className="flex items-center gap-2 text-muted-foreground"><Users className="w-4 h-4" /><span>{cohort.enrolledCount}/{cohort.capacity}</span></div>
              <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                <CalIcon className="w-4 h-4" />
                <span>{cohort.startDate ? format(new Date(cohort.startDate), "MMM d") : "TBD"} – {cohort.endDate ? format(new Date(cohort.endDate), "MMM d, yyyy") : "TBD"}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Enrollment</span><span>{Math.round((cohort.enrolledCount / cohort.capacity) * 100)}%</span></div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${(cohort.enrolledCount / cohort.capacity) * 100}%` }} />
              </div>
            </div>

            {cohort.completedCount > 0 && <p className="text-xs text-success font-medium">{cohort.completedCount} completed</p>}

            <div className="flex gap-2 pt-1">
              {cohort.adminStatus === "active" ? (
                <>
                  {cohort.enrolmentOpen && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleCloseEnrolment(cohort.id)}>
                      <LockKeyhole className="w-3.5 h-3.5 mr-1" /> Close Enrol.
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleArchive(cohort.id)}>
                    <Archive className="w-3.5 h-3.5" />
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleRestore(cohort.id)}>
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Restore
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <CreateCohortDialog open={createOpen} onOpenChange={setCreateOpen} onAdd={handleAdd} />
    </div>
  );
}
