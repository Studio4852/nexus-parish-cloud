import { ExternalLink, Video, FileText, Shield, BookOpen } from "lucide-react";

const links = [
  { id: "1", title: "Livestream", url: "https://stream.hotr.org", description: "Watch our live services online", icon: Video, category: "Worship" },
  { id: "2", title: "Visitor Form", url: "#", description: "New here? Fill in your details", icon: FileText, category: "Forms" },
  { id: "3", title: "Volunteer Application", url: "#", description: "Apply to volunteer in any department", icon: FileText, category: "Forms" },
  { id: "4", title: "Safeguarding Policy", url: "#", description: "Our commitment to safety and welfare", icon: Shield, category: "Policies" },
  { id: "5", title: "Church Constitution", url: "#", description: "Governing document of the church", icon: BookOpen, category: "Policies" },
  { id: "6", title: "Bible Study Resources", url: "#", description: "Curated study materials and guides", icon: BookOpen, category: "Resources" },
];

const categories = [...new Set(links.map(l => l.category))];

export default function MemberLinks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Links</h1>
        <p className="text-muted-foreground text-sm mt-1">Useful resources and quick links</p>
      </div>

      {categories.map(cat => (
        <div key={cat}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{cat}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {links.filter(l => l.category === cat).map(link => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="stat-card flex items-center gap-4 hover:border-accent/50 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <link.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{link.title}</p>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
