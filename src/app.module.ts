import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './config/database.module';

@Module({
  imports: [AppConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
