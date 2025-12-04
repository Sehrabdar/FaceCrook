import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import dotenv from "dotenv";
dotenv.config();


@Module({
    imports: [
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      }),
    ],
})
export class DatabaseModule{};