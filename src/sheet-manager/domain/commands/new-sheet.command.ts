import { Inject, Injectable, Logger } from '@nestjs/common';
import { SheetService } from '../../infra/mongoDB/services/sheet.service';
import { NewSheetRequestDTO } from '../dtos/new-sheet/request.dto';
import { NewSheetResponseDTO } from '../dtos/new-sheet/response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class NewSheetCommand {
  private readonly logger = new Logger(NewSheetCommand.name);
  public onSuccess: (response: NewSheetResponseDTO) => NewSheetResponseDTO;

  public constructor(
    @Inject(SheetService)
    private readonly sheetService: SheetService,
  ) {}

  public async execute(data: NewSheetRequestDTO, userId: string) {
    const createdSheet = await this.sheetService.create({ ...data, userId });
    const response = NewSheetResponseDTO.fromEntity(createdSheet);
    return this.onSuccess(plainToClass(NewSheetResponseDTO, response));
  }
}
