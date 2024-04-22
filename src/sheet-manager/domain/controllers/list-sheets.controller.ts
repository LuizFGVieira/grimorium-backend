import { Controller, Get, HttpCode, Logger, UseGuards } from '@nestjs/common';
import { NewSheetResponseDTO } from '../dtos/new-sheet/response.dto';
import { AuthGuard } from '../../../guards/auth.guard';
import { ActiveUser } from '../../../decorators/active-user.decorator';
import { ActiveUserDTO } from '../../../common/types/active-user.dto';
import { ListSheetsCommand } from '../commands/list-sheets.command';

@UseGuards(AuthGuard)
@Controller('sheets/list')
export class ListSheetsController {
  private readonly logger = new Logger(ListSheetsController.name);
  constructor(private readonly command: ListSheetsCommand) {}

  @Get()
  @HttpCode(200)
  async execute(@ActiveUser() user: ActiveUserDTO) {
    this.command.onSuccess = this.onSuccess;
    return await this.command.execute(user.id);
  }

  private onSuccess(response: NewSheetResponseDTO[]) {
    this.logger.debug('Listagem de fichas feita com sucesso');
    return {
      data: response,
    };
  }
}
