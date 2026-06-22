import { useState, FormEvent } from "react";
import { Calendar, MapPin, Milestone, Users, Trophy, ChevronRight, X, Mail, Check, UserPlus } from "lucide-react";
import { UPCOMING_EVENTS } from "../data";
import { CommunityEvent } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Events() {
  const { t } = useLanguage();
  const [eventsList, setEventsList] = useState<CommunityEvent[]>(UPCOMING_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);

  // RSVP Form States
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  const getDifficultyColor = (diff: CommunityEvent["difficulty"]) => {
    switch (diff) {
      case "Beginner":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Intermediate":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Pro":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Hardcore":
        return "bg-red-500/15 text-red-500 border-red-500/30 animate-pulse";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const handleRsvpSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpEmail.trim() || !selectedEvent) return;

    setRsvpLoading(true);

    // Simulate Network Request delay
    setTimeout(() => {
      // Find the event in our state and decrement spotsLeft / increment rsvpCount
      setEventsList((prev) =>
        prev.map((ev) => {
          if (ev.id === selectedEvent.id && ev.spotsLeft > 0) {
            return {
              ...ev,
              spotsLeft: ev.spotsLeft - 1,
              rsvpCount: ev.rsvpCount + 1,
            };
          }
          return ev;
        })
      );

      // Also update currently displayed modal object
      setSelectedEvent((prev) => {
        if (prev && prev.spotsLeft > 0) {
          return {
            ...prev,
            spotsLeft: prev.spotsLeft - 1,
            rsvpCount: prev.rsvpCount + 1,
          };
        }
        return prev;
      });

      setRsvpLoading(false);
      setRsvpSuccess(true);

      // Reset form variables
      setRsvpName("");
      setRsvpEmail("");
    }, 1200);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setRsvpSuccess(false);
  };

  return (
    <section id="events" className="relative bg-black py-24 border-t border-white/5">
      <div className="absolute inset-0 grit-overlay opacity-10 pointer-events-none" />
      <div className="absolute left-10 top-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-950/20 border border-gold-500/20 rounded-full">
            <Trophy className="w-3.5 h-3.5 text-gold-400" />
            <span className="font-display font-black text-[10px] tracking-widest text-gold-400 uppercase">
              {t('events.calendar')}
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            {t('events.title')} <span className="text-gold-500">{t('events.title2')}</span>
          </h2>
          <p className="font-sans text-gray-500 text-sm">
            {t('events.desc')}
          </p>
        </div>

        {/* Live Race Calendar Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {eventsList.map((eve) => (
            <div
              key={eve.id}
              id={`event-card-${eve.id}`}
              className="group relative bg-[#090909] border border-white/5 rounded-sm p-6 flex flex-col justify-between hover:border-gold-500/45 hover:shadow-[0_10px_25px_rgba(212,175,55,0.05)] transition-all duration-300"
            >
              {/* Event Top Info Block */}
              <div className="space-y-4">
                {/* Visual Gold Date stamp */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-gold-400">
                    <Calendar className="w-4 h-4" />
                    <span>{eve.date}</span>
                  </div>
                  {/* Spots left warning trigger */}
                  <span className={`text-[10px] font-mono font-bold uppercase ${eve.spotsLeft < 5 ? "text-red-500" : "text-gray-500"}`}>
                    {eve.spotsLeft} {t('events.spots')}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-black text-lg text-white leading-snug uppercase group-hover:text-gold-400 transition-colors duration-300">
                    {eve.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{eve.location}</span>
                  </div>
                </div>

                {/* Badges / Difficulty metrics */}
                <div className="flex items-center gap-2.5 pt-1">
                  <span className={`px-2.5 py-0.5 border text-[9px] font-mono tracking-widest uppercase rounded-sm ${getDifficultyColor(eve.difficulty)}`}>
                    {t('events.level')} {eve.difficulty}
                  </span>
                  <span className="text-[10px] text-gray-600 font-mono">· {eve.trackDistance}</span>
                </div>

                <p className="font-sans text-xs text-gray-400 leading-relaxed min-h-[64px] border-t border-white/5 pt-3">
                  {eve.description}
                </p>
              </div>

              {/* Card Footer CTA Button */}
              <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block text-[8px] font-mono text-gray-500 uppercase">{t('events.deposit')}</span>
                  <span className="font-display font-black text-sm text-gold-400 font-sans">{eve.entryFee}</span>
                </div>

                <button
                  id={`rsvp-trigger-btn-${eve.id}`}
                  onClick={() => setSelectedEvent(eve)}
                  className="flex items-center gap-1 py-2 px-4 bg-deep-charcoal border border-white/10 hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-400 text-white rounded-sm font-display font-bold text-[10px] tracking-widest uppercase cursor-pointer transition-all duration-300"
                >
                  <span>{t('events.reserve')}</span>
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* EVENT DETAILED RSVP MODAL / DRAWER */}
      <AnimatePresence>
        {selectedEvent && (
          <div
            id="event-rsvp-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-matte-black border border-gold-500/30 text-white rounded-sm overflow-hidden max-w-xl w-full z-10 shadow-[0_0_55px_rgba(212,175,55,0.15)] flex flex-col h-full max-h-[85vh]"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/5 bg-deep-charcoal flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gold-400" />
                  <div>
                    <h3 className="font-display font-black text-sm tracking-wider uppercase">
                      RUN COMPLIANCE PANEL
                    </h3>
                    <p className="text-[10px] text-gray-500">Secure entry and view technical checkpoints</p>
                  </div>
                </div>
                <button
                  id="close-rsvp-modal-btn"
                  onClick={handleCloseModal}
                  className="p-1.5 border border-white/5 hover:border-gold-400 rounded-sm text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable contents */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* Event core specifics */}
                <div className="space-y-2">
                  <span className={`inline-block px-2.5 py-0.5 border text-[9px] font-mono tracking-widest uppercase rounded-sm ${getDifficultyColor(selectedEvent.difficulty)}`}>
                    CLASS: {selectedEvent.difficulty}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white uppercase italic leading-tight">
                    {selectedEvent.title}
                  </h3>
                  <div className="flex flex-col gap-1.5 pt-1.5 font-mono text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-400" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Milestone className="w-4 h-4 text-gold-400" />
                      <span>{selectedEvent.trackDistance} total track length</span>
                    </div>
                  </div>
                </div>

                {/* Itinerary Timeline */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-display font-black text-gold-400 uppercase tracking-widest">
                    TIMELINE & ITINERARY CHECKPOINTS
                  </h4>
                  <div className="space-y-3">
                    {selectedEvent.itinerary.map((it, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="w-5 h-5 bg-deep-charcoal border border-white/10 text-gold-400 rounded-xs flex items-center justify-center font-mono text-[9px] font-black shrink-0">
                          {idx + 1}
                        </div>
                        <p className="font-sans text-xs text-gray-300 leading-normal pt-0.5">
                          {it}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crew Details panel */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="bg-black/40 border border-white/5 p-3 rounded-sm">
                    <span className="block text-[8px] font-mono text-gray-500 uppercase">RIDE LEADER</span>
                    <span className="block font-mono text-xs text-white font-bold mt-0.5 uppercase">
                      {selectedEvent.instructor}
                    </span>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-3 rounded-sm">
                    <span className="block text-[8px] font-mono text-gray-500 uppercase">SPOTS CAPACITY</span>
                    <span className="block font-mono text-xs text-white font-bold mt-0.5 uppercase flex items-center gap-2">
                      <span>{selectedEvent.spotsLeft} / {selectedEvent.maxSpots} LEFT</span>
                      <Users className="w-3.5 h-3.5 text-gold-400" />
                    </span>
                  </div>
                </div>

                {/* Registration form */}
                <div className="pt-4 border-t border-white/5">
                  <AnimatePresence mode="wait">
                    {rsvpSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-green-500/10 border border-green-500/35 p-5 rounded-sm text-center space-y-3"
                      >
                        <div className="w-10 h-10 bg-green-500 text-black rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/10">
                          <Check className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-display font-black text-sm text-white uppercase">ENTRY PERMIT APPROVED!</h4>
                          <p className="font-sans text-xs text-gray-400 leading-relaxed">
                            Congratulations, you have been secured. We have dispatched technical rider checklists, 
                            GPX coordinates, and transponder schedules to your address. Show up early!
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <h4 className="text-[10px] font-display font-black text-gold-400 uppercase tracking-widest flex items-center gap-1.5">
                          <UserPlus className="w-4 h-4" /> SECURE YOUR SPOT
                        </h4>
                        
                        <form onSubmit={handleRsvpSubmit} className="space-y-3">
                          <div className="space-y-1.5">
                            <label className="block font-mono text-[9px] text-gray-400 uppercase">FULL NAME / CALL SIGN</label>
                            <input
                              type="text"
                              value={rsvpName}
                              onChange={(e) => setRsvpName(e.target.value)}
                              required
                              placeholder="e.g. Maverick Lawson"
                              className="w-full bg-black/60 border border-white/10 rounded-sm text-white placeholder-gray-600 px-3 py-2 text-xs focus:ring-1 focus:ring-gold-500 focus:border-gold-500 focus:outline-none transition-colors font-sans"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block font-mono text-[9px] text-gray-400 uppercase">EMAIL ADDRESS</label>
                            <input
                              type="email"
                              value={rsvpEmail}
                              onChange={(e) => setRsvpEmail(e.target.value)}
                              required
                              placeholder="e.g. rider@outlaw.mx"
                              className="w-full bg-black/60 border border-white/10 rounded-sm text-white placeholder-gray-600 px-3 py-2 text-xs focus:ring-1 focus:ring-gold-500 focus:border-gold-500 focus:outline-none transition-colors font-sans"
                            />
                          </div>

                          <button
                            id="confirm-rsvp-form-btn"
                            type="submit"
                            disabled={rsvpLoading || selectedEvent.spotsLeft === 0}
                            className={`w-full flex items-center justify-center gap-2 py-3.5 bg-gold-500 text-black font-display font-black text-xs tracking-widest uppercase rounded-sm cursor-pointer transition-all duration-300 ${
                              selectedEvent.spotsLeft === 0
                                ? "opacity-30 bg-gray-500 cursor-not-allowed"
                                : "hover:bg-gold-400 shadow-lg shadow-gold-500/10"
                            }`}
                          >
                            <span>
                              {rsvpLoading ? "VERIFYING ENTRY..." : selectedEvent.spotsLeft === 0 ? "SOLD OUT" : `SUBMIT RESERVATION (${selectedEvent.entryFee})`}
                            </span>
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
