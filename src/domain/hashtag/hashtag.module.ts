import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hashtag } from './entities/hashtag.entity';
import { HASHTAG_REPOSITORY } from '../../common/constants/token.constant';
import { HashtagTypeormRepository } from './hashtagTypeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  controllers: [],
  providers: [
    {
      provide: HASHTAG_REPOSITORY,
      useClass: HashtagTypeormRepository,
    },
  ],
})
export class HashtagModule {}
