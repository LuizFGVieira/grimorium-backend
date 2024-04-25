import { Inject, Injectable, Logger } from '@nestjs/common';
import { SheetService } from '../../infra/mongoDB/services/sheet.service';
import { DND5eCharacterSheetCommand } from './dnd5e-character-sheet.command';
import { SheetTypes } from '../../common/types/sheets.types';
import { Sheet } from '../../infra/mongoDB/models/sheet.model';
import { DND5EGetCharacterDetailsResponseDTO } from '../dtos/get-sheet-details/dnd5e-character-response.dto';

@Injectable()
export class GetSheetDetailsCommand {
  private readonly logger = new Logger(GetSheetDetailsCommand.name);
  public onSuccess: (response: DND5EGetCharacterDetailsResponseDTO) => void;
  public onSheetNotFound: (sheetId: string) => void;

  public constructor(
    @Inject(SheetService)
    private readonly sheetService: SheetService,
    @Inject(DND5eCharacterSheetCommand)
    private readonly dnd5eCharacterSheetCommand: DND5eCharacterSheetCommand,
  ) {}

  public async execute(userId: string, sheetId: string) {
    this.logger.debug(`Pegando detalhes da ficha ${sheetId}...`);

    const sheet = await this.sheetService.findById(sheetId);
    if (!sheet || sheet.userId !== userId) {
      return this.onSheetNotFound(sheetId);
    }

    const sheetDetails = await this.getSheetDetails(sheet, sheetId);
    return this.onSuccess(DND5EGetCharacterDetailsResponseDTO.fromEntity(sheetDetails));
  }

  private async getSheetDetails(
    sheet: Sheet,
    sheetId: string,
  ): Promise<void> {
    switch (sheet.type) {
      case SheetTypes.CHARACTER:
        return await this.getCharacterSheetDetails(sheet.systemId, sheetId);
      case SheetTypes.CREATURE:
        return await this.getCreatureSheetDetails(sheet.systemId, sheetId);
      case SheetTypes.ITEM:
        return await this.getItemSheetDetails(sheet.systemId, sheetId);
      default:
        return;
    }
  }

  private async getCharacterSheetDetails(
    systemId: string,
    sheetId: string,
  ): Promise<void> {
    switch (systemId) {
      case 'DND5E':
        return await this.dnd5eCharacterSheetCommand.getSheet(sheetId);
      default:
        break;
    }
  }

  private getCreatureSheetDetails(
    systemId: string,
    sheetId: string,
  ): Promise<void> {
    return;
  }

  private getItemSheetDetails(
    systemId: string,
    sheetId: string,
  ): Promise<void> {
    return;
  }

}
