// File: src/app/data/mock-systems.ts
// Mock system cards for the Codex Detail "Systems & Capabilities" section

export interface SystemCard {
  id: string;
  name: string;
  icon: string; // Ionicon name
  description: string;
}

// System database organized by category
const WEAPON_SYSTEMS: SystemCard[] = [
  {
    id: 'forward-cannon-arrays',
    name: 'FORWARD CANNON ARRAYS',
    icon: 'flash',
    description: 'Capital-grade thermal lances that superheat and punch through reinforced armor in sustained volleys.'
  },
  {
    id: 'spinal-mass-driver',
    name: 'SPINAL MASS DRIVER',
    icon: 'rocket',
    description: 'Accelerates tungsten slugs to hypervelocity, delivering kinetic devastation along the ship\'s primary axis.'
  },
  {
    id: 'plasma-battery-grid',
    name: 'PLASMA BATTERY GRID',
    icon: 'radio',
    description: 'Distributed plasma emitters for close-range bombardment and anti-fighter suppression.'
  },
  {
    id: 'missile-pod-arrays',
    name: 'MISSILE POD ARRAYS',
    icon: 'options',
    description: 'Guided strike ordnance with adaptive tracking, ideal for overwhelming point-defense systems.'
  },
  {
    id: 'thermal-lance-projectors',
    name: 'THERMAL LANCE PROJECTORS',
    icon: 'flame',
    description: 'Focused thermal beams that melt through heavy plating and shield nodes.'
  },
  {
    id: 'emp-disruption-grid',
    name: 'EMP DISRUPTION GRID',
    icon: 'pulse',
    description: 'Emits controlled electromagnetic pulses to disable enemy sensors, comms, and unshielded reactors.'
  }
];

const POWER_SYSTEMS: SystemCard[] = [
  {
    id: 'tinin-plasma-cores',
    name: 'TININ PLASMA CORES',
    icon: 'nuclear',
    description: 'Primary thermal energy source; superheated plasma contained within magnetic bottles.'
  },
  {
    id: 'fusion-reactor-stack',
    name: 'FUSION REACTOR STACK',
    icon: 'hardware-chip',
    description: 'Multi-stage fusion generators providing stable, long-duration power for extended operations.'
  },
  {
    id: 'solar-fusion-drive',
    name: 'SOLAR-FUSION DRIVE',
    icon: 'sunny',
    description: 'Harnesses micro-stellar fusion reactions for both propulsion and weapon charging.'
  },
  {
    id: 'quantum-cell-array',
    name: 'QUANTUM CELL ARRAY',
    icon: 'grid',
    description: 'Advanced energy storage cells using quantum entanglement for instant power redistribution.'
  }
];

const DEFENSE_SYSTEMS: SystemCard[] = [
  {
    id: 'adaptive-shield-lattice',
    name: 'ADAPTIVE SHIELD LATTICE',
    icon: 'shield',
    description: 'Multi-layered energy barrier that cycles frequencies to deflect varied attack profiles.'
  },
  {
    id: 'ablative-armor-composite',
    name: 'ABLATIVE ARMOR COMPOSITE',
    icon: 'cube',
    description: 'Tritanium and ceramic layers designed to absorb and disperse kinetic and thermal strikes.'
  },
  {
    id: 'point-defense-network',
    name: 'POINT-DEFENSE NETWORK',
    icon: 'medal',
    description: 'Automated targeting grid that intercepts missiles, drones, and small craft at close range.'
  },
  {
    id: 'field-projector-arrays',
    name: 'FIELD PROJECTOR ARRAYS',
    icon: 'umbrella',
    description: 'Extended shield emitters that can protect nearby allied vessels in formation.'
  }
];

const PROPULSION_SYSTEMS: SystemCard[] = [
  {
    id: 'hyperspace-drive-core',
    name: 'HYPERSPACE DRIVE CORE',
    icon: 'planet',
    description: 'Enables superluminal travel by folding local spacetime into transient corridors.'
  },
  {
    id: 'gimbal-drive-clusters',
    name: 'GIMBAL DRIVE CLUSTERS',
    icon: 'swap-horizontal',
    description: 'Articulated thruster arrays that grant exceptional maneuverability for capital-class frames.'
  },
  {
    id: 'burst-propulsion-rig',
    name: 'BURST PROPULSION RIG',
    icon: 'speedometer',
    description: 'Emergency acceleration system for rapid evasive maneuvers and tactical repositioning.'
  },
  {
    id: 'atmospheric-stabilizers',
    name: 'ATMOSPHERIC STABILIZERS',
    icon: 'contrast',
    description: 'Vanes and gravitic compensators that allow stable operation in planetary atmospheres.'
  }
];

