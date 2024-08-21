import { Expose, Transform } from 'class-transformer';

export class ActiveUserDTO {
  @Expose({ name: '_id' })
  @Transform((param) => param.value + '')
  public id: string;

  @Expose()
  email: string;
}
