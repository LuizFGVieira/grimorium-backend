import * as mongoose from 'mongoose';

export const SheetSchema = new mongoose.Schema({
  id: String,
  userId: String,
  systemId: String,
  sheetDetailsId: String,
  isPublic: Boolean,
  type: String,
  image: String,
  name: String,
  createdAt: {type: Date, default: Date.now()},
});