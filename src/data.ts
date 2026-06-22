import { GearItem, CommunityEvent, BikeModelInfo } from "./types";

export const GEAR_ITEMS: GearItem[] = [
  // Bikes category
  {
    id: "bike-apex-450",
    name: "Apex 450 MX Pro Gold",
    category: "Bikes",
    subCategory: "Competition Motocross",
    price: 11200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800",
    description: "The ultimate track weapon, optimized for aggressive corning, blistering straightaway speeds, and flawless jump landings. Features our ultra-lightweight titanium build and gold magnesium details.",
    longOverview: "Forged in professional motocross competition, the Apex 450 MX Pro Gold represents the absolute pinnacle of four-stroke dirt bike technology. Built explicitly for elite racers who demand instant, razor-sharp throttle response, perfect high-speed aerodynamic stability, and precise chassis feedback. The chromium-molybdenum steel trellis frame has been engineered with scientifically tuned longitudinal and torsional flex to eat intense track chatter without sacrificing lightning-fast corner exit accuracy.",
    origin: "Mattighofen, Austria (Apex Factory Racing Division)",
    benefits: [
      "Aerospace Titanium Subframe with advanced geometric shock distribution",
      "Factory Gold Magnesium engine casings reducing crucial rotating mass",
      "CNC-Anodized premium triple clamps with adjustable offset positions"
    ],
    specs: {
      Engine: "449.9cc single-cylinder 4-stroke",
      Weight: "223 lbs (101 kg)",
      Suspension: "WP XACT adjustable forks",
      Transmission: "5-speed racing gear",
    },
    extendedSpecs: {
      "Valve Train": "4-valve DOHC, custom lightweight titanium valves",
      "Fuel System": "Keihin EFI 44mm high-pressure throttle body",
      "Starter / Battery": "Electric starter with 12V Li-Ion battery pack",
      "Chain Class": "520 Gold-Link professional racing chain",
      "Chassis Material": "Double-cradle 25CrMo4 high-tensile steel",
      "Ground Clearance": "14.6 in (370 mm) high-load unladen"
    },
    inStock: true,
    featured: true,
  },
  {
    id: "bike-stealth-300",
    name: "Stealth 300 Cross-Country",
    category: "Bikes",
    subCategory: "Hard Enduro",
    price: 9400,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800",
    description: "Built for tight technical trails, rocky obstacle climbs, and deep mud situations. The 300cc 2-stroke delivers instantaneous low-end torque with an incredible power-to-weight ratio.",
    longOverview: "The Stealth 300 Cross-Country is the undisputed, heavily armored king of the extreme singletrack. Designed to conquer near-vertical rock faces, slick logs, and deep quarry sand. Its revolutionary Transfer Port Injection (TPI) electronic system continuously calculates optimal fuel-to-air mixtures at any altitude, temperature, or humidity, completely removing the hassle of manual engine jetting. It comes standard with carbon-reinforced side guards, low-end torque optimization, and an electric radiator cooling fan.",
    origin: "Bologna, Italy (Outlaw Specialized Assembly Plant)",
    benefits: [
      "Electronic TPI System with dynamic altitude and temperature compensation",
      "Heavy-duty carbon-kevlar hybrid engine and exhaust skid guards",
      "Extremely broad torque curve starting at incredibly low traction RPMs"
    ],
    specs: {
      Engine: "293.2cc single-cylinder 2-stroke TPI",
      Weight: "228 lbs (103.5 kg)",
      Suspension: "WP XPLOR premium shock",
      Transmission: "6-speed wide-ratio",
    },
    extendedSpecs: {
      "Lubrication": "Electronically-regulated oil pump (no pre-mix required)",
      "Exhaust System": "Heavy nickel-plated dual-wall expansion chamber",
      "Front Suspension": "WP XPLOR 48mm split fork with premium preload dials",
      "Rear Suspension": "WP XPLOR PDS progressive progressive shock",
      "Clutch Unit": "DDS wet multi-disc clutch with Brembo hydraulics",
      "Braking System": "High-performance Brembo dual-piston calipers"
    },
    inStock: true,
    featured: true,
  },
  {
    id: "bike-drz-125",
    name: "Desert Comp-250 Scout",
    category: "Bikes",
    subCategory: "Playbike & Trail",
    price: 8700,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800",
    description: "Excellent all-round performer for singletrack exploration, hillclimbs, and novice trials. Balanced weight distribution with electric-start reliability.",
    longOverview: "Engineered specifically to conquer endless high-desert sand basins and rocky mountain singletracks, the Desert Comp-250 Scout is the absolute gold standard for dual-purpose play and tactical trail exploration. Delivering a remarkably predictable and smooth powerband, this liquid-cooled four-stroke is incredibly user-friendly yet boasts professional-grade suspension to confidently handle severe high-speed washouts and deep dry-river beds.",
    origin: "Hamamatsu, Japan (Custom Scout Labs Division)",
    benefits: [
      "Low-maintenance liquid cooling with dual high-throughput digital fans",
      "Fully adjustable Öhlins RX Superflow shocks for plush custom tuning",
      "High-output 150W alternator stator matching rugged custom light rigs"
    ],
    specs: {
      Engine: "249cc single 4-stroke liquid-cooled",
      Weight: "240 lbs (109 kg)",
      Suspension: "Ohlins RX Superflow shocks",
      Transmission: "5-speed electric",
    },
    extendedSpecs: {
      "Bore & Stroke": "78.0 mm x 52.2 mm with 13.5:1 compression core",
      "Cooling Core": "Reinforced aluminum radiators with custom protection cages",
      "Wheel Travel": "11.8 in front suspension, 12.2 in rear travel travel",
      "Fuel Capacity": "2.1 Gallons fuel capacity polymer safety shell",
      "Seat Height": "36.2 in (920 mm) with non-slip factory grip cover",
      "Ergonomics": "Aero Renthal high-rise handlebars with vibration dampeners"
    },
    inStock: true,
  },
  {
    id: "bike-pit-110",
    name: "Outlaw Mini-Cross 110",
    category: "Bikes",
    subCategory: "Pit Bikes",
    price: 1850,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582236371720-3b4733cf8528?auto=format&fit=crop&q=80&w=800",
    description: "The perfect entry point or backyard basher. Powered by a bulletproof 110cc air-cooled engine, semi-automatic transmission, and heavy-duty suspension to accommodate adult riders.",
    longOverview: "Don't let the compact dimensions fool you. The Outlaw Mini-Cross 110 is a meticulously crafted pit bike designed to take the brutal beatings of backyard racing and tight track duels. Boasting an ultra-reliable 110cc air-cooled 4-stroke thumper connected to a slick-shifting semi-automatic gearbox (no clutch lever needed), it bridges the gap perfectly for junior riders moving up, or adult riders looking for pure, unadulterated weekend fun without wearing themselves out.",
    origin: "Shanghai, China (Outlaw Mini-Moto Division)",
    benefits: [
      "Indestructible 110cc air-cooled engine architecture based on legendary designs",
      "Semi-automatic 4-speed transmission (N-1-2-3-4) for easy learning curves",
      "Upgraded heavy-duty chromoly steel perimeter frame for adult occupant durability"
    ],
    specs: {
      Engine: "110cc air-cooled 4-stroke",
      Weight: "155 lbs (70 kg)",
      Suspension: "Inverted 33mm hydraulic forks",
      Transmission: "4-speed semi-automatic",
    },
    extendedSpecs: {
      "Seat Height": "29 in (736 mm) suitable for juniors and adults",
      "Braking System": "Wave disc hydraulic brakes front and rear",
      "Wheel Size": "14-inch front / 12-inch rear high-tensile steel rims",
      "Carburetor": "22mm performance carb with open air filter",
      "Exhaust": "Billet aluminum free-flow muffler system",
      "Start Mechanism": "Electric start with secondary kick-starter"
    },
    inStock: true,
  },
  {
    id: "bike-pit-140bw",
    name: "Outlaw Pro 140 Big Wheel",
    category: "Bikes",
    subCategory: "Pit Bikes",
    price: 2450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1623869037415-4ba2b4ffab1d?auto=format&fit=crop&q=80&w=800",
    description: "A competition-ready super-mid pit bike. The 140cc oil-cooled engine combined with 17\" front and 14\" rear wheels delivers severe capability on deep ruts and mid-sized dirt jumps.",
    longOverview: "The Outlaw Pro 140 BW (Big Wheel) is the ultimate mid-size dirt destroyer. Stepping up to a fully manual 4-speed clutch transmission and an aggressive Z140 oil-cooled racing engine, this model rips through berms with authority. The larger 17-inch front and 14-inch rear rims drastically improve rollover capability on heavily rutted tracks and trail logging roads, providing a near full-size motocross feel in a highly tossable chassis.",
    origin: "Shanghai, China (Outlaw Mini-Moto Division)",
    benefits: [
      "High-output 140cc oil-cooled racing engine with aggressive camshaft profile",
      "Big Wheel (17F/14R) configuration for vastly superior obstacle rollover",
      "Fully adjustable rear gas shock with heavy-rate spring for gap jumps"
    ],
    specs: {
      Engine: "140cc oil-cooled 4-stroke",
      Weight: "172 lbs (78 kg)",
      Suspension: "Volt V-One adjustable forks",
      Transmission: "4-speed manual w/ racing clutch",
    },
    extendedSpecs: {
      "Seat Height": "34.5 in (876 mm) commanding tall rider posture",
      "Oil Cooling": "High-capacity dual-pass aluminum oil cooler radiator",
      "Wheel Size": "17-inch front / 14-inch rear aluminum alloy rims",
      "Frame": "Seamless twin-tube cradle frame with forged pivot plates",
      "Exhaust": "Stainless steel header with titanium-look race silencer",
      "Tires": "Innova cross-terrain soft-compound knobbies"
    },
    inStock: true,
    featured: true,
  },

  // Protective gear
  {
    id: "gear-carbon-helmet",
    name: "Viper Carbon MX-Helmet",
    category: "Protective Gear",
    subCategory: "Head Safety",
    price: 649,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&q=80&w=800",
    description: "Aerospace-grade autoclave carbon weave shell. High-contrast matte-black and brushed-gold paintwork. Features MIPS-tech rotational brain protection and emergency quick-release cheek pads.",
    longOverview: "Forged utilizing aerospace-grade autoclave-cured 3K carbon fiber composites, the Viper Carbon MX-Helmet is a masterclass in extreme physical personal defense. By integrating the Multi-directional Impact Protection System (MIPS), it heavily reduces rotational forces transferred to the brain during high-side tumbles. This ultra-lightweight helmet mitigates muscle fatigue in the neck during punishing, multi-hour endurance events on demanding enduro fields.",
    origin: "Portland, OR, USA (Safety Composite Technology Lab)",
    benefits: [
      "Integrated MIPS dynamic slip-plane system for rotational force defense",
      "Emergency quick-release cheek pads and customized contoured lining",
      "Oversized forward visual port offering full compatibility with outsize goggles"
    ],
    specs: {
      Material: "Aerospace 3K Carbon Fiber",
      Safety: "ECE 22.06 & DOT Certified",
      Ventilation: "14 high-flow intake vents",
    },
    extendedSpecs: {
      "Shell Core": "Vacuum-formed multi-directional 3K carbon composite",
      "Clamping Lock": "Ultra-light titanium gold double D-ring strap locks",
      "Interior Liner": "Removable, washable Coolmax moisture-wicking weave",
      "Aerodynamics": "Integrated rear stabilizer spoilers and chin bar flow channels",
      "Weight Spec": "1250 grams (small size) +/- 50g tolerance"
    },
    inStock: true,
    featured: true,
  },
  {
    id: "gear-gravity-boots",
    name: "Outlaw Gold Alpinestars Boots",
    category: "Protective Gear",
    subCategory: "Boots",
    price: 499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=800",
    description: "Form-fitting pivot ankle system with exceptional lateral lock. Extreme high impact resistance with steel shank insert and gold-anodized buckle lock mechanism.",
    longOverview: "Developed in close collaboration with elite factory hard-enduro pilots, these limited-edition Outlaw Gold Alpinestars boots deliver bulletproof lower-limb armor without locking down joint mobility. A highly engineered, low-profile medial dual-pivot ankle link shields against dangerous hyperextension, while facilitating lightning-fast shifter and rear brake leverage. An integrated stamped steel midfoot shank provides ultimate impact coverage on absolute flat landings.",
    origin: "Asolo, Italy (Alpinestars Custom Outlaw Lab Group)",
    benefits: [
      "Biomechanical dual-axis lateral ankle joint hyperextension shield",
      "Stamped high-strength structural spring-steel midsole support shank",
      "Anodized custom gold micro-adjustable self-aligning aluminum buckles"
    ],
    specs: {
      Sizes: "8 - 13 (US Men's)",
      Material: "Full grain microfiber & TPU",
      Sole: "Vulcanized rubber dual-density",
    },
    extendedSpecs: {
      "Impact Shields": "High-density heat-molded TPU shin, calf, and heel panels",
      "Inner Lining": "Anti-slip breathable 3D technical mesh with gel heel pads",
      "Gaiter Closure": "Ultra-elastic silicone-coated dust and water intrusion seal",
      "Sole Connection": "Fully replaceable structural double-stitched vulcanized footprint",
      "Heat Coverage": "Medial side honeycomb rubber panels for heat shielding"
    },
    inStock: true,
  },
  {
    id: "gear-gladiator-chest",
    name: "Gladiator-V3 Chest Guard",
    category: "Protective Gear",
    subCategory: "Torso Guard",
    price: 289,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=800",
    description: "Impact-absorbing 3DF AirFit foam backing. Tough outer polycarbonate shields. Highly breathable, compatible with standard neck braces.",
    longOverview: "Offering relentless, tank-like torso coverage without dictating your riding posture, the Gladiator-V3 Chest Guard is a vital asset for rocky singletrack scrambles. It pairs hard-shell outer polycarbonate shields with the advanced 3DF AirFit technology: a premium, highly flexible impact-absorbing foam lining that soft-molds to your body contours during movement, but solidifies instantly under sudden impact load to absorb kinetic energy.",
    origin: "Cape Town, South Africa (Leatt 3DF Advanced Engineering)",
    benefits: [
      "Kinetic-hardening 3DF AirFit foam that solidifies instantly upon impact",
      "Fully articulated multi-plate spine guard mirroring natural back arches",
      "Removable modular panels on upper chest and back for custom neck braces"
    ],
    specs: {
      Protection: "CE EN1621 Level 2 certified",
      Weight: "2.1 lbs",
      Adjustments: "Modular kidney straps",
    },
    extendedSpecs: {
      "Chest Safety": "CE Certified EN1621-3 Level 2 heavy chest impact protection",
      "Spinal Safety": "CE Certified EN1621-2 Level 2 full spine back protection",
      "Chassis Material": "High-durability moisture-wicking and ventilated AeroMesh",
      "Side Coverage": "Extended kidney protection plates with adjustable velcro rails",
      "Brace Integration": "Elastic loop securing cords for outlaw-style neck guards"
    },
    inStock: true,
  },

  // Parts & Upgrades
  {
    id: "part-exhaust-akra",
    name: "Akrapovič Titanium Slip-On",
    category: "Parts & Upgrades",
    subCategory: "Exhaust Systems",
    price: 890,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600857317770-4dcb12d76371?auto=format&fit=crop&q=80&w=800",
    description: "Unleash maximum horsepower and a deep, aggressive exhaust note. Crafted entirely from high-grade titanium, drastically reducing weight over stock silencers.",
    longOverview: "Developed directly from factory racing division specs, the Akrapovič Titanium Slip-On line represents the ultimate step in exhaust system tuning. Formed from race-proven titanium alloys, this exhaust significantly reduces unsprung heat mass at the rear of the bike while providing a substantial boost in mid-range torque and peak horsepower. Includes a removable spark arrestor for trail compliance and that signature aggressive exhaust tone.",
    origin: "Ivancna Gorica, Slovenia (Akrapovič Exhaust Lab)",
    benefits: [
      "Extremely lightweight aerospace titanium outer sleeve and end cap",
      "Noticeable horsepower and torque increase throughout the RPM range",
      "Meets FIM noise limits while delivering a deeper, resonant sound"
    ],
    specs: {
      Material: "Titanium / Carbon Fiber",
      WeightDrop: "-3.2 lbs vs Stock",
      Fitment: "Apex 450, Stealth 300",
    },
    extendedSpecs: {
      "End Cap": "Hand-crafted carbon fiber hexagonal profile",
      "Power Gains": "+2.4 HP @ 8500 RPM / +1.9 lb-ft @ 7100 RPM",
      "Mounting": "Welded titanium bracket, direct slip-on no remapping required",
      "Spark Arrestor": "Included, removable USFS approved insert"
    },
    inStock: true,
    featured: true,
  },
  {
    id: "part-suspension-ohlins",
    name: "Öhlins RXF 48 S Front Fork",
    category: "Parts & Upgrades",
    subCategory: "Suspension",
    price: 2850,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1549495147-3be9cf8e1ce4?auto=format&fit=crop&q=80&w=800",
    description: "The gold standard in front-end traction. The RXF 48 S features advanced TTX twin-tube technology, providing unmatched bottoming resistance and plushness through harsh brake bumps.",
    longOverview: "If absolute control and tire contact are your goals, the Öhlins RXF 48 S Front Fork is the ultimate suspension upgrade. Implementing the race-dominating TTX (Twin Tube) technology, the fork completely separates rebound and compression oil flow. The result is zero cavitation, meaning consistent damping pressure whether you are hitting small log ripples or flat-landing massive 120-foot triples. Gold TiN coated inner tubes offer zero stiction.",
    origin: "Upplands Väsby, Sweden (Öhlins Racing AB)",
    benefits: [
      "TTX Twin-Tube technology for totally separated compression/rebound",
      "Gold Titanium-Nitride (TiN) surface treatment for zero friction movement",
      "Micro-polish advanced cartridge system for extreme bottoming resistance"
    ],
    specs: {
      Type: "Coil Spring / TTX Cartridge",
      Diameter: "48 mm",
      Adjustability: "High/Low Comp, Rebound",
    },
    extendedSpecs: {
      "Spring Rates": "Customizable from 4.2 N/mm up to 5.2 N/mm",
      "Inner Tubes": "48mm with Gold TiN friction reduction coating",
      "Outer Tubes": "Hard-anodized aerospace aluminum",
      "Axle Lugs": "Billet CNC-machined aluminum with integrated brake mounts",
      "Setup": "Available custom valved prior to shipping per rider weight"
    },
    inStock: true,
  },

  // Tours and tracks
  {
    id: "tour-moab-red",
    name: "Moab Canyon Gold Run Tour",
    category: "Tours/Tracks",
    subCategory: "Guided Adventure",
    price: 1850,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1614812513172-567d2fe96a75?auto=format&fit=crop&q=80&w=800",
    description: "A 4-day deep guided backcountry excursion through Utah's legendary Moab red rocks and slickrock canyons. Fully equipped support crew, elite trail leaders, and five-star glamping included.",
    longOverview: "Challenge yourself on the legendary golden slickrocks and high-altitude canyon walls of southern Utah. This fully-supported, premium four-day singletrack tour leads a select group of up to ten riders across pristine dunes, high mesas, and extreme narrow-pass singletracks. Under the direction of active pro enduro champions, you will enjoy premium satellite-tracked safety support, custom campfire meal catering, and elite glamping accommodations.",
    origin: "Moab Wilderness Slickrock Trails, Utah, USA",
    benefits: [
      "Elite 1-on-1 riding and trail coaching by legendary off-road pros",
      "Fully stocked custom high-clearance Unimog 4x4 mobile support vehicle",
      "Off-grid five-star glamping with personal gourmet campfire chef catering"
    ],
    specs: {
      Duration: "4 Days / 3 Nights",
      Terrain: "High slickrock, loose shale",
      Level: "Intermediate to Pro-only",
    },
    extendedSpecs: {
      "Daily Mileage": "平均 65 miles (105 km) of technical off-road tracks",
      "Permits & Passes": "Bureau of Land Management (BLM) entries and state permits included",
      "Bike Provision": "Choice of Apex 450 Pro or Stealth 300 factory custom bike rental",
      "Support Crew": "Two active sweeping sweep riders, one paramedic, one high-tech tool-truck",
      "Accommodation": "Heated rugged geodesic domes with premium bedding and shower rigs"
    },
    inStock: true,
    featured: true,
  },
  {
    id: "tour-erzberg-prep",
    name: "Erzberg Rodeo Simulation Academy",
    category: "Tours/Tracks",
    subCategory: "Precision Training",
    price: 1100,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
    description: "Train with legendary extreme-enduro champions inside a custom quarries facility that mimics the punishing Erzberg Giant. Master hill climbing, rock obstacle jumping, and throttle control.",
    longOverview: "Engineered specifically to simulate Austria's world-famous, soul-crushing Erzberg Rodeo, this intensive 2-day simulation academy operates inside an exclusive 400-acre private mountain quarry. Under direct champion tutoring, you will master extreme vertical climbing, slick gravel balance, heavy boulder hopping, and complex weight-shifting ergonomics. Ideal for competitive and expert riders striving to master extreme hard-enduro layouts.",
    origin: "Sledgehammer Quarry Rocky Outposts, Colorado, USA",
    benefits: [
      "Pro Champion-guided active suspension pre-loading and hop workshops",
      "Strict 4:1 student-to-pro ratio ensuring continuous feedback and safety",
      "Exclusive entry to vertical high-wall quarry trails and active scree fields"
    ],
    specs: {
      Duration: "2-Day Intensive",
      Terrain: "Active iron quarry cliffs",
      Level: "Pro-only",
    },
    extendedSpecs: {
      "Instruction Hours": "16 hours of structured saddle time and expert analysis",
      "Video Analytics": "Slow-motion video throttle posture and clutch timing analysis",
      "Suspension Tuning": "One-on-one session to dial in customized fork preloads and rebound",
      "Safety Net": "Continuous radio monitoring, spotter teams at all major cliffs",
      "Certification": "Official Outlaw Hard Enduro Master Grade rating diploma issued"
    },
    inStock: true,
  }
];

