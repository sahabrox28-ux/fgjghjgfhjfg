import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Landmark, Trophy, ShieldCheck, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  activeSection: string;
}

export default function Header({ cartCount, onCartToggle, activeSection }: HeaderProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticking header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { name: t('nav.philosophy'), id: "about" },
    { name: t('nav.courtyard'), id: "categories" },
    { name: t('nav.gearlab'), id: "catalog" },
    { name: t('nav.xpeditions'), id: "tours" },
    { name: t('nav.community'), id: "events" },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 h-[70px] border-b border-white/10 px-4 lg:px-12 flex items-center justify-between ${
        isScrolled
          ? "bg-[#121212]/90 backdrop-blur-md shadow-xl"
          : "bg-[#121212]"
      }`}
    >
      <div className="w-full mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer text-2xl font-black tracking-tighter italic text-white"
        >
          APEX<span className="text-[#D4AF37]">ENDURO</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${
                activeSection === link.id
                  ? "text-[#D4AF37]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-1 cursor-pointer group"
          >
            <div className="text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase group-hover:text-white transition-colors">
              {language === 'en' ? 'УКР' : 'EN'}
            </div>
          </button>
          
          {/* Shopping Cart Button */}
          <button
             id="cart-toggle-btn"
             onClick={onCartToggle}
             className="hidden lg:flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-5 h-5 border-2 border-[#D4AF37] rounded-full flex items-center justify-center">
               <AnimatePresence>
                 {cartCount > 0 && (
                   <motion.div
                     initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                     className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full"
                   />
                 )}
               </AnimatePresence>
            </div>
            <div className="text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase group-hover:text-white transition-colors">
              {t('cart')} [{cartCount < 10 ? `0${cartCount}` : cartCount}]
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#D4AF37]"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-matte-black/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left py-3 px-4 font-display text-sm font-bold tracking-wider border-l-2 transition-all ${
                    activeSection === link.id
                      ? "border-gold-500 bg-gold-950/20 text-gold-400"
                      : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onCartToggle();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gold-500 text-black font-display font-black text-sm uppercase skew-x-6 border border-gold-300"
                >
                  <ShoppingCart className="w-4 h-4 -skew-x-6" />
                  <span className="-skew-x-6">{t('nav.openCart')} ({cartCount})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
