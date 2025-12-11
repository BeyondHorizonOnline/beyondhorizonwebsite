// File: src/app/data/seed-updates.ts

export interface UpdateEntry {
  id: string;
  date: string; // ISO format: "2024-12-10"
  title: string;
  body: string;
  category: 'feature' | 'bugfix' | 'balance' | 'infrastructure';
  tags?: string[];
  featured?: boolean; // Highlights important updates
}

export const UPDATES: UpdateEntry[] = [
  {
    id: 'update-001',
    date: '2024-12-10',
    title: 'Winter Update: New Station Types',
    body: 'Introduced 5 new orbital station templates including Research Outposts, Resource Refineries, and Military Fortifications. Each station type offers unique gameplay mechanics and strategic advantages.',
    category: 'feature',
    featured: true,
    tags: ['stations', 'infrastructure', 'gameplay']
  },
  {
    id: 'update-002',
    date: '2024-12-08',
    title: 'Fixed Pathfinding Edge Case',
    body: 'Resolved critical bug where pathfinding would fail in narrow asteroid field corridors, causing ships to become stuck. Improved A* algorithm efficiency for dense obstacle scenarios.',
    category: 'bugfix',
    tags: ['gameplay', 'ai', 'performance']
  },
  {
    id: 'update-003',
    date: '2024-12-05',
    title: 'Rebalanced Mining Yields',
    body: 'Adjusted resource extraction rates across Tier 2-4 mining facilities to create better progression curves. Tier 2 yields increased by 15%, Tier 3 decreased by 8% for balance.',
    category: 'balance',
    tags: ['economy', 'facilities', 'progression']
  },
  {
    id: 'update-004',
    date: '2024-12-01',
    title: 'Infrastructure Upgrade Complete',
    body: 'Successfully migrated all game servers to new infrastructure supporting 50,000 concurrent players. Database optimization reduced query times by 40%.',
    category: 'infrastructure',
    tags: ['performance', 'backend', 'stability']
  },
  {
    id: 'update-005',
    date: '2024-11-25',
    title: 'New Ship Class: Explorers',
    body: 'Added 3 new exploration-focused ship variants with enhanced sensor range and reduced fuel consumption. Perfect for long-range expeditions.',
    category: 'feature',
    tags: ['ships', 'exploration', 'gameplay']
  },
  {
    id: 'update-006',
    date: '2024-11-20',
    title: 'Combat Balance Adjustments',
    body: 'Tweaked weapon damage scaling and shield regeneration rates to improve combat flow. Heavy weapons now deal 12% more damage, while light shields regenerate 20% faster.',
    category: 'balance',
    tags: ['combat', 'weapons', 'shields']
  },
  {
    id: 'update-007',
    date: '2024-11-15',
    title: 'Trading System Overhaul',
    body: 'Completely redesigned the trading interface with real-time market data visualization, advanced filtering, and automated trade route suggestions.',
    category: 'feature',
    featured: true,
    tags: ['trading', 'economy', 'ui']
  },
  {
    id: 'update-008',
    date: '2024-11-10',
    title: 'Fixed Inventory Duplication Bug',
    body: 'Patched critical exploit that allowed players to duplicate items in cargo holds. All affected accounts have been audited and corrected.',
    category: 'bugfix',
    tags: ['economy', 'security', 'inventory']
  },
  {
    id: 'update-009',
    date: '2024-11-05',
    title: 'API Performance Improvements',
    body: 'Optimized database queries and added caching layer for frequently accessed data. Average API response time reduced from 180ms to 45ms.',
    category: 'infrastructure',
    tags: ['performance', 'backend', 'api']
  },
  {
    id: 'update-010',
    date: '2024-10-28',
    title: 'Halloween Event: Ghost Ships',
    body: 'Limited-time event featuring abandoned derelict ships with rare loot and mysterious anomalies. Event runs through November 5th.',
    category: 'feature',
    featured: true,
    tags: ['events', 'gameplay', 'loot']
  }
];
