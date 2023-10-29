import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './domain/user/user.module';
import { JwtAuthModule } from './config/jwt/jwtAuth.mudule';

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule, JwtAuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
