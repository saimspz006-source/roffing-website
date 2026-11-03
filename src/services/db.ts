import {
  Lead,
  EstimateRequest,
  ServiceItem,
  RoofingMaterial,
  GalleryProject,
  ReviewItem,
  FAQItem,
  ServiceArea,
  WebsiteSettings,
  AdminUser,
} from '../types';

// Web Crypto PBKDF2 Password Hashing
export async function hashPassword(
  password: string,
  saltHex?: string
): Promise<{ hashHex: string; saltHex: string }> {
  const enc = new TextEncoder();
  const salt = saltHex
    ? new Uint8Array(saltHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))
    : crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  const newHashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  const newSaltHex = Array.from(salt).map((b) => b.toString(16).padStart(2, '0')).join('');

  return { hashHex: newHashHex, saltHex: newSaltHex };
}

export async function verifyPassword(
  password: string,
  targetHashHex: string,
  saltHex: string
): Promise<boolean> {
  const { hashHex } = await hashPassword(password, saltHex);
  return hashHex === targetHashHex;
}

// Storage keys
const STORAGE_PREFIX = 'summit_roofing_';
const KEYS = {
  SETTINGS: `${STORAGE_PREFIX}settings`,
  LEADS: `${STORAGE_PREFIX}leads`,
  ESTIMATES: `${STORAGE_PREFIX}estimates`,
  SERVICES: `${STORAGE_PREFIX}services`,
  PROJECTS: `${STORAGE_PREFIX}projects`,
  REVIEWS: `${STORAGE_PREFIX}reviews`,
  FAQS: `${STORAGE_PREFIX}faqs`,
  SERVICE_AREAS: `${STORAGE_PREFIX}service_areas`,
  ADMIN: `${STORAGE_PREFIX}admin`,
  AUTH_SESSION: `${STORAGE_PREFIX}auth_session`,
};

