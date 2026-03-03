import {
  Home, Mail, User, CalendarDays, GraduationCap, Clock, Link2, LogOut, Church, ChevronLeft, ChevronRight, Heart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const nav = [
  { title: "Home", url: "/portal", icon: Home },
  { title: "My Communication", url: "/portal/communication", icon: Mail },
  { title: "My Details", url: "/portal/details", icon: User },
  { title: "My Events", url: "/portal/events", icon: CalendarDays },
  { title: "Learning", url: "/portal/learning", icon: GraduationCap },
  { title: "My Giving", url: "/portal/giving", icon: Heart },
  { title: "My Rotas", url: "/portal/rotas", icon: Clock },
  { title: "Links", url: "/portal/links", icon: Link2 },
];

export function MemberSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
            <Church className="w-5 h-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-bold text-sidebar-accent-foreground leading-tight">HOTR Digital</h2>
              <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">Member Portal</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/portal"}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent transition-all duration-150"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border space-y-2">
        {!collapsed && user && (
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-sidebar-accent-foreground">{user.name}</p>
            <p className="text-[10px] text-sidebar-foreground/60">{user.email}</p>
          </div>
        )}
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sidebar-foreground/50 hover:text-destructive hover:bg-sidebar-accent transition-colors">
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="text-xs">Sign Out</span>}
        </button>
        <button onClick={toggleSidebar} className="flex items-center justify-center w-full py-2 rounded-lg text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
