import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "super_admin" | "department_admin" | "member";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAdmin: boolean;
  isMember: boolean;
}

const demoUsers: Record<UserRole, AuthUser> = {
  super_admin: { id: "sa-1", name: "Super Admin", email: "admin@hotr.org", role: "super_admin" },
  department_admin: { id: "da-1", name: "Pastor James", email: "james@hotr.org", role: "department_admin", department: "Worship" },
  member: { id: "m-1", name: "Sarah Johnson", email: "sarah.j@email.com", role: "member" },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (role: UserRole) => setUser(demoUsers[role]);
  const logout = () => setUser(null);
  const isAdmin = user?.role === "super_admin" || user?.role === "department_admin";
  const isMember = user?.role === "member";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isMember }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
