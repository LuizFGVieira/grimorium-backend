import { Inject, Injectable, Logger } from '@nestjs/common';
import { DND5eCharacterSheetService } from '../../infra/mongoDB/services/dnd5e-character-sheet.service';
import { DND5eCharacterSheet } from '../../infra/mongoDB/models/dnd5e-character-sheet.model';
import { DND5EGetCharacterDetailsResponseDTO } from '../dtos/get-sheet-details/dnd5e-character-response.dto';

@Injectable()
export class DND5eCharacterSheetCommand {
  private readonly logger = new Logger(DND5eCharacterSheetCommand.name);

  constructor(
    @Inject(DND5eCharacterSheetService)
    private readonly dnd5eCharacterSheetService: DND5eCharacterSheetService,
  ) {}

  public async newSheet(sheetId: string): Promise<void> {
    await this.dnd5eCharacterSheetService.create({
      sheetId,
    });
    return;
  }

  public async deleteSheet(sheetId: string): Promise<void> {
    await this.dnd5eCharacterSheetService.delete(sheetId);
    return;
  }

  public async getSheet(sheetId: string): Promise<DND5EGetCharacterDetailsResponseDTO> {
    const sheet = await this.dnd5eCharacterSheetService.findById(sheetId);
    return DND5EGetCharacterDetailsResponseDTO.fromEntity(sheet);
  }
}