export const UPCOMING_EVENTS: CommunityEvent[] = [
  {
    id: "event-black-ridge",
    title: "Black Ridge Sunset Scramble",
    date: "Saturday, June 20, 2026",
    rawDate: "2026-06-20",
    location: "Black Ridge Off-road Park, NV",
    difficulty: "Intermediate",
    description: "Join us for our signature summer night-ride and bonfire! This cross-country dash spans 23 miles of winding ravines, hillclimbs, and sandy berms. We will finish around an open campfire at sunset with food and beverage provided by local gear shops.",
    itinerary: [
      "2:00 PM - Technical inspection and rider briefing",
      "3:00 PM - Rideout Group A (Mellow) and Group B (Fast)",
      "6:30 PM - Peak Summit group photo session",
      "8:00 PM - Campfire, BBQ, live tunes, and prize drawings"
    ],
    trackDistance: "23.5 miles",
    entryFee: "$45",
    spotsLeft: 8,
    maxSpots: 40,
    instructor: "Cole Lawson",
    rsvpCount: 32,
  },
  {
    id: "event-iron-quarry",
    title: "Iron Quarry Hard Enduro Clinic",
    date: "July 11 - 12, 2026",
    rawDate: "2026-07-11",
    location: "Sledgehammer Canyon, UT",
    difficulty: "Hardcore",
    description: "Learn critical pivot-turning, wall-climbing, and balance skills required to tackle extreme landscapes. Master the art of loading suspensions to jump over tree trunks and massive boulders with flawless posture.",
    itinerary: [
      "Saturday 9:00 AM - Body positioning & suspension pre-loading theory",
      "Saturday 11:30 AM - Steep wall ascent & rock gardens drill",
      "Sunday 10:00 AM - Extreme singletrack simulation loops",
      "Sunday 3:00 PM - Personalized slow-mo video rider analysis"
    ],
    trackDistance: "6.2 miles loop (Hardcore obstacles)",
    entryFee: "$250",
    spotsLeft: 3,
    maxSpots: 15,
    instructor: "Taddy Blazusiak (Guest Pro)",
    rsvpCount: 12,
  },
  {
    id: "event-rookie-skills",
    title: "Basic Berms & Throttle Control Clinic",
    date: "Sunday, August 02, 2026",
    rawDate: "2026-08-02",
    location: "Apex Tracks Field, CO",
    difficulty: "Beginner",
    description: "Are you fresh to dirt riding? Learn confidence-building drills in a controlled sand arena. Overcome the fear of rear wheel slides, stand on the footpegs with proper posture, and master clutch-braking synchronization.",
    itinerary: [
      "8:30 AM - Safety checklist & bike setup optimization",
      "9:30 AM - Standing ergonomics & loose sand posture active drilling",
      "12:00 PM - Catered Lunch & hydration breaks",
      "1:30 PM - Corner entry leg extensions & safe emergency stops"
    ],
    trackDistance: "1.5 miles groomed arena tracks",
    entryFee: "$80",
    spotsLeft: 14,
    maxSpots: 20,
    instructor: "Sarah Carter",
    rsvpCount: 6,
  }
];

