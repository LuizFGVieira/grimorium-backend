import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { SheetManagerModule } from '../../sheet-manager/sheet-manger.module';
import { SheetService } from '../../sheet-manager/infra/mongoDB/services/sheet.service';
import { NewSheetCommand } from '../../sheet-manager/domain/commands/new-sheet.command';
import { faker } from '@faker-js/faker';
import { CreateSheetDTO } from 'src/sheet-manager/infra/mongoDB/dtos/sheet/create-sheet.dto';
import { NewSheetResponseDTO } from 'src/sheet-manager/domain/dtos/new-sheet/response.dto';

describe('End2End : New Sheets', () => {
  const systemTypes = ['DND5E'];
  const sheetTypes = ['ITEM', 'CHARACTER', 'CREATURE'];

  let app: INestApplication;
  let sheetService: SheetService;
  let newSheetCommand: NewSheetCommand;

  let createdSheetId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SheetManagerModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    sheetService = moduleRef.get<SheetService>(SheetService);
    newSheetCommand = moduleRef.get<NewSheetCommand>(NewSheetCommand);
    return;
  });

  it('[POST:201] /sheets/new-sheet', async () => {
    const createSheetDto: CreateSheetDTO = {
      name: faker.person.fullName(),
      isPublic: faker.datatype.boolean(),
      systemId:
        systemTypes[
          faker.number.int({ min: 0, max: systemTypes.length - 1 })
        ],
      type: sheetTypes[
        faker.number.int({ min: 0, max: sheetTypes.length - 1 })
      ],
      image: faker.image.url(),
      userId: faker.string.uuid(),
    };

    const response = await request(app.getHttpServer())
      .post('/sheets/new-sheet')
      .send(createSheetDto)
      .expect(201);

    createdSheetId = response.body.id;
    expect(createdSheetId).toBeDefined();
    return;
  });

  afterEach(async () => {
    if (createdSheetId) {
      await sheetService.delete(createdSheetId);
    }
    return;
  });
});
