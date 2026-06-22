import { useState, FormEvent } from "react";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CreditCard, Sparkles, Send } from "lucide-react";
import { GearItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface CartLine {
  item: GearItem;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartLines: CartLine[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartLines,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSidebarProps) {
  const { t } = useLanguage();
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderReceiptCode, setOrderReceiptCode] = useState<string | null>(null);

  if (!isOpen) return null;

  // Totals calculations
  const subtotal = cartLines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const taxRate = 0.082; // 8.2%
  const taxSum = subtotal * taxRate;
  const deliveryFee = subtotal > 1000 ? 0 : 35; // Free over $1000
  const finalTotal = subtotal + taxSum + deliveryFee;

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.trim() || !cardNumber.trim()) return;

    setIsSubmitting(true);

    // Simulate Payment Merchant delay
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedCode = `MX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderReceiptCode(generatedCode);
    }, 1500);
  };

  const handleCloseReceiptAndReset = () => {
    setOrderReceiptCode(null);
    setCheckoutMode(false);
    setShippingAddress("");
    setCardNumber("");
    setCardExpiry("");
    onClearCart();
    onClose();
  };

  return (
    <div
      id="cart-sidebar-panel"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Background shadow click close */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/75 backdrop-blur-xs cursor-pointer animate-[fadeIn_0.3s]" 
      />

      {/* Drawer Container Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative bg-matte-black border-l border-white/5 w-full max-w-md h-full flex flex-col justify-between shadow-2xl z-10"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0e0e0e]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            <h3 className="font-display font-black text-sm tracking-wider uppercase">
              {checkoutMode ? t('cart.checkout') : t('cart.reserve')}
            </h3>
            {!checkoutMode && cartLines.length > 0 && (
              <span className="px-2 py-0.5 bg-gold-500 text-black font-mono text-[9px] font-black rounded-full">
                {cartLines.length}
              </span>
            )}
          </div>
          <button
            id="close-cart-sidebar-btn"
            onClick={onClose}
            className="p-1.5 border border-white/5 hover:border-gold-400 rounded-sm text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Contents Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="wait">
            {orderReceiptCode ? (
              /* ORDER CONGRATULATIONS VOUCHER */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-8"
              >
                <div className="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto shadow-xl shadow-gold-500/10">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display font-black text-lg text-white uppercase italic">{t('cart.permit')}</h4>
                  <p className="font-sans text-xs text-cool-gray text-gray-400 leading-relaxed px-2">
                    {t('cart.permitDesc')}
                  </p>
                </div>

                {/* Simulated Order Transponder info */}
                <div className="bg-deep-charcoal border border-gold-500/25 p-4 rounded-sm font-mono text-xs text-left space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase font-bold">{t('cart.receipt')}</span>
                    <span className="text-gold-400 font-extrabold">{orderReceiptCode}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500">{t('cart.total')}</span>
                    <span className="text-white font-bold">${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-[11px] border-b border-white/5 pb-2">
                    <span className="text-gray-500">{t('cart.method')}</span>
                    <span className="text-white">OUTLAW-GOLD DIGITAL CODE</span>
                  </div>
                  <p className="text-[9px] text-zinc-500 leading-snug">
                    *Reference this code upon arrival to singletrack race campfires or gear warehouses.
                  </p>
                </div>

                <button
                  id="receipt-return-btn"
                  onClick={handleCloseReceiptAndReset}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-amber-500 text-black font-display font-black text-xs tracking-widest uppercase rounded-sm cursor-pointer hover:shadow-lg transition-all"
                >
                  {t('cart.return')}
                </button>
              </motion.div>
            ) : checkoutMode ? (
              /* SECURE CHECKOUT INTERACTION FORM */
              <motion.form
                key="checkout-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleCheckoutSubmit}
                className="space-y-4"
              >
                <div className="space-y-1 bg-deep-charcoal border border-white/5 p-4 rounded-sm">
                  <h4 className="text-[10px] font-display font-black text-gold-400 uppercase tracking-widest">
                    {t('cart.summary')}
                  </h4>
                  <div className="flex justify-between text-xs py-1 text-gray-400">
                    <span>{t('cart.items')}</span>
                    <span className="text-white font-bold">{cartLines.length}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-1 text-gray-400 border-b border-white/5">
                    <span>{t('cart.shipping')}</span>
                    <span className="text-gold-500 font-bold uppercase">{deliveryFee === 0 ? t('cart.free') : t('cart.ground')}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 font-display font-black text-white">
                    <span>{t('cart.total')}</span>
                    <span className="text-gold-400">${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="block font-display font-black text-[10px] tracking-widest text-gold-400 uppercase">
                    CREDIT CARD PAYMENTS
                  </span>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[9px] text-gray-400 uppercase">{t('cart.address')}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 104 Red Creek Highway, Moab, UT"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-sm text-white placeholder-gray-600 px-3 py-2 text-xs focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[9px] text-gray-400 uppercase">{t('cart.card')}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="••••  ••••  ••••  ••••"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-sm text-white placeholder-gray-600 pl-10 pr-3 py-2 text-xs focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] text-gray-400 uppercase">{t('cart.expiry')}</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-sm text-white placeholder-gray-600 px-3 py-2 text-xs focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] text-gray-400 uppercase">{t('cart.cvc')}</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        className="w-full bg-black/60 border border-white/10 rounded-sm text-white placeholder-gray-600 px-3 py-2 text-xs focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-white/5 bg-[#141414]/20 p-3 rounded-sm flex items-start gap-2 pt-3 mt-4">
                  <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-gray-500 leading-relaxed">
                    Transactions are audited under military AES-256 protocols. Your custom dirtbike configurations 
                    stand checked by workshop foremen prior to banking approval.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setCheckoutMode(false)}
                    className="w-1/3 py-3 bg-deep-charcoal border border-white/10 hover:border-white/20 text-white rounded-sm font-display font-bold text-[10px] tracking-widest uppercase cursor-pointer transition-all"
                  >
                    {t('cart.back')}
                  </button>
                  <button
                    id="submit-payment-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-gold-500 text-black font-display font-black text-[10px] tracking-widest uppercase rounded-sm cursor-pointer hover:bg-gold-400 shadow-lg shadow-gold-500/10 transition-all"
                  >
                    {isSubmitting ? "PROCESSING PAY..." : t('cart.pay')}
                  </button>
                </div>
              </motion.form>
            ) : cartLines.length === 0 ? (
              /* EMPTY CART VIEWER */
              <motion.div
                key="empty-cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 space-y-4"
              >
                <div className="w-12 h-12 bg-deep-charcoal border border-white/10 rounded-full flex items-center justify-center mx-auto text-gray-500">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">{t('cart.empty')}</h4>
                  <p className="font-sans text-xs text-gray-500">{t('cart.emptyDesc')}</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white text-black font-display font-black text-[10px] tracking-widest uppercase rounded-sm hover:bg-gold-500 hover:text-black transition-colors"
                >
                  {t('cart.explore')}
                </button>
              </motion.div>
            ) : (
              /* CORE SHOPPING CART ITEMS LIST */
              <motion.div
                key="cart-items"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <span className="block font-display font-black text-[10px] tracking-widest text-gold-400 uppercase">
                  {t('cart.products')}
                </span>
                
                <div className="space-y-3">
                  {cartLines.map((line) => (
                    <div
                      key={line.item.id}
                      className="flex gap-4 p-3 bg-deep-charcoal border border-white/5 rounded-sm relative overflow-hidden group"
                    >
                      {/* Product Thumbnail inside list */}
                      <div className="w-16 h-16 bg-black rounded-sm overflow-hidden shrink-0">
                        <img
                          src={line.item.image}
                          alt={line.item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Product specifications and volume controls */}
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="pr-6">
                          <h4 className="font-display font-black text-xs text-white uppercase truncate">
                            {line.item.name}
                          </h4>
                          <span className="block text-[8.5px] font-mono text-gold-400 capitalize">
                            {line.item.category}
                          </span>
                        </div>

                        {/* Price & quantities */}
                        <div className="flex justify-between items-center pt-1 border-t border-white/5">
                          <span className="font-mono text-xs text-white font-bold">
                            ${line.item.price.toLocaleString()}
                          </span>

                          {/* Volume input control */}
                          <div className="flex items-center gap-2.5 bg-black border border-white/10 px-1 rounded-sm">
                            <button
                              onClick={() => onUpdateQuantity(line.item.id, line.quantity - 1)}
                              className="w-5 h-5 text-gray-400 hover:text-white font-mono text-sm leading-none flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs text-white font-bold w-4 text-center">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(line.item.id, line.quantity + 1)}
                              className="w-5 h-5 text-gray-400 hover:text-white font-mono text-sm leading-none flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove item trash button */}
                      <button
                        onClick={() => onRemoveItem(line.item.id)}
                        className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Drawer Footer Bill / Pricing overview */}
        {!orderReceiptCode && cartLines.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-[#0e0e0e] space-y-4">
            
            {!checkoutMode ? (
              /* SUB TOTALS SCREEN */
              <>
                <div className="space-y-1.5 font-mono text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <span className="text-white font-bold">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.tax')}</span>
                    <span className="text-white">${taxSum.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span>{t('cart.delivery')}</span>
                    <span className="text-gold-400 font-bold">
                      {deliveryFee === 0 ? t('cart.free') : `$${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-white pt-2 border-t border-white/5 font-display font-black leading-none uppercase">
                    <span>{t('cart.billTotal')}</span>
                    <span className="text-gold-500">${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <button
                  id="checkout-proceed-btn"
                  onClick={() => setCheckoutMode(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gold-500 text-black font-display font-black text-xs tracking-widest uppercase rounded-sm cursor-pointer hover:bg-gold-400 shadow-lg shadow-gold-500/10 transition-all duration-300"
                >
                  <span>{t('cart.secureSlots')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : null}

          </div>
        )}
      </motion.div>
    </div>
  );
}
