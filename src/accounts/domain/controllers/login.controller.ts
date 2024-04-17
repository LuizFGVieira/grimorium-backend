import { Body, Controller, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { LoginCommand } from '../commands/login.command';
import { LoginRequestDTO } from '../dtos/login/login.request.dto';
import { LoginResponseDTO } from '../dtos/login/login.response.dto';

@Controller('accounts/login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);

  constructor(private readonly command: LoginCommand) {}

  @Post()
  async create(@Body() requestData: LoginRequestDTO) {
    this.command.onInvalidCredentials = this.onInvalidCredentials;
    this.command.onSuccess = this.onSuccess;
    return await this.command.execute(requestData);
  }

  private onSuccess(response: LoginResponseDTO) {
    this.logger.log('Logado com sucesso!');
    return response;
  }

  private onInvalidCredentials() {
    this.logger.error('Falha ao tentar fazer login!');
    throw new UnauthorizedException('Credenciais inválidas');
  }
}