// Initial Seed Data
const DEFAULT_SETTINGS: WebsiteSettings = {
  companyName: 'Summit Pro Roofing',
  tagline: 'Reliable Roofing. Built to Last.',
  location: 'Austin, Texas, USA',
  address: '3400 South Congress Ave, Suite 210, Austin, TX 78704',
  phone: '(512) 555-0148',
  rawPhone: '5125550148',
  smsPhone: '(512) 555-0148',
  email: 'info@summitproroofing.com',
  businessHours: 'Monday–Saturday, 7:00 AM–7:00 PM',
  emergencyService: '24/7',
  emergencyPhone: '(512) 555-0148',
  licenseNumber: 'TX-LIC-#748291-RC',
  insuranceCoverage: '$2,000,000 Commercial General Liability & Full Workman\'s Comp',
  googleMapsQuery: '3400+S+Congress+Ave,+Austin,+TX+78704',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    yelp: 'https://yelp.com',
  },
  seo: {
    metaTitle: "Summit Pro Roofing | Austin's Trusted Roof Repair & Replacement Contractor",
    metaDescription: "Professional residential and commercial roofing across Austin, TX. Specialized in roof replacement, hail repair, metal roofs, and insurance claims. Call (512) 555-0148.",
    keywords: "Roofing company Austin TX, Roof repair Austin, Roof replacement Austin, Roofing contractor Austin, Emergency roof repair Austin, Storm damage roofing Austin, Roofing estimate Austin",
  },
  isDemoMode: true,
};

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'roof-repair',
    name: 'Roof Repair',
    shortDesc: 'Rapid leak diagnostics, shingle patch fixes, pipe boot replacements, and structural storm recovery.',
    fullDesc: 'A leaking roof never gets better on its own. Our certified Austin roofing technicians conduct thorough 21-point forensic leak inspections, identifying hidden punctures, damaged underlayment, and compromised flashing before minor leaks become catastrophic interior structural water damage.',
    features: [
      'Comprehensive attic & decking moisture probe',
      'Leak detection & thermal imaging check',
      'Wind-torn shingle matching & sealed replacement',
      'Chimney, valley & chimney counter-flashing resealing',
      'Plumbing boot & ridge vent waterproofing',
      'Same-day emergency tarping & stabilization',
    ],
    priceRange: '$350 – $1,800 depending on scope',
    image: '/src/assets/images/storm_damage_inspection_1791780571369.jpg',
    active: true,
    category: 'residential',
  },
  {
    id: 'srv-2',
    slug: 'roof-replacement',
    name: 'Roof Replacement',
    shortDesc: 'Full tear-off and master-tier architectural shingle re-roofing with lifetime manufacturer warranty.',
    fullDesc: 'When your roof reaches the end of its lifespan or sustains irreparable hail degradation, Summit Pro Roofing delivers turnkey, high-performance replacements. We strip down to bare decking, replace rotten plywood, install synthetic leak barriers, and apply Class 4 impact-rated roofing built for punishing Texas summers.',
    features: [
      'Full tear-off down to bare deck sheathing',
      'Rotten plywood & fascia replacement',
      'Premium synthetic underlayment & ice/water shield in valleys',
      'Class 3 & Class 4 impact-rated shingles (insurance premium discounts)',
      'High-capacity ridge vent ventilation balancing',
      'Full magnetic ground sweep for nail cleanup',
    ],
    priceRange: '$7,500 – $24,000 depending on square footage & pitch',
    image: '/src/assets/images/roof_replacement_work_1791780533726.jpg',
    active: true,
    category: 'residential',
  },
  {
    id: 'srv-3',
    slug: 'roof-installation',
    name: 'New Roof Installation',
    shortDesc: 'Engineered roofing systems for custom new construction homes and modern architectural additions.',
    fullDesc: 'Partnering with Central Texas builders, architects, and custom home owners to deliver structurally sound, code-compliant, and visually arresting roof assemblies engineered specifically for high thermal solar loads and heavy storm downpours.',
    features: [
      'Architectural blueprint & load engineering reviews',
      'Precision pitch calculations & customized drainage design',
      'Direct coordination with general contractors & framing crews',
      'High-efficiency cool-roof reflectivity standards',
      'Complete Texas Windstorm code compliance certification',
    ],
    priceRange: 'Custom bid per architectural plan',
    image: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
    active: true,
    category: 'residential',
  },
  {
    id: 'srv-4',
    slug: 'shingle-roofing',
    name: 'Shingle Roofing',
    shortDesc: 'GAF, Owens Corning, and CertainTeed premium dimensional and architectural asphalt shingles.',
    fullDesc: 'Asphalt architectural shingles offer unbeatable value, rich dimensional shadow lines, and superior protection. Engineered to resist 130 MPH winds and algae streaking, our asphalt systems give Austin homes enduring beauty and long-lasting defense against extreme weather.',
    features: [
      'Algae-resistant StreakGuard™ granule technology',
      'Class 4 impact resistance against Central Texas hail',
      'Up to 130 mph wind warranty protection',
      'Dozens of designer color blends (Pewter Gray, Barkwood, Charcoal)',
      'GAF Master Elite certified installation practices',
    ],
    priceRange: '$4.25 – $6.50 per sq. ft. installed',
    image: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
    active: true,
    category: 'residential',
  },
  {
    id: 'srv-5',
    slug: 'metal-roofing',
    name: 'Metal Roofing',
    shortDesc: 'Architectural standing seam & 26-gauge concealed fastener metal roofing with 50+ year longevity.',
    fullDesc: 'The gold standard in Texas climate resilience. Standing seam metal roofs reflect up to 70% of radiant solar heat, slash monthly cooling bills by up to 25%, and withstand severe hail that shatters conventional roofing materials. A lifetime roof investment.',
    features: [
      '24 or 26-gauge Galvalume® steel with Kynar 500® paint finish',
      'Concealed mechanical fasteners prevent thermal expansion leaks',
      'Energy Star rated cool-roof reflective pigments',
      'Class A fire rating & Class 4 hail resistance',
      '50+ year expected working lifespan',
    ],
    priceRange: '$9.50 – $15.00 per sq. ft. installed',
    image: '/src/assets/images/metal_standing_seam_roof_1791780546881.jpg',
    active: true,
    category: 'residential',
  },
  {
    id: 'srv-6',
    slug: 'flat-roofing',
    name: 'Flat Roofing',
    shortDesc: 'Commercial and low-slope residential single-ply TPO, PVC, and multi-ply modified bitumen systems.',
    fullDesc: 'Low-slope and flat roof structures require specialized continuous membrane engineering to avoid standing water ponding. We install heat-welded white TPO membranes and heavy-duty modified bitumen systems that seal out moisture permanently.',
    features: [
      '60-mil reinforced commercial-grade TPO membrane',
      'Hot-air welded seams 3x stronger than taped joints',
      'Tapered ISO insulation boards engineered for positive water drainage',
      'Scupper box, downspout, and parapet coping cap fabrication',
      'Reflective UV cool-roof energy savings',
    ],
    priceRange: '$5.50 – $9.00 per sq. ft. installed',
    image: '/src/assets/images/commercial_flat_roofing_1791780560405.jpg',
    active: true,
    category: 'commercial',
  },
  {
    id: 'srv-7',
    slug: 'commercial-roofing',
    name: 'Commercial Roofing',
    shortDesc: 'Full asset management, warehouse reroofing, office parks, retail centers, and maintenance contracts.',
    fullDesc: 'Minimizing business downtime is our highest priority. We provide full commercial reroofing, elastomeric silicone roof coatings, and preventive maintenance for office buildings, warehouses, shopping plazas, and industrial facilities across Central Texas.',
    features: [
      'Minimal operational disruption with clean jobsite staging',
      'Fluid-applied silicone coatings that extend roof life 15+ years',
      'Commercial preventative maintenance agreements (PMA)',
      'Full OSHA-compliant fall protection rigging',
      'Direct manufacturer NDL (No Dollar Limit) warranty backing',
    ],
    priceRange: 'Custom commercial project estimation',
    image: '/src/assets/images/commercial_flat_roofing_1791780560405.jpg',
    active: true,
    category: 'commercial',
  },
  {
    id: 'srv-8',
    slug: 'emergency-roofing',
    name: 'Emergency Roofing',
    shortDesc: '24/7 immediate dispatch for severe water intrusions, tree impacts, and torn-off roof sections.',
    fullDesc: 'When severe Texas weather strikes in the middle of the night, waiting until Monday means ruined drywall, electrical hazards, and mold. Our emergency crews dispatch with industrial heavy-duty 10-mil poly tarps, sandbags, and 2x4 framing to immediately halt water ingress.',
    features: [
      'Guaranteed rapid response dispatch across Travis & Williamson counties',
      'Heavy-duty secure waterproof tarping & leak isolation',
      'Hazardous tree limb clearing from roof line',
      'Structural shoring & attic emergency water mitigation',
      'Insurance-ready photo documentation & condition report',
    ],
    priceRange: '$450 – $1,200 emergency stabilization',
    image: '/src/assets/images/storm_damage_inspection_1791780571369.jpg',
    active: true,
    category: 'emergency',
  },
  {
    id: 'srv-9',
    slug: 'storm-damage',
    name: 'Storm Damage & Insurance Claims',
    shortDesc: 'Comprehensive hail & wind forensic inspections and seamless insurance claim advocacy.',
    fullDesc: 'Central Texas is ground zero for intense spring hailstorms and destructive straight-line winds. We handle the entire claims process: meeting your insurance adjuster on-site, providing exact Xactimate line-item estimates, and ensuring your policy covers full replacement costs.',
    features: [
      'Drone & hand-gauge hail impact mapping',
      'On-site attendance during insurance adjuster inspection',
      'Xactimate line-item software matching insurer standards',
      'Zero out-of-pocket beyond your agreed insurance deductible',
      'Supplements filed for code upgrades (drip edge, ice barrier)',
    ],
    priceRange: 'Covered by homeowner insurance policy (deductible applies)',
    image: '/src/assets/images/storm_damage_inspection_1791780571369.jpg',
    active: true,
    category: 'residential',
  },
  {
    id: 'srv-10',
    slug: 'gutter-services',
    name: 'Seamless Gutters & Drainage',
    shortDesc: 'Custom 6-inch seamless aluminum gutters and micro-mesh leaf guards to protect foundations.',
    fullDesc: 'A great roof is only half the battle. Texas downpours dump hundreds of gallons per minute onto your perimeter, cracking slab foundations. We custom fabricate seamless 6-inch K-style aluminum gutters on-site to route water cleanly away from your home.',
    features: [
      'On-site continuous seamless aluminum extrusion',
      'Heavy-duty hidden screw hangers spaced every 24 inches',
      'Oversized 3x4-inch commercial downspouts prevent overflowing',
      'Surgical leaf guard filters eliminate cleaning chores',
      'Over 28 baked-on enamel colors to match your trim',
    ],
    priceRange: '$11 – $18 per linear foot installed',
    image: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
    active: true,
    category: 'residential',
  },
];

