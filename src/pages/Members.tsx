import { useState } from "react";
import { mockMembers, mockDepartments } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Upload, Download, Eye, Edit, Filter } from "lucide-react";
import { Member } from "@/types/platform";
import { format } from "date-fns";

function EngagementBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-success" : score >= 50 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">{score}</span>
    </div>
  );
}

function MemberDetailDialog({ member }: { member: Member }) {
  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="font-display">{member.fullName}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
            {member.fullName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <StatusBadge status={member.status} />
            <p className="text-muted-foreground mt-1">{member.department || "No department"}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Email", member.email],
            ["Phone", member.phone],
            ["Gender", member.gender],
            ["DOB", format(new Date(member.dob), "MMM d, yyyy")],
            ["Marital Status", member.maritalStatus],
            ["Join Date", format(new Date(member.joinDate), "MMM d, yyyy")],
            ["Service", member.serviceAttended],
            ["Attendance", member.attendanceFrequency],
            ["Last Active", format(new Date(member.lastActivity), "MMM d, yyyy")],
            ["Address", member.address],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="text-muted-foreground text-xs">{label}</p>
              <p className="font-medium">{val}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Engagement Score</p>
          <EngagementBar score={member.engagementScore} />
        </div>
      </div>
    </DialogContent>
  );
}

export default function Members() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filtered = mockMembers.filter((m) => {
    const matchSearch = m.fullName.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    const matchDept = deptFilter === "all" || m.department === deptFilter;
    return matchSearch && matchStatus && matchDept;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Members</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your parishioner database</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-1" /> Import</Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export</Button>
          <Button size="sm" className="gradient-accent text-accent-foreground"><Plus className="w-4 h-4 mr-1" /> Add Member</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search members..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="visitor">Visitor</SelectItem>
            <SelectItem value="volunteer">Volunteer</SelectItem>
            <SelectItem value="leader">Leader</SelectItem>
            <SelectItem value="student">Student</SelectItem>
          </SelectContent>
        </Select>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {mockDepartments.map((d) => (
              <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead>Member</TableHead>
              <TableHead className="hidden md:table-cell">Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Engagement</TableHead>
              <TableHead className="hidden lg:table-cell">Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((member) => (
              <TableRow key={member.id} className="hover:bg-secondary/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold flex-shrink-0">
                      {member.fullName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{member.fullName}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm">{member.department || "—"}</TableCell>
                <TableCell><StatusBadge status={member.status} /></TableCell>
                <TableCell className="hidden lg:table-cell"><EngagementBar score={member.engagementScore} /></TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{format(new Date(member.lastActivity), "MMM d")}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedMember(member)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <MemberDetailDialog member={member} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No members found matching your criteria.</div>
        )}
      </div>
    </div>
  );
}
