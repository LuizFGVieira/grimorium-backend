import { Exclude, Expose, Transform } from "class-transformer";
import { SheetTypes } from "src/sheet-manager/common/types/sheets.types";

export class NewSheetResponseDTO {
    @Expose({name: '_id'})
    id: string;

    @Expose()
    name: string;

    @Expose()
    @Transform((param) => new Date(param.value), { toClassOnly: true })
    createdAt: Date;

    @Expose()
    image: string;

    @Expose()
    type: string;

    @Expose()
    sheetDetailsId: string;

    @Expose()
    systemId: string;

    @Expose()
    isPublic: boolean;

    @Exclude()
    __v: number;

    constructor(partial: Partial<NewSheetResponseDTO>) {
        Object.assign(this, partial);
    }
}