export const ROOFING_MATERIALS: RoofingMaterial[] = [
  {
    id: 'mat-1',
    name: 'Architectural Asphalt Shingles',
    category: 'Asphalt',
    lifespan: '25 – 30 Years',
    durability: 'High wind resistance up to 130 mph; Class 3 or 4 impact resistance available.',
    maintenance: 'Low maintenance; annual inspections and clearing leaf debris from roof valleys.',
    benefits: [
      'Most cost-effective solution for residential homeowners',
      'Rich dimensional shadow lines enhance curb appeal',
      'Available in dozens of earth tones and modern slate shades',
      'Excellent availability with fast installation turnaround',
    ],
    description: 'Composed of a resilient fiberglass mat base saturated with high-grade waterproof asphalt and coated with ceramic-coated mineral granules that deflect UV radiation and suppress algae growth.',
    image: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
    idealFor: 'Traditional Austin suburban homes, rental properties, and budget-conscious replacements.',
  },
  {
    id: 'mat-2',
    name: 'Standing Seam Metal Roofing',
    category: 'Metal',
    lifespan: '50 – 70 Years',
    durability: 'Extreme hail resistance (Class 4); non-combustible Class A fire rating; zero rotting or curling.',
    maintenance: 'Virtually zero maintenance. Concealed fasteners eliminate screw gasket failure.',
    benefits: [
      'Reflects intense Texas solar heat to slash summer electric bills by up to 25%',
      'Concealed fasteners allow free thermal expansion and contraction',
      'Sleek modern lines popular for Modern Farmhouse and Hill Country architecture',
      'Qualifies for maximum homeowner insurance premium discounts',
    ],
    description: 'Constructed from heavy 24-gauge Galvalume coated steel with interlocking vertical ribs. The seams rise 1.5 inches above the flat pan, shielding fasteners from driving rain and standing water.',
    image: '/src/assets/images/metal_standing_seam_roof_1791780546881.jpg',
    idealFor: 'Austin hill country luxury homes, modern builds, and homeowners seeking a permanent lifetime roof.',
  },
  {
    id: 'mat-3',
    name: 'Tile Roofing (Concrete & Spanish Clay)',
    category: 'Tile',
    lifespan: '50 – 100 Years',
    durability: 'Impervious to rot, insect damage, and extreme heat; heavyweight storm defense.',
    maintenance: 'Occasional pressure washing and underlayment replacement every 25-30 years.',
    benefits: [
      'Iconic Mediterranean and Spanish Colonial revival visual charm',
      'Natural air ventilation pocket beneath barrel tiles cools attic space',
      'Virtually indestructible against blistering sun and high thermal cycles',
      'Adds significant resale value to custom architectural properties',
    ],
    description: 'Kiln-fired natural clay or molded high-density concrete tiles laid over double-layer high-temperature waterproof membranes for authentic Southwestern distinction.',
    image: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
    idealFor: 'Southwestern, Mediterranean, and Spanish Colonial estates across Travis County.',
  },
  {
    id: 'mat-4',
    name: 'Single-Ply TPO Flat Roofing',
    category: 'Single-Ply Membrane',
    lifespan: '20 – 30 Years',
    durability: 'Heat-welded thermoplastic seams; highly resistant to chemical grease and punctures.',
    maintenance: 'Bi-annual drain strainer clearing and inspection of parapet perimeter flashing.',
    benefits: [
      'Brilliant white reflective surface reduces heat island effect',
      'Seamless hot-air weld is stronger than the membrane itself',
      'Flexible in freeze-thaw cycles without brittleness',
      'Lightweight installation that does not over-burden structural joists',
    ],
    description: 'Thermoplastic Polyolefin (TPO) combines ethylene propylene rubber with polypropylene polymer, creating an impenetrable waterproof shield for flat and low-pitch roofs.',
    image: '/src/assets/images/commercial_flat_roofing_1791780560405.jpg',
    idealFor: 'Commercial buildings, modern flat-roof residential additions, and commercial plazas.',
  },
  {
    id: 'mat-5',
    name: 'Designer Impact-Resistant Shingles',
    category: 'Asphalt Class 4',
    lifespan: '30 – 50 Years',
    durability: 'Highest UL 2218 Class 4 hail impact rating (withstands 2-inch steel ball dropped from 20 feet).',
    maintenance: 'Minimal; standard seasonal visual checks.',
    benefits: [
      'Qualifies for up to 25% annual discounts on Texas home insurance premiums',
      'SBS rubberized asphalt core absorbs hail blows without cracking',
      'High-definition profile looks comparable to genuine cedar shake or slate',
      'Peace of mind throughout peak Texas spring tornado and hail season',
    ],
    description: 'Infused with elastomeric SBS polymers, providing rubber-like resilience that flexes when hit by severe hailstones rather than shattering granule surfaces.',
    image: '/src/assets/images/roof_replacement_work_1791780533726.jpg',
    idealFor: 'Homeowners in hail-prone Central Texas corridors seeking premium insurance reductions.',
  },
];