export const BIKE_MODELS_INFO: Record<string, BikeModelInfo> = {
  "apex-450": {
    name: "APEX 450 MX PRO",
    basePrice: 11200,
    engineSize: "449.9cc DOHC",
    weight: "223 lbs",
    torque: "48.2 lb-ft",
    power: "62 HP",
    description: "Unadulterated race track performance. Maximum speed, ultra responsive power delivery, and lightweight frame for pro-tier dirt jumping.",
    paints: [
      { name: "Matte Black & Gold Highlight", hex: "#121212", price: 0 },
      { name: "Chrome Premium Wrap", hex: "#D4AF37", price: 650 },
      { name: "Toxic Carbon weave", hex: "#1f1f1f", price: 900 },
    ],
    decals: [
      { name: "Raw Minimalist Outlaw", style: "Minimalist lines, subtle amber borders", price: 0 },
      { name: "Sponsor Factory Team Gold", style: "Extreme racing decals with metallic gloss and sponsor badges", price: 350 },
      { name: "Stealth Desert Camo", style: "Deep charcoal digital camo accents", price: 400 },
    ],
    suspensions: [
      { name: "WP XACT Air Fork Standard", type: "Pneumatic split fork", price: 0, description: "Highly versatile, easily adjustable via air valves" },
      { name: "Ohlins RX-Force Custom Tech", type: "Dual mechanical coil spring", price: 1200, description: "Unmatched traction over harsh chatter and rocky root networks" },
    ],
    wheels: [
      { name: "Excel A60 Lightweight Black Rim", type: "Ultra lightweight spoke wheel", price: 0 },
      { name: "Talon Gold Billet / Black Excel Spikes", type: "Anodized premium gold hubs with black heavy spokes", price: 550 },
    ]
  },
  "stealth-300": {
    name: "STEALTH 300 ENDURO",
    basePrice: 9400,
    engineSize: "293.2cc 2-Stroke TPI",
    weight: "228 lbs",
    torque: "51.1 lb-ft",
    power: "54 HP",
    description: "The crown jewel of extreme hill climbing. The electronic-injection fuel system ensures crisp 2-stroke power on high altitudes and sheer vertical slopes.",
    paints: [
      { name: "Gunmetal Charcoal", hex: "#262626", price: 0 },
      { name: "Oasis Sand Gold", hex: "#C59B27", price: 450 },
      { name: "Pre-preg Raw Carbon", hex: "#131313", price: 850 },
    ],
    decals: [
      { name: "Hard-Enduro Series Standard", style: "Bold logo overlays with deep amber outline", price: 0 },
      { name: "Red Sands Retro Deco", style: "80s vintage style with golden gradient lines", price: 290 },
    ],
    suspensions: [
      { name: "WP XPLOR Hydraulic Shock", type: "Plush progressive damping", price: 0, description: "Standard enduro, incredibly plush for 6+ hour riding comfort" },
      { name: "WP Cone-Valve Pro Components", type: "Factory division dual-valve", price: 1800, description: "The ultimate peak-force control. Perfect control for high-speed canyon drop-ins" },
    ],
    wheels: [
      { name: "D.I.D DirtStar Heavy-Duty Rims", type: "Enduro specific high tensile", price: 0 },
      { name: "Kite Elite Racing Dub", type: "Premium gold hub with extreme thick rims for rock impact protection", price: 600 },
    ]
  }
};
