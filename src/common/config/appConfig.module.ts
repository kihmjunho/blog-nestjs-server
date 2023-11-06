import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvironmentVariableInterface } from './environmentVariable.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object<EnvironmentVariableInterface>({
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),
        DB_LOGGING: Joi.boolean().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppConfigModule {}