const DEFAULT_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Complete Hail Restoration & Class 4 Shingle Upgrade',
    location: 'Westlake Hills, Austin, TX',
    category: 'Roof Replacement',
    beforeImage: '/src/assets/images/storm_damage_inspection_1791780571369.jpg',
    afterImage: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
    completionDate: 'March 2026',
    description: 'Following a baseball-sized hail event, we facilitated a 100% insurance approval for full replacement. Replaced 48 squares of damaged 3-tab shingles with premium CertainTeed Landmark Pro shingles in Max Def Charcoal, complete with ridge vent upgrade.',
  },
  {
    id: 'proj-2',
    title: 'Modern Standing Seam Metal Roof Conversion',
    location: 'Barton Creek, Austin, TX',
    category: 'Metal Roofing',
    beforeImage: '/src/assets/images/roof_replacement_work_1791780533726.jpg',
    afterImage: '/src/assets/images/metal_standing_seam_roof_1791780546881.jpg',
    completionDate: 'January 2026',
    description: 'Converted an aging 22-year-old shingle roof to a 24-gauge standing seam metal roof in Matte Black. Customer reported an immediate 22% reduction in summer electric bills.',
  },
  {
    id: 'proj-3',
    title: 'Commercial TPO Membrane Reroof on Medical Center',
    location: 'North Austin / The Domain, TX',
    category: 'Commercial Roofing',
    beforeImage: '/src/assets/images/roof_replacement_work_1791780533726.jpg',
    afterImage: '/src/assets/images/commercial_flat_roofing_1791780560405.jpg',
    completionDate: 'February 2026',
    description: 'Tore off failing multi-ply tar and gravel roof and installed 2.5-inch polyiso insulation boards followed by 60-mil Carlisle TPO membrane with complete parapet wall encapsulation.',
  },
  {
    id: 'proj-4',
    title: 'Emergency Storm Leak & Chimney Flashing Repair',
    location: 'Round Rock, TX',
    category: 'Roof Repair',
    beforeImage: '/src/assets/images/storm_damage_inspection_1791780571369.jpg',
    afterImage: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
    completionDate: 'November 2025',
    description: 'Diagnosed persistent living room ceiling leak caused by rusted through step-flashing around brick chimney. Replaced rotten decking, installed new custom bent copper step flashing, and color-matched replacement shingles.',
  },
  {
    id: 'proj-5',
    title: 'Storm Damage Assessment & Wind Claim Recovery',
    location: 'Cedar Park, TX',
    category: 'Storm Damage',
    beforeImage: '/src/assets/images/storm_damage_inspection_1791780571369.jpg',
    afterImage: '/src/assets/images/roof_replacement_work_1791780533726.jpg',
    completionDate: 'August 2025',
    description: 'High wind gusts unsealed 30% of the south-facing shingle slope. Provided detailed drone forensic report for State Farm adjuster, resulting in full roof replacement compensation.',
  },
  {
    id: 'proj-6',
    title: 'Architectural Shingle Reroof with Custom Gutters',
    location: 'Pflugerville, TX',
    category: 'Shingle Roofing',
    beforeImage: '/src/assets/images/roof_replacement_work_1791780533726.jpg',
    afterImage: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
    completionDate: 'July 2025',
    description: 'Complete 34-square architectural shingle install in Weathered Wood, accompanied by on-site extruded 6-inch bronze seamless aluminum gutters and leaf guard protection.',
  },
];

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'David & Karen M.',
    location: 'Westlake, Austin, TX',
    rating: 5,
    reviewText: 'After the big April hail storm, we had 5 different door-knockers stop by. Summit Pro Roofing was the only company that was thoroughly professional, patient, and licensed. They met the insurance adjuster in person on the roof, proved the damage, and had our entire new roof installed in one day. Not a single stray nail found in the yard!',
    date: 'February 18, 2026',
    serviceType: 'Roof Replacement & Storm Claim',
    approved: true,
    isSample: true,
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    location: 'Round Rock, TX',
    rating: 5,
    reviewText: 'We upgraded our 1990s ranch house to a black standing seam metal roof with Summit Pro. The craftsmanship is breathtaking. The crew was on time every morning at 7:30 AM and kept the driveway spotless. Neighbors have literally stopped their cars to ask who did our roof.',
    date: 'January 10, 2026',
    serviceType: 'Metal Roofing',
    approved: true,
    isSample: true,
  },
  {
    id: 'rev-3',
    author: 'Elena Rodriguez',
    location: 'South Congress, Austin, TX',
    rating: 5,
    reviewText: 'Woke up at 2:00 AM with water dripping through our nursery ceiling during a severe thunderstorm. Called Summit Pro\'s emergency number and a technician arrived within 50 minutes. He secured the tarp in the pouring rain, preventing thousands in drywall damage, and came back Friday for the permanent fix.',
    date: 'December 28, 2025',
    serviceType: 'Emergency Roof Repair',
    approved: true,
    isSample: true,
  },
  {
    id: 'rev-4',
    author: 'Robert Sterling',
    location: 'Cedar Park, TX',
    rating: 5,
    reviewText: 'Fair pricing, clear communication, and zero high-pressure sales gimmicks. The 7-step estimate gave me total clarity on what materials were being used and the warranty terms. They finished our 2,800 sq ft home in under 10 hours. Outstanding Texas company.',
    date: 'November 14, 2025',
    serviceType: 'Architectural Shingle Roofing',
    approved: true,
    isSample: true,
  },
  {
    id: 'rev-5',
    author: 'Angela Hoffman (Director, Lone Star Commercial Properties)',
    location: 'North Austin, TX',
    rating: 5,
    reviewText: 'We contracted Summit Pro Roofing for a 22,000 sq ft TPO overlay on our medical office plaza. They operated around our tenants\' clinic schedules without causing parking disruptions or noise complaints. Project came in on budget and on schedule.',
    date: 'October 3, 2025',
    serviceType: 'Commercial Flat Roofing',
    approved: true,
    isSample: true,
  },
];

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How much does a new roof cost in Austin, Texas?',
    answer: 'The average residential roof replacement in the Austin metro area ranges from $7,500 to $18,000 for architectural asphalt shingles, depending on home square footage, roof pitch, number of valleys, and accessibility. Standing seam metal roofs typically range from $16,000 to $35,000+ due to premium 50-year durability. We provide 100% free, itemized, no-obligation estimates with exact upfront pricing.',
    category: 'Cost & Pricing',
    order: 1,
  },
  {
    id: 'faq-2',
    question: 'How long does a typical roof replacement take?',
    answer: 'Most standard residential roof replacements (up to 3,500 square feet) are fully completed in just 1 to 2 days! Our crew arrives at 7:00 AM, protects your landscaping with heavy tarps, strips the old roof, replaces damaged decking, installs the new roofing system, and finishes with a comprehensive magnetic sweep for nails before leaving.',
    category: 'Process & Timing',
    order: 2,
  },
  {
    id: 'faq-3',
    question: 'Do you provide free estimates and roof inspections?',
    answer: 'Yes! All roof inspections and estimate quotes are 100% free with zero pressure. Our certified estimator inspects your roof surface, flashing, ventilation, and attic structure, providing you with high-resolution photographic proof and an honest recommendation.',
    category: 'Estimates',
    order: 3,
  },
  {
    id: 'faq-4',
    question: 'Are you fully licensed and insured in Texas?',
    answer: 'Yes. Summit Pro Roofing carries $2,000,000 in Commercial General Liability Insurance and full Worker\'s Compensation coverage for all crew members on your property. We are registered with the State of Texas and pull all mandatory municipal permits.',
    category: 'Credentials',
    order: 4,
  },
  {
    id: 'faq-5',
    question: 'Do you repair storm and hail damage?',
    answer: 'Yes, storm restoration is one of our primary specialties. Central Texas experiences frequent severe hail and windstorms. We perform forensic impact inspections, document the damage for your insurance carrier, and restore your roof to better-than-new condition.',
    category: 'Storm Damage',
    order: 5,
  },
  {
    id: 'faq-6',
    question: 'Do you work directly with my insurance company on claims?',
    answer: 'Yes. We guide you through the entire insurance claims process from start to finish. We meet your insurance adjuster on the roof in person during their inspection to verify every piece of hail and wind damage, and submit line-item estimates using Xactimate (the same software insurers use).',
    category: 'Insurance',
    order: 6,
  },
  {
    id: 'faq-7',
    question: 'What roofing materials do you install?',
    answer: 'We install premium architectural asphalt shingles (GAF, Owens Corning, CertainTeed), Class 4 impact-resistant shingles, 24/26-gauge standing seam metal roofing, Spanish clay and concrete tile, and commercial flat roof membranes (TPO, PVC, and Modified Bitumen).',
    category: 'Materials',
    order: 7,
  },
  {
    id: 'faq-8',
    question: 'What warranties do you offer on new roofs?',
    answer: 'Every full roof replacement comes with our 10-Year Summit Pro Workmanship Warranty covering all labor, leak prevention, and installation defects. In addition, our manufacturer material warranties provide 25-Year to Lifetime coverage (including 50-year non-prorated warranties on certified systems).',
    category: 'Warranties',
    order: 8,
  },
  {
    id: 'faq-9',
    question: 'Do you provide 24/7 emergency roofing services?',
    answer: 'Yes! Our emergency team is on call 24 hours a day, 7 days a week, 365 days a year. If a storm punctures your roof or water is entering your home, call (512) 555-0148 immediately for rapid emergency dispatch, water mitigation, and tarping.',
    category: 'Emergency',
    order: 9,
  },
  {
    id: 'faq-10',
    question: 'Which Central Texas cities and service areas do you cover?',
    answer: 'We serve the entire Greater Austin metropolitan area and surrounding Hill Country, including Austin, Round Rock, Cedar Park, Pflugerville, Georgetown, Leander, Kyle, Buda, Lakeway, Westlake Hills, and Bee Cave.',
    category: 'Service Areas',
    order: 10,
  },
];

