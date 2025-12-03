import { Code2, Database, Layout, Server, Terminal, Palette } from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Layout,
    color: "text-primary",
    bgColor: "bg-primary/10",
    items: [
      { name: "Vue.js", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "text-accent",
    bgColor: "bg-accent/10",
    items: [
      { name: "Laravel", level: 95 },
      { name: "PHP", level: 90 },
      { name: "REST APIs", level: 88 },
      { name: "MySQL", level: 85 },
    ],
  },
  {
    category: "Tools & Others",
    icon: Terminal,
    color: "text-primary",
    bgColor: "bg-primary/10",
    items: [
      { name: "Git/GitHub", level: 85 },
      { name: "VS Code", level: 92 },
      { name: "Linux", level: 80 },
      { name: "Docker", level: 70 },
    ],
  },
];

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
  return (
    <section id="skills" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">My Skills</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              Technical <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Proficient in modern web technologies with hands-on experience building production applications
            </p>
          </div>

          {/* Tech Stack Marquee */}
          <div className="mb-16 overflow-hidden">
            <div className="flex gap-6 animate-slide-right">
              {[...techStack, ...techStack].map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-6 py-3 glass rounded-full whitespace-nowrap card-hover"
                >
                  <span>{tech.icon}</span>
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={skillGroup.category}
                className="glass rounded-2xl p-6 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 ${skillGroup.bgColor} rounded-xl`}>
                    <skillGroup.icon className={skillGroup.color} size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{skillGroup.category}</h3>
                </div>

                <div className="space-y-4">
                  {skillGroup.items.map((skill) => (
                    <div key={skill.name}>
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
            ))}
          </div>

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
