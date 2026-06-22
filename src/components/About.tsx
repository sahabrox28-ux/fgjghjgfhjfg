import { ShieldCheck, Wrench, Compass, Flame } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const pillars = [
    {
      id: "pillar-precision",
      icon: <Wrench className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />,
      title: t('about.p1.title'),
      desc: t('about.p1.desc'),
    },
    {
      id: "pillar-protection",
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />,
      title: t('about.p2.title'),
      desc: t('about.p2.desc'),
    },
    {
      id: "pillar-expeditions",
      icon: <Compass className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />,
      title: t('about.p3.title'),
      desc: t('about.p3.desc'),
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-[#121212] py-24 border-t border-white/5 overflow-hidden"
    >
      {/* Visual background details */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#1c1c1c]/40 to-transparent pointer-events-none" />
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-12 relative z-10">
        
        {/* Core Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Section Heading Left Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-8 bg-[#D4AF37]" />
              <span className="text-[12px] font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
                {t('about.title1')}
              </span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl text-white font-black italic tracking-tighter leading-none uppercase">
              {t('about.title2')} <br />
              <span className="text-[#D4AF37]">{t('about.title3')}</span>
            </h2>

            <p className="font-sans text-white/50 leading-relaxed text-sm">
              {t('about.desc')}
            </p>

            <blockquote className="border-l-4 border-[#D4AF37] pl-4 py-1 italic text-[#D4AF37] text-sm font-sans">
              {t('about.quote')}
            </blockquote>
          </div>

          {/* Pillars Right Side Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-[#1c1c1c] border border-white/5 p-6 flex flex-col justify-between hover:border-[#D4AF37]/50 hover:shadow-[0_4px_25px_rgba(212,175,55,0.06)] transition-all duration-300 rounded-none skew-x-[-2deg]"
              >
                {/* Accent mini corner decoration */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors duration-300" />

                <div className="space-y-4">
                  <div className="w-12 h-12 bg-black/40 flex items-center justify-center border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors rotate-45 mx-auto sm:mx-0 mb-6">
                    <div className="-rotate-45">
                      {pillar.icon}
                    </div>
                  </div>
                  <h3 className="font-black text-sm lg:text-base tracking-[0.2em] text-[#D4AF37] uppercase group-hover:text-white transition-colors duration-300 mt-4">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[11px] text-white/50 leading-relaxed uppercase pr-2 tracking-wide">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
