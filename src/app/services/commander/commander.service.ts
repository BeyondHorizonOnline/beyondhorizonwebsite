import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// ---- Type Definitions ----

export interface Commander {
  id: string;
  username: string;
  displayName: string;
  rank: string;
  lastLogin: Date;
  status: 'active' | 'premium' | 'away';
}

export interface BriefingItem {
  id: string;
  type: 'priority' | 'opportunity' | 'completed' | 'info';
  title: string;
  detail: string;
  actions: { label: string; route?: string; action?: string }[];
  timestamp: Date;
}

export interface FleetReadiness {
  overall: number;
  categories: {
    name: string;
    count: number;
    readiness: number;
  }[];
  alerts: string[];
}

export interface SectorStatus {
  name: string;
  type: string;
  controlPercent: number;
  enemyActivity: 'low' | 'moderate' | 'high';
  systemsControlled: number;
  systemsContested: number;
  hqSystem: string;
  hqStatus: 'secure' | 'threatened' | 'under_attack';
}

export interface PriorityAction {
  id: string;
  label: string;
  context: string;
  route: string;
  priority: number;
}

export interface Objective {
  id: string;
  title: string;
  progress: number;
  isCurrent: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  dateEarned: Date;
}

export interface IntelItem {
  id: string;
  type: 'message' | 'update' | 'forum';
  title: string;
  preview?: string;
  date: Date;
  unread?: boolean;
  votes?: number;
}

export interface DataStreamEvent {
  id: string;
  timestamp: string;
  category: 'sector' | 'market' | 'player' | 'faction' | 'combat' | 'trade' | 'research';
  message: string;
}

// ---- Mock Data ----

const MOCK_COMMANDER: Commander = {
  id: 'cmdr-001',
  username: 'joptimus',
  displayName: 'James',
  rank: 'Fleet Admiral',
  lastLogin: new Date(new Date().getTime() - 1000 * 60 * 24), // 1 day ago
  status: 'active',
};

const MOCK_BRIEFING_ITEMS: BriefingItem[] = [
  {
    id: 'brief-001',
    type: 'priority',
    title: '2 border systems under-defended',
    detail: 'Vega-9 and Tau Ceti at 34% fleet coverage',
    actions: [
      { label: 'Deploy Patrol', route: '/ships' },
      { label: 'View Systems', route: '/star-map' },
    ],
    timestamp: new Date(new Date().getTime() - 1000 * 60 * 45),
  },
  {
    id: 'brief-002',
    type: 'opportunity',
    title: 'Trade profits up 18% on Kepler route',
    detail: '3 cargo ships idle at Station Alpha',
    actions: [
      { label: 'Assign Route', route: '/logistics' },
      { label: 'View Trade', route: '/logistics' },
    ],
    timestamp: new Date(new Date().getTime() - 1000 * 60 * 30),
  },
  {
    id: 'brief-003',
    type: 'completed',
    title: 'Research "Advanced Shields" finished',
    detail: 'New tech available for 4 ship classes',
    actions: [{ label: 'Apply Upgrades', route: '/engineering' }],
    timestamp: new Date(new Date().getTime() - 1000 * 60 * 15),
  },
];

const MOCK_FLEET_READINESS: FleetReadiness = {
  overall: 78,
  categories: [
    { name: 'Combat', count: 5, readiness: 92 },
    { name: 'Support', count: 4, readiness: 71 },
    { name: 'Stations', count: 3, readiness: 68 },
  ],
  alerts: ['2 units need repairs'],
};

const MOCK_SECTOR_STATUS: SectorStatus = {
  name: 'Vega Sector',
  type: 'Frontline',
  controlPercent: 72,
  enemyActivity: 'moderate',
  systemsControlled: 4,
  systemsContested: 2,
  hqSystem: 'Vega Prime',
  hqStatus: 'secure',
};

const MOCK_PRIORITY_ACTIONS: PriorityAction[] = [
  {
    id: 'action-001',
    label: 'Deploy 2 Ships to Vega-9',
    context: 'Reinforce under-defended border system',
    route: '/ships',
    priority: 1,
  },
  {
    id: 'action-002',
    label: 'Collect 12,450 Credits',
    context: 'Trade revenue pending at Station Alpha',
    route: '/logistics',
    priority: 2,
  },
  {
    id: 'action-003',
    label: 'View Tau Ceti Battle',
    context: 'Skirmish resolved (Victory)',
    route: '/star-map',
    priority: 3,
  },
  {
    id: 'action-004',
    label: 'Assign 3 Ships to Patrol',
    context: 'Idle assets at Station Alpha',
    route: '/ships',
    priority: 4,
  },
];

