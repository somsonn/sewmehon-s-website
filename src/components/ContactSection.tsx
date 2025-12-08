import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation, Trans } from "react-i18next";

interface SiteSettings {
  cv_url: string;
  contact_email: string;
  contact_phone: string;
  linkedin_url: string;
}

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    cv_url: "",
    contact_email: "somsonengda@gmail.com",
    contact_phone: "+251930925984",
    linkedin_url: "https://www.linkedin.com/in/sewmehon-engda-a50314362",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) throw error;

      const settingsObj: Record<string, string> = {};
      data?.forEach((item) => {
        settingsObj[item.key] = item.value || "";
      });

      setSettings({
        cv_url: settingsObj.cv_url || "",
        contact_email: settingsObj.contact_email || "somsonengda@gmail.com",
        contact_phone: settingsObj.contact_phone || "+251930925984",
        linkedin_url: settingsObj.linkedin_url || "https://www.linkedin.com/in/sewmehon-engda-a50314362",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (error) throw error;

      toast({
        title: t('contact.successTitle'),
        description: t('contact.successDesc'),
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: t('contact.errorTitle'),
        description: error.message || t('contact.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: settings.contact_email,
      href: `mailto:${settings.contact_email}`,
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: settings.contact_phone,
      href: `tel:${settings.contact_phone}`,
    },
    {
      icon: MapPin,
      label: t('contact.location'),
      value: "Ethiopia",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: settings.linkedin_url,
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com",
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${settings.contact_email}`,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">{t('contact.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              <Trans i18nKey="contact.title">
                Get In <span className="text-gradient">Touch</span>
              </Trans>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6">{t('contact.connect')}</h3>
                <p className="text-muted-foreground mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities 
                  to be part of your vision. Whether you need a fullstack developer or a technical consultant,
                  I'm here to help.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="glass rounded-xl p-4 card-hover flex items-center gap-4"
                  >
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <info.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="font-semibold">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4">{t('contact.followMe')}</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Download CV */}
              <div className="glass rounded-xl p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold mb-1">{t('contact.downloadCVTitle')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('contact.downloadCVDesc')}
                    </p>
                  </div>
                  {settings.cv_url ? (
                    <Button variant="hero" asChild>
                      <a href={settings.cv_url} target="_blank" rel="noopener noreferrer">
                        <Download size={18} />
                        CV
                      </a>
                    </Button>
                  ) : (
                    <Button variant="hero" disabled>
                      <Download size={18} />
                      CV
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">{t('contact.sendMessage')}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('contact.name')}</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-muted/50 border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('contact.email')}</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-muted/50 border-border"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('contact.subject')}</label>
                  <Input
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('contact.message')}</label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-muted/50 border-border resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t('contact.sending')
                  ) : (
                    <>
                      <Send size={18} />
                      {t('contact.send')}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
