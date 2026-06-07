// File: src/app/data/seed-updates.ts

export interface UpdateEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  category: 'feature' | 'bugfix' | 'balance' | 'infrastructure';
  tags?: string[];
  featured?: boolean;
}

export const UPDATES: UpdateEntry[] = [
  // ── June 2026 ──
  {
    id: 'update-030',
    date: '2026-06-07',
    title: 'Delta Patching System Deployed',
    body: 'The launcher now employs binary delta patching for game updates. Instead of re-downloading entire asset archives, the system transmits only the changed bytes between builds. A typical update that previously required a 4 GB transfer now completes with roughly 100 MB. The patch infrastructure generates and caches deltas server-side during each CI build, and the launcher applies them locally with full hash verification.',
    category: 'infrastructure',
    featured: true,
    tags: ['launcher', 'patching', 'performance']
  },
  // ── May 2026 ──
  {
    id: 'update-029',
    date: '2026-05-04',
    title: 'City Management System Online',
    body: 'A full city simulation is now operational across all colonized worlds. Cities progress through three tiers with population caps scaling from 10M to 300M settlers. Seven weighted happiness factors — employment, food, healthcare, security, entertainment, education, and religion — drive population growth and tax revenue. Constructible buildings include City Halls, Apartment Blocks, Clinics, Factories, and Workshops. Food consumption now uses a catchup model, eliminating the warehouse drain that plagued offline commanders.',
    category: 'feature',
    featured: true,
    tags: ['cities', 'economy', 'gameplay']
  },
  {
    id: 'update-028',
    date: '2026-05-04',
    title: 'Resource Refining Pipeline Activated',
    body: '16 refined materials are now producible across 5 tech tiers: from basic Steel Plates and Copper Wire at T2, through Advanced Alloys and Reactor Rods at T4, up to Nano Composite and Cryo Crystal at T7. Location bonuses reward strategic placement — refining Cryo Coolant on an Ice planet yields higher output. Jobs run in the background and integrate into the Production Panel alongside ship building.',
    category: 'feature',
    tags: ['resources', 'crafting', 'economy']
  },
  {
    id: 'update-027',
    date: '2026-05-01',
    title: 'Scout Exploration Vessels Commissioned',
    body: 'Four DR-class scout ships are now available for deep-space reconnaissance. Scouts deploy tiered probes that reveal resource deposit data with accuracy scaling by probe tier. Scan results decay over time and can be traded on the VIX marketplace. Route marking on arrival allows other ships to follow charted paths into uncharted territory.',
    category: 'feature',
    tags: ['exploration', 'ships', 'gameplay']
  },
  {
    id: 'update-026',
    date: '2026-04-28',
    title: 'VIX Marketplace V2 Operational',
    body: 'The Virtual Item Exchange has been rebuilt from the ground up. A new listing wizard, proxy bidding with anti-snipe timers, escrow-secured transactions, and automated ship delivery via autopilot transit to the nearest Imperial Station. Seller profiles now track reputation and ratings. Watchlists, market history, bundle listings, and a direct Voran Shop round out the overhaul.',
    category: 'feature',
    featured: true,
    tags: ['vix', 'economy', 'trading']
  },
  {
    id: 'update-025',
    date: '2026-04-20',
    title: 'Wreckage Fields Detected Across Contested Sectors',
    body: 'Destroyed ships now leave salvageable wreckage in the game world. Sixteen unique debris variants scatter across the battlefield after engagements, available for salvage operations. Server-side tracking ensures wreckage persists and is cleaned up over time.',
    category: 'feature',
    tags: ['combat', 'salvage', 'gameplay']
  },
  {
    id: 'update-024',
    date: '2026-04-15',
    title: 'Bezier Curve Navigation Overhaul',
    body: 'Ship movement has been completely rewritten. Vessels now follow smooth S-curve flight paths with per-unit physics — unique acceleration, deceleration, and turn parameters for each ship class. Flight arcs add vertical cinematic flair to travel. Mid-flight redirects preserve current velocity, and an alignment gate prevents large capital ships from visually sliding backwards during deceleration.',
    category: 'feature',
    tags: ['movement', 'ships', 'visual']
  },
  // ── April 2026 ──
  {
    id: 'update-023',
    date: '2026-04-09',
    title: 'Planet Terrain Generation V2',
    body: 'Every planet type has received a terrain generation overhaul. Mountain worlds now feature hydraulic erosion and domain-warped peaks. Oceanic planets have proper island beaches with cosine falloff. Lava worlds spawn cone volcanoes and pond-shaped lava lakes. Ice planets have organic crevasses and frozen lake outlines. All planet types enforce a smooth, flat, buildable center zone for base construction.',
    category: 'feature',
    tags: ['planets', 'terrain', 'visual']
  },
  {
    id: 'update-022',
    date: '2026-04-09',
    title: 'Docking and Undocking Rework',
    body: 'Ships now dock and undock one at a time in formation with visible curved flight paths and correct facing. Animation speed scales with each ship\'s engine rating. Imperial Stations enforce per-player docking caps of 30 ships, preventing capacity monopolization. A critical docking queue stall bug that could permanently block incoming ships has been resolved.',
    category: 'bugfix',
    tags: ['docking', 'ships', 'stations']
  },
  {
    id: 'update-021',
    date: '2026-04-09',
    title: 'Player Profiles and Diplomacy',
    body: 'Commanders can now view detailed profiles of any guild member or rival — showing account creation date, combat statistics with formatted K/M/B/T numbers, and an editable 500-character bio. Guild history tracking is now persistent. A new Declare War button with confirmation modal and a Ceasefire negotiation page enable formal diplomacy between guilds and solo players.',
    category: 'feature',
    tags: ['social', 'guilds', 'diplomacy']
  },
  {
    id: 'update-020',
    date: '2026-04-03',
    title: 'Galaxy Expanded to 1.2 Million Systems',
    body: 'The galaxy has been rebuilt from the ground up. Solar system count has doubled from 600K to 1.2M, with planets scaling from 3M to 6.7M. New named sectors with full lore — Rho, Sigma, Tau and more — define the political geography. Solar system grids expanded 20x from 400x400 to 8000x8000. Updated starter systems provide new commanders with better initial positioning.',
    category: 'feature',
    featured: true,
    tags: ['galaxy', 'exploration', 'worldbuilding']
  },
  {
    id: 'update-019',
    date: '2026-04-03',
    title: 'Ice and Lava Worlds Discovered',
    body: 'Two new planet types have been catalogued. Ice planets feature frozen terrain with glacial ridges, crevasses, ice sheets, and snowfall weather effects. Lava planets present volcanic terrain with craters and active lava flows. Four new raw resources — Glacium, Voltherium, Obsidian, and Permafrost — are exclusive to these extreme environments.',
    category: 'feature',
    tags: ['planets', 'resources', 'exploration']
  },
  // ── March 2026 ──
  {
    id: 'update-018',
    date: '2026-03-18',
    title: 'Launcher System Deployed',
    body: 'A dedicated game launcher is now live, replacing direct executable distribution. The launcher features manifest-based patching that compares file hashes and downloads only changed files, a self-update system, and a proper Windows installer with desktop shortcut. Game sessions now require launch through the launcher for version integrity.',
    category: 'infrastructure',
    tags: ['launcher', 'distribution', 'installer']
  },
  {
    id: 'update-017',
    date: '2026-03-11',
    title: 'Server-Side Caching Layer Deployed',
    body: 'A smart caching system now sits between the game server and the database. Weapon stats, armor values, ship templates, and frequently accessed data are loaded into memory at startup. Building, mining, combat, and docking all respond faster. If the cache encounters any issue, it falls back to direct database queries with zero interruption. Planet terrain data is also cached locally on each player\'s machine, with the last 10 visited planets loading instantly on return.',
    category: 'infrastructure',
    tags: ['performance', 'backend', 'caching']
  },
  {
    id: 'update-016',
    date: '2026-03-11',
    title: 'Build Grid Overhaul',
    body: 'The construction grid system has been completely rebuilt. Grid complexity dropped from 320K triangles to 2 with a 16x memory reduction for the buildability map. Only changed cells refresh instead of the entire grid. Anti-aliasing on grid lines eliminates shimmer at distance. Space and planet build grids are now unified into a single system with a clean Idle/Selecting/Placing state machine.',
    category: 'infrastructure',
    tags: ['building', 'performance', 'ui']
  },
  {
    id: 'update-015',
    date: '2026-03-07',
    title: 'Unit HP, Shield, and Cost Rebalance',
    body: 'Every unit in the game has received recalculated HP and Shield values based on a new Defense Budget system. Small fighters are shield-reliant with thin hulls. Capital ships have thick armor and massive structural integrity. Structures are 5x tankier than equivalent ships. All construction costs have been rebuilt using budget-based resource distribution with tier-gated materials — T1 units need only basics, while T7 demands exotic alloys. Crew requirements now scale with unit complexity, directly linking your civilian infrastructure to military capacity.',
    category: 'balance',
    featured: true,
    tags: ['combat', 'economy', 'ships', 'balance']
  },
  {
    id: 'update-014',
    date: '2026-03-03',
    title: 'Localization: 8 Languages Supported',
    body: 'Full multi-language support has been added across all major UI panels. English, French, German, Spanish, Portuguese, Japanese, Korean, and Chinese are now available. Settings, Registration, Social, Inventory, Fleet Dashboard, and Menu panels are fully localized with language persistence across sessions.',
    category: 'feature',
    tags: ['localization', 'ui', 'accessibility']
  },
  {
    id: 'update-013',
    date: '2026-03-03',
    title: 'Combat Fluidity Improvements',
    body: 'Ships now visually glide to new positions during battle instead of teleporting. Weapon fire rendering has been expanded so large engagements show far more projectiles on screen. Attack orders persist through movement — ships fight nearby enemies en route and lock back onto the designated target once in range. Retreating properly cancels attack commands, and armed stations are now prioritized by the targeting system.',
    category: 'bugfix',
    tags: ['combat', 'visual', 'targeting']
  },
  {
    id: 'update-012',
    date: '2026-03-03',
    title: 'MessagePack Binary Protocol',
    body: 'The network layer has been upgraded from JSON to MessagePack binary serialization for all real-time game communications. This delivers a major reduction in payload size and parsing overhead, resulting in smoother gameplay especially in large battles and crowded systems. Frame rates, health bar updates, and camera movement are all more responsive.',
    category: 'infrastructure',
    tags: ['networking', 'performance', 'backend']
  },
  // ── Pre-March (existing entries kept for history) ──
  {
    id: 'update-011',
    date: '2025-12-11',
    title: 'First Engagement Logged by the Battle Management Core',
    body: 'For the first time since its activation, the Battle Management Core assumed full oversight of a live combat engagement. Fleet movements, weapons fire, damage resolution, and command state were synchronized across multiple command relays without degradation. Analysts confirm this marks a turning point: battles are no longer isolated skirmishes, but coordinated system-wide events governed by a unified combat authority.',
    category: 'infrastructure',
    featured: false,
    tags: ['combat', 'backend', 'milestone']
  },
  {
    id: 'update-001',
    date: '2025-12-10',
    title: 'Winter Accord Ratified: New Orbital Stations Deployed',
    body: 'Following months of political maneuvering and industrial buildup, the Winter Accord has been ratified. Five new classes of orbital stations are now operational, including Research Outposts, Resource Refineries, and Military Fortifications. These structures formalize long-term territorial control, allowing factions to project influence, accelerate research, and lock down strategic regions of space.',
    category: 'feature',
    tags: ['stations', 'infrastructure', 'gameplay']
  },
  {
    id: 'update-002',
    date: '2025-12-08',
    title: 'Navigational Anomaly Resolved in Asteroid Belts',
    body: 'Exploration logs revealed a recurring navigational anomaly within tightly packed asteroid corridors. Automated routing systems occasionally failed to resolve viable paths, leaving ships adrift in hostile environments. Updated pathfinding logic now accounts for extreme spatial density, restoring safe passage through some of the galaxy\'s most dangerous mining zones.',
    category: 'bugfix',
    tags: ['gameplay', 'ai', 'performance']
  },
  {
    id: 'update-003',
    date: '2025-12-05',
    title: 'Mining Guild Recalibration Directive Issued',
    body: 'The Galactic Mining Guild has issued a recalibration directive in response to widening economic imbalances. Tier 2 facilities now extract resources more efficiently to support early expansion, while Tier 3 operations have been throttled to prevent runaway industrial dominance. Economists expect steadier growth and fewer resource monopolies as a result.',
    category: 'balance',
    tags: ['economy', 'facilities', 'progression']
  },
  {
    id: 'update-004',
    date: '2025-12-01',
    title: 'Galactic Infrastructure Uplift Completed',
    body: 'Behind the scenes, the galaxy\'s core systems have undergone a major infrastructure uplift. New server clusters and optimized data pipelines now support up to 50,000 concurrent pilots. Strategic database refinements reduced response latency by 40%, reinforcing stability as population density continues to rise across contested regions.',
    category: 'infrastructure',
    tags: ['performance', 'backend', 'stability']
  },
  {
    id: 'update-005',
    date: '2025-11-25',
    title: 'Explorer-Class Hulls Commissioned',
    body: 'Shipyards across the frontier have begun rolling out Explorer-class hulls designed for deep-space operations. These vessels sacrifice raw firepower in favor of advanced sensor suites and fuel-efficient drives, enabling commanders to chart unclaimed systems, locate anomalies, and establish footholds far beyond the reach of established trade lanes.',
    category: 'feature',
    tags: ['ships', 'exploration', 'gameplay']
  },
  {
    id: 'update-006',
    date: '2025-11-20',
    title: 'Combat Doctrine Adjustments Issued',
    body: 'Recent fleet engagements exposed inefficiencies in existing combat doctrine. In response, weapons and shield systems have been retuned. Heavy weapons now strike harder to punish overextended targets, while light shields regenerate more rapidly, rewarding maneuver warfare and sustained engagements over alpha strikes alone.',
    category: 'balance',
    tags: ['combat', 'weapons', 'shields']
  },
  {
    id: 'update-007',
    date: '2025-11-15',
    title: 'Interstellar Trade Network Reforged',
    body: 'The Interstellar Trade Network has been completely overhauled. Commanders now operate with real-time market intelligence, advanced commodity filters, and predictive trade route analysis. Economic warfare is no longer guesswork — those who read the data fastest will dominate the flow of credits and resources.',
    category: 'feature',
    tags: ['trading', 'economy', 'ui']
  },
  {
    id: 'update-008',
    date: '2025-11-10',
    title: 'Cargo Duplication Exploit Sealed',
    body: 'Investigators uncovered a severe cargo replication exploit that threatened the stability of the galactic economy. The breach has been sealed, affected inventories audited, and illicit gains removed. Trade authorities reaffirm that economic manipulation at this scale will not be tolerated.',
    category: 'bugfix',
    tags: ['economy', 'security', 'inventory']
  },
  {
    id: 'update-009',
    date: '2025-11-05',
    title: 'API Latency Reduction Initiative Complete',
    body: 'Core data services have completed a latency reduction initiative focused on high-frequency access paths. Through query optimization and strategic caching, average response times have dropped from 180ms to 45ms. The result is faster fleet updates, smoother UI feedback, and more responsive command execution across the galaxy.',
    category: 'infrastructure',
    tags: ['performance', 'backend', 'api']
  },
  {
    id: 'update-010',
    date: '2025-10-28',
    title: 'Spectral Contacts Detected: Ghost Ships Event',
    body: 'Long-range sensors have detected derelict vessels drifting through contested systems — ships with no registry, no crew, and no clear origin. Salvage teams report rare materials and unstable anomalies aboard these ghost ships. The phenomenon is temporary, but its origins remain unexplained.',
    category: 'feature',
    tags: ['events', 'gameplay', 'loot']
  }
];
