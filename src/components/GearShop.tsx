import { useState } from "react";
import { Search, ShoppingCart, Star, Eye, Check, Calendar, Sliders, Info, Wrench, Package } from "lucide-react";
import { GEAR_ITEMS } from "../data";
import { GearItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface GearShopProps {
  onAddToCart: (item: GearItem) => void;
  activeCategoryFilter: "All" | "Bikes" | "Protective Gear" | "Tours/Tracks" | "Parts & Upgrades";
  onSetCategoryFilter: (cat: "All" | "Bikes" | "Protective Gear" | "Tours/Tracks" | "Parts & Upgrades") => void;
  onOpenCustomizer: () => void;
}

export default function GearShop({
  onAddToCart,
  activeCategoryFilter,
  onSetCategoryFilter,
  onOpenCustomizer,
}: GearShopProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<GearItem | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<"overview" | "specs" | "crate">("overview");
  const [addedItemFlashId, setAddedItemFlashId] = useState<string | null>(null);

  // Filters logic
  const filteredItems = GEAR_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategoryFilter === "All" || item.category === activeCategoryFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoriesList: ("All" | "Bikes" | "Protective Gear" | "Tours/Tracks" | "Parts & Upgrades")[] = [
    "All",
    "Bikes",
    "Protective Gear",
    "Parts & Upgrades",
    "Tours/Tracks",
  ];

  const handleAddToCartClick = (item: GearItem) => {
    onAddToCart(item);
    setAddedItemFlashId(item.id);
    setTimeout(() => {
      setAddedItemFlashId(null);
    }, 1500);
  };

  return (
    <section id="catalog" className="relative bg-matte-black py-24 border-t border-white/5">
      <div className="absolute inset-0 grit-overlay opacity-15 pointer-events-none" />
      <div className="absolute right-10 bottom-1/4 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-8 bg-gold-500" />
              <span className="font-display font-black text-xs tracking-widest text-gold-400 uppercase">
                {t('shop.label')}
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
              {t('shop.title')} <span className="text-gold-500">{t('shop.title2')}</span>
            </h2>
            <p className="font-sans text-gray-500 text-sm max-w-xl">
              {t('shop.desc')}
            </p>
          </div>

          {/* Quick Customizer CTA Banner */}
          <div className="bg-deep-charcoal border border-gold-500/20 p-4 rounded-sm flex items-center gap-4 self-start md:self-auto">
            <div className="space-y-1">
              <h4 className="text-xs font-display font-black text-white tracking-wide uppercase">{t('shop.buildTitle')}</h4>
              <p className="text-[10px] text-gray-400">{t('shop.buildDesc')}</p>
            </div>
            <button
              onClick={onOpenCustomizer}
              className="px-4 py-2 bg-gold-500 text-black font-display font-black text-[10px] tracking-widest uppercase hover:bg-gold-400 transition-colors rounded-sm cursor-pointer"
            >
              {t('shop.launchBtn')}
            </button>
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-deep-charcoal/40 p-3 rounded-sm border border-white/5 mb-8">
          
          {/* Categories Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => onSetCategoryFilter(cat)}
                className={`px-4 py-2 font-display text-xs font-bold tracking-widest rounded-sm cursor-pointer transition-all ${
                  activeCategoryFilter === cat
                    ? "bg-gold-500 text-black shadow-lg shadow-gold-500/10"
                    : "bg-matte-black text-gray-400 border border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Live Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={t('shop.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-matte-black text-white placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-sm border border-white/10 text-xs focus:ring-1 focus:ring-gold-500 focus:border-gold-500 focus:outline-none transition-colors font-sans"
            />
          </div>

        </div>

        {/* Catalog Grid View */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-sm">
            <p className="text-gray-500 font-sans text-sm">{t('shop.empty')}</p>
            <button
              onClick={() => {
                setSearchQuery("");
                onSetCategoryFilter("All");
              }}
              className="mt-4 font-display text-xs text-gold-400 border-b border-gold-500 uppercase tracking-widest cursor-pointer"
            >
              {t('shop.reset')}
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`product-${item.id}`}
                className="group bg-[#0f0f0f] border border-white/5 rounded-sm overflow-hidden flex flex-col justify-between hover:border-gold-500/30 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300"
              >
                {/* Images and Badge header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-deep-charcoal border-b border-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60" />
                  
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-matte-black/95 border border-white/10 font-mono text-[9px] tracking-widest text-gold-400 uppercase">
                    {item.subCategory}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded-sm text-[10px] text-white">
                    <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                    <span className="font-mono font-bold">{item.rating}</span>
                  </div>
                </div>

                {/* Content info wrapper */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 animate-fade-in">
                    <h3 className="font-display font-black text-sm tracking-wide text-white uppercase group-hover:text-gold-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-sans text-xs text-gray-500 line-clamp-2 leading-relaxed min-h-[32px]">
                      {item.description}
                    </p>
                    
                    {/* Compact Specs Grid Badge for rapid discovery */}
                    <div className="grid grid-cols-2 gap-1.5 pt-2.5 mt-2 border-t border-white/5">
                      {Object.entries(item.specs || {}).slice(0, 2).map(([key, val]) => (
                        <div key={key} className="bg-black/30 border border-white/5 px-2 py-1 rounded-xs flex flex-col justify-center min-h-[32px]">
                          <span className="block text-[7px] font-mono text-gray-500 uppercase tracking-wider leading-none">{key}</span>
                          <span className="block text-[9px] font-mono text-gray-300 font-bold mt-0.5 uppercase tracking-wide truncate">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and detailed Actions */}
                  <div className="space-y-4 justify-end pt-5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        {t('shop.price')}
                      </span>
                      <span className="font-display font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-gold-400">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                      {/* View Details modal toggle */}
                      <button
                        id={`product-view-btn-${item.id}`}
                        onClick={() => {
                          setSelectedProduct(item);
                          setActiveDetailTab("overview");
                        }}
                        className="flex items-center justify-center gap-1.5 py-2.5 bg-deep-charcoal border border-white/5 hover:border-white/20 rounded-sm text-[10px] text-gray-300 font-display font-bold uppercase tracking-wider cursor-pointer transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('shop.preview')}</span>
                      </button>

                      {/* Add to Cart button */}
                      <button
                        id={`product-add-btn-${item.id}`}
                        onClick={() => handleAddToCartClick(item)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-[10px] font-display font-black uppercase tracking-widest cursor-pointer transition-all ${
                          addedItemFlashId === item.id
                            ? "bg-green-500 text-black border border-green-500"
                            : "bg-gold-500 text-black border border-gold-400 hover:bg-gold-400"
                        }`}
                      >
                        {addedItemFlashId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t('shop.added')}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>{item.category === "Tours/Tracks" ? t('shop.book') : t('shop.reserve')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* QUICK VIEW DETAILS MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            id="product-preview-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#0d0d0d] border border-gold-500/20 text-white rounded-sm overflow-hidden max-w-3xl w-full z-10 shadow-[0_0_50px_rgba(212,175,55,0.12)] flex flex-col md:flex-row"
            >
              {/* Image side */}
              <div className="w-full md:w-[40%] relative bg-deep-charcoal aspect-[4/3] md:aspect-auto min-h-[220px] md:min-h-[420px]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 left-4 p-2 bg-black/80 backdrop-blur border border-white/10 rounded-sm text-gray-400 hover:text-white md:hidden cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-40 pointer-events-none" />
              </div>

              {/* Information & Tabs side */}
              <div className="w-full md:w-[60%] p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Close and category */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[9px] tracking-widest text-gold-400 uppercase">
                        {selectedProduct.category} · {selectedProduct.subCategory}
                      </span>
                      {selectedProduct.origin && (
                        <span className="font-mono text-[8px] text-gray-500 tracking-wider">
                          {t('shop.origin')}: <span className="text-gray-300 font-bold uppercase">{selectedProduct.origin}</span>
                        </span>
                      )}
                    </div>
                    <button
                      id="close-preview-modal-btn"
                      onClick={() => setSelectedProduct(null)}
                      className="hidden md:block p-1.5 border border-white/5 hover:border-gold-400 rounded-sm text-gray-400 hover:text-white transition-all cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title and ratings */}
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-xl sm:text-2xl tracking-wide uppercase italic text-white leading-tight">
                      {selectedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(selectedProduct.rating)
                              ? "text-gold-400 fill-gold-400"
                              : "text-gray-700"
                          }`}
                        />
                      ))}
                      <span className="font-mono text-[10px] text-gray-400 ml-1">
                        {selectedProduct.rating} / 5.0
                      </span>
                    </div>
                  </div>

                  {/* DYNAMIC TABS SELECTOR */}
                  <div className="grid grid-cols-3 gap-1 bg-black/60 p-1 border border-white/5 rounded-sm">
                    <button
                      type="button"
                      onClick={() => setActiveDetailTab("overview")}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 font-display text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                        activeDetailTab === "overview"
                          ? "bg-gold-500 text-black shadow-md"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('shop.tabOverview')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDetailTab("specs")}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 font-display text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                        activeDetailTab === "specs"
                          ? "bg-gold-500 text-black shadow-md"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('shop.tabSpecs')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDetailTab("crate")}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 font-display text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                        activeDetailTab === "crate"
                          ? "bg-gold-500 text-black shadow-md"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Package className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('shop.tabLogistics')}</span>
                    </button>
                  </div>

                  {/* TAB SECTIONS DISPLAY PANEL */}
                  <div className="min-h-[170px] bg-black/25 border border-white/5 p-4 rounded-sm">
                    {activeDetailTab === "overview" && (
                      <motion.div
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <p className="font-sans text-[11px] sm:text-xs text-gray-300 leading-relaxed max-h-[110px] overflow-y-auto pr-1">
                          {selectedProduct.longOverview || selectedProduct.description}
                        </p>
                        
                        {selectedProduct.benefits && selectedProduct.benefits.length > 0 && (
                          <div className="space-y-1.5 pt-3 border-t border-white/5">
                            <span className="block text-[9px] font-display font-black text-gold-400 uppercase tracking-widest">
                              {t('shop.benefitsTitle')}
                            </span>
                            <ul className="space-y-1">
                              {selectedProduct.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex gap-2 items-start text-[10px] sm:text-[11px] text-gray-400">
                                  <span className="text-gold-400 font-bold leading-none mt-0.5 select-none">■</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeDetailTab === "specs" && (
                      <motion.div
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-h-[160px] overflow-y-auto pr-1"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries({ ...selectedProduct.specs, ...(selectedProduct.extendedSpecs || {}) }).map(([key, val]) => (
                            <div key={key} className="bg-matte-black/60 border border-white/5 p-2 rounded-sm flex flex-col justify-between">
                              <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-wider">{key}</span>
                              <span className="block font-mono text-[10px] text-gray-200 font-bold mt-1 uppercase leading-snug truncate">
                                {val}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeDetailTab === "crate" && (
                      <motion.div
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 text-[11px]"
                      >
                        {selectedProduct.category === "Bikes" && (
                          <div className="space-y-2">
                            <h4 className="font-display font-black text-gold-400 uppercase tracking-wider flex items-center gap-2">
                              <Package className="w-3.5 h-3.5 text-gold-500" />
                              <span>{t('shop.crateBikesTitle')}</span>
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                              {t('shop.crateBikesDesc')}
                            </p>
                            <div className="pt-2 flex flex-col gap-1.5 border-t border-white/5">
                              <div className="flex gap-2 items-start text-gray-400">
                                <Wrench className="w-3.5 h-3.5 text-gold-400/80 shrink-0 mt-0.5" />
                                <span>{t('shop.crateBikesP1')}</span>
                              </div>
                              <div className="flex gap-2 items-start text-gray-400">
                                <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                                <span>{t('shop.crateBikesP2')}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedProduct.category === "Protective Gear" && (
                          <div className="space-y-2">
                            <h4 className="font-display font-black text-gold-400 uppercase tracking-wider flex items-center gap-2">
                              <Package className="w-3.5 h-3.5 text-gold-500" />
                              <span>{t('shop.crateGearTitle')}</span>
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                              {t('shop.crateGearDesc')}
                            </p>
                            <div className="pt-2 flex flex-col gap-1.5 border-t border-white/5">
                              <div className="flex gap-2 items-start text-gray-400">
                                <Wrench className="w-3.5 h-3.5 text-gold-400/80 shrink-0 mt-0.5" />
                                <span>{t('shop.crateGearP1')}</span>
                              </div>
                              <div className="flex gap-2 items-start text-gray-400">
                                <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                                <span>{t('shop.crateGearP2')}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedProduct.category === "Tours/Tracks" && (
                          <div className="space-y-2">
                            <h4 className="font-display font-black text-gold-400 uppercase tracking-wider flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-gold-500" />
                              <span>{t('shop.crateToursTitle')}</span>
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                              {t('shop.crateToursDesc')}
                            </p>
                            <div className="pt-2 flex flex-col gap-1.5 border-t border-white/5">
                              <div className="flex gap-2 items-start text-gray-400">
                                <Wrench className="w-3.5 h-3.5 text-gold-400/80 shrink-0 mt-0.5" />
                                <span>{t('shop.crateToursP1')}</span>
                              </div>
                              <div className="flex gap-2 items-start text-gray-400">
                                <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                                <span>{t('shop.crateToursP2')}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Confirm additions footer */}
                <div className="pt-4 border-t border-white/5 mt-4 flex justify-between items-center gap-4">
                  <div className="space-y-0.5">
                    <span className="block text-[8px] font-mono text-gray-500 uppercase">{t('shop.export')}</span>
                    <span className="font-display font-black text-xl text-gold-400 leading-none">
                      ${selectedProduct.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    id="preview-confirm-btn"
                    onClick={() => {
                      handleAddToCartClick(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 max-w-[180px] flex items-center justify-center gap-2 py-3 bg-gold-500 text-black font-display font-black text-xs tracking-widest uppercase rounded-sm cursor-pointer hover:bg-gold-400 transition-all shadow-md shadow-amber-500/5 duration-300"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{t('shop.secure')}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Simple internal interface replacement for closing X
function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
