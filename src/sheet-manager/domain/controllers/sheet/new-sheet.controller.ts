import { Body, Controller, Post } from '@nestjs/common';
import { SheetService } from 'src/sheet-manager/infra/database/services/sheet.service';

@Controller('sheets/new-sheet')
export class NewSheetController {
  constructor(private readonly sheetService: SheetService) {}

  @Post()
  async create(@Body() requestData: any): Promise<Object> {
    await this.sheetService.create(requestData);
    return {
      success: true,
    };
  }
}
