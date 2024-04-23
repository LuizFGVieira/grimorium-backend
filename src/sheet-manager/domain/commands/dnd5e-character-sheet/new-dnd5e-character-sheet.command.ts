import { Inject, Injectable, Logger } from '@nestjs/common';
import { DND5eCharacterSheetService } from '../../../infra/mongoDB/services/dnd5e-character-sheet.service';
import { NewSheetRequestDTO } from '../../dtos/new-sheet/request.dto';
import { SheetDetailsCommand } from '../sheet-details.command';

@Injectable()
export class DND5eCharacterSheetCommand extends SheetDetailsCommand {
  private readonly logger = new Logger(DND5eCharacterSheetCommand.name);
  @Inject(DND5eCharacterSheetService)
  private readonly dnd5eCharacterSheetService: DND5eCharacterSheetService;

  public async newSheet(
    data: NewSheetRequestDTO,
    sheetId: string,
  ): Promise<void> {
    await this.dnd5eCharacterSheetService.create({
      name: data.name,
      sheetId,
    });
    return;
  }
}
