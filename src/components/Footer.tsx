import { Heart, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-4">
              <a href="#home" className="text-2xl font-bold">
                <span className="text-gradient">SE</span>
                <span className="text-foreground">.</span>
              </a>
              <div className="h-6 w-px bg-border" />
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Sewmehon Engda. {t('footer.rights')}
              </p>
            </div>

            {/* Made with love */}
            {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Made with <Heart className="text-red-500 fill-red-500" size={16} /> in Ethiopia
            </div> */}

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-3 glass rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
