import { Body, Controller, Logger, Post } from '@nestjs/common';
import { NewUserCommand } from '../commands/new-user.command';

@Controller('accounts/new-user')
export class NewUserController {
  private readonly logger = new Logger(NewUserController.name);

  constructor(private readonly command: NewUserCommand) {}

  @Post()
  async create(@Body() requestData: any) {
    this.command.onSuccess = this.onSuccess;
    await this.command.execute(requestData);
  }

  private onSuccess(response: any) {
    this.logger.debug('Usuário criado com sucesso!');
    return response;
  }
}
