import { Inject, Injectable, Logger } from '@nestjs/common';
import { SheetService } from '../../infra/mongoDB/services/sheet.service';
import { plainToClass } from 'class-transformer';
import { ListSheetsResponseDTO } from '../dtos/list-sheets/response.dto';

@Injectable()
export class ListSheetsCommand {
  private readonly logger = new Logger(ListSheetsCommand.name);
  public onSuccess: (response: ListSheetsResponseDTO[]) => void;

  public constructor(
    @Inject(SheetService)
    private readonly sheetService: SheetService,
  ) {}

  public async execute(userId: string) {
    this.logger.debug(`Listando fichas do usuário ${userId}...`);
    const sheets = await this.sheetService.findAllByUserId(userId);
    const response: ListSheetsResponseDTO[] = sheets.map((sheet) => {
      const partialSheet = ListSheetsResponseDTO.fromEntity(sheet);
      return plainToClass(ListSheetsResponseDTO, partialSheet);
    });
    return this.onSuccess(response);
  }
}
