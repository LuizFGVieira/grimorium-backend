import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirebaseStorageService } from '../../../common/firebase/services/firebase-storage.service';
import { SheetService } from '../../infra/mongoDB/services/sheet.service';
import { UpdateSheetRequestDTO } from '../dtos/update-sheet/request.dto';

@Injectable()
export class UpdateSheetCommand {
  private readonly logger = new Logger(UpdateSheetCommand.name);
  public onSuccess: () => void;
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
    this.logger.debug(`Atualizando dados da ficha ${sheetId}...`);

    const sheet = await this.sheetService.findById(sheetId);
    if (!sheet || sheet.userId !== userId) {
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

    return this.onSuccess();
  }
}
