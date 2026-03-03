import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Users } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dob: string;
  phone: string;
}

export default function MyDetails() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "+1 555-0101",
    address: "123 Faith Street, Lagos",
    dob: "1990-03-15",
    maritalStatus: "Married",
  });

  const [family, setFamily] = useState<FamilyMember[]>([
    { id: "1", name: "David Johnson", relationship: "Spouse", dob: "1988-07-22", phone: "+1 555-0102" },
    { id: "2", name: "Grace Johnson", relationship: "Child", dob: "2015-01-10", phone: "" },
  ]);

  const [newMember, setNewMember] = useState({ name: "", relationship: "", dob: "", phone: "" });
  const [showAddFamily, setShowAddFamily] = useState(false);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    toast({ title: "Profile Updated", description: "Your details have been saved." });
  };

  const handleAddFamily = () => {
    if (!newMember.name || !newMember.relationship) {
      toast({ title: "Missing Info", description: "Please provide name and relationship.", variant: "destructive" });
      return;
    }
    setFamily(prev => [...prev, { ...newMember, id: Date.now().toString() }]);
    setNewMember({ name: "", relationship: "", dob: "", phone: "" });
    setShowAddFamily(false);
    toast({ title: "Family Member Added" });
  };

  const handleRemoveFamily = (id: string) => {
    setFamily(prev => prev.filter(f => f.id !== id));
    toast({ title: "Family Member Removed" });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">My Details</h1>
        <p className="text-muted-foreground text-sm mt-1">View and update your personal and family information</p>
      </div>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="family">Family ({family.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-4">
          <div className="stat-card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input value={form.fullName} onChange={e => update("fullName", e.target.value)} /></div>
              <div><Label>Email</Label><Input value={form.email} onChange={e => update("email", e.target.value)} /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={e => update("phone", e.target.value)} /></div>
              <div><Label>Date of Birth</Label><Input type="date" value={form.dob} onChange={e => update("dob", e.target.value)} /></div>
              <div><Label>Address</Label><Input value={form.address} onChange={e => update("address", e.target.value)} /></div>
              <div><Label>Marital Status</Label><Input value={form.maritalStatus} onChange={e => update("maritalStatus", e.target.value)} /></div>
            </div>
            <div className="flex justify-end pt-2">
              <Button className="gradient-accent text-accent-foreground" onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="family" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Manage your family members</p>
            <Button size="sm" onClick={() => setShowAddFamily(!showAddFamily)}>
              <Plus className="w-4 h-4 mr-1" /> Add Family Member
            </Button>
          </div>

          {showAddFamily && (
            <div className="stat-card space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2"><Users className="w-4 h-4" /> New Family Member</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Full Name</Label><Input value={newMember.name} onChange={e => setNewMember(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Jane Johnson" /></div>
                <div>
                  <Label>Relationship</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={newMember.relationship} onChange={e => setNewMember(p => ({ ...p, relationship: e.target.value }))}>
                    <option value="">Select...</option>
                    <option>Spouse</option><option>Child</option><option>Parent</option><option>Sibling</option><option>Other</option>
                  </select>
                </div>
                <div><Label>Date of Birth</Label><Input type="date" value={newMember.dob} onChange={e => setNewMember(p => ({ ...p, dob: e.target.value }))} /></div>
                <div><Label>Phone</Label><Input value={newMember.phone} onChange={e => setNewMember(p => ({ ...p, phone: e.target.value }))} placeholder="Optional" /></div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowAddFamily(false)}>Cancel</Button>
                <Button size="sm" className="gradient-accent text-accent-foreground" onClick={handleAddFamily}>Add</Button>
              </div>
            </div>
          )}

          {family.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground text-sm">No family members added yet.</p>
          ) : (
            <div className="space-y-2">
              {family.map(f => (
                <div key={f.id} className="stat-card flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.relationship}{f.dob ? ` · Born ${f.dob}` : ""}{f.phone ? ` · ${f.phone}` : ""}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemoveFamily(f.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
