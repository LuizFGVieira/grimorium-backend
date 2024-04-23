import { Inject, Injectable, Logger } from '@nestjs/common';
import { SheetService } from '../../infra/mongoDB/services/sheet.service';
import { NewSheetRequestDTO } from '../dtos/new-sheet/request.dto';
import { NewSheetResponseDTO } from '../dtos/new-sheet/response.dto';
import { plainToClass } from 'class-transformer';
import { FirebaseStorageService } from '../../../common/firebase/services/firebase-storage.service';
import { SheetDetailsCommand } from './sheet-details.command';
import { SheetTypes } from '../../common/types/sheets.types';
import { DND5eCharacterSheetCommand } from './dnd5e-character-sheet/new-dnd5e-character-sheet.command';

@Injectable()
export class NewSheetCommand {
  private readonly logger = new Logger(NewSheetCommand.name);
  private sheetDetailsCommand: SheetDetailsCommand;
  public onSuccess: (response: NewSheetResponseDTO) => NewSheetResponseDTO;

  public constructor(
    @Inject(SheetService)
    private readonly sheetService: SheetService,
    @Inject(FirebaseStorageService)
    private readonly firebaseStorageService: FirebaseStorageService,
  ) {}

  public async execute(data: NewSheetRequestDTO, userId: string) {
    this.logger.debug('Criando ficha...');
    if (data.image) {
      const uploadResult = await this.firebaseStorageService.uploadImage(
        data.image,
        data.type,
      );
      data.image = uploadResult;
    }

    const createdSheet = await this.sheetService.create({ ...data, userId });
    await this.createSheetDetails(data, createdSheet._id);

    const response = NewSheetResponseDTO.fromEntity(createdSheet);
    return this.onSuccess(plainToClass(NewSheetResponseDTO, response));
  }

  private async createSheetDetails(
    data: NewSheetRequestDTO,
    sheetId: string,
  ): Promise<void> {
    switch (data.type) {
      case SheetTypes.CHARACTER:
        return await this.createCharacterSheetDetails(data, sheetId);
      case SheetTypes.CREATURE:
        return await this.createCreatureSheetDetails(data, sheetId);
      case SheetTypes.ITEM:
        return await this.createItemSheetDetails(data, sheetId);
      default:
        return;
    }
  }

  private async createCharacterSheetDetails(
    data: NewSheetRequestDTO,
    sheetId: string,
  ): Promise<void> {
    switch (data.systemId) {
      case 'DND5E':
        this.sheetDetailsCommand = new DND5eCharacterSheetCommand();
        return await this.sheetDetailsCommand.newSheet(data, sheetId);
      default:
        break;
    }
  }

  private createItemSheetDetails(
    data: NewSheetRequestDTO,
    sheetId: string,
  ): Promise<void> {
    return;
  }

  private createCreatureSheetDetails(
    data: NewSheetRequestDTO,
    sheetId: string,
  ): Promise<void> {
    return;
  }
}
