import { Inject, Injectable, Logger } from "@nestjs/common";
import { SheetService } from "src/sheet-manager/infra/database/services/sheet.service";
import { NewSheerRequestDTO } from "../dtos/new-sheet/request.dto";
import { NewSheetResponseDTO } from "../dtos/new-sheet/response.dto";
import { plainToClass } from "class-transformer";

@Injectable()
export class NewSheetCommand {
  private readonly logger = new Logger(NewSheetCommand.name)
  public onSuccess: (response: NewSheetResponseDTO) => NewSheetResponseDTO;

  public constructor(
    @Inject(SheetService)
    private readonly sheetService: SheetService,
  ) { }

  public async execute(data: NewSheerRequestDTO, userId: string){
    this.logger.debug("Criando nova ficha...");
    const createdSheet = await this.sheetService.create({...data, userId});

    return this.onSuccess(plainToClass(NewSheetResponseDTO, createdSheet));
  }
}