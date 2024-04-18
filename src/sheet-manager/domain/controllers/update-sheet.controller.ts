import {
  Body,
  Controller,
  Logger,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ActiveUserDTO } from 'src/common/types/active-user.dto';
import { ActiveUser } from '../../../decorators/active-user.decorator';
import { AuthGuard } from '../../../guards/auth.guard';
import { UpdateSheetCommand } from '../commands/update-sheet.command';
import { UpdateSheetRequestDTO } from '../dtos/update-sheet/request.dto';
import { UpdateSheetResponseDTO } from '../dtos/update-sheet/response.dto';

@UseGuards(AuthGuard)
@Controller('sheets/update-sheet/:sheetId')
export class UpdateSheetController {
  private readonly logger = new Logger(UpdateSheetController.name);
  constructor(private readonly command: UpdateSheetCommand) {}

  @Put()
  async create(
    @ActiveUser() user: ActiveUserDTO,
    @Param('sheetId') sheetId: string,
    @Body() requestData: UpdateSheetRequestDTO,
  ) {
    this.command.onSheetNotFound = this.onSheetNotFound;
    this.command.onSuccess = this.onSuccess;
    return await this.command.execute(user.id, sheetId, requestData);
  }

  private onSuccess(response: UpdateSheetResponseDTO): UpdateSheetResponseDTO {
    this.logger.debug('Dados atualizados com sucesso');
    return response;
  }

  private onSheetNotFound(sheetId: string) {
    this.logger.error(`Ficha ${sheetId} não encontrada`);
    throw new NotFoundException(`Ficha ${sheetId} não encontrada`);
  }
}
