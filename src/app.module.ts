import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './domain/user/user.module';
import { JwtAuthModule } from './config/jwt/jwtAuth.mudule';
import { CategoryModule } from './domain/category/category.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    JwtAuthModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
