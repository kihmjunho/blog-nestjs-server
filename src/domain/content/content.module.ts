import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Content } from './entities/content.entity';
import { Hashtag } from '../hashtag/entities/hashtag.entity';
import { ContentToHashtag } from './entities/contentToHashtag.entity';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import {
  CONTENT_REPOSITORY,
  CONTENT_TO_HASHTAG_REPOSITORY,
  HASHTAG_REPOSITORY,
} from '../../common/constants/token.constant';
import { ContentTypeormRepository } from './contentTypeorm.repository';
import { HashtagTypeormRepository } from '../hashtag/hashtagTypeorm.repository';
import { ContentToHashtagTypeormRepository } from './contentToHashtagTypeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Hashtag, ContentToHashtag])],
  controllers: [ContentController],
  providers: [
    ContentService,
    {
      provide: CONTENT_REPOSITORY,
      useClass: ContentTypeormRepository,
    },
    {
      provide: HASHTAG_REPOSITORY,
      useClass: HashtagTypeormRepository,
    },
    {
      provide: CONTENT_TO_HASHTAG_REPOSITORY,
      useClass: ContentToHashtagTypeormRepository,
    },
  ],
})
export class ContentModule {}
