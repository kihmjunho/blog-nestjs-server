import { Module } from '@nestjs/common';

import { AppConfigModule } from './common/config/appConfig.module';
import { DatabaseModule } from './common/config/database.module';
import { UserModule } from './domain/user/user.module';
import { JwtAuthModule } from './common/config/jwt/jwtAuth.mudule';
import { CategoryModule } from './domain/category/category.module';
import { ContentModule } from './domain/content/content.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    JwtAuthModule,
    CategoryModule,
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
