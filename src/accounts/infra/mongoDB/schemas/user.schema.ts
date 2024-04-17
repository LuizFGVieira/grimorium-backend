import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  birthdate: Date,
  rpgExperience: String,
  isPlayer: Boolean,
  isMaster: Boolean,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
