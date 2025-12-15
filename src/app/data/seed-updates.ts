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
  {
    id: 'update-011',
    date: '2025-12-11',
    title: 'First Engagement Logged by the Battle Management Core',
    body: 'For the first time since its activation, the Battle Management Core assumed full oversight of a live combat engagement. Fleet movements, weapons fire, damage resolution, and command state were synchronized across multiple command relays without degradation. Analysts confirm this marks a turning point: battles are no longer isolated skirmishes, but coordinated system-wide events governed by a unified combat authority.',
    category: 'infrastructure',
    featured: true,
    tags: ['combat', 'backend', 'milestone']
  },
  {
    id: 'update-001',
    date: '2025-12-10',
    title: 'Winter Accord Ratified: New Orbital Stations Deployed',
    body: 'Following months of political maneuvering and industrial buildup, the Winter Accord has been ratified. Five new classes of orbital stations are now operational, including Research Outposts, Resource Refineries, and Military Fortifications. These structures formalize long-term territorial control, allowing factions to project influence, accelerate research, and lock down strategic regions of space.',
    category: 'feature',
    featured: true,
    tags: ['stations', 'infrastructure', 'gameplay']
  },
  {
    id: 'update-002',
    date: '2025-12-08',
    title: 'Navigational Anomaly Resolved in Asteroid Belts',
    body: 'Exploration logs revealed a recurring navigational anomaly within tightly packed asteroid corridors. Automated routing systems occasionally failed to resolve viable paths, leaving ships adrift in hostile environments. Updated pathfinding logic now accounts for extreme spatial density, restoring safe passage through some of the galaxy’s most dangerous mining zones.',
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
    body: 'Behind the scenes, the galaxy’s core systems have undergone a major infrastructure uplift. New server clusters and optimized data pipelines now support up to 50,000 concurrent pilots. Strategic database refinements reduced response latency by 40%, reinforcing stability as population density continues to rise across contested regions.',
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
    body: 'The Interstellar Trade Network has been completely overhauled. Commanders now operate with real-time market intelligence, advanced commodity filters, and predictive trade route analysis. Economic warfare is no longer guesswork—those who read the data fastest will dominate the flow of credits and resources.',
    category: 'feature',
    featured: true,
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
    body: 'Long-range sensors have detected derelict vessels drifting through contested systems—ships with no registry, no crew, and no clear origin. Salvage teams report rare materials and unstable anomalies aboard these ghost ships. The phenomenon is temporary, but its origins remain unexplained.',
    category: 'feature',
    featured: true,
    tags: ['events', 'gameplay', 'loot']
  }
];
