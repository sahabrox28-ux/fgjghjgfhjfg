export interface GearItem {
  id: string;
  name: string;
  category: "Bikes" | "Protective Gear" | "Tours/Tracks" | "Parts & Upgrades";
  subCategory: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  inStock: boolean;
  featured?: boolean;
  // High-performance rich specifications for premium catalog
  longOverview?: string;
  origin?: string;
  benefits?: string[];
  extendedSpecs?: Record<string, string>;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  rawDate: string; // "2026-06-15" etc
  location: string;
  difficulty: "Beginner" | "Intermediate" | "Pro" | "Hardcore";
  description: string;
  itinerary: string[];
  trackDistance: string;
  entryFee: string;
  spotsLeft: number;
  maxSpots: number;
  instructor: string;
  rsvpCount: number;
}

export interface CustomBikeConfig {
  model: string;
  engine: string;
  paint: string;
  decals: string;
  suspension: string;
  wheels: string;
}

export interface BikeModelInfo {
  name: string;
  basePrice: number;
  engineSize: string;
  weight: string;
  torque: string;
  power: string;
  description: string;
  paints: { name: string; hex: string; price: number }[];
  decals: { name: string; style: string; price: number }[];
  suspensions: { name: string; type: string; price: number; description: string }[];
  wheels: { name: string; type: string; price: number }[];
}
