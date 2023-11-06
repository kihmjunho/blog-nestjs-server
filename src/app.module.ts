import { Module } from '@nestjs/common';

import { AppConfigModule } from './common/config/appConfig.module';
import { DatabaseModule } from './common/config/database.module';
import { UserModule } from './domain/user/user.module';
import { JwtAuthModule } from './common/config/jwt/jwtAuth.mudule';
import { CategoryModule } from './domain/category/category.module';
import { ContentModule } from './domain/content/content.module';
import { HashtagModule } from './domain/hashtag/hashtag.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    JwtAuthModule,
    CategoryModule,
    ContentModule,
    HashtagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
