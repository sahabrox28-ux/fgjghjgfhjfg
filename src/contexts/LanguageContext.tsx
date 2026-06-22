import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'uk';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation & Header
  'nav.shop': { en: 'Shop Gear', uk: 'В магазин' },
  'nav.bikes': { en: 'The Bikes', uk: 'Байки' },
  'nav.events': { en: 'Expeditions', uk: 'Експедиції' },
  'nav.journal': { en: 'Journal', uk: 'Журнал' },
  'nav.philosophy': { en: 'PHILOSOPHY', uk: 'ФІЛОСОФІЯ' },
  'nav.courtyard': { en: 'THE COURTYARD', uk: 'АНГАР' },
  'nav.gearlab': { en: 'GEAR LAB', uk: 'ЕКІПІРУВАННЯ' },
  'nav.xpeditions': { en: 'XPEDITIONS', uk: 'ЕКСПЕДИЦІЇ' },
  'nav.community': { en: 'COMMUNITY RUNS', uk: 'ЗАЇЗДИ' },
  'nav.openCart': { en: 'OPEN SHOPPING CART', uk: 'ВІДКРИТИ КОШИК' },
  'cart': { en: 'CART', uk: 'КОШИК' },

  // Hero Section
  'hero.subtitle': { en: 'ESTABLISHED IN GRIT · OUTLAW COMMUNITY', uk: 'СТВОРЕНІ З ХАРАКТЕРОМ · СПІЛЬНОТА OUTLAW' },
  'hero.title1': { en: 'CONQUER THE', uk: 'ПІДКОРЮЙ' },
  'hero.title2': { en: 'UNBEATEN PATH', uk: 'НЕЗВІДАНІ ШЛЯХИ' },
  'hero.desc': { 
    en: 'We build premium extreme-enduro machinery, equip hard-charging riders, and organize brutal trail expeditions. This is not a sport. It is a bloodline.', 
    uk: 'Ми створюємо преміальні машини для екстремального ендуро, екіпіруємо безкомпромісних райдерів та організовуємо жорсткі експедиції бездоріжжям. Це не спорт. Це в крові.' 
  },
  'hero.explore': { en: 'EXPLORE GEAR', uk: 'ПЕРЕГЛЯНУТИ ЕКІПІРУВАННЯ' },
  'hero.join': { en: 'JOIN OUR RUNS', uk: 'ПРИЄДНАТИСЯ ДО НАС' },
  'hero.stat1': { en: 'PRO-TUNED MACHINE BATCHES', uk: 'ПРОФЕСІЙНО НАЛАШТОВАНІ БАЙКИ' },
  'hero.stat2': { en: 'ACTIVE OUTLAW RIDERS', uk: 'АКТИВНИХ РАЙДЕРІВ' },
  'hero.stat3': { en: 'WILDERNESS EXPEDITIONS', uk: 'ЕКСПЕДИЦІЙ В ДИКУ ПРИРОДУ' },
  'hero.stat4': { en: 'SURVIVAL RATING', uk: 'ЗДАТНІСТЬ ДО ВИЖИВАННЯ' },
  'hero.bg': { en: 'Precision Engineering', uk: 'Точна Інженерія' },

  // About Section
  'about.title1': { en: 'THE CODE OF INTENT', uk: 'КОДЕКС НАМІРІВ' },
  'about.title2': { en: 'WE LIVE ON THE', uk: 'МИ ЖИВЕМО НА' },
  'about.title3': { en: 'EDGE OF TRACTION', uk: 'МЕЖІ ЗЧЕПЛЕННЯ' },
  'about.desc': { 
    en: 'Outlaw.MX was forged in wet dirt, broken clutch levers, and steep limestone climbs. We are a collective of professional technicians, stunt riders, and wilderness explorers who reject compromise. Our gear lab doesn’t sell plastic toys. We craft reliable shields and precise machines built to survive catastrophic failure repeatedly.', 
    uk: 'Outlaw.MX кувався у мокрому бруді, зламаних ручках зчеплення та на стрімких вапнякових підйомах. Ми — колектив професійних механіків, каскадерів та дослідників дикої природи, які не визнають компромісів. Ми не продаємо пластикові іграшки. Ми створюємо надійний захист та досконалі машини, розраховані витримувати катастрофічне навантаження знову і знову.' 
  },
  'about.quote': { 
    en: '"If you are not slipping, falling, or climbing, you are staying inside a box. Lift the front wheel."', 
    uk: '"Якщо ти не ковзаєш, не падаєш і не дряпаєшся вгору, ти залишаєшся в коробці. Піднімай переднє колесо."' 
  },
  'about.p1.title': { en: 'PREBUILT FOR TRIAL', uk: 'СТВОРЕНІ ДЛЯ ТРІАЛУ' },
  'about.p1.desc': { en: 'Each dirt bike that rolls out of our facility is handcrafted. Custom exhaust routing, high-strength titanium axles.', uk: 'Кожен кросовий байк, що виїжджає з нашої майстерні, зібраний вручну. Кастомні вихлопні системи, міцні титанові осі.' },
  'about.p2.title': { en: 'EXTREME BODY ARMOR', uk: 'ЕКСТРЕМАЛЬНА БРОНЯ' },
  'about.p2.desc': { en: 'Hard Enduro is a battle against gravity. We curate tactical gears engineered with carbon-composites.', uk: 'Хард-ендуро — це битва з гравітацією. Ми створюємо тактичне екіпірування з вуглецевих композитів.' },
  'about.p3.title': { en: 'THE APEX RUNS', uk: 'ЗАКРИТІ ЗАЇЗДИ' },
  'about.p3.desc': { en: 'Our community leads multi-day wild expeditions into Moab vertical slickrock canyons.', uk: 'Наша спільнота організовує багатоденні дикі експедиції у вертикальні каньйони.' },
  
  // Categories Section
  'cat.sector': { en: 'SELECT YOUR SECTOR', uk: 'ОБЕРІТЬ ВАШ СЕКТОР' },
  'cat.featured': { en: 'FEATURED', uk: 'ПРЕДСТАВЛЕНІ' },
  'cat.divisions': { en: 'DIVISIONS', uk: 'ПІДРОЗДІЛИ' },
  'cat.desc': { 
    en: 'Navigate our elite structures. Choose custom-machined bikes, explore safety-critical armor protocols, or sign up for brutal mountain trials and professional academies.',
    uk: 'Орієнтуйтеся в наших елітних підрозділах. Обирайте байки індивідуальної збірки, досліджуйте протоколи захисту або реєструйтеся на жорсткі гірські тріали та професійні академії.'
  },
  'cat.bikes.title': { en: 'EXTREME MACHINES', uk: 'ЕКСТРЕМАЛЬНІ МАШИНИ' },
  'cat.bikes.subtitle': { en: 'Bikes', uk: 'Байки' },
  'cat.bikes.desc': { en: 'Prebuilt factory models designed to tackle deep gravel, hillclimbs, and motocross competition.', uk: 'Готові заводські моделі, розроблені для подолання глибокого гравію, підйомів на пагорби та змагань з мотокросу.' },
  'cat.bikes.cta': { en: 'EXPLORE LINEUP', uk: 'АНГАР' },
  'cat.customizer': { en: 'BUILD CUSTOM SPEC', uk: 'ЗІБРАТИ СВІЙ БАЙК' },
  'cat.gear.title': { en: 'ARMORED PROTOCOLS', uk: 'БРОНЬОВАНІ ПРОТОКОЛИ' },
  'cat.gear.subtitle': { en: 'Protective Gear', uk: 'Захисне екіпірування' },
  'cat.gear.desc': { en: 'Aviation-grade helmets, composite guards, and specialized gloves to keep you safe in critical situations.', uk: 'Шоломи авіаційного класу, композитні захисти та спеціалізовані рукавички для безпеки в критичних ситуаціях.' },
  'cat.gear.cta': { en: 'VIEW GEAR LAB', uk: 'ЕКІПІРУВАННЯ' },
  'cat.parts.title': { en: 'FACTORY TUNING', uk: 'ЗАВОДСЬКИЙ ТЮНІНГ' },
  'cat.parts.subtitle': { en: 'Parts/Upgrades', uk: 'Запчастини / Тюнінг' },
  'cat.parts.desc': { en: 'High-performance bolt-on components and chassis geometry upgrades for absolute domination.', uk: 'Високопродуктивні компоненти та покращення геометрії для абсолютного домінування.' },
  'cat.parts.cta': { en: 'VIEW COMPONENTS', uk: 'ДЕТАЛІ' },
  'cat.tours.title': { en: 'XPEDITIONS & COACHING', uk: 'ЕКСПЕДИЦІЇ ТА НАВЧАННЯ' },
  'cat.tours.subtitle': { en: 'Tours/Tracks', uk: 'Тури / Треки' },
  'cat.tours.desc': { en: 'Join professional riders on remote multi-day tours or intensive technical hillclimb clinics.', uk: 'Приєднуйтесь до професійних райдерів у багатоденні тури або на інтенсивні технічні клініки.' },
  'cat.tours.cta': { en: 'BOOK TRACKS', uk: 'ЗАБРОНЮВАТИ ЗАЇЗДИ' },
  
  // Events Section
  'events.calendar': { en: 'OUTLAW CALENDAR', uk: 'КАЛЕНДАР OUTLAW' },
  'events.title': { en: 'UPCOMING RUNS &', uk: 'МАЙБУТНІ ЗАЇЗДИ ТА' },
  'events.title2': { en: 'TRIALS', uk: 'ТРІАЛИ' },
  'events.desc': { 
    en: 'Push your envelope alongside the community. See our race timetable, skills clinics, and trail rideouts. Spots are strictly capped to maintain trail integrity and safety.',
    uk: 'Розширюйте свої межі разом зі спільнотою. Дивіться наш розклад гонок, майстер-класи та виїзди на траси. Кількість місць суворо обмежена для збереження цілісності трас і безпеки.'
  },
  'events.spots': { en: 'SPOTS LEFT', uk: 'МІСЦЬ ЗАЛИШИЛОСЬ' },
  'events.level': { en: 'LEVEL:', uk: 'РІВЕНЬ:' },
  'events.deposit': { en: 'ENTRY DEPOSIT', uk: 'ВСТУПНИЙ ВНЕСОК' },
  'events.reserve': { en: 'RESERVE SPACE', uk: 'ЗАБРОНЮВАТИ МІСЦЕ' },

  // Gear Shop
  'shop.label': { en: 'GEAR LAB CATALOG', uk: 'КАТАЛОГ ЕКІПІРУВАННЯ' },
  'shop.title': { en: 'EQUIP YOUR', uk: 'ЕКІПІРУЙ СВІЙ' },
  'shop.title2': { en: 'EXPERIENCE', uk: 'ДОСВІД' },
  'shop.desc': { 
    en: 'Engineered for premium performance. Search our curated list of hard-enduro machinery, protective composite armors, and extreme desert track vouchers.', 
    uk: 'Створено для преміальної продуктивності. Шукайте в нашому списку хард-ендуро техніку, захисну гібридну броню та ваучери на екстремальні пустельні траси.' 
  },
  'shop.buildTitle': { en: 'BUILD A CUSTOMIZED BIKE?', uk: 'ЗІБРАТИ КАСТОМНИЙ БАЙК?' },
  'shop.buildDesc': { en: 'Assemble paints, suspensions and talon hubs', uk: 'Налаштуйте фарбу, підвіску та деталі' },
  'shop.launchBtn': { en: 'LAUNCH LAB', uk: 'ЗАПУСТИТИ' },
  'shop.search': { en: 'Filter gear, parts, or trails...', uk: 'Фільтрувати екіпірування, запчастини чи траси...' },
  'shop.empty': { en: 'No items found matching your key filters.', uk: 'Не знайдено товарів, що відповідають вашим фільтрам.' },
  'shop.reset': { en: 'Reset Search Parameters', uk: 'Скинути параметри пошуку' },
  'shop.price': { en: 'RECON PRICE', uk: 'ВАРТІСТЬ' },
  'shop.preview': { en: 'PREVIEW', uk: 'ПЕРЕГЛЯД' },
  'shop.book': { en: 'BOOK NOW', uk: 'ЗАБРОНЮВАТИ' },
  'shop.reserve': { en: 'RESERVE', uk: 'ЗАМОВИТИ' },
  'shop.added': { en: 'ADDED!', uk: 'ДОДАНО!' },
  'shop.metrics': { en: 'LABORATORY METRICS', uk: 'ЛАБОРАТОРНІ ПОКАЗНИКИ' },
  'shop.export': { en: 'MSRP EXPORT', uk: 'ВАРТІСТЬ' },
  'shop.secure': { en: 'SECURE LIMIT', uk: 'ПРИДБАТИ' },
  'shop.tabOverview': { en: 'OVERVIEW', uk: 'ОГЛЯД' },
  'shop.tabSpecs': { en: 'TECHNICAL SPECS', uk: 'ТЕХНІЧНІ ХАРАКТЕРИСТИКИ' },
  'shop.tabLogistics': { en: 'CRATE & LOGISTICS', uk: 'ДОСТАВКА ТА СУПРОВІД' },
  'shop.origin': { en: 'ENGINEERED IN', uk: 'КРАЇНА РОЗРОБКИ' },
  'shop.benefitsTitle': { en: 'KEY RECON ADVANTAGES', uk: 'КЛЮЧОВІ ПЕРЕВАГИ' },
  'shop.crateBikesTitle': { en: 'OUTLAW FACTORY COATED CRATE', uk: 'ЗАВОДСЬКИЙ СТАЛЕВИЙ ЯЩИК' },
  'shop.crateBikesDesc': { en: 'Every motorcycle is securely bolted in heavy steel-braced unboxing crates to protect critical fork fluids and steering locks.', uk: 'Кожен байк затиснутий у сталевій рамі, гарантуючи збереження амортизаторів і кута розвалу при доставці.' },
  'shop.crateBikesP1': { en: 'Includes premium transponder active diagnostic tools booklet.', uk: 'Включає комплект для активації датчиків транспондера.' },
  'shop.crateBikesP2': { en: 'Suspension preloads are tuned at our factory based on your weight parameters.', uk: 'Переднатяг пружин та демпфер відскоку виставляється за вашою вагою.' },
  'shop.crateGearTitle': { en: 'COMPOSITE SHELL QUALITY ASSURANCE', uk: 'КОНТРОЛЬ ЦІЛІСНОСТІ СИСТЕМ ЗАХИСТУ' },
  'shop.crateGearDesc': { en: 'Tested in intense quarry terrain. Every composite fiber sheet and seam undergoes ultrasonic diagnostic checks.', uk: 'Протестовано у скельних завалах. Зовнішні шви та пластини проходять дефектоскопічний ультразвуковий тест.' },
  'shop.crateGearP1': { en: 'Packaged in heavy dust bags with personalized metal ID engraving plates.', uk: 'Упаковується в пилозахисні мішки зі сталевим ідентифікаційним жетоном.' },
  'shop.crateGearP2': { en: 'Fitted with advanced inner structures for long-term climate support.', uk: 'Оснащено дихаючою структурою для сухості та терморегуляції.' },
  'shop.crateToursTitle': { en: 'SATELLITE BRIEFING & SAFETY ESCORTS', uk: 'СУПУТНИКОВИЙ ЗВ\'ЯЗОК ТА СУПРОВІД' },
  'shop.crateToursDesc': { en: 'Your personal Off-riding Concierge will coordinate with you within 24 hours of space reservation.', uk: 'Ваш координатор зв\'яжеться з вами протягом 24 годин для перевірки телеметрії.' },
  'shop.crateToursP1': { en: 'Complete satellite beacon trackers are assigned dynamically.', uk: 'Кожному учаснику видається індивідуальний супутниковий трекер GPS.' },
  'shop.crateToursP2': { en: 'Fully prepared factory backup motorcycles are provided at checkout grounds.', uk: 'На кожній точці чекпоінту чергують повністю налаштовані дублюючі байки.' },
  
  // Cart
  'cart.checkout': { en: 'CHECKOUT GATEWAY', uk: 'ШЛЮЗ ОПЛАТИ' },
  'cart.reserve': { en: 'RESERVE SLOTS', uk: 'БРОНЮВАННЯ' },
  'cart.permit': { en: 'TRANSPONDER PERMIT ISSUED', uk: 'ТРАНСПОНДЕР ВИДАНО' },
  'cart.permitDesc': { en: 'Payment approved. Your gear, bikes or tours are secured. An Outlaw technician will reach out to you directly about customized crate delivery specs.', uk: 'Оплата схвалена. Ваше екіпірування, байки чи тури заброньовано. Наш технік зв\'яжеться з вами.' },
  'cart.receipt': { en: 'OUTLAW RECEIPT', uk: 'КВИТАНЦІЯ OUTLAW' },
  'cart.total': { en: 'BILL TOTAL', uk: 'ЗАГАЛОМ ДО СПЛАТИ' },
  'cart.method': { en: 'METHOD', uk: 'СПОСІБ ОПЛАТИ' },
  'cart.return': { en: 'RETURN TO SINGLETRACK', uk: 'ПОВЕРНУТИСЬ НА ТРАСИ' },
  'cart.summary': { en: 'SECURED INVENTORY SUMMARY', uk: 'ПІДСУМОК БРОНЮВАННЯ' },
  'cart.items': { en: 'Items Amount:', uk: 'Кількість позицій:' },
  'cart.shipping': { en: 'Shipping method:', uk: 'Спосіб доставки:' },
  'cart.subtotal': { en: 'CART SUBTOTAL', uk: 'СУМА В КОШИКУ' },
  'cart.tax': { en: 'TAX SUM (8.2%)', uk: 'ПОДАТОК (8.2%)' },
  'cart.delivery': { en: 'FACTORY CRATE DELIV', uk: 'ЗАВОДСЬКА ДОСТАВКА' },
  'cart.billTotal': { en: 'RESERVE BILL TOTAL:', uk: 'ЗАГАЛЬНИЙ РАХУНОК:' },
  'cart.secureSlots': { en: 'SECURE OUTLAW SLOTS', uk: 'ПІДТВЕРДИТИ БРОНЮВАННЯ' },
  'cart.empty': { en: 'YOUR CRATE IS EMPTY', uk: 'ВАШИЙ ЯЩИК ПОРОЖНІЙ' },
  'cart.emptyDesc': { en: "You haven't reserved any enduro gear, bikes, or tours yet.", uk: "Ви ще не зарезервували екіпірування, байки або тури." },
  'cart.explore': { en: 'EXPLORE LAB', uk: 'В КАТАЛОГ' },
  'cart.products': { en: 'RESERVED WAREHOUSE PRODUCTS', uk: 'ЗАРЕЗЕРВОВАНА ПРОДУКЦІЯ СКЛАДУ' },
  'cart.address': { en: 'CRATE DELIVERY ADDRESS', uk: 'АДРЕСА ДОСТАВКИ РОЗКЛАДКИ' },
  'cart.card': { en: 'CREDIT CARD NUMBER', uk: 'НОМЕР КРЕДИТНОЇ КАРТКИ' },
  'cart.expiry': { en: 'EXPIRY DATE', uk: 'ДІЙСНА ДО' },
  'cart.cvc': { en: 'CVC SECURITY', uk: 'КОД БЕЗПЕКИ CVC' },
  'cart.back': { en: 'BACK', uk: 'НАЗАД' },
  'cart.pay': { en: 'PLACE OUTLAW ORDER', uk: 'РОЗМІСТИТИ ЗАМОВЛЕННЯ' },
  'cart.free': { en: 'FREE CRATE', uk: 'БЕЗКОШТОВНО' },
  'cart.ground': { en: 'GROUND TRUCK', uk: 'НАЗЕМНИЙ ТРАНСПОРТ' },
  
  // Customizer
  'cust.title': { en: 'OUTLAW CUSTOM LAB', uk: 'КАСТОМНА ЛАБОРАТОРІЯ OUTLAW' },
  'cust.badge': { en: 'PRO TO SPEC', uk: 'ПРО СПЕЦИФІКАЦІЯ' },
  'cust.desc': { en: 'Tweak high-end suspensions, engine maps, and racing anodized graphics', uk: 'Налаштуйте висококласну підвіску, карти двигуна та гоночну графіку' },
  'cust.chassis': { en: '1. CHOOSE CHASSIS PLATFORM', uk: '1. ВИБІР ПЛАТФОРМИ ШАСІ' },
  'cust.apex': { en: 'APEX DOHC 450', uk: 'APEX DOHC 450' },
  'cust.apexDesc': { en: 'Cross/Motocross platform', uk: 'Платформа крос/мотокрос' },
  'cust.stealth': { en: 'STEALTH TPI 300', uk: 'STEALTH TPI 300' },
  'cust.stealthDesc': { en: 'Technical Hard-Enduro platform', uk: 'Технічна хард-ендуро платформа' },
  'cust.platformLabel': { en: 'PLATFORM:', uk: 'ПЛАТФОРМА:' },
  'cust.insight': { en: 'PLATFORM INSIGHT', uk: 'ОГЛЯД ПЛАТФОРМИ' },
  'cust.telemetry': { en: 'LIVE MACHINE TELEMETRY', uk: 'ДИНАМІЧНА ТЕЛЕМЕТРІЯ БАЙКА' },
  'cust.engine': { en: 'ENGINE CAPACITY', uk: 'ОПТИМАЛЬНА ЄМНІСТЬ ДВИГУНА' },
  'cust.weight': { en: 'AGGREGATE WEIGHT', uk: 'ЗАГАЛЬНА ВАГА' },
  'cust.power': { en: 'OUTPUT POWER', uk: 'ВИХІДНА ПОТУЖНІСТЬ' },
  'cust.torque': { en: 'UPWIND TORQUE', uk: 'КРУТНИЙ МОМЕНТ' },
  'cust.paint': { en: '2. CUSTOM RACING PAINTWORK', uk: '2. ФАРБИ ТА ДИЗАЙН ПЛАСТИКУ' },
  'cust.decals': { en: '3. DECALS & RACING GRAPHICS KIT', uk: '3. НАКЛЕЙКИ ТА ГРАФІКА' },
  'cust.susp': { en: '4. SUSPENSIONS & FORK OVERHAUL', uk: '4. ПІДВІСКА ТА ВИЛКА' },
  'cust.wheels': { en: '5. EXTREME HUBS & RIMS OVERHAUL', uk: '5. КОЛЕСА ТА ДИСКИ' },
  'cust.free': { en: 'FREE', uk: 'БЕЗКОШТОВНО' },
  'cust.incl': { en: 'INCL', uk: 'ВКЛЮЧЕНО' },
  'cust.standard': { en: 'STANDARD', uk: 'СТАНДАРТ' },
  'cust.quote': { en: 'ESTIMATED FACTORY QUOTE', uk: 'ПОПЕРЕДНІЙ ПІДРАХУНОК ВАРТІСТІ' },
  'cust.freeShip': { en: 'FREE OUTLAW BLACK BOX SHIPPING', uk: 'БЕЗКОШТОВНА ДОСТАВКА ЯЩИКІВ OUTLAW' },
  'cust.confirm': { en: 'CONFIRM BUILD SPEC & ADD', uk: 'ПІДТВЕРДИТИ КОНФІГУРАЦІЮ ТА ДОДАТИ' },
  
  // Footer
  'footer.desc': { en: 'We engineer uncompromising off-road hardware, build hard-charging groups, and organize rugged singletrack training runs on the planetary edge of traction.', uk: 'Ми розробляємо безкомпромісне хардкорне екіпірування, збираємо агресивні групи та проводимо тренувальні заїзди на межі законів фізики.' },
  'footer.newsletter': { en: 'CAMPFIRE TRANSMISSIONS', uk: 'ТРАНСЛЯЦІЇ БІЛЯ ВОГНИЩА' },
  'footer.rights': { en: '© 2026 APEX ENDURO COLLECTIVE / PRECISION & PERFORMANCE', uk: '© 2026 APEX ENDURO COLLECTIVE / ТОЧНІСТЬ ТА ПРОДУКТИВНІСТЬ' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'uk' : 'en'));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
