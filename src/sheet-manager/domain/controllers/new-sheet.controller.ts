import { Body, Controller, Logger, Post } from '@nestjs/common';
import { NewSheetCommand } from '../commands/new-seet.command';
import { NewSheerRequestDTO } from '../dtos/new-sheet/request.dto';
import { NewSheetResponseDTO } from '../dtos/new-sheet/response.dto';

@Controller('sheets/new-sheet')
export class NewSheetController {
  private readonly logger = new Logger(NewSheetController.name);
  constructor(private readonly command: NewSheetCommand) {}

  @Post()
  async create(@Body() requestData: NewSheerRequestDTO) {
    this.command.onSuccess = this.onSuccess;
    return await this.command.execute(requestData, 'id do usuário');
  }

  private onSuccess(response: NewSheetResponseDTO): NewSheetResponseDTO {
    this.logger.debug('Ficha criada com sucesso');
    return response;
  }
}
