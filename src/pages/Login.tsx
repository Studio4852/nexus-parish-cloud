import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Church, Shield, User } from "lucide-react";

const roles: { role: UserRole; label: string; desc: string; icon: typeof Shield; path: string }[] = [
  { role: "super_admin", label: "Super Admin", desc: "Full system access to Admin Portal", icon: Shield, path: "/" },
  { role: "member", label: "Member", desc: "Access the Member Portal", icon: User, path: "/portal" },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole, path: string) => {
    login(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto">
            <Church className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold">HOTR Digital</h1>
          <p className="text-muted-foreground text-sm">Operations Platform · Select a role to continue</p>
        </div>
        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => handleLogin(r.role, r.path)}
              className="w-full stat-card flex items-center gap-4 text-left hover:border-accent/50 transition-colors cursor-pointer"
            >
              <div className="w-11 h-11 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <r.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">Demo mode · No credentials required</p>
      </div>
    </div>
  );
}
