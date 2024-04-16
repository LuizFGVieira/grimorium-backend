import { Body, Controller, Logger, Post } from '@nestjs/common';
import { NewUserCommand } from '../commands/new-user.command';
import { NewUserRequestDTO } from '../dtos/new-user/new-user.request.dto';
import { NewUserResponseDTO } from '../dtos/new-user/new-user.response.dto';

@Controller('accounts/new-user')
export class NewUserController {
  private readonly logger = new Logger(NewUserController.name);

  constructor(private readonly command: NewUserCommand) {}

  @Post()
  async create(@Body() requestData: NewUserRequestDTO) {
    this.command.onSuccess = this.onSuccess;
    return await this.command.execute(requestData);
  }

  private onSuccess(response: NewUserResponseDTO) {
    this.logger.debug('Usuário criado com sucesso!');
    return response;
  }
}
