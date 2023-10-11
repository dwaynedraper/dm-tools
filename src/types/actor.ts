import { Condition } from './conditions';

export interface Actor {
  _id?: string;
  friendly?: boolean;
  name: string;
  description: string;
  info?: {
    race: string;
    class: string;
    bg: string;
    alignment: string;
  };
  stats?: {
    maxHp?: number;
    tempHp?: number;
    ac?: number;
    speed?: number;
    prof?: number;
    hitDice?: number;
    hitDiceMax?: number;
    hitDiceUsed?: number;
    xp: number;
    level: number;
    inspired?: boolean;
    currHp?: number;
    initBonus?: number;
    initiative?: number;
  };
  deathSaves?: {
    successes?: number;
    failures?: number;
  };
  str: {
    score?: number;
    prof?: number;
    mod?: number;
  };
  dex: {
    score?: number;
    prof?: number;
    mod?: number;
  };
  con: {
    score?: number;
    prof?: number;
    mod?: number;
  };
  int: {
    score?: number;
    prof?: number;
    mod?: number;
  };
  wis: {
    score?: number;
    prof?: number;
    mod?: number;
  };
  cha: {
    score?: number;
    prof?: number;
    mod?: number;
  };
  prof?: {
    // proficiencies
    armor?: string[];
    weapons?: string[];
    tools?: string[];
    skills?: string[];
    lang?: string[];
  };
  res?: {
    // resistances
    damage?: string[];
    condition?: Condition[];
  };
  imm?: {
    // immunities
    damage?: string[];
    condition?: string[];
  };
  senses?: {
    blindsight?: number;
    darkvision?: number;
  };
  activeConditions?: ActiveCondition[];
  isConcentrating?: boolean;
  concentrationTargets?: string[];
}

export interface ActiveCondition {
  condition: Condition;
  requiresConcentration?: boolean;
  concentratingActor?: string;
  turnsRemaining?: number;
  targets?: string[];
}

// If isConcentrating is broken (made false by interruption),
// go through concentrationTargets and remove all conditions caused by this actor.
