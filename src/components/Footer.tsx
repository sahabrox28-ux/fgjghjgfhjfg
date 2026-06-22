import { useState, FormEvent } from "react";
import { Mail, Instagram, Youtube, Facebook, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Simulate simple network dispatch
    setTimeout(() => {
      setSuccess(true);
      setEmail("");
    }, 800);
  };

  return (
    <footer className="relative bg-[#121212] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-transparent opacity-10 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-12 relative z-10 space-y-12">
        {/* Top Grid: Logo, Coordinates, Newsletter, Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Col 1: Outlaw Brand info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 bg-[#D4AF37] flex items-center justify-center transform skew-x-12 border border-[#D4AF37]/50">
                <span className="text-black font-black text-sm -skew-x-12">O</span>
              </div>
              <span className="font-black text-lg tracking-widest text-white italic">
                APEX<span className="text-[#D4AF37]">ENDURO</span>
              </span>
            </div>
            <p className="font-sans text-xs text-white/50 leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>
            {/* GPS coordinates for custom sport ambiance */}
            <div className="pt-2">
              <span className="block text-[9px] font-mono text-white/40 tracking-widest uppercase">CREW BASE REGISTERS</span>
              <span className="block text-[10px] font-mono text-[#D4AF37] font-bold tracking-wide">38.5733° N, 109.5498° W (MOAB HDQRTERS)</span>
            </div>
          </div>

          {/* Col 2: Navigation link groups */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">CHASSIS</h4>
              <ul className="space-y-1.5 font-sans text-xs text-white/50">
                <li><a href="#categories" className="hover:text-white transition-colors">Apex 450 DOHC</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Stealth 300 TPI</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Custom Lab</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">DIVISIONS</h4>
              <ul className="space-y-1.5 font-sans text-xs text-white/50">
                <li><a href="#catalog" className="hover:text-white transition-colors">Gear Lab</a></li>
                <li><a href="#catalog" className="hover:text-white transition-colors">Track Vouchers</a></li>
                <li><a href="#events" className="hover:text-white transition-colors">Race Calendar</a></li>
              </ul>
            </div>
          </div>

          {/* Col 3: NEWSLETTER FORM (Highly Minimalist & Luxury) */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">
                {t('footer.newsletter')}
              </h4>
              <p className="font-sans text-xs text-white/50 leading-relaxed">
                Join our private newsletter roster. Receive trail access alerts, clinic openings, 
                and limited hardware design batches straight from the shop. No spam. Only fuel.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-3.5 flex items-center gap-3"
                >
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="text-[10px] text-white uppercase tracking-[0.2em] font-bold">
                    TRANSMISSION GRANTED. RADAR LOCKED.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleNewsletterSubmit}
                  className="flex items-center"
                >
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Mail className="w-3.5 h-3.5 text-white/30" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Enter email roster..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1c1c1c] text-white placeholder-white/30 pl-9 pr-4 py-3 border border-white/10 border-r-0 text-xs focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>
                  <button
                    id="subscribe-newsletter-btn"
                    type="submit"
                    className="px-6 py-3 border-y border-r border-[#D4AF37] bg-[#D4AF37] text-black font-black text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:border-white transition-colors cursor-pointer flex items-center gap-1.5"
                    aria-label="Subscribe Newsletter"
                  >
                    <span>JOIN</span>
                    <Send className="w-3 h-3" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Socials and Copywrite strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold text-center sm:text-left">
            {t('footer.rights')}
          </p>

          {/* Golden Socials */}
          <div className="flex space-x-8">
            <a href="#" className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] hover:text-white transition-colors">YouTube</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
