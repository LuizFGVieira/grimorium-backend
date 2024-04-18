import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SheetTypes } from '../../../common/types/sheets.types';

export class NewSheetRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  systemId: string;

  @IsBoolean()
  @IsNotEmpty()
  public isPublic: boolean;

  @IsEnum(SheetTypes)
  @IsNotEmpty()
  public type: SheetTypes;

  @IsString()
  @IsOptional()
  public image: string;
}
