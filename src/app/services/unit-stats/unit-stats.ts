// File: src/app/services/unit-stats.service.ts
// Service to fetch unit template stats from game database API

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { CatalogEntityStats, CatalogEntityDisplay } from '../../models/catalog.models';

/**
 * Combined unit with display data + stats
 */
export interface FullUnitData extends CatalogEntityDisplay {
  stats?: CatalogEntityStats;
}

@Injectable({
  providedIn: 'root'
})
export class UnitStatsService {
  private apiUrl = 'https://game.beyondhorizononline.com/api'; // Replace with actual API URL
  private cache = new Map<number, Observable<CatalogEntityStats>>();
  
  constructor(private http: HttpClient) {}

  /**
   * Get unit template stats by templateId
   * Results are cached to avoid duplicate API calls
   * 
   * @param templateId - The template ID from your seed file
   * @returns Observable of unit stats
   * 
   * @example
   * this.unitStats.getUnitStats(14).subscribe(stats => {
   *   console.log('Shield:', stats.baseShield);
   * });
   */
  getUnitStats(templateId: number): Observable<CatalogEntityStats> {
    // Check cache first
    if (this.cache.has(templateId)) {
      return this.cache.get(templateId)!;
    }

    // Make API call - map snake_case API response to PascalCase interface
    const request$ = this.http.get<any>(
      `${this.apiUrl}/units/template/${templateId}`
    ).pipe(
      map(raw => this.mapToStats(raw)),
      tap(stats => console.log(`Loaded stats for template ${templateId}`)),
      catchError(this.handleError),
      shareReplay(1) // Cache the result
    );

    // Store in cache
    this.cache.set(templateId, request$);
    
    return request$;
  }

  /**
   * Get multiple unit stats at once
   * Useful for loading stats for a list of units
   * 
   * @param templateIds - Array of template IDs
   * @returns Observable of stats array
   * 
   * @example
   * const ids = ships.map(s => s.templateId);
   * this.unitStats.getBulkStats(ids).subscribe(statsArray => {
   *   // statsArray matches order of ids
   * });
   */
  getBulkStats(templateIds: number[]): Observable<CatalogEntityStats[]> {
    // If API supports bulk fetching, use this:
    // return this.http.post<UnitTemplateStats[]>(
    //   `${this.apiUrl}/units/templates/bulk`,
    //   { templateIds }
    // );

    // Otherwise, fetch individually (they'll use cache)
    const requests = templateIds.map(id => this.getUnitStats(id));
    return new Observable(observer => {
      const results: CatalogEntityStats[] = [];
      let completed = 0;

      requests.forEach((req$, index) => {
        req$.subscribe({
          next: (stats) => {
            results[index] = stats;
            completed++;
            if (completed === templateIds.length) {
              observer.next(results);
              observer.complete();
            }
          },
          error: (err) => observer.error(err)
        });
      });
    });
  }

  /**
   * Merge display data with stats
   * Convenience method to combine seed file data + API stats
   * 
   * @param displayData - Unit data from seed file
   * @returns Observable of merged data
   * 
   * @example
   * const ship = SHIPS.find(s => s.id === 'vx-6-apex');
   * this.unitStats.getFullUnit(ship).subscribe(fullUnit => {
   *   console.log(fullUnit.name);        // from seed file
   *   console.log(fullUnit.stats.shield); // from API
   * });
   */
  getFullUnit(displayData: any): Observable<FullUnitData> {
    return this.getUnitStats(displayData.templateId).pipe(
      map(stats => ({
        ...displayData,
        stats
      }))
    );
  }

  /**
   * Clear cache for a specific template
   * Useful if you know stats have been updated
   */
  clearCache(templateId?: number): void {
    if (templateId) {
      this.cache.delete(templateId);
      console.log(`Cleared cache for template ${templateId}`);
    } else {
      this.cache.clear();
      console.log('Cleared all unit stats cache');
    }
  }

  /**
   * Preload stats for units
   * Call this to load stats in background before user clicks
   * 
   * @example
   * // Preload stats for all ships on page
   * const ids = this.ships.map(s => s.templateId);
   * this.unitStats.preloadStats(ids);
   */
  preloadStats(templateIds: number[]): void {
    templateIds.forEach(id => {
      if (!this.cache.has(id)) {
        this.getUnitStats(id).subscribe(); // Fire and forget
      }
    });
  }