const STEALTH_SYSTEMS: SystemCard[] = [
  {
    id: 'adaptive-stealth-plating',
    name: 'ADAPTIVE STEALTH PLATING',
    icon: 'eye-off',
    description: 'Modulates albedo and EM signature to blend into background radiation and debris fields.'
  },
  {
    id: 'pulse-masking-arrays',
    name: 'PULSE-MASKING ARRAYS',
    icon: 'remove',
    description: 'Folds drive and reactor emissions into local noise, reducing sensor visibility.'
  },
  {
    id: 'sensor-ghost-projector',
    name: 'SENSOR GHOST PROJECTOR',
    icon: 'duplicate',
    description: 'Creates false signatures and phantom echoes to confuse enemy tracking systems.'
  }
];

const HANGAR_SYSTEMS: SystemCard[] = [
  {
    id: 'launch-catapult-bays',
    name: 'LAUNCH CATAPULT BAYS',
    icon: 'exit',
    description: 'Plasma-assisted catapults that rapidly deploy fighters and strike craft under combat conditions.'
  },
  {
    id: 'drone-fabrication-grid',
    name: 'DRONE FABRICATION GRID',
    icon: 'build',
    description: 'Onboard nanofabricators that assemble recon and combat drones from stored templates.'
  },
  {
    id: 'repair-drone-network',
    name: 'REPAIR DRONE NETWORK',
    icon: 'construct',
    description: 'Autonomous repair units that patch hull breaches, replace modules, and restore combat readiness.'
  }
];

const CARGO_SYSTEMS: SystemCard[] = [
  {
    id: 'segmented-cargo-spine',
    name: 'SEGMENTED CARGO SPINE',
    icon: 'albums',
    description: 'Modular storage framework allowing rapid reconfiguration for different payload types.'
  },
  {
    id: 'magnetic-cargo-clamps',
    name: 'MAGNETIC CARGO CLAMPS',
    icon: 'magnet',
    description: 'Shock-isolated mag-locks that secure massive loads during hyperspace transitions.'
  },
  {
    id: 'automated-load-balancer',
    name: 'AUTOMATED LOAD BALANCER',
    icon: 'scale',
    description: 'Real-time vector stress calculation with micro-thrust corrections to prevent structural failure.'
  },
  {
    id: 'pressurized-vault-array',
    name: 'PRESSURIZED VAULT ARRAY',
    icon: 'lock-closed',
    description: 'Shielded storage for volatile gases, exotic materials, and high-value cargo.'
  }
];

const ENGINEERING_SYSTEMS: SystemCard[] = [
  {
    id: 'plasma-welding-suite',
    name: 'PLASMA WELDING SUITE',
    icon: 'flash',
    description: 'Precision welders and lattice-printers for construction and emergency hull repairs.'
  },
  {
    id: 'thermal-bleed-emitters',
    name: 'THERMAL BLEED EMITTERS',
    icon: 'thermometer',
    description: 'Redirects waste heat from reactors and weapons into controlled venting or secondary systems.'
  },
  {
    id: 'fabrication-module-bay',
    name: 'FABRICATION MODULE BAY',
    icon: 'apps',
    description: 'Adaptive printers and milling cells for producing components and spare parts in the field.'
  }
];

const COMMAND_SYSTEMS: SystemCard[] = [
  {
    id: 'quantum-tactical-core',
    name: 'QUANTUM TACTICAL CORE',
    icon: 'server',
    description: 'Strategic computation suite that coordinates fleet formations and prioritizes targeting solutions.'
  },
  {
    id: 'lattice-map-projector',
    name: 'LATTICE-MAP PROJECTOR',
    icon: 'layers',
    description: 'Real-time battlespace visualization system fed by data from every linked hull.'
  },
  {
    id: 'encrypted-relay-network',
    name: 'ENCRYPTED RELAY NETWORK',
    icon: 'cellular',
    description: 'Quantum-synced communication trunks ensuring secure command and control across vast distances.'
  }
];

