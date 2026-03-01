import { useState } from "react";
import { mockMessages } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Mail, MessageCircle, Send, Clock } from "lucide-react";
import { format } from "date-fns";

const channelIcons: Record<string, React.ReactNode> = {
  email: <Mail className="w-4 h-4 text-info" />,
  sms: <MessageCircle className="w-4 h-4 text-success" />,
  whatsapp: <Send className="w-4 h-4 text-accent" />,
};

export default function Communication() {
  const [search, setSearch] = useState("");

  const filtered = mockMessages.filter((m) => m.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Communication</h1>
          <p className="text-muted-foreground text-sm mt-1">Send and manage messages to your congregation</p>
        </div>
        <Button size="sm" className="gradient-accent text-accent-foreground"><Plus className="w-4 h-4 mr-1" /> New Message</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Email", icon: <Mail className="w-5 h-5" />, desc: "Send email to members", available: true },
          { label: "SMS", icon: <MessageCircle className="w-5 h-5" />, desc: "Send text messages", available: true },
          { label: "WhatsApp", icon: <Send className="w-5 h-5" />, desc: "WhatsApp integration ready", available: false },
        ].map((ch) => (
          <div key={ch.label} className={`stat-card flex items-center gap-3 ${!ch.available ? "opacity-60" : ""}`}>
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">{ch.icon}</div>
            <div>
              <p className="font-medium text-sm">{ch.label}</p>
              <p className="text-xs text-muted-foreground">{ch.desc}</p>
            </div>
          </div>
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
              <TableHead className="text-right hidden sm:table-cell">Count</TableHead>
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
                <TableCell className="text-right text-sm hidden sm:table-cell">{msg.sentCount || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