const DEFAULT_SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'area-1',
    name: 'Austin',
    slug: 'austin',
    zipCodes: ['78701', '78702', '78704', '78745', '78746', '78759'],
    headline: 'Austin, TX Premier Roofing Contractor',
    description: 'Serving homeowners and commercial building owners across Central, South, and North Austin with high-performance roofing engineered for intense Texas heat and sudden hail storms.',
    landmarks: ['South Congress', 'Downtown Austin', 'Barton Creek', 'Zilker', 'Tarrytown'],
    phone: '(512) 555-0148',
    active: true,
  },
  {
    id: 'area-2',
    name: 'Round Rock',
    slug: 'round-rock',
    zipCodes: ['78664', '78665', '78681'],
    headline: 'Round Rock, TX Roof Replacement & Repair',
    description: 'Round Rock experiences severe storm fronts moving along the I-35 corridor. Our rapid-dispatch teams provide fast roof inspections, leak repairs, and full GAF shingle replacements.',
    landmarks: ['Old Town Round Rock', 'Dell Diamond area', 'Forest Creek', 'Teravista'],
    phone: '(512) 555-0148',
    active: true,
  },
  {
    id: 'area-3',
    name: 'Cedar Park',
    slug: 'cedar-park',
    zipCodes: ['78613', '78630'],
    headline: 'Cedar Park, TX Trusted Roofing Experts',
    description: 'Delivering Class 4 impact-resistant shingles and energy-saving standing seam metal roofs to protect Cedar Park family homes against Texas hail and high winds.',
    landmarks: ['Lakeline', 'Twin Lakes', 'Buttercup Creek', 'Ranch at Cypress Creek'],
    phone: '(512) 555-0148',
    active: true,
  },
  {
    id: 'area-4',
    name: 'Pflugerville',
    slug: 'pflugerville',
    zipCodes: ['78660', '78691'],
    headline: 'Pflugerville, TX Residential & Commercial Roofing',
    description: 'From classic single-family homes near Lake Pflugerville to growing commercial facilities along SH-130, Summit Pro Roofing provides dependable roofing with 10-year workmanship warranties.',
    landmarks: ['Lake Pflugerville', 'Blackhawk', 'Falcon Pointe', 'Highland Park'],
    phone: '(512) 555-0148',
    active: true,
  },
  {
    id: 'area-5',
    name: 'Georgetown',
    slug: 'georgetown',
    zipCodes: ['78626', '78628', '78633'],
    headline: 'Georgetown, TX Historic & Modern Roofing Specialists',
    description: 'Specializing in historical aesthetic preservation for historic Georgetown squares as well as modern architectural shingle and metal installations in Sun City and Berry Creek.',
    landmarks: ['Georgetown Historic Square', 'Sun City', 'Berry Creek', 'San Gabriel River'],
    phone: '(512) 555-0148',
    active: true,
  },
  {
    id: 'area-6',
    name: 'Leander',
    slug: 'leander',
    zipCodes: ['78641', '78645', '78646'],
    headline: 'Leander, TX High-Quality Roofing Solutions',
    description: 'As one of Central Texas\' fastest-growing communities, Leander homeowners count on Summit Pro Roofing for reliable roof installations, storm recovery, and gutter protection.',
    landmarks: ['Crystal Falls', 'Travisso', 'Block House Creek', 'Horizon Park'],
    phone: '(512) 555-0148',
    active: true,
  },
  {
    id: 'area-7',
    name: 'Kyle',
    slug: 'kyle',
    zipCodes: ['78640'],
    headline: 'Kyle, TX Storm Damage & Roof Repair Services',
    description: 'Providing Hays County homeowners with fast emergency tarping, insurance claims assistance, and durable shingle replacements built to resist South Texas heat waves.',
    landmarks: ['Plum Creek', 'Waterleaf', 'Amberwood', 'Cool Springs'],
    phone: '(512) 555-0148',
    active: true,
  },
  {
    id: 'area-8',
    name: 'Buda',
    slug: 'buda',
    zipCodes: ['78610'],
    headline: 'Buda, TX Residential Roof Replacement Contractors',
    description: 'Honest, neighborly roofing services for Buda families. We offer free 21-point roof inspections, insurance claim advocacy, and flexible financing with low monthly payments.',
    landmarks: ['Downtown Buda', 'Sunfield', 'Bradfield Village', 'Whisper Meadows'],
    phone: '(512) 555-0148',
    active: true,
  },
];

