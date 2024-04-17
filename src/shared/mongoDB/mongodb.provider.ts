import { Logger } from "@nestjs/common";
import mongoose, { ConnectOptions } from "mongoose";

export const MongoDBProvider = {
  provide: 'MONGODB_CONNECTION',
  useFactory: async (): Promise<typeof mongoose> => {
    await mongoose.connect(process.env.MONGODB_URI).then((res) => {
        Logger.log('Conexão com MongoDB estabelecida com suceso');
    }).catch((error) => {
        Logger.error('Erro ao conectar-se com MongoDB', error);
    });
    return mongoose;
  },
};
