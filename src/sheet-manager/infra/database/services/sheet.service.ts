import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Sheet } from '../models/sheet.model';
import { CreateSheetDTO } from '../dtos/sheet/create-sheet.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class SheetService {
  constructor(
    @Inject('SHEET_MODEL')
    private model: Model<Sheet>,
  ) {}

  async create(data: CreateSheetDTO): Promise<Sheet> {
    const createdSheet = new this.model(data);
    return createdSheet.save();
  }
}