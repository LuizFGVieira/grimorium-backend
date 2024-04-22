import { INestApplication } from '@nestjs/common';
import { LoginRequestDTO } from '../accounts/domain/dtos/login/login.request.dto';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { NewUserRequestDTO } from 'src/accounts/domain/dtos/new-user/new-user.request.dto';
import { RpgExperience } from 'src/accounts/common/types/rgp-experience.type';

export interface UserTestCredentials {
  email: string;
  password: string;
}

export class AccountsTest {
  private readonly rpgExperiences = ['BEGINNER', 'INTERMEDIARY', 'ADVANCED'];

  public async loginTest(
    userCredentials: UserTestCredentials,
    app: INestApplication,
  ): Promise<string> {
    const data: LoginRequestDTO = {
      email: userCredentials.email,
      password: userCredentials.password,
    };

    const response = await request(app.getHttpServer())
      .post('/accounts/login')
      .send(data)
      .expect(201);

    return response.body.token;
  }

  public async newUserTest(
    app: INestApplication,
  ): Promise<UserTestCredentials> {
    const data: NewUserRequestDTO = {
      name: faker.person.fullName(),
      birthdate: faker.date.birthdate(),
      email: faker.internet.email(),
      isMaster: faker.datatype.boolean(),
      isPlayer: faker.datatype.boolean(),
      password: faker.internet.password(),
      rpgExperience: this.rpgExperiences[
        faker.number.int({ min: 0, max: this.rpgExperiences.length - 1 })
      ] as RpgExperience,
    };

    await request(app.getHttpServer())
      .post('/accounts/new-user')
      .send(data)
      .expect(201);

    return {
      email: data.email,
      password: data.password,
    };
  }
}
