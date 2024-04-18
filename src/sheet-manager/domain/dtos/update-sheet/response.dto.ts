import { Exclude, Expose, Transform } from 'class-transformer';
import { SheetTypes } from '../../../common/types/sheets.types';
import { Sheet } from 'src/sheet-manager/infra/mongoDB/models/sheet.model';

export class UpdateSheetResponseDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Transform((param) => new Date(param.value), { toClassOnly: true })
  createdAt: Date;

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
  __v: number;

  constructor(partial: Partial<UpdateSheetResponseDTO>) {
    Object.assign(this, partial);
  }

  public static fromEntity(sheet: Sheet): UpdateSheetResponseDTO {
    const image = sheet.hasOwnProperty('image') ? sheet.image : null;

    const response: UpdateSheetResponseDTO = {
      id: sheet._id,
      name: sheet.name,
      createdAt: sheet.createdAt,
      type: sheet.type as SheetTypes,
      sheetDetailsId: sheet.sheetDetailsId,
      systemId: sheet.systemId,
      isPublic: sheet.isPublic,
      image: image,
      userId: sheet.userId,
      __v: sheet.__v,
    };

    return response;
  }
}
