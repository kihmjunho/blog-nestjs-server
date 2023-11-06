import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariableInterface } from './environmentVariable.interface';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariableInterface>,
      ) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [`dist/**/*.entity{.ts,.js}`],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
          namingStrategy: new SnakeNamingStrategy(),
          logging: configService.get<boolean>('DB_LOGGING'),
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
