import { Expose } from "class-transformer";

export class ActiveUserDTO {
    @Expose({name: '_id'})
    public id: string;

    @Expose()
    email: string;
}