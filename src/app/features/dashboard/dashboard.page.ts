import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonBadge,
  IonSpinner,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { SlicePipe } from '@angular/common';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';
import {
  CommanderService,
  Commander,
  BriefingItem,
  FleetReadiness,
  SectorStatus,
  PriorityAction,
  Objective,
  Achievement,
  IntelItem,
  DataStreamEvent,
} from '../../services/commander/commander.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterLink,
    SlicePipe,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonProgressBar,
    IonBadge,
    IonSpinner,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    StarfieldBackgroundComponent,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // Data signals
  commander = signal<Commander | null>(null);
  briefingItems = signal<BriefingItem[]>([]);
  fleetReadiness = signal<FleetReadiness | null>(null);
  sectorStatus = signal<SectorStatus | null>(null);
  priorityActions = signal<PriorityAction[]>([]);
  objectives = signal<Objective[]>([]);
  achievements = signal<Achievement[]>([]);
  intelItems = signal<IntelItem[]>([]);
  dataStreamEvents = signal<DataStreamEvent[]>([]);

  // Derived signals
  isLoading = signal(true);
  selectedIntelTab = signal<'message' | 'update' | 'forum'>('message');

  // Computed values
  currentObjective = computed(() => {
    const objs = this.objectives();
    return objs.find(o => o.isCurrent) || null;
  });

  recentAchievements = computed(() => {
    // Return achievements directly from signal
    return this.achievements() || [];
  });

  unreadMessageCount = computed(() => {
    return this.intelItems().filter(
      item => item.type === 'message' && item.unread
    ).length;
  });

  filteredIntelItems = computed(() => {
    const tab = this.selectedIntelTab();
    return this.intelItems().filter(item => item.type === tab);
  });

  displayedStreamEvents = computed(() => {
    // Show last 5 events in reverse order (newest at top)
    return this.dataStreamEvents().slice(-5).reverse();
  });

  constructor(private commanderService: CommanderService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Load commander data
    this.commanderService.getCommander().subscribe(commander => {
      this.commander.set(commander);
    });

    // Load briefing items
    this.commanderService.getBriefingItems().subscribe(briefings => {
      this.briefingItems.set(briefings);
    });

    // Load fleet readiness
    this.commanderService.getFleetReadiness().subscribe(readiness => {
      this.fleetReadiness.set(readiness);
    });

    // Load sector status
    this.commanderService.getSectorStatus().subscribe(sector => {
      this.sectorStatus.set(sector);
    });

    // Load priority actions
    this.commanderService.getPriorityActions().subscribe(actions => {
      this.priorityActions.set(actions);
    });

    // Load objectives
    this.commanderService.getObjectives().subscribe(objectives => {
      this.objectives.set(objectives);
    });

    // Load achievements
    this.commanderService.getAchievements().subscribe(achievements => {
      this.achievements.set(achievements);
    });

    // Load intel items
    this.commanderService.getIntelItems().subscribe(intel => {
      this.intelItems.set(intel);
    });

    // Load data stream events (randomized)
    this.commanderService.getRandomizedDataStream().subscribe(events => {
      this.dataStreamEvents.set(events);
      this.isLoading.set(false);
    });
  }

  // Helper methods
  getReadinessColor(readiness: number): string {
    if (readiness >= 80) return 'success';
    if (readiness >= 50) return 'warning';
    return 'danger';
  }

  getSectorControlColor(percent: number): string {
    if (percent >= 70) return 'success';
    if (percent >= 40) return 'warning';
    return 'danger';
  }

  getEnemyActivityIcon(activity: string): string {
    switch (activity) {
      case 'low':
        return 'checkmark-circle';
      case 'moderate':
        return 'warning';
      case 'high':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  }

  getAchievementDaysAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return '1d ago';
    return `${diffDays}d ago`;
  }

  formatLastLogin(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }

  selectIntelTab(tab: 'message' | 'update' | 'forum'): void {
    this.selectedIntelTab.set(tab);
  }

  handleActionClick(action: PriorityAction): void {
    // Navigate to the action route
    // Router navigation would happen here in production
  }

  handleBriefingAction(briefing: BriefingItem, actionIndex: number): void {
    const action = briefing.actions[actionIndex];
  }

  dismissAllBriefings(): void {
    this.briefingItems.set([]);
  }
}
