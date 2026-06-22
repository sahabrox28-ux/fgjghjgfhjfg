import { useState, useEffect } from "react";
import { GearItem } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Categories from "./components/Categories";
import CustomizerModal from "./components/CustomizerModal";
import GearShop from "./components/GearShop";
import Events from "./components/Events";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import { AnimatePresence } from "motion/react";

interface CartLine {
  item: GearItem;
  quantity: number;
}

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState("hero-section");

  // Shopping E-commerce Cart state
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Active Catalog Category selector
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    "All" | "Bikes" | "Protective Gear" | "Tours/Tracks" | "Parts & Upgrades"
  >("All");

  // Track active section for indicator highlighting in Header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for trigger point

      const sections = ["hero-section", "about", "categories", "catalog", "events"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CTA Action Scrolls
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of sticking header
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

  // Categories grid link: updates the filter pill and scrolls to the Shop
  const handleSelectCategory = (category: "Bikes" | "Protective Gear" | "Tours/Tracks" | "Parts & Upgrades") => {
    setActiveCategoryFilter(category);
    scrollToElement("catalog");
  };

  // Cart operations
  const handleAddToCart = (item: GearItem) => {
    setCartLines((prevLines) => {
      const existingLineIdx = prevLines.findIndex((line) => line.item.id === item.id);
      if (existingLineIdx > -1) {
        const copy = [...prevLines];
        copy[existingLineIdx].quantity += 1;
        return copy;
      }
      return [...prevLines, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartLines((prevLines) =>
      prevLines.map((line) => (line.item.id === itemId ? { ...line, quantity: newQty } : line))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartLines((prevLines) => prevLines.filter((line) => line.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartLines([]);
  };

  // High-end Custom Bike builder integrations
  const handleAddCustomBikeToCart = (bikeDetails: {
    name: string;
    price: number;
    description: string;
    image: string;
    specs: Record<string, string>;
  }) => {
    const customGearItem: GearItem = {
      id: `custom-bike-${Date.now()}`,
      name: bikeDetails.name,
      category: "Bikes",
      subCategory: "Custom Built Spec",
      price: bikeDetails.price,
      rating: 5.0,
      image: bikeDetails.image,
      description: bikeDetails.description,
      specs: bikeDetails.specs,
      inStock: true
    };
    handleAddToCart(customGearItem);
    setIsCartOpen(true); // Open cart sidebar drawer immediately to show progress
  };

  const cartTotalItemCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="bg-matte-black text-white font-sans antialiased min-h-screen">
      {/* 1. Transparent Floating Sticky Nav Header */}
      <Header
        cartCount={cartTotalItemCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        activeSection={
          activeSection === "hero-section"
            ? "hero-section"
            : activeSection === "catalog"
            ? "catalog"
            : activeSection
        }
      />

      {/* 2. Panoramic Cinematic Hero Banner */}
      <Hero
        onExploreGear={() => scrollToElement("catalog")}
        onJoinCommunity={() => scrollToElement("events")}
      />

      {/* 3. Singletrack Philosophy Description Block */}
      <About />

      {/* 4. Division Selection Grid cards */}
      <Categories
        onSelectCategory={handleSelectCategory}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* 5. Integrated Gear E-commerce Feed Catalog */}
      <GearShop
        onAddToCart={handleAddToCart}
        activeCategoryFilter={activeCategoryFilter}
        onSetCategoryFilter={(filter) => setActiveCategoryFilter(filter)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* 6. Upcoming Race and Clinic Schedule */}
      <Events />

      {/* 7. Clean Minimalist Black Footer */}
      <Footer />

      {/* INTERACTIVE SIDEBAR DRAWER: Shopping Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartLines={cartLines}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>

      {/* INTERACTIVE COMPONENT DIALOG: Bike Customization Lab */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <CustomizerModal
            isOpen={isCustomizerOpen}
            onClose={() => setIsCustomizerOpen(false)}
            onAddCustomBikeToCart={handleAddCustomBikeToCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
