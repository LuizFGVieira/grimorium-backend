import { Injectable } from '@nestjs/common';
import { NewSheetRequestDTO } from '../dtos/new-sheet/request.dto';

@Injectable()
export abstract class SheetDetailsCommand {
  public abstract newSheet(
    data: NewSheetRequestDTO,
    sheetId: string,
  ): Promise<void>;
}
