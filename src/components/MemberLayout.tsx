import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MemberSidebar } from "@/components/MemberSidebar";
import { Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function MemberLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const initials = user?.name?.split(" ").map(n => n[0]).join("") || "M";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MemberSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border bg-card px-4 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Welcome back, {user?.name?.split(" ")[0]}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-[18px] h-[18px] text-muted-foreground" />
              </button>
              <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-accent-foreground text-xs font-semibold">
                {initials}
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
