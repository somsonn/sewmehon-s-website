import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

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
      <AdminSidebar />
      <main className="flex-1 overflow-auto flex flex-col">
        <header className="flex justify-end items-center p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <ThemeSwitcher />
        </header>
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
