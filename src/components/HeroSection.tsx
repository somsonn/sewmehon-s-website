import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-up opacity-0 stagger-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Available for opportunities
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up opacity-0 stagger-2">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient">Sewmehon Engda</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-up opacity-0 stagger-3">
            Software Engineer • Fullstack Developer • Lecturer
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-up opacity-0 stagger-4">
            Building scalable web applications with modern technologies. 
            Currently lecturing at <span className="text-primary">Woldia University</span> and 
            crafting digital solutions at <span className="text-accent">Degan Technologies</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up opacity-0 stagger-5">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                <ExternalLink size={20} />
                View My Work
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">
                <Download size={20} />
                Download CV
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-up opacity-0 stagger-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">10+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">3+</div>
              <div className="text-sm text-muted-foreground">Years Exp</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">10+</div>
              <div className="text-sm text-muted-foreground">Clients</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
