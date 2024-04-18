import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSheetDTO } from '../dtos/sheet/create-sheet.dto';
import { Sheet } from '../models/sheet.model';

@Injectable()
export class SheetService {
  private readonly logger = new Logger(SheetService.name);

  constructor(
    @Inject('SHEET_MODEL')
    private model: Model<Sheet>,
  ) {}

  async create(data: CreateSheetDTO): Promise<Sheet> {
    const createdSheet = new this.model(data);
    return (await createdSheet.save()).toObject();
  }

  async delete(id: string): Promise<void> {
    const sheet = await this.model.findById(id);
    if(sheet) {
      await sheet.deleteOne();
    }
    return;
  }

  async findAllByUserId(userId: string): Promise<Sheet[]> {
    try{
      return this.model.find({userId}).exec();
    }catch(error) {
      this.logger.error(
        `Erro ao buscar fichas do usuáario ${userId} no banco de dados: `,
        error,
      );
      throw error;
    }
  }
}
