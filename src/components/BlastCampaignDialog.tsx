import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockMembers, mockDepartments } from "@/data/mockData";
import { Member, Message } from "@/types/platform";
import { toast } from "@/hooks/use-toast";
import { Mail, MessageCircle, Send, Users, User, Search, X, Megaphone } from "lucide-react";

interface BlastCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (message: Message) => void;
  allMembers: Member[];
}

export function BlastCampaignDialog({ open, onOpenChange, onSend, allMembers }: BlastCampaignDialogProps) {
  const [channel, setChannel] = useState<"email" | "sms" | "whatsapp">("email");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [targetMode, setTargetMode] = useState<"all" | "department" | "individual">("all");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [sending, setSending] = useState(false);

  const filteredMembers = allMembers.filter(
    (m) => m.fullName.toLowerCase().includes(memberSearch.toLowerCase()) || m.email.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map((m) => m.id));
    }
  };

  const getRecipientCount = () => {
    if (targetMode === "all") return allMembers.length;
    if (targetMode === "department") return allMembers.filter((m) => m.department === selectedDept).length;
    return selectedMembers.length;
  };

  const getRecipientLabel = () => {
    if (targetMode === "all") return "All Members";
    if (targetMode === "department") return `${selectedDept} Department`;
    return `${selectedMembers.length} selected member(s)`;
  };

  const handleSend = () => {
    if (!subject.trim()) {
      toast({ title: "Error", description: "Subject is required", variant: "destructive" });
      return;
    }
    if (!body.trim()) {
      toast({ title: "Error", description: "Message body is required", variant: "destructive" });
      return;
    }
    if (targetMode === "individual" && selectedMembers.length === 0) {
      toast({ title: "Error", description: "Select at least one recipient", variant: "destructive" });
      return;
    }
    if (targetMode === "department" && !selectedDept) {
      toast({ title: "Error", description: "Select a department", variant: "destructive" });
      return;
    }

    setSending(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: String(Date.now()),
        subject,
        body,
        channel,
        recipients: getRecipientLabel(),
        sentDate: scheduleDate || new Date().toISOString(),
        status: scheduleDate ? "scheduled" : "delivered",
        sentCount: getRecipientCount(),
      };
      onSend(newMessage);
      toast({
        title: scheduleDate ? "Campaign Scheduled" : "Campaign Sent!",
        description: `"${subject}" ${scheduleDate ? "scheduled" : "sent"} to ${getRecipientCount()} recipient(s) via ${channel}.`,
      });
      // Reset
      setSubject(""); setBody(""); setSelectedMembers([]); setMemberSearch("");
      setTargetMode("all"); setSelectedDept(""); setScheduleDate(""); setSending(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-accent" />
            Blast Campaign
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Channel Selection */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Channel</Label>
            <div className="flex gap-2">
              {[
                { value: "email" as const, label: "Email", icon: Mail, available: true },
                { value: "sms" as const, label: "SMS", icon: MessageCircle, available: true },
                { value: "whatsapp" as const, label: "WhatsApp", icon: Send, available: false },
              ].map((ch) => (
                <Button
                  key={ch.value}
                  type="button"
                  variant={channel === ch.value ? "default" : "outline"}
                  size="sm"
                  disabled={!ch.available}
                  onClick={() => setChannel(ch.value)}
                  className={channel === ch.value ? "gradient-accent text-accent-foreground" : ""}
                >
                  <ch.icon className="w-4 h-4 mr-1" />
                  {ch.label}
                  {!ch.available && <span className="ml-1 text-[10px] opacity-60">(soon)</span>}
                </Button>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Recipients</Label>
            <Tabs value={targetMode} onValueChange={(v) => setTargetMode(v as any)}>
              <TabsList className="bg-secondary w-full">
                <TabsTrigger value="all" className="flex-1"><Users className="w-3.5 h-3.5 mr-1" /> All Members</TabsTrigger>
                <TabsTrigger value="department" className="flex-1">Department</TabsTrigger>
                <TabsTrigger value="individual" className="flex-1"><User className="w-3.5 h-3.5 mr-1" /> Individuals</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="bg-secondary/50 rounded-lg p-3 text-sm text-muted-foreground">
                  Message will be sent to <span className="font-semibold text-foreground">{allMembers.length}</span> members.
                </div>
              </TabsContent>

              <TabsContent value="department">
                <Select value={selectedDept} onValueChange={setSelectedDept}>
                  <SelectTrigger><SelectValue placeholder="Choose department" /></SelectTrigger>
                  <SelectContent>
                    {mockDepartments.map((d) => (
                      <SelectItem key={d.id} value={d.name}>{d.name} ({d.memberCount} members)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>

              <TabsContent value="individual" className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search members..." className="pl-9" value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} />
                </div>

                {selectedMembers.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMembers.map((id) => {
                      const m = allMembers.find((x) => x.id === id);
                      if (!m) return null;
                      return (
                        <span key={id} className="inline-flex items-center gap-1 bg-accent/15 text-accent-foreground text-xs px-2 py-1 rounded-full">
                          {m.fullName}
                          <button onClick={() => toggleMember(id)}><X className="w-3 h-3" /></button>
                        </span>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button onClick={selectAll} className="text-xs text-accent hover:underline">
                    {selectedMembers.length === filteredMembers.length ? "Deselect All" : "Select All"}
                  </button>
                  <span className="text-xs text-muted-foreground">{selectedMembers.length} selected</span>
                </div>

                <ScrollArea className="h-48 border border-border rounded-lg">
                  <div className="p-1">
                    {filteredMembers.map((member) => (
                      <label
                        key={member.id}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors"
                      >
                        <Checkbox
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={() => toggleMember(member.id)}
                        />
                        <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-[10px] font-semibold flex-shrink-0">
                          {member.fullName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{member.fullName}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{member.email} · {member.phone}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Message Content */}
          <div className="space-y-3">
            <div>
              <Label>Subject *</Label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter message subject" />
            </div>
            <div>
              <Label>Message *</Label>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your message here..." rows={5} />
            </div>
          </div>

          {/* Schedule */}
          <div>
            <Label>Schedule (optional)</Label>
            <Input type="datetime-local" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
            <p className="text-[11px] text-muted-foreground mt-1">Leave blank to send immediately</p>
          </div>

          {/* Summary & Send */}
          <div className="bg-secondary/50 rounded-lg p-3 text-sm">
            <p className="font-medium">Campaign Summary</p>
            <p className="text-muted-foreground text-xs mt-1">
              Channel: <span className="text-foreground capitalize">{channel}</span> · Recipients: <span className="text-foreground">{getRecipientCount()}</span> · {scheduleDate ? `Scheduled: ${new Date(scheduleDate).toLocaleString()}` : "Send immediately"}
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSend} disabled={sending} className="gradient-accent text-accent-foreground">
              {sending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <>{scheduleDate ? "Schedule Campaign" : "Send Campaign"}</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
