import { Inject, Injectable, Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { UpdateSheetDTO } from '../dtos/sheet/update-sheet.dto';
import { CreateDND5eCharacterSheetDTO } from '../dtos/dnd5e-character-sheet/create.dto';
import { DND5eCharacterSheet } from '../models/dnd5e-character-sheet.model';

@Injectable()
export class DND5eCharacterSheetService {
  private readonly logger = new Logger(DND5eCharacterSheetService.name);

  constructor(
    @Inject('DND5E_CHARACTER_SHEET_MODEL')
    private model: Model<DND5eCharacterSheet>,
  ) {}

  async create(
    data: CreateDND5eCharacterSheetDTO,
  ): Promise<DND5eCharacterSheet> {
    this.logger.debug('Salvando ficha de D&D 5e no banco de dados...');
    const createdSheet = new this.model(data);
    return (await createdSheet.save()).toObject();
  }

  async delete(sheetId: string): Promise<void> {
    this.logger.debug(`Deletando ficha ${sheetId} do banco de dados...`);
    const sheet = await this.model.findOne({ sheetId: sheetId });
    if (sheet) {
      await sheet.deleteOne();
    }
    return;
  }

  async update(data: UpdateSheetDTO): Promise<DND5eCharacterSheet> {
    this.logger.debug(`Atualizando ficha ${data.sheetId} no banco de dados...`);
    try {
      const result = await this.model.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.sheetId) },
        {
          ...data,
          updatedAt: new Date(),
        },
      );
      return result ? result.toObject() : null;
    } catch (error) {
      this.logger.error(
        `Erro ao atualizar dados da ficha ${data.sheetId} no banco de dados...`,
        error,
      );
      return null;
    }
  }

  async findById(sheetId: string): Promise<DND5eCharacterSheet> {
    this.logger.debug(`Buscando ficha ${sheetId} no banco de dados...`);
    const result = await this.model.findOne({
      sheetId: sheetId,
    });
    return result ? result.toObject() : null;
  }
}
