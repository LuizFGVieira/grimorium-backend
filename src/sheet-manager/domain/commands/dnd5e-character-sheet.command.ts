import { Inject, Injectable, Logger } from '@nestjs/common';
import { DND5eCharacterSheetService } from '../../infra/mongoDB/services/dnd5e-character-sheet.service';
import { NewSheetRequestDTO } from '../dtos/new-sheet/request.dto';

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

  public async getSheet(sheetId: string): Promise<any> {
    return await this.dnd5eCharacterSheetService.findById(sheetId);
  }
}