  /**
   * Map API response (snake_case or any casing) to PascalCase CatalogEntityStats.
   * Handles snake_case, camelCase, and PascalCase responses gracefully.
   */
  private mapToStats(raw: any): CatalogEntityStats {
    // If already PascalCase (e.g. BaseHealth exists), return as-is
    if (raw.BaseHealth !== undefined || raw.TemplateID !== undefined) {
      return raw as CatalogEntityStats;
    }

    // Map from snake_case (or camelCase) API response
    return {
      TemplateID: raw.template_id ?? raw.templateId ?? raw.TemplateID ?? 0,
      Name: raw.name ?? raw.Name ?? '',
      UnitType: raw.unit_type ?? raw.unitType ?? raw.UnitType ?? '',
      Size: raw.size ?? raw.Size ?? 0,
      BaseHealth: raw.base_health ?? raw.baseHealth ?? raw.BaseHealth ?? 0,
      BaseShield: raw.base_shield ?? raw.baseShield ?? raw.BaseShield ?? 0,
      BaseEnergyProduced: raw.base_energy_produced ?? raw.baseEnergyProduced ?? raw.BaseEnergyProduced ?? 0,
      BaseEnergyUsed: raw.base_energy_used ?? raw.baseEnergyUsed ?? raw.BaseEnergyUsed ?? 0,
      WeaponSlots: raw.weapon_slots ?? raw.weaponSlots ?? raw.WeaponSlots ?? 0,
      StaffRequired: raw.staff_required ?? raw.staffRequired ?? raw.StaffRequired ?? 0,
      TotalHousing: raw.total_housing ?? raw.totalHousing ?? raw.TotalHousing ?? 0,
      Speed: raw.speed ?? raw.Speed ?? 0,
      Atmospheric: raw.atmospheric ?? raw.Atmospheric ?? false,
      Hyperspace: raw.hyperspace ?? raw.Hyperspace ?? 0,
      SellPrice: raw.sell_price ?? raw.sellPrice ?? raw.SellPrice ?? 0,
      ShieldType: raw.shield_type ?? raw.shieldType ?? raw.ShieldType ?? '',
      TechTier: raw.tech_tier ?? raw.techTier ?? raw.TechTier ?? '',
      MinShipSize: raw.min_ship_size ?? raw.minShipSize ?? raw.MinShipSize ?? 0,
      MaxShipSize: raw.max_ship_size ?? raw.maxShipSize ?? raw.MaxShipSize ?? 0,
      Views: raw.views ?? raw.Views ?? 0,
      Blurring: raw.blurring ?? raw.Blurring ?? 0,
      PrefabPath: raw.prefab_path ?? raw.prefabPath ?? raw.PrefabPath ?? '',
      Description: raw.description ?? raw.Description ?? '',
      DevelopmentTime: raw.development_time ?? raw.developmentTime ?? raw.DevelopmentTime ?? 0,
      ConstructionTime: raw.construction_time ?? raw.constructionTime ?? raw.ConstructionTime ?? 0,
      ConstructionCost: raw.construction_cost ?? raw.constructionCost ?? raw.ConstructionCost ?? 0,
      DevelopmentCost: raw.development_cost ?? raw.developmentCost ?? raw.DevelopmentCost ?? 0,
      Category: raw.category ?? raw.Category ?? '',
      RequiresPower: raw.requires_power ?? raw.requiresPower ?? raw.RequiresPower ?? false,
      ProvidesPower: raw.provides_power ?? raw.providesPower ?? raw.ProvidesPower ?? false,
      AllowsStockLink: raw.allows_stock_link ?? raw.allowsStockLink ?? raw.AllowsStockLink ?? false,
      ProvidesStorage: raw.provides_storage ?? raw.providesStorage ?? raw.ProvidesStorage ?? false,
      IsShip: raw.is_ship ?? raw.isShip ?? raw.IsShip ?? false,
      ResourceCapacity: raw.resource_capacity ?? raw.resourceCapacity ?? raw.ResourceCapacity ?? 0,
      DockCapacity: raw.dock_capacity ?? raw.dockCapacity ?? raw.DockCapacity ?? 0,
    };
  }

  /**
   * Error handler
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      if (error.status === 404) {
        errorMessage = 'Unit template not found in database';
      } else if (error.status === 0) {
        errorMessage = 'Could not connect to API server. Is it running?';
      }
    }
    
    console.error('UnitStatsService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}