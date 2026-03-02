import { useState } from "react";
import { mockCohorts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, Users, Calendar as CalIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Cohort } from "@/types/platform";
import { StatusBadge } from "@/components/StatusBadge";

export default function Learning() {
  const [cohorts] = useState<Cohort[]>(mockCohorts);
  const [enrolled, setEnrolled] = useState<Set<string>>(new Set(["1"]));

  const handleEnrol = (id: string) => {
    setEnrolled(prev => new Set(prev).add(id));
    toast({ title: "Enrolled!", description: "You've been enrolled in this cohort." });
  };

  const handleLeave = (id: string) => {
    setEnrolled(prev => { const n = new Set(prev); n.delete(id); return n; });
    toast({ title: "Left Cohort" });
  };

  const myCohorts = cohorts.filter(c => enrolled.has(c.id));
  const available = cohorts.filter(c => c.status !== "completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Learning</h1>
        <p className="text-muted-foreground text-sm mt-1">Browse programs and track your learning journey</p>
      </div>

      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">Available Programs</TabsTrigger>
          <TabsTrigger value="enrolled">My Enrollments ({myCohorts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {available.map(cohort => (
              <div key={cohort.id} className="stat-card space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{cohort.name}</h3>
                    <p className="text-xs text-muted-foreground">{cohort.program}</p>
                  </div>
                  <StatusBadge status={cohort.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" />{cohort.instructor}</div>
                  <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" />{cohort.enrolledCount}/{cohort.capacity}</div>
                  <div className="flex items-center gap-2 col-span-2"><CalIcon className="w-3.5 h-3.5" />{cohort.startDate ? format(new Date(cohort.startDate), "MMM d") : "TBD"} – {cohort.endDate ? format(new Date(cohort.endDate), "MMM d, yyyy") : "TBD"}</div>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${(cohort.enrolledCount / cohort.capacity) * 100}%` }} />
                </div>
                {enrolled.has(cohort.id) ? (
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleLeave(cohort.id)}>Leave Cohort</Button>
                ) : (
                  <Button size="sm" className="w-full gradient-accent text-accent-foreground" onClick={() => handleEnrol(cohort.id)} disabled={cohort.enrolledCount >= cohort.capacity}>
                    {cohort.enrolledCount >= cohort.capacity ? "Full" : "Enrol"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="mt-4">
          {myCohorts.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground">Not enrolled in any programs.</p>
          ) : (
            <div className="space-y-3">
              {myCohorts.map(c => (
                <div key={c.id} className="stat-card flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.program} · {c.instructor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={c.status} />
                    <Button variant="outline" size="sm" onClick={() => handleLeave(c.id)}>Leave</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
