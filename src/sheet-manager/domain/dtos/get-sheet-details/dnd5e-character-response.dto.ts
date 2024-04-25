import { Expose } from 'class-transformer';
import { DND5eCharacterSheet } from '../../../infra/mongoDB/models/dnd5e-character-sheet.model';

export class DND5EGetCharacterDetailsResponseDTO {
  @Expose()
  sheetId: string;

  @Expose()
  background: string;

  @Expose()
  alignment: string;

  @Expose()
  exp: number;

  @Expose()
  race: string;

  @Expose()
  classes: {
    id: string;
    name: string;
    lvl: number;
  }[];

  @Expose()
  classFeatures: {
    id: string;
    name: string;
    quantity: number;
  }[];

  @Expose()
  proficiencyBonus: number;

  @Expose()
  inspiration: number;

  @Expose()
  armorClass: number;

  @Expose()
  hp: {
    total: number;
    current: number;
    temporary: number;
  };

  @Expose()
  hitDice: {
    total: number;
    current: number;
    type: string;
  };

  @Expose()
  movement: number;
  initiative: number;
  savingThrows: {
    success: number;
    fail: number;
  };

  @Expose()
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  @Expose()
  skills: {
    athletics: number;
    acrobatics: number;
    stealth: number;
    sleightOfHand: number;
    insight: number;
    medicine: number;
    perception: number;
    survival: number;
    arcana: number;
    history: number;
    investigation: number;
    nature: number;
    religion: number;
    deception: number;
    intimidation: number;
    persuasion: number;
  };

  @Expose()
  passiveWisdom: number;

  @Expose()
  proficiencies: {
    attributes: string[];
    skills: string[];
    languages: string[];
    equipments: string[];
    others: string[];
  };

  @Expose()
  cooperPieces: number;

  @Expose()
  recialTraits: string[];

  @Expose()
  equipments: {
    id: string;
    name: string;
    type: string;
  }[];

  @Expose()
  personalityTraits: string;

  @Expose()
  ideals: string;

  @Expose()
  bonds: string;

  @Expose()
  flaws: string;

  @Expose()
  age: string;

  @Expose()
  skin: string;

  @Expose()
  hair: string;

  @Expose()
  allies: {
    name: string;
    description: string;
  }[];

  @Expose()
  craft: {
    name: string;
    description: string;
  }[];

  @Expose()
  backstoryId: string;

  @Expose()
  spellcasting: {
    class: string;
    keyAbility: string;
    cd: number;
    bonus: number;
    spellSlot: {
      total: number;
      expended: number;
    }[];
    knwonSpells: {
      id: string;
      name: string;
      level: number;
      school: string;
      range: number;
      castingTime: string;
    }[];
    preparedSpells: {
      id: string;
      name: string;
      level: number;
      school: string;
      range: number;
      castingTime: string;
    }[];
  };

  @Expose()
  notes: string[];
  addons: {
    id: string;
    type: string;
  }[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  public static fromEntity(
    sheet: DND5eCharacterSheet,
  ): DND5EGetCharacterDetailsResponseDTO {
    const response = new DND5EGetCharacterDetailsResponseDTO();
    response.sheetId = sheet.sheetId;
    response.background = sheet.background || '';
    response.alignment = sheet.alignment || '';
    response.exp = sheet.exp || 0;
    response.race = sheet.race || '';
    response.classes = sheet.classes || [];
    response.classFeatures = sheet.classFeatures || [];
    response.proficiencyBonus = sheet.proficiencyBonus || 0;
    response.inspiration = sheet.inspiration || 0;
    response.armorClass = sheet.armorClass || 0;
    response.hp = sheet.hp || {
      current: 0,
      total: 0,
      temporary: 0,
    };
    response.hitDice = sheet.hitDice || {
      current: 0,
      total: 0,
      type: 'd6',
    };
    response.movement = sheet.movement || 0;
    response.initiative = sheet.initiative || 0;
    response.savingThrows = sheet.savingThrows || {
      success: 0,
      fail: 0,
    };
    response.attributes = sheet.attributes || {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    };
    response.skills = sheet.skills || {
      athletics: 0,
      acrobatics: 0,
      stealth: 0,
      sleightOfHand: 0,
      insight: 0,
      medicine: 0,
      perception: 0,
      survival: 0,
      arcana: 0,
      history: 0,
      investigation: 0,
      nature: 0,
      religion: 0,
      deception: 0,
      intimidation: 0,
      persuasion: 0,
    };
    response.passiveWisdom = sheet.passiveWisdom || 0;
    response.proficiencies = sheet.proficiencies || {
      attributes: [],
      skills: [],
      languages: [],
      equipments: [],
      others: [],
    };
    response.cooperPieces = sheet.cooperPieces || 0;
    response.recialTraits = sheet.recialTraits || [];
    response.equipments = sheet.equipments || [];
    response.personalityTraits = sheet.personalityTraits || '';
    response.ideals = sheet.ideals || '';
    response.bonds = sheet.bonds || '';
    response.flaws = sheet.flaws || '';
    response.age = sheet.age || '';
    response.skin = sheet.skin || '';
    response.hair = sheet.hair || '';
    response.allies = sheet.allies || [];
    response.craft = sheet.craft || [];
    response.backstoryId = sheet.backstoryId || '';
    response.spellcasting = sheet.spellcasting || {
      class: '',
      keyAbility: '',
      cd: 0,
      bonus: 0,
      spellSlot: [],
      knwonSpells: [],
      preparedSpells: [],
    };
    response.notes = sheet.notes || [];
    response.addons = sheet.addons || [];
    response.createdAt = sheet.createdAt;
    response.updatedAt = sheet.updatedAt;
    return response;
  }
}
