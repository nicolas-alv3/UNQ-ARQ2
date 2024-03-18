import {Injectable, Logger} from "@nestjs/common";
import {MongooseModule, MongooseModuleOptions, MongooseOptionsFactory} from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    private readonly logger = new Logger(MongooseConfigService.name);

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: process.env.DB_CONNECTION,
        };
    }
}
