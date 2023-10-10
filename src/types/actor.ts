export interface Actor {
  id: string;
  friendly?: boolean;
  name: string;
  stats?: {
    currHp?: number;
    maxHp?: number;
    tempHp?: number;
    ac?: number;
    speed?: number;
    initBonus?: number;
    initiative?: number;
    proficiency?: number;
    hitDice?: number;
    hitDiceMax?: number;
    hitDiceUsed?: number;
    deathSaves?: {
      successes?: number;
      failures?: number;
    };
  };
  abilities?: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  };
  savingThrows?: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  };
  modifiers?: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
    strSave?: number;
    dexSave?: number;
    conSave?: number;
    intSave?: number;
    wisSave?: number;
    chaSave?: number;
  };
  proficiencies?: {
    armor?: string[];
    weapons?: string[];
    tools?: string[];
    skills?: string[];
    languages?: string[];
  };
  resistances?: {
    damage?: string[];
    condition?: string[];
  };
  immunities?: {
    damage?: string[];
    condition?: string[];
  };
  senses?: {
    blindsight?: number;
    darkvision?: number;
  };
  activeConditions?: ActiveCondition[];
}

export interface ActiveCondition {
  targetedProperties?: {
    [key: string]: any;
  };
  whenConditionClears?: 'begin' | 'end';
  turnsRemaining?: number;
}
