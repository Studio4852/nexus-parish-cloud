import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, ExternalLink, Trash2, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
}

const initialLinks: LinkItem[] = [
  { id: "1", title: "Livestream", url: "https://stream.hotr.org", description: "Watch live services", category: "Worship" },
  { id: "2", title: "Visitor Form", url: "#", description: "New visitor registration", category: "Forms" },
  { id: "3", title: "Volunteer Application", url: "#", description: "Apply to volunteer", category: "Forms" },
  { id: "4", title: "Safeguarding Policy", url: "#", description: "Safety and welfare policy", category: "Policies" },
  { id: "5", title: "Bible Study Resources", url: "#", description: "Curated study materials", category: "Resources" },
];

export default function LinksAdmin() {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ title: "", url: "", description: "", category: "" });

  const handleCreate = () => {
    if (!form.title || !form.url) { toast({ title: "Error", description: "Title and URL required", variant: "destructive" }); return; }
    setLinks(prev => [...prev, { id: String(Date.now()), ...form }]);
    toast({ title: "Link Added" });
    setForm({ title: "", url: "", description: "", category: "" });
    setCreateOpen(false);
  };

  const handleDelete = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
    toast({ title: "Link Removed" });
  };

  const categories = [...new Set(links.map(l => l.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Links Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage links visible to members · {links.length} links</p>
        </div>
        <Button size="sm" className="gradient-accent text-accent-foreground" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Link
        </Button>
      </div>

      {categories.map(cat => (
        <div key={cat}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{cat}</h2>
          <div className="space-y-2">
            {links.filter(l => l.category === cat).map(link => (
              <div key={link.id} className="stat-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{link.title}</p>
                    <p className="text-xs text-muted-foreground">{link.url}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(link.id)}>
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add Link</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} /></div>
            <div><Label>URL *</Label><Input value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} /></div>
            <div><Label>Description</Label><Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Forms, Policies" /></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button className="gradient-accent text-accent-foreground" onClick={handleCreate}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
