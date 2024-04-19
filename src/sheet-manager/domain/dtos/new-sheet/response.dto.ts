import { Exclude, Expose, Transform } from 'class-transformer';
import { SheetTypes } from '../../../common/types/sheets.types';
import { Sheet } from '../../../infra/mongoDB/models/sheet.model';

export class NewSheetResponseDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Transform((param) => new Date(param.value), { toClassOnly: true })
  createdAt: Date;

  @Expose()
  @Transform((param) => new Date(param.value), { toClassOnly: true })
  updatedAt: Date;

  @Expose()
  @Transform((param) => param? param.value : null)
  image: string | null;

  @Expose()
  type: SheetTypes;

  @Expose()
  sheetDetailsId: string;

  @Expose()
  systemId: string;

  @Expose()
  isPublic: boolean;

  @Expose()
  userId: string;

  @Exclude()
  __v?: number;

  constructor(partial: Partial<NewSheetResponseDTO>) {
    Object.assign(this, partial);
  }

  public static fromEntity(sheet: Sheet): NewSheetResponseDTO {
    const image = sheet.hasOwnProperty('image') ? sheet.image : null;

    const response: NewSheetResponseDTO = {
      id: sheet._id,
      name: sheet.name,
      type: sheet.type as SheetTypes,
      sheetDetailsId: sheet.sheetDetailsId,
      systemId: sheet.systemId,
      isPublic: sheet.isPublic,
      image: image,
      userId: sheet.userId,
      createdAt: sheet.createdAt,
      updatedAt: sheet.updatedAt,
    };

    return response;
  }
}
