import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { NewSheetCommand } from '../commands/new-sheet.command';
import { NewSheetRequestDTO } from '../dtos/new-sheet/request.dto';
import { NewSheetResponseDTO } from '../dtos/new-sheet/response.dto';
import { AuthGuard } from '../../../guards/auth.guard';
import { ActiveUser } from '../../../decorators/active-user.decorator';
import { ActiveUserDTO } from 'src/common/types/active-user.dto';

@UseGuards(AuthGuard)
@Controller('sheets/new-sheet')
export class NewSheetController {
  private readonly logger = new Logger(NewSheetController.name);
  constructor(private readonly command: NewSheetCommand) {}

  @Post()
  async create(
    @Body() requestData: NewSheetRequestDTO,
    @ActiveUser() user: ActiveUserDTO,
  ) {
    this.command.onSuccess = this.onSuccess;
    return await this.command.execute(requestData, user.id);
  }

  private onSuccess(response: NewSheetResponseDTO): NewSheetResponseDTO {
    this.logger.debug('Ficha criada com sucesso');
    return response;
  }
}
