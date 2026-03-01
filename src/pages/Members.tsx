import { useState } from "react";
import { mockMembers as initialMembers, mockDepartments } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { AddMemberDialog } from "@/components/AddMemberDialog";
import { BlastCampaignDialog } from "@/components/BlastCampaignDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Upload, Download, Eye, Edit, Megaphone, Trash2 } from "lucide-react";
import { Member, Message } from "@/types/platform";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

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

function MemberDetailDialog({ member, onEdit, onDelete }: { member: Member; onEdit: (m: Member) => void; onDelete: (id: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(member);

  const handleSave = () => {
    onEdit(form);
    setEditing(false);
    toast({ title: "Member Updated", description: `${form.fullName}'s profile has been updated.` });
  };

  return (
    <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-display flex items-center justify-between">
          {member.fullName}
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { onDelete(member.id); toast({ title: "Member Deleted" }); }}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </DialogTitle>
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
        {editing ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs text-muted-foreground">Full Name</label>
              <Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Phone</label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Address</label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Marital Status</label>
              <Input value={form.maritalStatus} onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })} />
            </div>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
              <Button size="sm" className="gradient-accent text-accent-foreground" onClick={handleSave}>Save</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Email", member.email],
              ["Phone", member.phone],
              ["Gender", member.gender],
              ["DOB", member.dob ? format(new Date(member.dob), "MMM d, yyyy") : "—"],
              ["Marital Status", member.maritalStatus],
              ["Join Date", member.joinDate ? format(new Date(member.joinDate), "MMM d, yyyy") : "—"],
              ["Service", member.serviceAttended],
              ["Attendance", member.attendanceFrequency],
              ["Last Active", member.lastActivity ? format(new Date(member.lastActivity), "MMM d, yyyy") : "—"],
              ["Address", member.address],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="font-medium">{val || "—"}</p>
              </div>
            ))}
          </div>
        )}
        <div>
          <p className="text-muted-foreground text-xs mb-1">Engagement Score</p>
          <EngagementBar score={member.engagementScore} />
        </div>
      </div>
    </DialogContent>
  );
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [blastOpen, setBlastOpen] = useState(false);

  const filtered = members.filter((m) => {
    const matchSearch = m.fullName.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    const matchDept = deptFilter === "all" || m.department === deptFilter;
    return matchSearch && matchStatus && matchDept;
  });

  const handleAddMember = (member: Member) => setMembers((prev) => [member, ...prev]);
  const handleEditMember = (updated: Member) => setMembers((prev) => prev.map((m) => m.id === updated.id ? updated : m));
  const handleDeleteMember = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id));

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = () => {
      toast({ title: "Import Started", description: "CSV file is being processed..." });
      setTimeout(() => toast({ title: "Import Complete", description: "Members imported successfully." }), 2000);
    };
    input.click();
  };

  const handleExport = () => {
    const csv = ["Name,Email,Phone,Status,Department", ...members.map((m) => `${m.fullName},${m.email},${m.phone},${m.status},${m.department}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "members_export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export Complete", description: `${members.length} members exported to CSV.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Members</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your parishioner database · {members.length} total</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleImport}><Upload className="w-4 h-4 mr-1" /> Import</Button>
          <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-4 h-4 mr-1" /> Export</Button>
          <Button variant="outline" size="sm" onClick={() => setBlastOpen(true)}><Megaphone className="w-4 h-4 mr-1" /> Blast</Button>
          <Button size="sm" className="gradient-accent text-accent-foreground" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4 mr-1" /> Add Member</Button>
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
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{member.lastActivity ? format(new Date(member.lastActivity), "MMM d") : "—"}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                    </DialogTrigger>
                    <MemberDetailDialog member={member} onEdit={handleEditMember} onDelete={handleDeleteMember} />
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

      <AddMemberDialog open={addOpen} onOpenChange={setAddOpen} onAdd={handleAddMember} />
      <BlastCampaignDialog open={blastOpen} onOpenChange={setBlastOpen} onSend={() => {}} allMembers={members} />
    </div>
  );
}
