import { ExternalLink, Github, Globe, Bot, BookOpen, Building2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Sante Medical College",
    description: "Comprehensive medical college management system with student enrollment, academic tracking, faculty management, and administrative tools.",
    icon: Building2,
    tags: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
    link: "https://sante.degantechnologies.com",
    gradient: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-500",
  },
  {
    title: "Telegram Inventory Bot",
    description: "Advanced Telegram bot for inventory management with real-time stock tracking, order processing, and automated notifications.",
    icon: Bot,
    tags: ["Laravel", "Telegram API", "MySQL", "PHP"],
    link: "https://advanced-bot.degantechnologies.com/#/",
    gradient: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-500",
  },
  {
    title: "Digital Library System",
    description: "Full-featured digital library management system with book cataloging, user management, borrowing system, and search functionality.",
    icon: BookOpen,
    tags: ["Laravel", "Vue.js", "MySQL", "REST API"],
    link: "https://dlms.degantechnologies.com",
    gradient: "from-green-500/20 to-green-600/5",
    iconColor: "text-green-500",
  },
  {
    title: "Knowledge Management System",
    description: "Enterprise knowledge management platform for document organization, collaboration, and information sharing within organizations.",
    icon: Globe,
    tags: ["Laravel", "Vue.js", "MySQL", "Tailwind"],
    link: "https://kmsarada.degantechnologies.com/",
    gradient: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-500",
  },
  {
    title: "Ethiopian Kidney Association",
    description: "Official website for Ethiopian Kidney Association featuring news, services, membership management, and donation system.",
    icon: Heart,
    tags: ["Laravel", "PHP", "MySQL", "Responsive"],
    link: "https://ethiopiankidneyassociation.et/",
    gradient: "from-red-500/20 to-red-600/5",
    iconColor: "text-red-500",
  },
];

const ProjectsSection = () => {
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group glass rounded-2xl overflow-hidden card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Header */}
                <div className={`h-40 bg-gradient-to-br ${project.gradient} p-6 flex items-end`}>
                  <div className="p-4 glass rounded-xl">
                    <project.icon className={project.iconColor} size={32} />
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

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