const DEFAULT_LEADS: Lead[] = [
  {
    id: 'lead-101',
    name: 'Michael Richardson',
    phone: '(512) 555-8921',
    email: 'm.richardson@gmail.com',
    address: '4902 Shoal Creek Blvd',
    city: 'Austin',
    service: 'Roof Replacement',
    message: 'We bought a 1978 ranch home and the shingle granules are completely worn down. Looking for an estimate on architectural shingles and possibly metal accents.',
    status: 'Estimate Scheduled',
    notes: [
      {
        id: 'note-1',
        date: '2026-10-09 14:30',
        text: 'Spoke with Michael. Scheduled on-site drone inspection for Thursday at 10:00 AM.',
        author: 'Admin',
      },
    ],
    createdAt: '2026-10-09T14:15:00Z',
  },
  {
    id: 'lead-102',
    name: 'Sarah Jennings',
    phone: '(512) 555-4309',
    email: 'sarah.jennings@austintx.net',
    address: '1104 Falcon Pointe Way',
    city: 'Pflugerville',
    service: 'Storm Damage',
    message: 'Recent hail storm knocked off several shingles on the west roof plane. There is a small damp spot in our master bedroom ceiling.',
    status: 'New',
    notes: [],
    createdAt: '2026-10-11T09:40:00Z',
  },
  {
    id: 'lead-103',
    name: 'Austin Dental Group (Dr. Pham)',
    phone: '(512) 555-7712',
    email: 'office@austindentalcare.com',
    address: '8801 Research Blvd',
    city: 'Austin',
    service: 'Commercial Roofing',
    message: 'Single-story medical clinic needs TPO flat roof replacement. Approximate area is 6,500 sq ft. Need work done during weekend to avoid clinic disruption.',
    status: 'Contacted',
    notes: [
      {
        id: 'note-2',
        date: '2026-10-10 11:00',
        text: 'Left voicemail with office manager to coordinate building access and roof ladder specs.',
        author: 'Admin',
      },
    ],
    createdAt: '2026-10-10T10:20:00Z',
  },
];

const DEFAULT_ESTIMATES: EstimateRequest[] = [
  {
    id: 'est-201',
    name: 'Gregory Bennett',
    phone: '(512) 555-6677',
    email: 'gregory.b@outlook.com',
    address: '7412 Spicewood Springs Rd',
    city: 'Austin',
    zip: '78759',
    propertyType: 'Residential',
    serviceNeeded: 'Roof Replacement',
    photos: ['/src/assets/images/hero_summit_roofing_1791780518538.jpg'],
    contactMethod: 'Phone',
    preferredDate: '2026-10-15',
    status: 'Inspection Scheduled',
    estimateAmount: 14850,
    internalNotes: '2-story home, approximately 36 squares. Steep pitch (8/12). Needs synthetic underlayment and drip edge upgrade.',
    createdAt: '2026-10-08T16:22:00Z',
  },
  {
    id: 'est-202',
    name: 'Clarissa Montgomery',
    phone: '(512) 555-3341',
    email: 'clarissa.mont@gmail.com',
    address: '2214 Sunfield Meadows Dr',
    city: 'Buda',
    zip: '78610',
    propertyType: 'Residential',
    serviceNeeded: 'Storm Damage',
    photos: ['/src/assets/images/storm_damage_inspection_1791780571369.jpg'],
    contactMethod: 'SMS',
    preferredDate: '2026-10-14',
    status: 'New',
    internalNotes: 'Insurance company is USAA. Adjuster appointment is not scheduled yet; homeowner wants us on-site when adjuster inspects.',
    createdAt: '2026-10-11T12:05:00Z',
  },
];

