import { Inject, Injectable, Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { CreateSheetDTO } from '../dtos/sheet/create-sheet.dto';
import { Sheet } from '../models/sheet.model';
import { UpdateSheetDTO } from '../dtos/sheet/update-sheet.dto';

@Injectable()
export class SheetService {
  private readonly logger = new Logger(SheetService.name);

  constructor(
    @Inject('SHEET_MODEL')
    private model: Model<Sheet>,
  ) {}

  async create(data: CreateSheetDTO): Promise<Sheet> {
    this.logger.debug('Salvando ficha no banco de dados...');
    const createdSheet = new this.model(data);
    return (await createdSheet.save()).toObject();
  }

  async delete(id: string): Promise<void> {
    this.logger.debug(`Deletando ficha ${id} do banco de dados...`);
    const sheet = await this.model.findById(id);
    if (sheet) {
      await sheet.deleteOne();
    }
    return;
  }

  async update(data: UpdateSheetDTO): Promise<Sheet> {
    this.logger.debug(`Atualizando ficha ${data.sheetId} no banco de dados...`);
    const result = await this.model.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(data.sheetId) },
      {
        ...data,
        updatedAt: new Date(),
      },
    );
    return result ? result.toObject() : null;
  }

  async findAllByUserId(userId: string): Promise<Sheet[]> {
    try {
      return this.model.find({ userId }).exec();
    } catch (error) {
      this.logger.error(
        `Erro ao buscar fichas do usuáario ${userId} no banco de dados: `,
        error,
      );
      throw error;
    }
  }

  async findById(sheetId: string): Promise<Sheet> {
    this.logger.debug(`Buscando ficha ${sheetId} no banco de dados...`);
    const result = await this.model.findOne({
      _id: new mongoose.Types.ObjectId(sheetId),
    });
    return result ? result.toObject() : null;
  }
}
