import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../models/sheet.model';
import { CreateUserDTO } from '../dtos/user/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('USER_MODEL')
    private model: Model<User>,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    this.logger.debug('Criando usuário no banco de dados');
    const createdUser = new this.model(data);
    return (await createdUser.save()).toObject();
  }

  async delete(id: string): Promise<void> {
    this.logger.debug(`Deletando usuário ${id} no banco de dados`);
    const user = await this.model.findById(id);
    if(user) {
      await user.deleteOne();
    }
    return;
  }
}
