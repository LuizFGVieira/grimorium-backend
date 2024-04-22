import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { SheetTypes } from '../../../common/types/sheets.types';
  
  export class UpdateSheetRequestDTO {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    systemId?: string;
  
    @IsBoolean()
    @IsOptional()
    public isPublic?: boolean;
  
    @IsEnum(SheetTypes)
    @IsOptional()
    public type?: SheetTypes;
  
    @IsString()
    @IsOptional()
    public image?: string;
  }
  