// Helper to get / set typed localStorage
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// Database Initialization
export async function initializeDatabase(): Promise<void> {
  if (!localStorage.getItem(KEYS.SETTINGS)) {
    setItem(KEYS.SETTINGS, DEFAULT_SETTINGS);
  }
  if (!localStorage.getItem(KEYS.SERVICES)) {
    setItem(KEYS.SERVICES, DEFAULT_SERVICES);
  }
  if (!localStorage.getItem(KEYS.PROJECTS)) {
    setItem(KEYS.PROJECTS, DEFAULT_PROJECTS);
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    setItem(KEYS.REVIEWS, DEFAULT_REVIEWS);
  }
  if (!localStorage.getItem(KEYS.FAQS)) {
    setItem(KEYS.FAQS, DEFAULT_FAQS);
  }
  if (!localStorage.getItem(KEYS.SERVICE_AREAS)) {
    setItem(KEYS.SERVICE_AREAS, DEFAULT_SERVICE_AREAS);
  }
  if (!localStorage.getItem(KEYS.LEADS)) {
    setItem(KEYS.LEADS, DEFAULT_LEADS);
  }
  if (!localStorage.getItem(KEYS.ESTIMATES)) {
    setItem(KEYS.ESTIMATES, DEFAULT_ESTIMATES);
  }

  // Admin user initialization
  if (!localStorage.getItem(KEYS.ADMIN)) {
    const { hashHex, saltHex } = await hashPassword('SummitRoof2026!');
    const adminUser: AdminUser = {
      id: 'admin-1',
      name: 'James Reynolds',
      email: 'admin@summitproroofing.com',
      passwordHash: hashHex,
      passwordSalt: saltHex,
      role: 'superadmin',
    };
    setItem(KEYS.ADMIN, adminUser);
  }
}

// Settings API
export function getSettings(): WebsiteSettings {
  return getItem<WebsiteSettings>(KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export function updateSettings(updates: Partial<WebsiteSettings>): WebsiteSettings {
  const current = getSettings();
  const merged = { ...current, ...updates };
  setItem(KEYS.SETTINGS, merged);
  return merged;
}

// Leads API
export function getLeads(): Lead[] {
  return getItem<Lead[]>(KEYS.LEADS, DEFAULT_LEADS);
}

export function addLead(
  data: Omit<Lead, 'id' | 'createdAt' | 'status' | 'notes'>
): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    ...data,
    id: `lead-${Date.now()}`,
    status: 'New',
    notes: [],
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  setItem(KEYS.LEADS, leads);
  return newLead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], ...updates };
  setItem(KEYS.LEADS, leads);
  return leads[idx];
}

export function addLeadNote(id: string, text: string, author = 'Admin'): Lead | null {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx].notes.push({
    id: `note-${Date.now()}`,
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    text,
    author,
  });
  setItem(KEYS.LEADS, leads);
  return leads[idx];
}

export function deleteLead(id: string): boolean {
  const leads = getLeads().filter((l) => l.id !== id);
  setItem(KEYS.LEADS, leads);
  return true;
}

// Estimates API
export function getEstimates(): EstimateRequest[] {
  return getItem<EstimateRequest[]>(KEYS.ESTIMATES, DEFAULT_ESTIMATES);
}

export function addEstimate(
  data: Omit<EstimateRequest, 'id' | 'createdAt' | 'status' | 'internalNotes'>
): EstimateRequest {
  const estimates = getEstimates();
  const newEstimate: EstimateRequest = {
    ...data,
    id: `est-${Date.now()}`,
    status: 'New',
    internalNotes: '',
    createdAt: new Date().toISOString(),
  };
  estimates.unshift(newEstimate);
  setItem(KEYS.ESTIMATES, estimates);
  return newEstimate;
}

export function updateEstimate(
  id: string,
  updates: Partial<EstimateRequest>
): EstimateRequest | null {
  const estimates = getEstimates();
  const idx = estimates.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  estimates[idx] = { ...estimates[idx], ...updates };
  setItem(KEYS.ESTIMATES, estimates);
  return estimates[idx];
}

export function deleteEstimate(id: string): boolean {
  const estimates = getEstimates().filter((e) => e.id !== id);
  setItem(KEYS.ESTIMATES, estimates);
  return true;
}

// Services API
export function getServices(): ServiceItem[] {
  return getItem<ServiceItem[]>(KEYS.SERVICES, DEFAULT_SERVICES);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return getServices().find((s) => s.slug === slug);
}

export function saveService(service: ServiceItem): ServiceItem {
  const services = getServices();
  const idx = services.findIndex((s) => s.id === service.id);
  if (idx >= 0) {
    services[idx] = service;
  } else {
    services.push(service);
  }
  setItem(KEYS.SERVICES, services);
  return service;
}

export function deleteService(id: string): boolean {
  const services = getServices().filter((s) => s.id !== id);
  setItem(KEYS.SERVICES, services);
  return true;
}

// Gallery Projects API
export function getProjects(): GalleryProject[] {
  return getItem<GalleryProject[]>(KEYS.PROJECTS, DEFAULT_PROJECTS);
}

export function saveProject(project: GalleryProject): GalleryProject {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.unshift(project);
  }
  setItem(KEYS.PROJECTS, projects);
  return project;
}

export function deleteProject(id: string): boolean {
  const projects = getProjects().filter((p) => p.id !== id);
  setItem(KEYS.PROJECTS, projects);
  return true;
}

// Reviews API
export function getReviews(onlyApproved = true): ReviewItem[] {
  const reviews = getItem<ReviewItem[]>(KEYS.REVIEWS, DEFAULT_REVIEWS);
  return onlyApproved ? reviews.filter((r) => r.approved) : reviews;
}

