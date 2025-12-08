import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/admin/login");
      } else if (!isAdmin) {
        navigate("/admin/login");
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <AdminSidebar className="hidden md:flex" />
      
      <main className="flex-1 overflow-auto flex flex-col w-full">
        <header className="flex justify-between md:justify-end items-center p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          {/* Mobile Sidebar Trigger */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r border-border">
              <AdminSidebar className="w-full h-full border-none" onNavigate={() => setIsMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <ThemeSwitcher />
        </header>
        <div className="p-4 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
