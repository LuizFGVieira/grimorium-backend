import { Document } from 'mongoose';

export interface DND5eCharacterSheet extends Document {
  readonly sheetId: string;
  readonly name: string;
  readonly background: string;
  readonly alignment: string;
  readonly exp: number;
  readonly race: string;
  readonly classes: [
    {
      id: string;
      name: string;
      lvl: number;
    },
  ];
  readonly classFeatures: [
    {
      id: string;
      name: string;
      quantity: number;
    },
  ];
  readonly proficiencyBonus: number;
  readonly inspiration: number;
  readonly armorClass: number;
  readonly hp: {
    total: number;
    current: number;
    temporary: number;
  };
  readonly hitDice: {
    total: number;
    current: number;
    type: string;
  };
  readonly movement: number;
  readonly initiative: number;
  readonly savingThrows: {
    success: number;
    fail: number;
  };
  readonly attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  readonly skills: {
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
  readonly passiveWisdom: number;
  readonly proficiencies: {
    attributes: [string];
    skills: [string];
    languages: [string];
    equipments: [string];
    others: [string];
  };
  readonly cooperPieces: number;
  readonly recialTraits: [string];
  readonly equipments: [
    {
      id: string;
      name: string;
      type: string;
    },
  ];
  readonly personalityTraits: string;
  readonly ideals: string;
  readonly bonds: string;
  readonly flaws: string;
  readonly age: string;
  readonly skin: string;
  readonly hair: string;
  readonly allies: [
    {
      name: string;
      description: string;
    },
  ];
  readonly craft: [
    {
      name: string;
      description: string;
    },
  ];
  readonly backstoryId: string;
  readonly spellcasting: {
    class: string;
    keyAbility: string;
    cd: number;
    bonus: number;
    spellSlot: [
      {
        total: number;
        expended: number;
      },
    ];
    knwonSpells: [
      {
        id: string;
        name: string;
        level: number;
        school: string;
        range: number;
        castingTime: string;
      },
    ];
    preparedSpells: [
      {
        id: string;
        name: string;
        level: number;
        school: string;
        range: number;
        castingTime: string;
      },
    ];
  };
  readonly notes: [string];
  readonly addons: [
    {
      id: string;
      type: string;
    },
  ];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
