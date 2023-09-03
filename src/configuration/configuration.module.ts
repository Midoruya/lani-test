import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  applicationConfiguration,
  databaseConfiguration,
} from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [applicationConfiguration, databaseConfiguration],
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
  ],
})
export class ConfigurationModule {}
