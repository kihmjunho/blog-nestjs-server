import { Inject, Injectable } from '@nestjs/common';
import { CreateContentRequestDto } from './dto/createContent.request.dto';
import { Content } from './entities/content.entity';
import {
  CONTENT_REPOSITORY,
  CONTENT_TO_HASHTAG_REPOSITORY,
  HASHTAG_REPOSITORY,
} from '../../common/constants/token.constant';
import { ContentRepository } from './content.repository';
import { HashtagRepository } from '../hashtag/hashtag.repository';
import { Hashtag } from '../hashtag/entities/hashtag.entity';
import { ContentToHashtag } from './entities/contentToHashtag.entity';
import { ContentToHashtagRepository } from './contentToHashtag.repository';

@Injectable()
export class ContentService {
  constructor(
    @Inject(CONTENT_REPOSITORY)
    private readonly contentRepository: ContentRepository,
    @Inject(HASHTAG_REPOSITORY)
    private readonly hashtagRepository: HashtagRepository,
    @Inject(CONTENT_TO_HASHTAG_REPOSITORY)
    private readonly contentToHashtagRepository: ContentToHashtagRepository,
  ) {}
  async createContent(createContentRequestDto: CreateContentRequestDto) {
    const { title, description, categoryId, hashtagNames } =
      createContentRequestDto;
    const content = new Content();

    content.title = title;
    content.description = description;
    content.categoryId = categoryId;

    const savedContent = await this.contentRepository.save(content);

    for (const hashtagName of hashtagNames) {
      let insertHashtag: Hashtag;
      const hashtag = await this.hashtagRepository.findOneByName(hashtagName);
      if (!hashtag) {
        const newHashtag = new Hashtag();
        newHashtag.name = hashtagName;
        insertHashtag = await this.hashtagRepository.save(newHashtag);
      } else {
        insertHashtag = hashtag;
      }
      const contentToHashtag = new ContentToHashtag();
      contentToHashtag.content = savedContent;
      contentToHashtag.hashtag = insertHashtag;
      await this.contentToHashtagRepository.save(contentToHashtag);
    }
  }

  async getAll() {
    return await this.contentRepository.getAll();
  }
}
