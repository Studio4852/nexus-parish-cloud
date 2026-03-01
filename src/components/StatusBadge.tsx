import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  member: "bg-info/10 text-info border-info/20",
  visitor: "bg-warning/10 text-warning border-warning/20",
  volunteer: "bg-success/10 text-success border-success/20",
  leader: "bg-accent/10 text-accent-foreground border-accent/20",
  student: "bg-primary/10 text-primary border-primary/20",
  active: "bg-success/10 text-success border-success/20",
  completed: "bg-muted text-muted-foreground border-border",
  upcoming: "bg-info/10 text-info border-info/20",
  delivered: "bg-success/10 text-success border-success/20",
  scheduled: "bg-warning/10 text-warning border-warning/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  service: "bg-primary/10 text-primary border-primary/20",
  program: "bg-accent/10 text-accent-foreground border-accent/20",
  conference: "bg-info/10 text-info border-info/20",
  cohort: "bg-success/10 text-success border-success/20",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`text-[11px] font-medium capitalize ${statusStyles[status] || "bg-muted text-muted-foreground"}`}
    >
      {status}
    </Badge>
  );
}
