import { Document } from 'mongoose';
import { RpgExperience } from 'src/accounts/common/types/rgp-experience.type';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly birthdate: Date;
  readonly rpgExperience: RpgExperience;
  readonly isPlayer: boolean;
  readonly isMaster: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
