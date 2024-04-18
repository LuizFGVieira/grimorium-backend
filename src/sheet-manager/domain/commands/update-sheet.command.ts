import { Inject, Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FirebaseStorageService } from 'src/common/firebase/services/firebase-storage.service';
import { SheetService } from '../../infra/mongoDB/services/sheet.service';
import { UpdateSheetRequestDTO } from '../dtos/update-sheet/request.dto';
import { UpdateSheetResponseDTO } from '../dtos/update-sheet/response.dto';

@Injectable()
export class UpdateSheetCommand {
  private readonly logger = new Logger(UpdateSheetCommand.name);
  public onSuccess: (response: UpdateSheetResponseDTO) => {};
  public onSheetNotFound: (sheetId: string) => void;

  public constructor(
    @Inject(SheetService)
    private readonly sheetService: SheetService,
    @Inject(FirebaseStorageService)
    private readonly firebaseStorageService: FirebaseStorageService,
  ) {}

  public async execute(
    userId: string,
    sheetId: string,
    data: UpdateSheetRequestDTO,
  ) {
    this.logger.debug(`Atualizando dados da ficha do usuário ${sheetId}...`);

    const sheet = await this.sheetService.findById(sheetId);
    if(!sheet || sheet.userId !== userId) {
      return this.onSheetNotFound(sheetId);
    }

    if (data.image) {
      const uploadResult = await this.firebaseStorageService.uploadImage(
        data.image,
        data.type,
      );
      data.image = uploadResult;
    }
    const updatedSheet = await this.sheetService.update({
      sheetId,
      userId,
      ...data,
    });

    return this.onSuccess(plainToClass(UpdateSheetResponseDTO, updatedSheet));
  }
}