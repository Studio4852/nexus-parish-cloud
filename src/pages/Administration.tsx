import { mockDepartments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Shield, Building2, Users, Activity, Settings as SettingsIcon } from "lucide-react";

const auditLogs = [
  { id: "1", user: "Super Admin", action: "Created event 'Youth Conference 2026'", timestamp: "2026-02-28 14:30", type: "create" },
  { id: "2", user: "Sister Grace", action: "Updated member profile 'Esther Williams'", timestamp: "2026-02-27 11:15", type: "update" },
  { id: "3", user: "Super Admin", action: "Added new department 'Prayer Team'", timestamp: "2026-02-26 09:00", type: "create" },
  { id: "4", user: "Deacon Mark", action: "Sent email to 'Media & Tech' members", timestamp: "2026-02-25 16:45", type: "communication" },
  { id: "5", user: "Super Admin", action: "User login", timestamp: "2026-02-28 08:00", type: "auth" },
];

const roles = [
  { name: "Super Admin", description: "Full system access", users: 2, color: "bg-destructive/10 text-destructive" },
  { name: "Department Admin", description: "Department-level management", users: 6, color: "bg-warning/10 text-warning" },
  { name: "Member", description: "Basic member access", users: 474, color: "bg-info/10 text-info" },
];

export default function Administration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Administration</h1>
        <p className="text-muted-foreground text-sm mt-1">System settings, roles, and audit logs</p>
      </div>

      <Tabs defaultValue="departments" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="departments"><Building2 className="w-4 h-4 mr-1" /> Departments</TabsTrigger>
          <TabsTrigger value="roles"><Shield className="w-4 h-4 mr-1" /> Roles</TabsTrigger>
          <TabsTrigger value="audit"><Activity className="w-4 h-4 mr-1" /> Audit Log</TabsTrigger>
          <TabsTrigger value="settings"><SettingsIcon className="w-4 h-4 mr-1" /> Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <div className="flex justify-end mb-4">
            <Button size="sm" className="gradient-accent text-accent-foreground"><Plus className="w-4 h-4 mr-1" /> Add Department</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockDepartments.map((dept) => (
              <div key={dept.id} className="stat-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                  <h3 className="font-semibold text-sm">{dept.name}</h3>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {dept.memberCount} members</p>
                  <p>Head: {dept.head}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div key={role.name} className="stat-card">
                <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${role.color}`}>{role.name}</div>
                <p className="text-sm text-muted-foreground">{role.description}</p>
                <p className="text-lg font-bold mt-2">{role.users} users</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium text-sm">{log.user}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{log.action}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="stat-card max-w-lg space-y-4">
            <h3 className="font-semibold">System Settings</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span>Church Name</span>
                <span className="font-medium">House on the Rock</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span>Time Zone</span>
                <span className="font-medium">WAT (UTC+1)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span>Default Service</span>
                <span className="font-medium">Sunday First Service</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Platform Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
