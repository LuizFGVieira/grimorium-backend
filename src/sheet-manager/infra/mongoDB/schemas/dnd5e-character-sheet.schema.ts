import * as mongoose from 'mongoose';

export const DND5eCharacterSheetSchema = new mongoose.Schema({
  sheetId: String,
  background: String,
  alignment: String,
  exp: Number,
  race: String,
  classes: [
    {
      id: String,
      name: String,
      lvl: Number,
    },
  ],
  classFeatures: [
    {
      id: String,
      name: String,
      quantity: Number,
    },
  ],
  proficiencyBonus: Number,
  inspiration: Number,
  armorClass: Number,
  hp: {
    total: Number,
    current: Number,
    temporary: Number,
  },
  hitDice: {
    total: Number,
    current: Number,
    type: String,
  },
  movement: Number,
  initiative: Number,
  savingThrows: {
    success: Number,
    fail: Number,
  },
  attributes: {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  skills: {
    athletics: Number,
    acrobatics: Number,
    stealth: Number,
    sleightOfHand: Number,
    insight: Number,
    medicine: Number,
    perception: Number,
    survival: Number,
    arcana: Number,
    history: Number,
    investigation: Number,
    nature: Number,
    religion: Number,
    deception: Number,
    intimidation: Number,
    persuasion: Number,
  },
  passiveWisdom: Number,
  proficiencies: {
    attributes: [String],
    skills: [String],
    languages: [String],
    equipments: [String],
    others: [String],
  },
  cooperPieces: Number,
  recialTraits: [String],
  equipments: [
    {
      id: String,
      name: String,
      type: String,
    },
  ],
  personalityTraits: String,
  ideals: String,
  bonds: String,
  flaws: String,
  age: String,
  skin: String,
  hair: String,
  allies: [
    {
      name: String,
      description: String,
    },
  ],
  craft: [
    {
      name: String,
      description: String,
    },
  ],
  backstoryId: String,
  spellcasting: {
    class: String,
    keyAbility: String,
    cd: Number,
    bonus: Number,
    spellSlot: [
      {
        total: Number,
        expended: Number,
      },
    ],
    knwonSpells: [
      {
        id: String,
        name: String,
        level: Number,
        school: String,
        range: Number,
        castingTime: String,
      },
    ],
    preparedSpells: [
      {
        id: String,
        name: String,
        level: Number,
        school: String,
        range: Number,
        castingTime: String,
      },
    ],
  },
  notes: [String],
  addons: [
    {
      id: String,
      type: String,
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
