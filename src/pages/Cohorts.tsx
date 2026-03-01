import { mockCohorts } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Users, Calendar as CalIcon } from "lucide-react";
import { format } from "date-fns";

export default function Cohorts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cohorts & Learning</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage learning programs and cohort groups</p>
        </div>
        <Button size="sm" className="gradient-accent text-accent-foreground"><Plus className="w-4 h-4 mr-1" /> Create Cohort</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCohorts.map((cohort) => (
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
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalIcon className="w-4 h-4" />
                <span>{format(new Date(cohort.startDate), "MMM d")} – {format(new Date(cohort.endDate), "MMM d, yyyy")}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
}
