import { Connection } from 'mongoose';
import { SheetSchema } from '../schemas/sheet.schema';

export const sheetProviders = [
  {
    provide: 'SHEET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Sheet', SheetSchema),
    inject: ['SHEETS_DATABASE_CONNECTION'],
  },
];
