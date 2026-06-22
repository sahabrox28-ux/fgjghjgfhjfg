import { ArrowRight, Sliders, ShoppingBag, Eye } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface CategoriesProps {
  onSelectCategory: (category: "Bikes" | "Protective Gear" | "Tours/Tracks" | "Parts & Upgrades") => void;
  onOpenCustomizer: () => void;
}

export default function Categories({ onSelectCategory, onOpenCustomizer }: CategoriesProps) {
  const { t } = useLanguage();

  const categories = [
    {
      id: "cat-bikes",
      key: "Bikes" as const,
      title: t('cat.bikes.title'),
      subtitle: t('cat.bikes.subtitle'),
      image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800",
      description: t('cat.bikes.desc'),
      ctaText: t('cat.bikes.cta'),
      showCustomizerBtn: true,
    },
    {
      id: "cat-gear",
      key: "Protective Gear" as const,
      title: t('cat.gear.title'),
      subtitle: t('cat.gear.subtitle'),
      image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&q=80&w=800",
      description: t('cat.gear.desc'),
      ctaText: t('cat.gear.cta'),
      showCustomizerBtn: false,
    },
    {
      id: "cat-parts",
      key: "Parts & Upgrades" as const,
      title: t('cat.parts.title'),
      subtitle: t('cat.parts.subtitle'),
      image: "https://images.unsplash.com/photo-1600857317770-4dcb12d76371?auto=format&fit=crop&q=80&w=800",
      description: t('cat.parts.desc'),
      ctaText: t('cat.parts.cta'),
      showCustomizerBtn: false,
    },
    {
      id: "cat-tours",
      key: "Tours/Tracks" as const,
      title: t('cat.tours.title'),
      subtitle: t('cat.tours.subtitle'),
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
      description: t('cat.tours.desc'),
      ctaText: t('cat.tours.cta'),
      showCustomizerBtn: false,
    },
  ];

  return (
    <section id="categories" className="relative bg-[#121212] py-24 border-t border-white/5">
      <div className="absolute inset-0 opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-none">
            <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              {t('cat.sector')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl text-white font-black italic tracking-tighter leading-none uppercase">
            {t('cat.featured')} <span className="text-[#D4AF37]">{t('cat.divisions')}</span>
          </h2>
          <p className="font-sans text-white/50 text-sm leading-relaxed">
            {t('cat.desc')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              id={cat.id}
              className="group bg-[#121212] hover:bg-[#1c1c1c] transition-colors relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute right-[-20px] top-[-20px] text-8xl font-black text-white/[0.02] italic pointer-events-none z-0">
                0{index + 1}
              </div>
              
              <div className="relative z-10">
                {/* Responsive Image Wrapper */}
                <div className="relative h-64 overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-500" />
                  <img
                    src={cat.image}
                    alt={cat.subtitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Title Overlay Badge */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#121212] border border-white/10 text-[9px] tracking-[0.2em] font-bold text-[#D4AF37] uppercase">
                    {cat.title}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                    {cat.subtitle.replace('/', ' / ')}
                  </h3>
                  <div className="w-8 h-1 bg-[#D4AF37]" />
                  <p className="font-sans text-[11px] text-white/50 leading-relaxed min-h-[48px] uppercase tracking-wide">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-8 pt-0 space-y-3 relative z-10">
                
                {/* Secondary Option: Interactive Customizer (Only for Bikes) */}
                {cat.showCustomizerBtn && (
                  <button
                    id="trigger-customizer-btn-cat"
                    onClick={onOpenCustomizer}
                    className="w-full flex items-center justify-center gap-2 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-black text-[10px] tracking-[0.3em] uppercase cursor-pointer transition-colors skew-x-[-10deg]"
                  >
                    <span className="inline-flex items-center gap-2 skew-x-[10deg]">
                      <Sliders className="w-3.5 h-3.5" />
                      {t('cat.customizer')}
                    </span>
                  </button>
                )}

                {/* Primary CTA: Jump and filter the catalog */}
                <button
                  id={`view-cat-${cat.subtitle.toLowerCase().replace(/[^a-z]/g, '')}-btn`}
                  onClick={() => onSelectCategory(cat.key)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#D4AF37] text-black hover:bg-white font-black text-[10px] tracking-[0.3em] uppercase cursor-pointer transition-colors skew-x-[-10deg]"
                >
                  <span className="inline-flex items-center gap-2 skew-x-[10deg]">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {cat.ctaText}
                  </span>
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
