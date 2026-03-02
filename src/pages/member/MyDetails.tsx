import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

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

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    toast({ title: "Profile Updated", description: "Your details have been saved." });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">My Details</h1>
        <p className="text-muted-foreground text-sm mt-1">View and update your personal information</p>
      </div>

      <div className="stat-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input value={form.fullName} onChange={e => update("fullName", e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={form.email} onChange={e => update("email", e.target.value)} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={form.phone} onChange={e => update("phone", e.target.value)} />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={form.dob} onChange={e => update("dob", e.target.value)} />
          </div>
          <div>
            <Label>Address</Label>
            <Input value={form.address} onChange={e => update("address", e.target.value)} />
          </div>
          <div>
            <Label>Marital Status</Label>
            <Input value={form.maritalStatus} onChange={e => update("maritalStatus", e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button className="gradient-accent text-accent-foreground" onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
