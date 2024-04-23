import { Connection } from 'mongoose';
import { DND5eCharacterSheetSchema } from '../schemas/dnd5e-character-sheet.schema';

export const dnd5eCharacterSheetProviders = [
  {
    provide: 'DND5E_CHARACTER_SHEET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Dnd5e-Character-Sheet', DND5eCharacterSheetSchema),
    inject: ['SHEETS_DATABASE_CONNECTION'],
  },
];
