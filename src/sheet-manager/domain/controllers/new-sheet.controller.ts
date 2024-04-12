import { Body, Controller, Logger, Post } from '@nestjs/common';
import { NewSheetCommand } from '../commands/new-seet.command';
import { NewSheerRequestDTO } from '../dtos/new-sheet/request.dto';

@Controller('sheets/new-sheet')
export class NewSheetController {
  private readonly logger = new Logger(NewSheetController.name);
  constructor(private readonly command: NewSheetCommand) {}

  @Post()
  async create(@Body() requestData: NewSheerRequestDTO) {
    this.command.onSuccess = this.onSuccess;
    return await this.command.execute(requestData, 'id do usuário');
  }

  private onSuccess(response: any): Object {
    this.logger.log('Ficha criada com sucesso', response);
    return response;
  }
}
