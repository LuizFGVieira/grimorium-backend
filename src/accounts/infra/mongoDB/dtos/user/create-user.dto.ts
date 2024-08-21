import { RpgExperience } from '../../../../common/types/rgp-experience.type';

export class CreateUserDTO {
  public name: string;
  public email: string;
  public birthdate: Date;
  public rpgExperience: RpgExperience;
  public isPlayer: boolean;
  public isMaster: boolean;
}
