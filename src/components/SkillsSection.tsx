import { useEffect, useState } from "react";
import { Code2, Database, Layout, Server, Terminal, Palette, LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation, Trans } from "react-i18next";

interface Skill {
  id: string;
  category: string;
  name: string;
  level: number | null;
  icon: string | null;
}

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Layout,
  Backend: Server,
  Tools: Terminal,
  Other: Code2,
};

const categoryColors: Record<string, { color: string; bgColor: string }> = {
  Frontend: { color: "text-primary", bgColor: "bg-primary/10" },
  Backend: { color: "text-accent", bgColor: "bg-accent/10" },
  Tools: { color: "text-primary", bgColor: "bg-primary/10" },
  Other: { color: "text-accent", bgColor: "bg-accent/10" },
};

const techStack = [
  { name: "Laravel", icon: "🔴" },
  { name: "Vue.js", icon: "💚" },
  { name: "JavaScript", icon: "💛" },
  { name: "Tailwind", icon: "🌊" },
  { name: "MySQL", icon: "🐬" },
  { name: "PHP", icon: "🐘" },
  { name: "HTML5", icon: "📄" },
  { name: "CSS3", icon: "🎨" },
  { name: "Git", icon: "📦" },
  { name: "REST API", icon: "🔗" },
];

const SkillsSection = () => {
  const { t } = useTranslation();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("category", { ascending: true })
        .order("display_order", { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Filter skills that have icons for the marquee
  const marqueeSkills = skills.filter(skill => skill.icon);
  // If no dynamic skills with icons, fall back to static techStack
  const displayMarquee = marqueeSkills.length > 0 ? marqueeSkills : techStack;

  return (
    <section id="skills" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">{t('skills.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              <Trans i18nKey="skills.title">
                Technical <span className="text-gradient">Expertise</span>
              </Trans>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('skills.description')}
            </p>
          </div>

          {/* Tech Stack Marquee */}
          <div className="mb-16 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex gap-6 animate-marquee w-max">
              {[...displayMarquee, ...displayMarquee].map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-6 py-3 glass rounded-full whitespace-nowrap card-hover"
                >
                  <span>{tech.icon || ''}</span>
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(groupedSkills).map(([category, categorySkills], index) => {
                const IconComponent = categoryIcons[category] || Code2;
                const colors = categoryColors[category] || categoryColors.Other;
                
                return (
                  <div
                    key={category}
                    className="glass rounded-2xl p-6 card-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 ${colors.bgColor} rounded-xl`}>
                        <IconComponent className={colors.color} size={24} />
                      </div>
                      <h3 className="text-xl font-bold">{category}</h3>
                    </div>

                    <div className="space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Code Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass rounded-xl p-6 text-center card-hover">
              <Code2 className="text-primary mx-auto mb-3" size={32} />
              <div className="text-3xl font-bold text-gradient">50K+</div>
              <div className="text-sm text-muted-foreground">Lines of Code</div>
            </div>
            <div className="glass rounded-xl p-6 text-center card-hover">
              <Database className="text-accent mx-auto mb-3" size={32} />
              <div className="text-3xl font-bold text-gradient-accent">20+</div>
              <div className="text-sm text-muted-foreground">Databases Designed</div>
            </div>
            <div className="glass rounded-xl p-6 text-center card-hover">
              <Server className="text-primary mx-auto mb-3" size={32} />
              <div className="text-3xl font-bold text-gradient">15+</div>
              <div className="text-sm text-muted-foreground">APIs Built</div>
            </div>
            <div className="glass rounded-xl p-6 text-center card-hover">
              <Palette className="text-accent mx-auto mb-3" size={32} />
              <div className="text-3xl font-bold text-gradient-accent">100+</div>
              <div className="text-sm text-muted-foreground">UI Components</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