const STATION_SYSTEMS: SystemCard[] = [
  {
    id: 'mag-clamp-dock-array',
    name: 'MAG-CLAMP DOCK ARRAY',
    icon: 'link',
    description: 'Automated docking clamps and crane rails for efficient cargo and ship processing.'
  },
  {
    id: 'orbital-defense-platform',
    name: 'ORBITAL DEFENSE PLATFORM',
    icon: 'shield-checkmark',
    description: 'Hardened gun decks and missile batteries that protect the station from hostile fleets.'
  },
  {
    id: 'life-support-core',
    name: 'LIFE-SUPPORT CORE',
    icon: 'water',
    description: 'Pressurization, atmosphere recycling, and bio-filtration for long-term habitation.'
  },
  {
    id: 'resource-processing-grid',
    name: 'RESOURCE PROCESSING GRID',
    icon: 'cube',
    description: 'Ore crushers, smelters, and refineries that transform raw materials into usable products.'
  },
  {
    id: 'data-vault-nexus',
    name: 'DATA VAULT NEXUS',
    icon: 'filing',
    description: 'Hardened storage for strategic intelligence, corporate archives, and encrypted schematics.'
  }
];

const MINING_SYSTEMS: SystemCard[] = [
  {
    id: 'multi-phase-drill-array',
    name: 'MULTI-PHASE DRILL ARRAY',
    icon: 'drill',
    description: 'Adaptive cutting heads that shift geometry based on material density and composition.'
  },
  {
    id: 'seismic-destabilizer',
    name: 'SEISMIC DESTABILIZER',
    icon: 'pulse',
    description: 'Pre-fractures surrounding material to maximize extraction efficiency from dense cores.'
  },
  {
    id: 'ground-penetration-sensors',
    name: 'GROUND-PENETRATION SENSORS',
    icon: 'location',
    description: 'Microseismic sniffers that map subsurface veins and valuable deposits in real-time.'
  }
];

/**
 * Returns 3-4 relevant system cards for a given entity based on its type, role, and unitType.
 * Provides variety so different entities feel unique.
 */