const MOCK_OBJECTIVES: Objective[] = [
  {
    id: 'obj-001',
    title: 'Secure the Vega Sector',
    progress: 67,
    isCurrent: true,
  },
];

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-001',
    title: 'First Trade Route',
    dateEarned: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 'ach-002',
    title: '10 Ships Deployed',
    dateEarned: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
];

const MOCK_INTEL_ITEMS: IntelItem[] = [
  // Messages
  {
    id: 'intel-001',
    type: 'message',
    title: 'Fleet Command: New orders',
    preview: 'Priority assignment for Vega sector operations',
    date: new Date(new Date().getTime() - 1000 * 60 * 30),
    unread: true,
  },
  {
    id: 'intel-002',
    type: 'message',
    title: 'Trade Guild: Route approved',
    preview: 'Kepler-Tau route authorization granted',
    date: new Date(new Date().getTime() - 1000 * 60 * 60),
    unread: true,
  },
  {
    id: 'intel-003',
    type: 'message',
    title: 'Research Lab: Shield blueprints ready',
    preview: 'Advanced Shields tech now available for deployment',
    date: new Date(new Date().getTime() - 1000 * 60 * 90),
    unread: true,
  },
  {
    id: 'intel-006',
    type: 'message',
    title: 'Admiral Kaiden: Mission accomplished',
    preview: 'Congratulations on completing the Kepler Station defense',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 4),
    unread: false,
  },
  {
    id: 'intel-007',
    type: 'message',
    title: 'Diplomat Exchange: Trade route secured',
    preview: 'New commerce opportunity with the Tau Collective established',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 6),
    unread: false,
  },
  {
    id: 'intel-008',
    type: 'message',
    title: 'Engineering: Hull upgrade available',
    preview: 'Request upgrade: Reinforced Plating - 2000 Credits',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 12),
    unread: false,
  },
  // Updates
  {
    id: 'intel-004',
    type: 'update',
    title: 'v2.1 Patch Notes',
    preview: 'Balance updates, bug fixes, and new features',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    unread: false,
  },
  {
    id: 'intel-009',
    type: 'update',
    title: 'Server maintenance schedule',
    preview: 'Scheduled downtime Dec 20, 2:00-4:00 UTC for infrastructure upgrades',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    unread: false,
  },
  {
    id: 'intel-010',
    type: 'update',
    title: 'New tutorial available',
    preview: 'Learn advanced combat tactics with the new interactive guide',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2),
    unread: false,
  },
  {
    id: 'intel-011',
    type: 'update',
    title: 'Economy shift report',
    preview: 'Trade prices updated - Ore values down 5%, Fuel up 8%',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 5),
    unread: false,
  },
  // Forum
  {
    id: 'intel-005',
    type: 'forum',
    title: 'Best trade routes?',
    preview: 'Discussion on optimal trading patterns',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 2),
    unread: false,
    votes: 42,
  },
  {
    id: 'intel-012',
    type: 'forum',
    title: '[PvP] Tips for dogfighting',
    preview: 'Share your combat strategies and tactics here',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 3),
    unread: false,
    votes: 156,
  },
  {
    id: 'intel-013',
    type: 'forum',
    title: 'Faction war updates - current standings',
    preview: 'Real-time leaderboard and battle reports from active conflicts',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 5),
    unread: false,
    votes: 89,
  },
  {
    id: 'intel-014',
    type: 'forum',
    title: 'Looking for alliance - recruiting high-level players',
    preview: 'We need experienced commanders for expansion operations',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 8),
    unread: false,
    votes: 23,
  },
  {
    id: 'intel-015',
    type: 'forum',
    title: 'Ship build guide - Cargo vs Combat loadouts',
    preview: 'Comprehensive breakdown of optimal configurations for different roles',
    date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    unread: false,
    votes: 234,
  },
];

