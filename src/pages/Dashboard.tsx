
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";
import { Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  const { user } = useAuth();
  const { loading } = useRole();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <ScrollArea className="h-full">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Welcome to EduHub</h1>
              <p className="text-muted-foreground">
                Select an option from the sidebar to get started.
              </p>
            </div>
          </ScrollArea>
        </main>
      </div>
    </SidebarProvider>
  );
}
