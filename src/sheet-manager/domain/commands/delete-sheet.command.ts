import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirebaseStorageService } from '../../../common/firebase/services/firebase-storage.service';
import { SheetService } from '../../infra/mongoDB/services/sheet.service';
import { DND5eCharacterSheetCommand } from './dnd5e-character-sheet.command';
import { SheetTypes } from '../../common/types/sheets.types';
import { Sheet } from '../../infra/mongoDB/models/sheet.model';

@Injectable()
export class DeleteSheetCommand {
  private readonly logger = new Logger(DeleteSheetCommand.name);
  public onSuccess: () => void;
  public onSheetNotFound: (sheetId: string) => void;

  public constructor(
    @Inject(SheetService)
    private readonly sheetService: SheetService,
    @Inject(FirebaseStorageService)
    private readonly firebaseStorageService: FirebaseStorageService,
    @Inject(DND5eCharacterSheetCommand)
    private readonly dnd5eCharacterSheetCommand: DND5eCharacterSheetCommand,
  ) {}

  public async execute(userId: string, sheetId: string) {
    this.logger.debug(`Deletando ficha ${sheetId}...`);

    const sheet = await this.sheetService.findById(sheetId);
    if (!sheet || sheet.userId !== userId) {
      return this.onSheetNotFound(sheetId);
    }

    await this.sheetService.delete(sheetId);
    await this.deleteSheetDetails(sheet, sheetId);
    return this.onSuccess();
  }

  private async deleteSheetDetails(
    sheet: Sheet,
    sheetId: string,
  ): Promise<void> {
    switch (sheet.type) {
      case SheetTypes.CHARACTER:
        return await this.deleteCharacterSheetDetails(sheet.systemId, sheetId);
      case SheetTypes.CREATURE:
        return await this.deleteCreatureSheetDetails(sheet.systemId, sheetId);
      case SheetTypes.ITEM:
        return await this.deleteItemSheetDetails(sheet.systemId, sheetId);
      default:
        return;
    }
  }

  private async deleteCharacterSheetDetails(
    systemId: string,
    sheetId: string,
  ): Promise<void> {
    switch (systemId) {
      case 'DND5E':
        return await this.dnd5eCharacterSheetCommand.deleteSheet(sheetId);
      default:
        break;
    }
  }

  private deleteItemSheetDetails(
    systemId: string,
    sheetId: string,
  ): Promise<void> {
    return;
  }

  private deleteCreatureSheetDetails(
    systemId: string,
    sheetId: string,
  ): Promise<void> {
    return;
  }
}
