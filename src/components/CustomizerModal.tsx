import { useState } from "react";
import { X, Check, Wrench, Sparkles, Sliders, ShoppingCart } from "lucide-react";
import { BIKE_MODELS_INFO } from "../data";
import { CustomBikeConfig } from "../types";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomBikeToCart: (bikeDetails: {
    name: string;
    price: number;
    description: string;
    image: string;
    specs: Record<string, string>;
  }) => void;
}

export default function CustomizerModal({ isOpen, onClose, onAddCustomBikeToCart }: CustomizerModalProps) {
  const { t } = useLanguage();
  const [selectedModelKey, setSelectedModelKey] = useState<"apex-450" | "stealth-300">("apex-450");
  const modelInfo = BIKE_MODELS_INFO[selectedModelKey];

  // Selected custom options
  const [selectedPaintIndex, setSelectedPaintIndex] = useState(0);
  const [selectedDecalIndex, setSelectedDecalIndex] = useState(0);
  const [selectedSuspensionIndex, setSelectedSuspensionIndex] = useState(0);
  const [selectedWheelIndex, setSelectedWheelIndex] = useState(0);

  if (!isOpen) return null;

  const currentPaint = modelInfo.paints[selectedPaintIndex];
  const currentDecal = modelInfo.decals[selectedDecalIndex];
  const currentSuspension = modelInfo.suspensions[selectedSuspensionIndex];
  const currentWheel = modelInfo.wheels[selectedWheelIndex];

  // Calculate Aggregates
  const totalPrice =
    modelInfo.basePrice +
    currentPaint.price +
    currentDecal.price +
    currentSuspension.price +
    currentWheel.price;

  // Let's adjust motorcycle specifications dynamically based on upgrades to look incredibly professional!
  const isUpgradedOhlins = selectedSuspensionIndex > 0;
  const isCarbonPaint = selectedPaintIndex === 2;
  const isUpgradedHubs = selectedWheelIndex > 0;

  // Dynamically computed technical specs
  const computedWeight = isCarbonPaint
    ? "219 lbs (Ultra-carbon reduced)"
    : modelInfo.weight;
  
  const computedPower = isUpgradedOhlins
    ? `${parseInt(modelInfo.power) + 2} HP (Tension Optimized)`
    : modelInfo.power;

  const computedTorque = isUpgradedHubs
    ? `${parseFloat(modelInfo.torque) + 1.2} lb-ft`
    : modelInfo.torque;

  const handleModelChange = (key: "apex-450" | "stealth-300") => {
    setSelectedModelKey(key);
    setSelectedPaintIndex(0);
    setSelectedDecalIndex(0);
    setSelectedSuspensionIndex(0);
    setSelectedWheelIndex(0);
  };

  const handleBuildSubmission = () => {
    const buildName = `Custom ${modelInfo.name} [Built Spec]`;
    const buildDesc = `Bespoke build featuring ${currentPaint.name} paint work, ${currentDecal.name} graphics kit, ${currentSuspension.name}, and high impact ${currentWheel.name}.`;
    
    // Bike image fallback based on model key
    const bikeImage = selectedModelKey === "apex-450" 
      ? "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800"
      : "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800";

    onAddCustomBikeToCart({
      name: buildName,
      price: totalPrice,
      description: buildDesc,
      image: bikeImage,
      specs: {
        Engine: modelInfo.engineSize,
        Weight: computedWeight,
        Power: computedPower,
        Torque: computedTorque,
        Paint: currentPaint.name,
        Decals: currentDecal.name,
        Suspension: currentSuspension.name,
        Wheels: currentWheel.name
      }
    });

    onClose();
  };

  return (
    <div
      id="bike-builder-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Dark overlay backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" 
      />

      {/* Main Builder Card Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-matte-black border border-gold-500/30 rounded-xs overflow-hidden w-full max-w-6xl h-full max-h-[85vh] flex flex-col z-10 shadow-[0_0_50px_rgba(212,175,55,0.15)]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-deep-charcoal">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gold-950/40 border border-gold-500/20 rounded-sm flex items-center justify-center">
              <Sliders className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg tracking-wider text-white uppercase flex items-center gap-2">
                {t('cust.title')} <span className="text-xs bg-gold-500 text-black px-2 py-0.5 rounded-sm skew-x-6 font-mono font-black italic">{t('cust.badge')}</span>
              </h2>
              <p className="text-xs text-gray-500">{t('cust.desc')}</p>
            </div>
          </div>
          <button
            id="close-customizer-btn"
            onClick={onClose}
            className="p-2 border border-white/10 hover:border-gold-400 rounded-sm text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Columns Body */}
        <div className="flex-1 overflow-y-auto grid lg:grid-cols-12 gap-0">
          
          {/* LEFT SECTION: Visual representation and performance telemetry metrics */}
          <div className="lg:col-span-5 bg-black/55 p-6 border-r border-white/5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Select Master Platform Model */}
              <div className="space-y-3">
                <span className="font-display font-black text-[10px] tracking-widest text-gold-400 uppercase">
                  {t('cust.chassis')}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="model-apex-450-btn"
                    onClick={() => handleModelChange("apex-450")}
                    className={`py-3 px-4 rounded-sm border text-left cursor-pointer transition-all ${
                      selectedModelKey === "apex-450"
                        ? "border-gold-500 bg-gold-950/20 text-white"
                        : "border-white/5 bg-deep-charcoal text-gray-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="block font-display font-black tracking-wider text-xs uppercase">{t('cust.apex')}</span>
                    <span className="block text-[10px] text-gray-500 mt-1">{t('cust.apexDesc')}</span>
                  </button>
                  <button
                    id="model-stealth-300-btn"
                    onClick={() => handleModelChange("stealth-300")}
                    className={`py-3 px-4 rounded-sm border text-left cursor-pointer transition-all ${
                      selectedModelKey === "stealth-300"
                        ? "border-gold-500 bg-gold-950/20 text-white"
                        : "border-white/5 bg-deep-charcoal text-gray-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="block font-display font-black tracking-wider text-xs uppercase">{t('cust.stealth')}</span>
                    <span className="block text-[10px] text-gray-500 mt-1">{t('cust.stealthDesc')}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Simulated Machine Preview Card */}
              <div className="relative bg-deep-charcoal/40 border border-white/5 rounded-sm p-4 overflow-hidden aspect-video flex items-center justify-center">
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 border border-white/10 rounded-sm font-mono text-[9px] tracking-widest text-gold-400 uppercase">
                  {t('cust.platformLabel')} {selectedModelKey.toUpperCase()}
                </div>
                
                {/* Dynamically Styled Vector Machine Overlay or image */}
                <img
                  src={
                    selectedModelKey === "apex-450"
                      ? "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=650"
                      : "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=650"
                  }
                  alt={modelInfo.name}
                  className="max-h-48 object-contain rounded-xs drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                  referrerPolicy="no-referrer"
                />

                {/* Color preview indicator */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 px-2.5 py-1 bg-black/60 border border-white/10 rounded-sm">
                  <div 
                    className="w-3.5 h-3.5 rounded-full border border-white/30" 
                    style={{ backgroundColor: currentPaint.hex }}
                  />
                  <span className="font-mono text-[9px] text-gray-400 uppercase">{currentPaint.name}</span>
                </div>
              </div>

              {/* Specs Description */}
              <div className="space-y-2">
                <h3 className="font-display font-black text-sm text-gold-400 tracking-wider">{t('cust.insight')}</h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">{modelInfo.description}</p>
              </div>
            </div>

            {/* LIVE MACHINE TELEMETRY */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <span className="font-display font-black text-[10px] tracking-widest text-gold-400 uppercase flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 animate-spin-slow" /> {t('cust.telemetry')}
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111] border border-white/5 p-3 rounded-sm">
                  <span className="block text-[9px] font-mono tracking-widest text-gray-500 uppercase">{t('cust.engine')}</span>
                  <span className="block font-display font-bold text-sm text-white mt-0.5">{modelInfo.engineSize}</span>
                </div>

                <div className="bg-[#111] border border-white/5 p-3 rounded-sm">
                  <span className="block text-[9px] font-mono tracking-widest text-gray-500 uppercase">{t('cust.weight')}</span>
                  <span className={`block font-display font-bold text-sm mt-0.5 ${isCarbonPaint ? "text-green-400" : "text-white"}`}>
                    {computedWeight}
                  </span>
                </div>

                <div className="bg-[#111] border border-white/5 p-3 rounded-sm">
                  <span className="block text-[9px] font-mono tracking-widest text-gray-500 uppercase">{t('cust.power')}</span>
                  <span className={`block font-display font-bold text-sm mt-0.5 ${isUpgradedOhlins ? "text-gold-400 font-extrabold" : "text-white"}`}>
                    {computedPower}
                  </span>
                </div>

                <div className="bg-[#111] border border-white/5 p-3 rounded-sm">
                  <span className="block text-[9px] font-mono tracking-widest text-gray-500 uppercase">{t('cust.torque')}</span>
                  <span className="block font-display font-bold text-sm text-white mt-0.5">{computedTorque}</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SECTION: custom choice selectors */}
          <div className="lg:col-span-7 p-6 space-y-8 bg-matte-black flex flex-col justify-between">
            
            <div className="space-y-8">
              {/* Option Class A: MOTOCROSS PAINT SELECTION */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-black text-[10px] tracking-widest text-gold-400 uppercase">
                    {t('cust.paint')}
                  </span>
                  <span className="font-mono text-xs text-gold-300 font-bold uppercase">{currentPaint.name}</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {modelInfo.paints.map((pt, idx) => (
                    <button
                      key={pt.name}
                      onClick={() => setSelectedPaintIndex(idx)}
                      className={`relative flex items-center justify-between p-3.5 rounded-sm border text-left cursor-pointer transition-all ${
                        selectedPaintIndex === idx
                          ? "border-gold-500 bg-gold-950/10 text-white"
                          : "border-white/5 bg-deep-charcoal text-gray-400 hover:border-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full border border-white/30 shadow-md" style={{ backgroundColor: pt.hex }} />
                        <span className="font-display font-bold text-xs uppercase tracking-wide">{pt.name.split(" ")[0]}</span>
                      </div>
                      <span className="font-mono text-[10px] text-gray-400 font-bold">{pt.price === 0 ? t('cust.free') : `+$${pt.price}`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option Class B: GRAPHICS DECALS */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-black text-[10px] tracking-widest text-gold-400 uppercase">
                    {t('cust.decals')}
                  </span>
                  <span className="font-mono text-xs text-gold-300 font-bold uppercase">{currentDecal.name}</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {modelInfo.decals.map((dc, idx) => (
                    <button
                      key={dc.name}
                      onClick={() => setSelectedDecalIndex(idx)}
                      className={`relative p-3.5 rounded-sm border text-left cursor-pointer transition-all ${
                        selectedDecalIndex === idx
                          ? "border-gold-500 bg-gold-950/10 text-white"
                          : "border-white/5 bg-deep-charcoal text-gray-400 hover:border-white/10 hover:text-white"
                      }`}
                    >
                      <span className="block font-display font-bold text-xs uppercase tracking-wide">{dc.name}</span>
                      <span className="block font-mono text-[9px] text-gray-500 mt-1 leading-snug">{dc.style}</span>
                      <span className="absolute top-3.5 right-3.5 font-mono text-[9px] text-gold-400 font-bold">{dc.price === 0 ? t('cust.incl') : `+$${dc.price}`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option Class C: COIL SPRING SUSPENSIONS */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-black text-[10px] tracking-widest text-gold-400 uppercase">
                    {t('cust.susp')}
                  </span>
                  <span className="font-mono text-xs text-gold-300 font-bold uppercase">{currentSuspension.name}</span>
                </div>
                <div className="space-y-2">
                  {modelInfo.suspensions.map((susp, idx) => (
                    <button
                      key={susp.name}
                      onClick={() => setSelectedSuspensionIndex(idx)}
                      className={`flex items-start justify-between p-3.5 w-full rounded-sm border text-left cursor-pointer transition-all ${
                        selectedSuspensionIndex === idx
                          ? "border-gold-500 bg-gold-950/10 text-white"
                          : "border-white/5 bg-deep-charcoal text-gray-400 hover:border-white/10 hover:text-white"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="block font-display font-bold text-xs uppercase tracking-wide flex items-center gap-1.5">
                          {susp.name}
                          {idx > 0 && <Sparkles className="w-3.5 h-3.5 text-gold-400" />}
                        </span>
                        <p className="font-sans text-[11px] text-gray-500 leading-normal">{susp.description}</p>
                      </div>
                      <span className="font-mono text-xs text-gold-400 font-bold ml-4 shrink-0 mt-0.5">
                        {susp.price === 0 ? t('cust.standard') : `+$${susp.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option Class D: RACING WHEELS */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-black text-[10px] tracking-widest text-gold-400 uppercase">
                    {t('cust.wheels')}
                  </span>
                  <span className="font-mono text-xs text-gold-300 font-bold uppercase">{currentWheel.name}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {modelInfo.wheels.map((wh, idx) => (
                    <button
                      key={wh.name}
                      onClick={() => setSelectedWheelIndex(idx)}
                      className={`relative p-3.5 rounded-sm border text-left cursor-pointer transition-all ${
                        selectedWheelIndex === idx
                          ? "border-gold-500 bg-gold-950/10 text-white"
                          : "border-white/5 bg-deep-charcoal text-gray-400 hover:border-white/10 hover:text-white"
                      }`}
                    >
                      <span className="block font-display font-bold text-xs uppercase tracking-wide">{wh.name}</span>
                      <span className="block font-mono text-[9px] text-gray-500 mt-1">{wh.type}</span>
                      <span className="absolute top-3.5 right-3.5 font-mono text-[9px] text-gold-400 font-bold">{wh.price === 0 ? t('cust.incl') : `+$${wh.price}`}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CUSTOM MACHINE BOTTOM SUMMARY & SUBMISSION */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-[#161616]/30 p-4 rounded-sm">
              <div className="text-center sm:text-left">
                <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">{t('cust.quote')}</span>
                <span className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gold-400">
                  ${totalPrice.toLocaleString()}
                </span>
                <span className="block text-[8px] font-mono text-gold-500 mt-1 tracking-widest uppercase">{t('cust.freeShip')}</span>
              </div>

              <button
                id="submit-build-btn"
                onClick={handleBuildSubmission}
                className="w-full sm:w-auto relative group flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gold-500 text-black font-display font-black text-xs tracking-widest uppercase rounded-sm cursor-pointer shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t('cust.confirm')}</span>
              </button>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