export function submitReview(
  data: Omit<ReviewItem, 'id' | 'date' | 'approved' | 'isSample'>
): ReviewItem {
  const reviews = getItem<ReviewItem[]>(KEYS.REVIEWS, DEFAULT_REVIEWS);
  const newReview: ReviewItem = {
    ...data,
    id: `rev-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    approved: false, // Moderated by default
    isSample: false,
  };
  reviews.unshift(newReview);
  setItem(KEYS.REVIEWS, reviews);
  return newReview;
}

export function moderateReview(id: string, updates: Partial<ReviewItem>): ReviewItem | null {
  const reviews = getItem<ReviewItem[]>(KEYS.REVIEWS, DEFAULT_REVIEWS);
  const idx = reviews.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  reviews[idx] = { ...reviews[idx], ...updates };
  setItem(KEYS.REVIEWS, reviews);
  return reviews[idx];
}

export function deleteReview(id: string): boolean {
  const reviews = getItem<ReviewItem[]>(KEYS.REVIEWS, DEFAULT_REVIEWS).filter((r) => r.id !== id);
  setItem(KEYS.REVIEWS, reviews);
  return true;
}

// FAQs API
export function getFAQs(): FAQItem[] {
  return getItem<FAQItem[]>(KEYS.FAQS, DEFAULT_FAQS).sort((a, b) => a.order - b.order);
}

export function saveFAQ(faq: FAQItem): FAQItem {
  const faqs = getItem<FAQItem[]>(KEYS.FAQS, DEFAULT_FAQS);
  const idx = faqs.findIndex((f) => f.id === faq.id);
  if (idx >= 0) {
    faqs[idx] = faq;
  } else {
    faqs.push(faq);
  }
  setItem(KEYS.FAQS, faqs);
  return faq;
}

export function deleteFAQ(id: string): boolean {
  const faqs = getItem<FAQItem[]>(KEYS.FAQS, DEFAULT_FAQS).filter((f) => f.id !== id);
  setItem(KEYS.FAQS, faqs);
  return true;
}

// Service Areas API
export function getServiceAreas(): ServiceArea[] {
  return getItem<ServiceArea[]>(KEYS.SERVICE_AREAS, DEFAULT_SERVICE_AREAS);
}

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return getServiceAreas().find((a) => a.slug === slug);
}

export function saveServiceArea(area: ServiceArea): ServiceArea {
  const areas = getServiceAreas();
  const idx = areas.findIndex((a) => a.id === area.id);
  if (idx >= 0) {
    areas[idx] = area;
  } else {
    areas.push(area);
  }
  setItem(KEYS.SERVICE_AREAS, areas);
  return area;
}

export function deleteServiceArea(id: string): boolean {
  const areas = getServiceAreas().filter((a) => a.id !== id);
  setItem(KEYS.SERVICE_AREAS, areas);
  return true;
}

// Admin Authentication API
export function getAdminUser(): AdminUser {
  return getItem<AdminUser>(KEYS.ADMIN, {
    id: 'admin-1',
    name: 'James Reynolds',
    email: 'admin@summitproroofing.com',
    passwordHash: '',
    passwordSalt: '',
    role: 'superadmin',
  });
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  const admin = getAdminUser();
  if (email.trim().toLowerCase() !== admin.email.toLowerCase()) {
    return { success: false, error: 'Invalid email address or credentials.' };
  }

  // If passwordHash is empty (not initialized yet), initialize first
  if (!admin.passwordHash) {
    await initializeDatabase();
  }

  const refreshedAdmin = getAdminUser();
  const isValid = await verifyPassword(password, refreshedAdmin.passwordHash, refreshedAdmin.passwordSalt);
  if (!isValid) {
    return { success: false, error: 'Incorrect password.' };
  }

  // Generate session token
  const token = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  sessionStorage.setItem(KEYS.AUTH_SESSION, token);
  return { success: true, token };
}

export function isAdminAuthenticated(): boolean {
  return !!sessionStorage.getItem(KEYS.AUTH_SESSION);
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(KEYS.AUTH_SESSION);
}

export async function changeAdminPassword(
  currentPass: string,
  newPass: string,
  confirmPass: string
): Promise<{ success: boolean; error?: string }> {
  if (newPass !== confirmPass) {
    return { success: false, error: 'New password and confirmation do not match.' };
  }
  if (newPass.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(newPass) || !/[a-z]/.test(newPass) || !/[0-9]/.test(newPass)) {
    return {
      success: false,
      error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
    };
  }

  const admin = getAdminUser();
  const isCurrentValid = await verifyPassword(currentPass, admin.passwordHash, admin.passwordSalt);
  if (!isCurrentValid) {
    return { success: false, error: 'Current password is not correct.' };
  }

  const { hashHex, saltHex } = await hashPassword(newPass);
  admin.passwordHash = hashHex;
  admin.passwordSalt = saltHex;
  setItem(KEYS.ADMIN, admin);
  return { success: true };
}

export function updateAdminProfile(name: string, email: string, profileImage?: string): AdminUser {
  const admin = getAdminUser();
  admin.name = name;
  admin.email = email;
  if (profileImage !== undefined) {
    admin.profileImage = profileImage;
  }
  setItem(KEYS.ADMIN, admin);
  return admin;
}

// Reset Demo State
export async function resetToDemoData(): Promise<void> {
  const { hashHex, saltHex } = await hashPassword('SummitRoof2026!');
  const adminUser: AdminUser = {
    id: 'admin-1',
    name: 'James Reynolds',
    email: 'admin@summitproroofing.com',
    passwordHash: hashHex,
    passwordSalt: saltHex,
    role: 'superadmin',
  };
  setItem(KEYS.SETTINGS, DEFAULT_SETTINGS);
  setItem(KEYS.SERVICES, DEFAULT_SERVICES);
  setItem(KEYS.PROJECTS, DEFAULT_PROJECTS);
  setItem(KEYS.REVIEWS, DEFAULT_REVIEWS);
  setItem(KEYS.FAQS, DEFAULT_FAQS);
  setItem(KEYS.SERVICE_AREAS, DEFAULT_SERVICE_AREAS);
  setItem(KEYS.LEADS, DEFAULT_LEADS);
  setItem(KEYS.ESTIMATES, DEFAULT_ESTIMATES);
  setItem(KEYS.ADMIN, adminUser);
}
