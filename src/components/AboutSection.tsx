import { GraduationCap, Briefcase, MapPin, Calendar } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">{t('about.sectionTitle')}</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              <Trans i18nKey="about.mainHeading">
                Passionate <span className="text-gradient">Developer</span> & Educator
              </Trans>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('about.subHeading')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bio */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                <Trans i18nKey="about.bio1">
                  I'm <span className="text-foreground font-semibold">Sewmehon Engda</span>, a dedicated software engineer 
                  and fullstack developer with a passion for creating impactful digital solutions. 
                  Currently serving as a <span className="text-primary">Lecturer at Woldia University</span>, 
                  I bridge the gap between academic theory and industry practice.
                </Trans>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.bio2')}
              </p>
              
              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass rounded-xl p-4 card-hover">
                  <MapPin className="text-primary mb-2" size={24} />
                  <div className="text-sm text-muted-foreground">{t('about.location')}</div>
                  <div className="font-semibold">Ethiopia</div>
                </div>
                <div className="glass rounded-xl p-4 card-hover">
                  <Briefcase className="text-primary mb-2" size={24} />
                  <div className="text-sm text-muted-foreground">{t('about.position')}</div>
                  <div className="font-semibold">Lecturer</div>
                </div>
              </div>
            </div>

            {/* Education & Experience */}
            <div className="space-y-6">
              {/* Education */}
              <div className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <GraduationCap className="text-primary" size={28} />
                  </div>
                      <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{t('about.educationTitle')}</h3>
                      <h4 className="text-primary font-semibold">{t('about.educationSchool')}</h4>
                      <p className="text-muted-foreground">{t('about.educationDegree')}</p>
                      <p className="font-bold text-sm mt-1">{t('about.educationGPA')}</p>
                      <p className="text-sm font-semibold text-primary mt-1">{t('about.educationAward')}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        <span>{t('about.graduate')}</span>
                      </div>
                      </div>
                </div>
              </div>

              {/* Current Role */}
              <div className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <Briefcase className="text-accent" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{t('about.currentRoleTitle')}</h3>
                    <h4 className="text-accent font-semibold">{t('about.currentRoleSchool')}</h4>
                    <p className="text-muted-foreground">{t('about.currentRoleDesc')}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{t('about.present')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Work */}
              <div className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Briefcase className="text-primary" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{t('about.sideWorkTitle')}</h3>
                    <h4 className="text-primary font-semibold">{t('about.sideWorkCompany')}</h4>
                    <p className="text-muted-foreground">{t('about.sideWorkDesc')}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{t('about.present')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
