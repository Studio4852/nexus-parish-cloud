import { useState } from "react";
import { mockMessages as initialMessages, mockMembers } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { BlastCampaignDialog } from "@/components/BlastCampaignDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Mail, MessageCircle, Send, Eye, Trash2, Megaphone } from "lucide-react";
import { Message } from "@/types/platform";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

const channelIcons: Record<string, React.ReactNode> = {
  email: <Mail className="w-4 h-4 text-info" />,
  sms: <MessageCircle className="w-4 h-4 text-success" />,
  whatsapp: <Send className="w-4 h-4 text-accent" />,
};

export default function Communication() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [search, setSearch] = useState("");
  const [blastOpen, setBlastOpen] = useState(false);

  const filtered = messages.filter((m) => m.subject.toLowerCase().includes(search.toLowerCase()));

  const handleSend = (msg: Message) => setMessages((prev) => [msg, ...prev]);
  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast({ title: "Message Deleted" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Communication</h1>
          <p className="text-muted-foreground text-sm mt-1">Send and manage messages · {messages.length} campaigns</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="gradient-accent text-accent-foreground" onClick={() => setBlastOpen(true)}>
            <Megaphone className="w-4 h-4 mr-1" /> Blast Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Email", icon: <Mail className="w-5 h-5" />, desc: "Send email to members", available: true, action: () => setBlastOpen(true) },
          { label: "SMS", icon: <MessageCircle className="w-5 h-5" />, desc: "Send text messages", available: true, action: () => setBlastOpen(true) },
          { label: "WhatsApp", icon: <Send className="w-5 h-5" />, desc: "WhatsApp integration ready", available: false, action: () => toast({ title: "Coming Soon", description: "WhatsApp integration is under development." }) },
        ].map((ch) => (
          <button
            key={ch.label}
            onClick={ch.action}
            className={`stat-card flex items-center gap-3 text-left w-full hover:shadow-md transition-shadow ${!ch.available ? "opacity-60" : ""}`}
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">{ch.icon}</div>
            <div>
              <p className="font-medium text-sm">{ch.label}</p>
              <p className="text-xs text-muted-foreground">{ch.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search messages..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead>Channel</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="hidden md:table-cell">Recipients</TableHead>
              <TableHead className="hidden md:table-cell">Sent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell>{channelIcons[msg.channel]}</TableCell>
                <TableCell className="font-medium text-sm">{msg.subject}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{msg.recipients}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{format(new Date(msg.sentDate), "MMM d, h:mm a")}</TableCell>
                <TableCell><StatusBadge status={msg.status} /></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-display">{msg.subject}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div><p className="text-xs text-muted-foreground">Channel</p><p className="font-medium capitalize">{msg.channel}</p></div>
                            <div><p className="text-xs text-muted-foreground">Recipients</p><p className="font-medium">{msg.recipients}</p></div>
                            <div><p className="text-xs text-muted-foreground">Status</p><StatusBadge status={msg.status} /></div>
                            <div><p className="text-xs text-muted-foreground">Sent Count</p><p className="font-medium">{msg.sentCount}</p></div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Message</p>
                            <div className="bg-secondary/50 rounded-lg p-3">{msg.body}</div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(msg.id)}>
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No messages found.</div>
        )}
      </div>

      <BlastCampaignDialog open={blastOpen} onOpenChange={setBlastOpen} onSend={handleSend} allMembers={mockMembers} />
    </div>
  );
}
