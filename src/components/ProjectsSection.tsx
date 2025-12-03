import { useEffect, useState } from "react";
import { ExternalLink, Globe, Bot, BookOpen, Building2, Heart, Code, Database, Server, Laptop, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  tags: string[] | null;
  link: string | null;
  gradient: string | null;
  icon_color: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Bot,
  BookOpen,
  Building2,
  Heart,
  Code,
  Database,
  Server,
  Laptop,
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (iconName: string | null): LucideIcon => {
    if (!iconName) return Globe;
    return iconMap[iconName] || Globe;
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects I've built, ranging from medical systems to AI-powered bots
            </p>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects to display yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => {
                const IconComponent = getIcon(project.icon);
                return (
                  <div
                    key={project.id}
                    className="group glass rounded-2xl overflow-hidden card-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Project Header */}
                    <div className={`h-40 bg-gradient-to-br ${project.gradient || 'from-primary/20 to-primary/5'} p-6 flex items-end`}>
                      <div className="p-4 glass rounded-xl">
                        <IconComponent className={project.icon_color || 'text-primary'} size={32} />
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      {project.link && (
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" asChild className="flex-1">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={14} />
                              Live Demo
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* More Projects CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Interested in more projects or collaboration?
            </p>
            <Button variant="hero" asChild>
              <a href="#contact">
                Let's Work Together
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