// Mock Data Stream Events - Exactly as specified in the plan
const MOCK_DATA_STREAM_EVENTS: DataStreamEvent[] = [
  // Sector/Location Events
  {
    id: '1',
    timestamp: '10:52:41',
    category: 'sector',
    message: 'Sector 4-B | Patrol route updated',
  },
  {
    id: '2',
    timestamp: '10:53:12',
    category: 'sector',
    message: 'Vega-9 | Defensive grid online',
  },
  {
    id: '3',
    timestamp: '10:54:03',
    category: 'sector',
    message: 'Tau Ceti | Mining operations resumed',
  },
  {
    id: '4',
    timestamp: '10:55:28',
    category: 'sector',
    message: 'Kepler Station | Docking bay 3 available',
  },

  // Market Events
  {
    id: '5',
    timestamp: '10:56:44',
    category: 'market',
    message: 'Market | Titanium +2.4%',
  },
  {
    id: '6',
    timestamp: '10:57:19',
    category: 'market',
    message: 'Market | Fuel cells -1.2%',
  },
  {
    id: '7',
    timestamp: '10:58:55',
    category: 'market',
    message: 'Market | Rare minerals +8.7%',
  },
  {
    id: '8',
    timestamp: '10:59:33',
    category: 'market',
    message: 'Trade Index | Stable (+0.3%)',
  },

  // Player Activity Events
  {
    id: '9',
    timestamp: '11:00:07',
    category: 'player',
    message: 'Admiral Kaiden online',
  },
  {
    id: '10',
    timestamp: '11:01:42',
    category: 'player',
    message: 'Fleet Commander Reyes deployed to Vega',
  },
  {
    id: '11',
    timestamp: '11:02:18',
    category: 'player',
    message: 'Captain Torres completed trade route',
  },
  {
    id: '12',
    timestamp: '11:03:56',
    category: 'player',
    message: 'Commander Vance offline',
  },

  // Faction/Diplomatic Events
  {
    id: '13',
    timestamp: '11:04:22',
    category: 'faction',
    message: 'Faction Status | Diplomatic relations: Stable',
  },
  {
    id: '14',
    timestamp: '11:05:49',
    category: 'faction',
    message: 'Alliance Council | Session in progress',
  },
  {
    id: '15',
    timestamp: '11:06:31',
    category: 'faction',
    message: 'Treaty of Kepler | 847 days active',
  },

  // Combat/Military Events
  {
    id: '16',
    timestamp: '11:07:14',
    category: 'combat',
    message: 'Skirmish resolved | Tau Ceti border (Victory)',
  },
  {
    id: '17',
    timestamp: '11:08:02',
    category: 'combat',
    message: 'Patrol Wing 7 | Sector sweep complete',
  },
  {
    id: '18',
    timestamp: '11:09:38',
    category: 'combat',
    message: 'Defense Grid | All systems nominal',
  },

  // Trade/Economy Events
  {
    id: '19',
    timestamp: '11:10:55',
    category: 'trade',
    message: 'Trade route completed | +2,340 credits',
  },
  {
    id: '20',
    timestamp: '11:11:27',
    category: 'trade',
    message: 'Cargo vessel docked | Station Alpha',
  },
  {
    id: '21',
    timestamp: '11:12:44',
    category: 'trade',
    message: 'Supply convoy | ETA 4h to Vega Prime',
  },

  // Research/Tech Events
  {
    id: '22',
    timestamp: '11:13:16',
    category: 'research',
    message: 'Research | Advanced Shields: 2h remaining',
  },
  {
    id: '23',
    timestamp: '11:14:03',
    category: 'research',
    message: 'Tech Lab | New blueprint available',
  },
  {
    id: '24',
    timestamp: '11:15:29',
    category: 'research',
    message: 'Engineering Bay | Upgrade queue: 3 ships',
  },
];

// ---- Service ----

@Injectable({ providedIn: 'root' })
export class CommanderService {
  /**
   * Get mocked commander profile
   */
  getCommander(): Observable<Commander> {
    return of(MOCK_COMMANDER);
  }

  /**
   * Get mocked command briefing items
   */
  getBriefingItems(): Observable<BriefingItem[]> {
    return of(MOCK_BRIEFING_ITEMS);
  }

  /**
   * Get mocked fleet readiness data
   */
  getFleetReadiness(): Observable<FleetReadiness> {
    return of(MOCK_FLEET_READINESS);
  }

  /**
   * Get mocked sector status (frontline focus)
   */
  getSectorStatus(): Observable<SectorStatus> {
    return of(MOCK_SECTOR_STATUS);
  }

  /**
   * Get mocked priority actions
   */
  getPriorityActions(): Observable<PriorityAction[]> {
    return of(MOCK_PRIORITY_ACTIONS);
  }

  /**
   * Get mocked objectives and current mission
   */
  getObjectives(): Observable<Objective[]> {
    return of(MOCK_OBJECTIVES);
  }

  /**
   * Get mocked achievements
   */
  getAchievements(): Observable<Achievement[]> {
    return of(MOCK_ACHIEVEMENTS);
  }

  /**
   * Get mocked intel items (messages, updates, forum)
   */
  getIntelItems(): Observable<IntelItem[]> {
    return of(MOCK_INTEL_ITEMS);
  }

  /**
   * Get the complete list of live data stream events (24 events)
   */
  getDataStreamEvents(): Observable<DataStreamEvent[]> {
    return of(MOCK_DATA_STREAM_EVENTS);
  }

  /**
   * Get randomized/shuffled data stream events for variety
   * Useful for showing different sequences on page load
   */
  getRandomizedDataStream(): Observable<DataStreamEvent[]> {
    const shuffled = [...MOCK_DATA_STREAM_EVENTS].sort(() => Math.random() - 0.5);
    return of(shuffled);
  }
}
