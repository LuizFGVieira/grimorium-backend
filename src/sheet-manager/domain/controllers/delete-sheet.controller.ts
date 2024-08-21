import {
  Controller,
  Delete,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ActiveUserDTO } from '../../../common/types/active-user.dto';
import { ActiveUser } from '../../../decorators/active-user.decorator';
import { AuthGuard } from '../../../guards/auth.guard';
import { DeleteSheetCommand } from '../commands/delete-sheet.command';

@UseGuards(AuthGuard)
@Controller('sheets/delete-sheet/:sheetId')
export class DeleteSheetController {
  private readonly logger = new Logger(DeleteSheetController.name);
  constructor(private readonly command: DeleteSheetCommand) {}

  @Delete()
  @HttpCode(204)
  async execute(
    @ActiveUser() user: ActiveUserDTO,
    @Param('sheetId') sheetId: string,
  ) {
    this.command.onSheetNotFound = this.onSheetNotFound;
    this.command.onSuccess = this.onSuccess;
    return await this.command.execute(user.id, sheetId);
  }

  private onSuccess(): void {
    this.logger.debug('Ficha deletada com sucesso');
    return;
  }

  private onSheetNotFound(sheetId: string) {
    this.logger.error(`Ficha ${sheetId} não encontrada`);
    throw new NotFoundException(`Ficha ${sheetId} não encontrada`);
  }
}