export function getSystemsForEntity(
  entityId: string,
  unitType?: string,
  role?: string
): SystemCard[] {
  const lowerRole = role?.toLowerCase() || '';
  const lowerUnitType = unitType?.toLowerCase() || '';

  // Battleships - weapon and power focused
  if (lowerRole.includes('battleship') || lowerUnitType.includes('battleship')) {
    return [
      POWER_SYSTEMS[0], // TININ PLASMA CORES
      WEAPON_SYSTEMS[0], // FORWARD CANNON ARRAYS
      ENGINEERING_SYSTEMS[1], // THERMAL BLEED EMITTERS
      DEFENSE_SYSTEMS[0] // ADAPTIVE SHIELD LATTICE
    ];
  }

  // Carriers - hangar and command focused
  if (lowerRole.includes('carrier') || lowerUnitType.includes('carrier')) {
    return [
      HANGAR_SYSTEMS[0], // LAUNCH CATAPULT BAYS
      HANGAR_SYSTEMS[2], // REPAIR DRONE NETWORK
      COMMAND_SYSTEMS[0], // QUANTUM TACTICAL CORE
      DEFENSE_SYSTEMS[3] // FIELD PROJECTOR ARRAYS
    ];
  }

  // Dreadnoughts - heavy weapons and armor
  if (lowerRole.includes('dreadnought') || lowerUnitType.includes('dreadnought')) {
    return [
      WEAPON_SYSTEMS[1], // SPINAL MASS DRIVER
      DEFENSE_SYSTEMS[1], // ABLATIVE ARMOR COMPOSITE
      POWER_SYSTEMS[1], // FUSION REACTOR STACK
      WEAPON_SYSTEMS[5] // EMP DISRUPTION GRID
    ];
  }

  // Destroyers - speed and weapons
  if (lowerRole.includes('destroyer') || lowerUnitType.includes('destroyer')) {
    return [
      PROPULSION_SYSTEMS[2], // BURST PROPULSION RIG
      WEAPON_SYSTEMS[2], // PLASMA BATTERY GRID
      DEFENSE_SYSTEMS[2], // POINT-DEFENSE NETWORK
      POWER_SYSTEMS[0] // TININ PLASMA CORES
    ];
  }

  // Frigates - stealth and speed
  if (lowerRole.includes('frigate') || lowerUnitType.includes('frigate')) {
    return [
      STEALTH_SYSTEMS[0], // ADAPTIVE STEALTH PLATING
      STEALTH_SYSTEMS[1], // PULSE-MASKING ARRAYS
      PROPULSION_SYSTEMS[0], // HYPERSPACE DRIVE CORE
      WEAPON_SYSTEMS[3] // MISSILE POD ARRAYS
    ];
  }

  // Command ships - command and control
  if (lowerRole.includes('command') || lowerUnitType.includes('command')) {
    return [
      COMMAND_SYSTEMS[0], // QUANTUM TACTICAL CORE
      COMMAND_SYSTEMS[1], // LATTICE-MAP PROJECTOR
      COMMAND_SYSTEMS[2], // ENCRYPTED RELAY NETWORK
      DEFENSE_SYSTEMS[0] // ADAPTIVE SHIELD LATTICE
    ];
  }

  // Cargo ships - storage and transport
  if (lowerRole.includes('cargo') || lowerUnitType.includes('cargo') || lowerUnitType.includes('heavycargo')) {
    return [
      CARGO_SYSTEMS[0], // SEGMENTED CARGO SPINE
      CARGO_SYSTEMS[1], // MAGNETIC CARGO CLAMPS
      CARGO_SYSTEMS[2], // AUTOMATED LOAD BALANCER
      PROPULSION_SYSTEMS[0] // HYPERSPACE DRIVE CORE
    ];
  }

  // Builder/Construction ships
  if (lowerUnitType.includes('builder') || lowerRole.includes('construction')) {
    return [
      ENGINEERING_SYSTEMS[0], // PLASMA WELDING SUITE
      ENGINEERING_SYSTEMS[2], // FABRICATION MODULE BAY
      HANGAR_SYSTEMS[1], // DRONE FABRICATION GRID
      POWER_SYSTEMS[0] // TININ PLASMA CORES
    ];
  }

  // Mining/Harvester ships
  if (lowerUnitType.includes('harvester') || lowerUnitType.includes('mine') || lowerRole.includes('extraction')) {
    return [
      MINING_SYSTEMS[0], // MULTI-PHASE DRILL ARRAY
      MINING_SYSTEMS[2], // GROUND-PENETRATION SENSORS
      CARGO_SYSTEMS[3], // PRESSURIZED VAULT ARRAY
      POWER_SYSTEMS[1] // FUSION REACTOR STACK
    ];
  }

  // Warehouses - storage focused
  if (lowerUnitType.includes('warehouse') || lowerRole.includes('storage')) {
    return [
      STATION_SYSTEMS[0], // MAG-CLAMP DOCK ARRAY
      CARGO_SYSTEMS[3], // PRESSURIZED VAULT ARRAY
      STATION_SYSTEMS[2], // LIFE-SUPPORT CORE
      POWER_SYSTEMS[1] // FUSION REACTOR STACK
    ];
  }

  // Generators - power focused
  if (lowerUnitType.includes('generator') || lowerRole.includes('power generation')) {
    return [
      POWER_SYSTEMS[1], // FUSION REACTOR STACK
      ENGINEERING_SYSTEMS[1], // THERMAL BLEED EMITTERS
      STATION_SYSTEMS[2], // LIFE-SUPPORT CORE
      DEFENSE_SYSTEMS[0] // ADAPTIVE SHIELD LATTICE
    ];
  }

  // Factories - fabrication focused
  if (lowerUnitType.includes('factory') || lowerRole.includes('fabrication')) {
    return [
      ENGINEERING_SYSTEMS[2], // FABRICATION MODULE BAY
      STATION_SYSTEMS[3], // RESOURCE PROCESSING GRID
      HANGAR_SYSTEMS[1], // DRONE FABRICATION GRID
      POWER_SYSTEMS[1] // FUSION REACTOR STACK
    ];
  }

  // Bases and Stations - defense and operations
  if (
    lowerUnitType.includes('base') ||
    lowerUnitType.includes('imperialstation') ||
    lowerUnitType.includes('headquarters') ||
    lowerRole.includes('station')
  ) {
    return [
      STATION_SYSTEMS[1], // ORBITAL DEFENSE PLATFORM
      STATION_SYSTEMS[4], // DATA VAULT NEXUS
      STATION_SYSTEMS[2], // LIFE-SUPPORT CORE
      COMMAND_SYSTEMS[2] // ENCRYPTED RELAY NETWORK
    ];
  }

  // Medical facilities
  if (lowerUnitType.includes('hospital') || lowerRole.includes('medical')) {
    return [
      STATION_SYSTEMS[2], // LIFE-SUPPORT CORE
      POWER_SYSTEMS[1], // FUSION REACTOR STACK
      { id: 'bio-regen-suite', name: 'BIO-REGENERATION SUITE', icon: 'heart', description: 'Advanced medical bays with vat-grown organs and cybernetic integration systems.' },
      { id: 'trauma-pod-array', name: 'TRAUMA POD ARRAY', icon: 'medkit', description: 'AI-assisted emergency care units for rapid triage and stabilization.' }
    ];
  }

  // Research labs
  if (lowerUnitType.includes('researchlab') || lowerRole.includes('research')) {
    return [
      { id: 'quantum-research-core', name: 'QUANTUM RESEARCH CORE', icon: 'beaker', description: 'Experimental physics laboratory for testing exotic technologies and materials.' },
      STATION_SYSTEMS[4], // DATA VAULT NEXUS
      POWER_SYSTEMS[3], // QUANTUM CELL ARRAY
      { id: 'prototype-fab-bay', name: 'PROTOTYPE FAB BAY', icon: 'settings', description: 'Rapid prototyping facility for converting theoretical designs into field-ready hardware.' }
    ];
  }

  // Housing/Habitation
  if (lowerUnitType.includes('housing') || lowerRole.includes('habitation')) {
    return [
      STATION_SYSTEMS[2], // LIFE-SUPPORT CORE
      { id: 'hydroponic-ring', name: 'HYDROPONIC RING', icon: 'leaf', description: 'Closed-loop agricultural systems providing food and air recycling.' },
      { id: 'smart-wall-grid', name: 'SMART WALL GRID', icon: 'grid', description: 'Reconfigurable interior partitions adapting to population shifts and needs.' },
      POWER_SYSTEMS[1] // FUSION REACTOR STACK
    ];
  }

  // Jump gates
  if (lowerUnitType.includes('jumpgate') || lowerRole.includes('gate')) {
    return [
      { id: 'gravitic-lens-array', name: 'GRAVITIC LENS ARRAY', icon: 'ellipse', description: 'Exotic matter conduits that fold local space into superluminal transit corridors.' },
      { id: 'nav-array-nexus', name: 'NAV-ARRAY NEXUS', icon: 'navigate', description: 'Military-grade navigation stacks ensuring precision alignment across light-years.' },
      POWER_SYSTEMS[2], // SOLAR-FUSION DRIVE
      DEFENSE_SYSTEMS[0] // ADAPTIVE SHIELD LATTICE
    ];
  }

  // City halls / governance
  if (lowerUnitType.includes('cityhall') || lowerRole.includes('governance')) {
    return [
      { id: 'civic-data-network', name: 'CIVIC DATA NETWORK', icon: 'analytics', description: 'Population monitoring and analytics feeding corporate oversight systems.' },
      COMMAND_SYSTEMS[2], // ENCRYPTED RELAY NETWORK
      { id: 'security-coordination', name: 'SECURITY COORDINATION HUB', icon: 'lock-open', description: 'Centralized security command with city-wide lockdown capabilities.' },
      STATION_SYSTEMS[2] // LIFE-SUPPORT CORE
    ];
  }

  // Default fallback - generic systems
  return [
    POWER_SYSTEMS[0], // TININ PLASMA CORES
    DEFENSE_SYSTEMS[0], // ADAPTIVE SHIELD LATTICE
    STATION_SYSTEMS[2], // LIFE-SUPPORT CORE
    PROPULSION_SYSTEMS[0] // HYPERSPACE DRIVE CORE
  ];
}
