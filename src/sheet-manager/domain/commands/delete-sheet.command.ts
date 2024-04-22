import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirebaseStorageService } from '../../../common/firebase/services/firebase-storage.service';
import { SheetService } from '../../infra/mongoDB/services/sheet.service';

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
  ) {}

  public async execute(
    userId: string,
    sheetId: string,
  ) {
    this.logger.debug(`Deletando ficha ${sheetId}...`);

    const sheet = await this.sheetService.findById(sheetId);
    if (!sheet || sheet.userId !== userId) {
      return this.onSheetNotFound(sheetId);
    }

    await this.sheetService.delete(sheetId);
    return this.onSuccess();
  }
}
