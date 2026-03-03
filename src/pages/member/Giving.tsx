import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Plus, DollarSign, HandHeart, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Donation {
  id: string;
  amount: number;
  type: "tithe" | "offering" | "special_seed" | "building_fund" | "missions" | "other";
  date: string;
  method: "card" | "bank_transfer" | "cash";
  reference: string;
}

interface Commitment {
  id: string;
  title: string;
  totalAmount: number;
  paidAmount: number;
  startDate: string;
  endDate: string;
  frequency: "weekly" | "monthly" | "quarterly" | "one_time";
  status: "active" | "completed" | "paused";
}

interface Vow {
  id: string;
  title: string;
  amount: number;
  dateMade: string;
  fulfilled: boolean;
  fulfilledDate?: string;
  notes: string;
}

export default function Giving() {
  const [donations, setDonations] = useState<Donation[]>([
    { id: "1", amount: 50000, type: "tithe", date: "2025-02-28", method: "card", reference: "TXN-001" },
    { id: "2", amount: 20000, type: "offering", date: "2025-02-21", method: "bank_transfer", reference: "TXN-002" },
    { id: "3", amount: 100000, type: "special_seed", date: "2025-02-14", method: "card", reference: "TXN-003" },
  ]);

  const [commitments, setCommitments] = useState<Commitment[]>([
    { id: "1", title: "Building Fund Pledge", totalAmount: 500000, paidAmount: 200000, startDate: "2025-01-01", endDate: "2025-12-31", frequency: "monthly", status: "active" },
  ]);

  const [vows, setVows] = useState<Vow[]>([
    { id: "1", title: "Annual Thanksgiving Vow", amount: 300000, dateMade: "2025-01-01", fulfilled: false, notes: "Thanksgiving service commitment" },
  ]);

  const [showDonate, setShowDonate] = useState(false);
  const [showCommitment, setShowCommitment] = useState(false);
  const [showVow, setShowVow] = useState(false);

  const [newDonation, setNewDonation] = useState({ amount: "", type: "tithe" as Donation["type"], method: "card" as Donation["method"] });
  const [newCommitment, setNewCommitment] = useState({ title: "", totalAmount: "", frequency: "monthly" as Commitment["frequency"], endDate: "" });
  const [newVow, setNewVow] = useState({ title: "", amount: "", notes: "" });

  const totalGiven = donations.reduce((s, d) => s + d.amount, 0);

  const handleDonate = () => {
    if (!newDonation.amount || Number(newDonation.amount) <= 0) {
      toast({ title: "Invalid Amount", variant: "destructive" }); return;
    }
    setDonations(prev => [...prev, {
      id: Date.now().toString(), amount: Number(newDonation.amount), type: newDonation.type,
      date: new Date().toISOString().split("T")[0], method: newDonation.method,
      reference: `TXN-${Date.now().toString().slice(-5)}`,
    }]);
    setNewDonation({ amount: "", type: "tithe", method: "card" });
    setShowDonate(false);
    toast({ title: "Donation Recorded", description: `₦${Number(newDonation.amount).toLocaleString()} has been recorded. Thank you!` });
  };

  const handleAddCommitment = () => {
    if (!newCommitment.title || !newCommitment.totalAmount) {
      toast({ title: "Missing Info", variant: "destructive" }); return;
    }
    setCommitments(prev => [...prev, {
      id: Date.now().toString(), title: newCommitment.title, totalAmount: Number(newCommitment.totalAmount),
      paidAmount: 0, startDate: new Date().toISOString().split("T")[0], endDate: newCommitment.endDate || "",
      frequency: newCommitment.frequency, status: "active",
    }]);
    setNewCommitment({ title: "", totalAmount: "", frequency: "monthly", endDate: "" });
    setShowCommitment(false);
    toast({ title: "Commitment Added" });
  };

  const handleAddVow = () => {
    if (!newVow.title || !newVow.amount) {
      toast({ title: "Missing Info", variant: "destructive" }); return;
    }
    setVows(prev => [...prev, {
      id: Date.now().toString(), title: newVow.title, amount: Number(newVow.amount),
      dateMade: new Date().toISOString().split("T")[0], fulfilled: false, notes: newVow.notes,
    }]);
    setNewVow({ title: "", amount: "", notes: "" });
    setShowVow(false);
    toast({ title: "Vow Recorded" });
  };

  const handleFulfillVow = (id: string) => {
    setVows(prev => prev.map(v => v.id === id ? { ...v, fulfilled: true, fulfilledDate: new Date().toISOString().split("T")[0] } : v));
    toast({ title: "Vow Fulfilled", description: "Praise God! Your vow has been marked as fulfilled." });
  };

  const typeLabels: Record<string, string> = {
    tithe: "Tithe", offering: "Offering", special_seed: "Special Seed",
    building_fund: "Building Fund", missions: "Missions", other: "Other",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Giving</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your donations, commitments, and vows</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card text-center">
          <DollarSign className="w-6 h-6 mx-auto text-accent mb-1" />
          <p className="text-2xl font-bold">₦{totalGiven.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Given</p>
        </div>
        <div className="stat-card text-center">
          <HandHeart className="w-6 h-6 mx-auto text-accent mb-1" />
          <p className="text-2xl font-bold">{commitments.filter(c => c.status === "active").length}</p>
          <p className="text-xs text-muted-foreground">Active Commitments</p>
        </div>
        <div className="stat-card text-center">
          <Star className="w-6 h-6 mx-auto text-accent mb-1" />
          <p className="text-2xl font-bold">{vows.filter(v => !v.fulfilled).length}</p>
          <p className="text-xs text-muted-foreground">Pending Vows</p>
        </div>
      </div>

      <Tabs defaultValue="donations">
        <TabsList>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="commitments">Commitments</TabsTrigger>
          <TabsTrigger value="vows">Vows</TabsTrigger>
        </TabsList>

        <TabsContent value="donations" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Your giving history</p>
            <Button size="sm" onClick={() => setShowDonate(!showDonate)}>
              <Heart className="w-4 h-4 mr-1" /> Make Donation
            </Button>
          </div>

          {showDonate && (
            <div className="stat-card space-y-3">
              <h3 className="text-sm font-semibold">New Donation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Amount (₦)</Label>
                  <Input type="number" min="1" value={newDonation.amount} onChange={e => setNewDonation(p => ({ ...p, amount: e.target.value }))} placeholder="0.00" />
                </div>
                <div>
                  <Label>Type</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={newDonation.type} onChange={e => setNewDonation(p => ({ ...p, type: e.target.value as Donation["type"] }))}>
                    <option value="tithe">Tithe</option><option value="offering">Offering</option><option value="special_seed">Special Seed</option>
                    <option value="building_fund">Building Fund</option><option value="missions">Missions</option><option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label>Method</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={newDonation.method} onChange={e => setNewDonation(p => ({ ...p, method: e.target.value as Donation["method"] }))}>
                    <option value="card">Card</option><option value="bank_transfer">Bank Transfer</option><option value="cash">Cash</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowDonate(false)}>Cancel</Button>
                <Button size="sm" className="gradient-accent text-accent-foreground" onClick={handleDonate}>Submit Donation</Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {donations.map(d => (
              <div key={d.id} className="stat-card flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">₦{d.amount.toLocaleString()} — {typeLabels[d.type]}</p>
                  <p className="text-xs text-muted-foreground">{d.date} · {d.method.replace("_", " ")} · Ref: {d.reference}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="commitments" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Your pledges and commitments</p>
            <Button size="sm" onClick={() => setShowCommitment(!showCommitment)}>
              <Plus className="w-4 h-4 mr-1" /> Add Commitment
            </Button>
          </div>

          {showCommitment && (
            <div className="stat-card space-y-3">
              <h3 className="text-sm font-semibold">New Commitment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Title</Label><Input value={newCommitment.title} onChange={e => setNewCommitment(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Building Fund Pledge" /></div>
                <div><Label>Total Amount (₦)</Label><Input type="number" min="1" value={newCommitment.totalAmount} onChange={e => setNewCommitment(p => ({ ...p, totalAmount: e.target.value }))} /></div>
                <div>
                  <Label>Frequency</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={newCommitment.frequency} onChange={e => setNewCommitment(p => ({ ...p, frequency: e.target.value as Commitment["frequency"] }))}>
                    <option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="quarterly">Quarterly</option><option value="one_time">One Time</option>
                  </select>
                </div>
                <div><Label>End Date</Label><Input type="date" value={newCommitment.endDate} onChange={e => setNewCommitment(p => ({ ...p, endDate: e.target.value }))} /></div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowCommitment(false)}>Cancel</Button>
                <Button size="sm" className="gradient-accent text-accent-foreground" onClick={handleAddCommitment}>Add</Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {commitments.map(c => (
              <div key={c.id} className="stat-card space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{c.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{c.frequency.replace("_", " ")} · {c.status} · Since {c.startDate}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === "active" ? "bg-green-100 text-green-700" : c.status === "completed" ? "bg-blue-100 text-blue-700" : "bg-secondary text-muted-foreground"}`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>₦{c.paidAmount.toLocaleString()} of ₦{c.totalAmount.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min((c.paidAmount / c.totalAmount) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vows" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Your vows before God</p>
            <Button size="sm" onClick={() => setShowVow(!showVow)}>
              <Plus className="w-4 h-4 mr-1" /> Add Vow
            </Button>
          </div>

          {showVow && (
            <div className="stat-card space-y-3">
              <h3 className="text-sm font-semibold">New Vow</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Title</Label><Input value={newVow.title} onChange={e => setNewVow(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Thanksgiving Vow" /></div>
                <div><Label>Amount (₦)</Label><Input type="number" min="1" value={newVow.amount} onChange={e => setNewVow(p => ({ ...p, amount: e.target.value }))} /></div>
                <div className="md:col-span-2"><Label>Notes</Label><Input value={newVow.notes} onChange={e => setNewVow(p => ({ ...p, notes: e.target.value }))} placeholder="Optional context" /></div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowVow(false)}>Cancel</Button>
                <Button size="sm" className="gradient-accent text-accent-foreground" onClick={handleAddVow}>Record Vow</Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {vows.map(v => (
              <div key={v.id} className="stat-card flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{v.title} — ₦{v.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Made {v.dateMade}{v.notes ? ` · ${v.notes}` : ""}{v.fulfilledDate ? ` · Fulfilled ${v.fulfilledDate}` : ""}</p>
                </div>
                {v.fulfilled ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Fulfilled</span>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleFulfillVow(v.id)}>Mark Fulfilled</Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
