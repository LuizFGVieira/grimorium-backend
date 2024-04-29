import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { NewSheetRequestDTO } from 'src/sheet-manager/domain/dtos/new-sheet/request.dto';
import { SheetTypes } from 'src/sheet-manager/common/types/sheets.types';
import { UpdateSheetRequestDTO } from 'src/sheet-manager/domain/dtos/update-sheet/request.dto';

export class SheetManagerTest {
  private readonly systemTypes = ['DND5E'];
  private readonly sheetTypes = ['CHARACTER'];

  public async newSheetTest(
    app: INestApplication,
    accessToken: string,
    systemId?: string,
    type?: SheetTypes,
  ): Promise<string> {
    const createSheetDto: NewSheetRequestDTO = {
      name: faker.person.fullName(),
      isPublic: faker.datatype.boolean(),
      systemId: systemId ||
        this.systemTypes[
          faker.number.int({ min: 0, max: this.systemTypes.length - 1 })
        ],
      type: type || this.sheetTypes[
        faker.number.int({ min: 0, max: this.sheetTypes.length - 1 })
      ] as SheetTypes,
    };

    const response = await request(app.getHttpServer())
      .post('/sheets/new-sheet')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(createSheetDto)
      .expect(201);

    return response.body.id;
  }

  public async listSheetsTest(
    app: INestApplication,
    accessToken: string,
    createdSheetId: string,
  ): Promise<void> {
    const response = await request(app.getHttpServer())
      .get('/sheets/list')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.data[0]).toBeDefined();
    expect(response.body.data[0].id).toBe(createdSheetId);
    return;
  }

  public async sheetsDetailsTest(
    app: INestApplication,
    accessToken: string,
    createdSheetId: string,
  ): Promise<void> {
    await request(app.getHttpServer())
      .get(`/sheets/${createdSheetId}/details`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    return;
  }

  public async updateSheetTest(
    app: INestApplication,
    accessToken: string,
    createdSheetId: string,
  ): Promise<void> {
    const updateSheetDto: UpdateSheetRequestDTO = {
      name: faker.person.fullName(),
      isPublic: faker.datatype.boolean(),
      systemId:
        this.systemTypes[
          faker.number.int({ min: 0, max: this.systemTypes.length - 1 })
        ],
      type: this.sheetTypes[
        faker.number.int({ min: 0, max: this.sheetTypes.length - 1 })
      ] as SheetTypes,
    };

    await request(app.getHttpServer())
      .put('/sheets/update-sheet/' + createdSheetId)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(updateSheetDto)
      .expect(204);
    return;
  }

  public async deleteSheetTest(
    app: INestApplication,
    accessToken: string,
    createdSheetId: string,
  ): Promise<boolean> {
    const response = await request(app.getHttpServer())
      .delete('/sheets/delete-sheet/' + createdSheetId)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(204);
    return response.status === 204;
  }
}
