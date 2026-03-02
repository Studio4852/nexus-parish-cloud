import { mockMessages } from "@/data/mockData";
import { Mail, MessageSquare } from "lucide-react";
import { format } from "date-fns";

export default function MyCommunication() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Communication</h1>
        <p className="text-muted-foreground text-sm mt-1">Messages and notifications from the church</p>
      </div>

      <div className="stat-card">
        <div className="space-y-1">
          {mockMessages.map(msg => (
            <div key={msg.id} className="flex items-start gap-4 py-4 border-b border-border last:border-0">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                {msg.channel === "email" ? <Mail className="w-4 h-4 text-muted-foreground" /> : <MessageSquare className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm">{msg.subject}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{format(new Date(msg.sentDate), "MMM d")}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{msg.body}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] uppercase tracking-wider bg-secondary px-2 py-0.5 rounded">{msg.channel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
