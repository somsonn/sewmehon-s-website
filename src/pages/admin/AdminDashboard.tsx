import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderKanban, Wrench, MessageSquare, FileText, Eye, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  projects: number;
  skills: number;
  messages: number;
  unreadMessages: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, skillsRes, messagesRes, unreadRes] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact" }),
        supabase.from("skills").select("id", { count: "exact" }),
        supabase.from("contact_messages").select("id", { count: "exact" }),
        supabase.from("contact_messages").select("id", { count: "exact" }).eq("is_read", false),
      ]);

      setStats({
        projects: projectsRes.count || 0,
        skills: skillsRes.count || 0,
        messages: messagesRes.count || 0,
        unreadMessages: unreadRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: "/admin/projects",
    },
    {
      title: "Skills Listed",
      value: stats.skills,
      icon: Wrench,
      color: "text-accent",
      bgColor: "bg-accent/10",
      href: "/admin/skills",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      href: "/admin/messages",
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined,
    },
    {
      title: "CV Downloads",
      value: "—",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      href: "/admin/settings",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your portfolio.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Link
              key={stat.title}
              to={stat.href}
              className="glass rounded-xl p-6 card-hover relative"
            >
              {stat.badge && (
                <span className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                  {stat.badge} new
                </span>
              )}
              <div className={`p-3 ${stat.bgColor} rounded-xl w-fit mb-4`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div className="text-3xl font-bold mb-1">
                {isLoading ? "..." : stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-primary" size={24} />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/admin/projects"
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span>Add New Project</span>
                <FolderKanban size={20} className="text-muted-foreground" />
              </Link>
              <Link
                to="/admin/skills"
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span>Manage Skills</span>
                <Wrench size={20} className="text-muted-foreground" />
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span>Upload CV</span>
                <FileText size={20} className="text-muted-foreground" />
              </Link>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Eye className="text-accent" size={24} />
              Preview
            </h2>
            <p className="text-muted-foreground mb-4">
              See how your portfolio looks to visitors.
            </p>
            <Link to="/" target="_blank">
              <button className="w-full py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                View Live Site →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
