import { Document } from "mongoose";

export interface Sheet extends Document {
    readonly userId: string;
    readonly systemId: string;
    readonly sheetDetailsId: string;
    readonly isPublic: boolean;
    readonly type: string;
    readonly image: string;
    readonly name: string;
    readonly createdAt: Date;
}