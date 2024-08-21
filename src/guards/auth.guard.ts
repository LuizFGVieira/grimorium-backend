import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { FirebaseAdminService } from '../common/firebase/services/firebase-admin.service';
import { UserService } from '../accounts/infra/mongoDB/services/user.service';
import { plainToClass } from 'class-transformer';
import { ActiveUserDTO } from '../common/types/active-user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('Autenticando sessão de usuário...');
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      this.logger.error('Token de usuário não encontrado');
      return false;
    }

    const sanitizedToken = token.replace('Bearer ', '');

    try {
      const decodedToken =
        await this.firebaseAdminService.verifyToken(sanitizedToken);
      const user = await this.userService.findByEmail(decodedToken.email);
      request.user = plainToClass(ActiveUserDTO, user);
      this.logger.debug('Usuário autenticado com sucesso');
      return true;
    } catch (error) {
      this.logger.error('Falha ao autenticar usuário');
      return false;
    }
  }
}
