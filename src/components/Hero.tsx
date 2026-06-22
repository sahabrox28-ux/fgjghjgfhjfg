import { motion } from "motion/react";
import { ArrowRight, Flame, Shield, Map } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface HeroProps {
  onExploreGear: () => void;
  onJoinCommunity: () => void;
}

export default function Hero({ onExploreGear, onJoinCommunity }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section
      id="hero-section"
      className="relative min-h-[600px] lg:h-[750px] w-full flex items-center px-4 lg:px-12 overflow-hidden bg-[#121212] pt-20"
    >
      {/* Background Image with Dark Vignette / Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1800"
          alt="Cinematic Enduro Rider"
          className="w-full h-full object-cover object-center opacity-20 scale-105 motion-safe:animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.1),transparent_70%)] opacity-50" />
      </div>

      {/* Skewed Background Element */}
      <div className="hidden lg:block absolute right-0 top-0 w-[55%] h-full bg-[#1c1c1c] skew-x-[-12deg] translate-x-20 border-l border-[#D4AF37]/30 shadow-2xl z-0" />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#D4AF37] text-[12px] font-bold tracking-[0.4em] mb-4 uppercase flex items-center gap-2"
        >
          <Flame className="w-4 h-4" />
          {t('hero.subtitle')}
        </motion.div>

        {/* Aggressive Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-black italic uppercase leading-[0.85] tracking-tighter mb-8 text-white select-none"
        >
          {t('hero.title1')} <br />
          <span className="text-white border-b-4 border-[#D4AF37] inline-block mt-2 font-black tracking-widest">
            {t('hero.title2')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl text-white/50 text-base tracking-wide mb-10 leading-relaxed font-sans"
        >
          {t('hero.desc')}
        </motion.p>

        {/* Custom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
        >
          <button
            id="explore-gear-cta"
            onClick={onExploreGear}
            className="px-8 py-4 bg-[#D4AF37] text-black font-black uppercase text-[12px] tracking-[0.2em] hover:bg-white transition-colors skew-x-[-10deg] flex justify-center"
          >
            <span className="inline-flex items-center gap-2 skew-x-[10deg]">
              {t('hero.explore')} <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          <button
            id="join-community-cta"
            onClick={onJoinCommunity}
            className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] font-black uppercase text-[12px] tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors skew-x-[-10deg] flex justify-center"
          >
            <span className="inline-block skew-x-[10deg]">
              {t('hero.join')}
            </span>
          </button>
        </motion.div>

        {/* Value Propositions / Telemetrics banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/5 opacity-80"
        >
          <div className="group border-r border-[#D4AF37]/20 last:border-0 pr-4">
            <h4 className="font-black text-2xl lg:text-3xl text-white tracking-wider italic">
              290+
            </h4>
            <p className="text-[9px] tracking-widest text-[#D4AF37] uppercase mt-1 font-bold">
              {t('hero.stat1')}
            </p>
          </div>
          <div className="group border-r border-[#D4AF37]/20 last:border-0 pr-4 pl-4 md:pl-0">
            <h4 className="font-black text-2xl lg:text-3xl text-white tracking-wider italic">
              4.2K
            </h4>
            <p className="text-[9px] tracking-widest text-[#D4AF37] uppercase mt-1 font-bold">
              {t('hero.stat2')}
            </p>
          </div>
          <div className="group border-r border-[#D4AF37]/20 last:border-0 pr-4">
            <h4 className="font-black text-2xl lg:text-3xl text-white tracking-wider italic">
              18
            </h4>
            <p className="text-[9px] tracking-widest text-[#D4AF37] uppercase mt-1 font-bold">
              {t('hero.stat3')}
            </p>
          </div>
          <div className="group pl-4 md:pl-0">
            <h4 className="font-black text-2xl lg:text-3xl text-white tracking-wider italic">
              99.6%
            </h4>
            <p className="text-[9px] tracking-widest text-[#D4AF37] uppercase mt-1 font-bold">
              {t('hero.stat4')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Abstract Action Graphics */}
      <div className="hidden lg:flex absolute right-20 bottom-10 z-10 flex-col items-end">
        <div className="text-[120px] font-black text-white/5 italic leading-none select-none">ENDURO</div>
        <div className="text-[11px] text-white/40 tracking-[0.5em] uppercase font-bold pr-4 mt-[-40px]">{t('hero.bg')}</div>
      </div>
    </section>
  );
}
