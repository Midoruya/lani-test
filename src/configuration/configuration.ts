import { registerAs } from '@nestjs/config';

export interface IApplicationConfiguration {
  port: number;
}

export interface IDatabaseConfiguration {
  host: string;
  port: number;
  password: string;
  user: string;
  name: string;
}

export const applicationConfiguration = registerAs(
  'application',
  () =>
    ({
      port: process.env.APPLICATION_PORT || 5000,
    } as IApplicationConfiguration),
);

export const databaseConfiguration = registerAs(
  'database',
  () =>
    ({
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 5678,
      password: process.env.DATABASE_PASSWORD || '000000',
      user: process.env.DATABASE_USER || 'root',
      name: process.env.DATABASE_NAME || 'develop',
    } as IDatabaseConfiguration),
);
