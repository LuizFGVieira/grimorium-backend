import { Connection } from 'mongoose';
import { DND5eSheetDetailsSchema } from '../schemas/dnd5e-sheet-details.schema';

export const dnd5eSheetProviders = [
  {
    provide: 'DND5E_SHEET_DETAILS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Dnd5e-Sheet-Details', DND5eSheetDetailsSchema),
    inject: ['SHEETS_DATABASE_CONNECTION'],
  },
];
