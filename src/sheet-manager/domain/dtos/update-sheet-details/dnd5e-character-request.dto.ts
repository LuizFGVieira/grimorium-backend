import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DND5eCharacterSheet } from '../../../infra/mongoDB/models/dnd5e-character-sheet.model';
import { Type } from 'class-transformer';

export class DND5EUpdateCharacterDetailsRequestDTO {
  @IsOptional()
  @IsString()
  sheetId?: string;

  @IsOptional()
  @IsString()
  background?: string;

  @IsOptional()
  @IsString()
  alignment?: string;

  @IsOptional()
  @IsNumber()
  exp?: number;

  @IsOptional()
  @IsString()
  race?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDND5eClassesDTO)
  classes?: Array<UpdateDND5eClassesDTO>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateClassFeaturesDTO)
  classFeatures?: Array<UpdateClassFeaturesDTO>;

  @IsOptional()
  @IsNumber()
  proficiencyBonus?: number;

  @IsOptional()
  @IsNumber()
  inspiration?: number;

  @IsOptional()
  @IsNumber()
  armorClass?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateHPDTO)
  hp?: UpdateHPDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateHitDiceDTO)
  hitDice?: UpdateHitDiceDTO;

  @IsOptional()
  @IsNumber()
  movement?: number;
  initiative?: number;
  savingThrows?: {
    success: number;
    fail: number;
  };

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAttributesDTO)
  attributes?: UpdateAttributesDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSkillsDTO)
  skills?: UpdateSkillsDTO;

  @IsOptional()
  @IsNumber()
  passiveWisdom?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProficienciesDTO)
  proficiencies?: UpdateProficienciesDTO;

  @IsOptional()
  @IsNumber()
  cooperPieces?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  recialTraits?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateEquipmentsDTO)
  equipments?: Array<UpdateEquipmentsDTO>;

  @IsOptional()
  @IsString()
  personalityTraits?: string;

  @IsOptional()
  @IsString()
  ideals?: string;

  @IsOptional()
  @IsString()
  bonds?: string;

  @IsOptional()
  @IsString()
  flaws?: string;

  @IsOptional()
  @IsString()
  age?: string;

  @IsOptional()
  @IsString()
  skin?: string;

  @IsOptional()
  @IsString()
  hair?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAlliesDTO)
  allies?: Array<UpdateAlliesDTO>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCraftDTO)
  craft?: Array<UpdateCraftDTO>;

  @IsOptional()
  @IsString()
  backstoryId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => DND5eSpellcastingDTO)
  spellcasting?: DND5eCharacterSheet['spellcasting'];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notes?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddonsDTO)
  addons?: Array<UpdateAddonsDTO>;
}

class UpdateDND5eClassesDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  lvl: number;
}

class UpdateClassFeaturesDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;
}

class UpdateHPDTO {
  @IsNumber()
  @IsOptional()
  total: number;

  @IsNumber()
  @IsOptional()
  current: number;

  @IsNumber()
  @IsOptional()
  temporary: number;
}

class UpdateHitDiceDTO {
  @IsNumber()
  @IsOptional()
  total?: number;

  @IsNumber()
  @IsOptional()
  current?: number;

  @IsString()
  @IsOptional()
  type?: string;
}

class UpdateAttributesDTO {
  @IsNumber()
  @IsOptional()
  strength?: number;

  @IsNumber()
  @IsOptional()
  dexterity?: number;

  @IsNumber()
  @IsOptional()
  constitution?: number;

  @IsNumber()
  @IsOptional()
  intelligence?: number;

  @IsNumber()
  @IsOptional()
  wisdom?: number;

  @IsNumber()
  @IsOptional()
  charisma?: number;
}

class UpdateSkillsDTO {
  @IsNumber()
  @IsOptional()
  athletics?: number;

  @IsNumber()
  @IsOptional()
  acrobatics?: number;

  @IsNumber()
  @IsOptional()
  stealth?: number;

  @IsNumber()
  @IsOptional()
  sleightOfHand?: number;

  @IsNumber()
  @IsOptional()
  insight?: number;

  @IsNumber()
  @IsOptional()
  medicine?: number;

  @IsNumber()
  @IsOptional()
  perception?: number;

  @IsNumber()
  @IsOptional()
  survival?: number;

  @IsNumber()
  @IsOptional()
  arcana?: number;

  @IsNumber()
  @IsOptional()
  history?: number;

  @IsNumber()
  @IsOptional()
  investigation?: number;

  @IsNumber()
  @IsOptional()
  nature?: number;

  @IsNumber()
  @IsOptional()
  religion?: number;

  @IsNumber()
  @IsOptional()
  deception?: number;

  @IsNumber()
  @IsOptional()
  intimidation?: number;

  @IsNumber()
  @IsOptional()
  persuasion?: number;
}

class UpdateProficienciesDTO {
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  attributes?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  skills?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  languages?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  equipments?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  others?: string[];
}

class UpdateEquipmentsDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;
}

class UpdateAlliesDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class UpdateCraftDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class UpdateAddonsDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  type?: string;
}

class DND5eSpellcastingDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  spellcastingAbility?: string;

  @IsOptional()
  @IsNumber()
  spellSaveDC?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preparedSpells?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  knownSpells?: string[] = [];

  @IsOptional()
  @IsNumber()
  spellSlots?: number;
}
