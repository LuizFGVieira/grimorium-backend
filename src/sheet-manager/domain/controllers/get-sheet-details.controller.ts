import {
  Controller,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../../guards/auth.guard';
import { ActiveUser } from '../../../decorators/active-user.decorator';
import { ActiveUserDTO } from '../../../common/types/active-user.dto';
import { GetSheetDetailsCommand } from '../commands/get-sheet-details.command';

@UseGuards(AuthGuard)
@Controller('sheets/:sheetId/details')
export class GetSheetsDetailsController {
  private readonly logger = new Logger(GetSheetsDetailsController.name);
  constructor(private readonly command: GetSheetDetailsCommand) {}

  @Get()
  @HttpCode(200)
  async execute(
    @ActiveUser() user: ActiveUserDTO,
    @Param('sheetId') sheetId: string,
  ) {
    this.command.onSheetNotFound = this.onSheetNotFound;
    this.command.onSuccess = this.onSuccess;
    return await this.command.execute(user.id, sheetId);
  }

  private onSuccess(response: any) {
    this.logger.debug('Detalhes da ficha recuperados com sucesso');
    return response;
  }

  private onSheetNotFound(sheetId: string) {
    this.logger.error(`Ficha ${sheetId} não encontrada`);
    throw new NotFoundException(`Ficha ${sheetId} não encontrada`);
  }
}
