import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSheetDTO } from '../dtos/sheet/create-sheet.dto';
import { Sheet } from '../models/sheet.model';

@Injectable()
export class SheetService {
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
}
