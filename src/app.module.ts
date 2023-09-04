import { Module } from '@nestjs/common';
import { DocumentModule } from './document/document.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    DocumentModule,
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const config = {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          database: configService.get<string>('database.name'),
          password: configService.get<string>('database.password'),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: true,
          autoLoadEntities: true,
        } as TypeOrmModuleOptions;

        return config;
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
