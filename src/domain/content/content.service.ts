import { Inject, Injectable } from '@nestjs/common';
import { CreateContentRequestDto } from './dto/createContent.request.dto';
import { Content } from './entities/content.entity';
import { CONTENT_REPOSITORY } from '../../common/constants/token.constant';
import { ContentRepository } from './content.repository';
import { ContentToHashtag } from './entities/contentToHashtag.entity';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class ContentService {
  constructor(
    @Inject(CONTENT_REPOSITORY)
    private readonly contentRepository: ContentRepository,
  ) {}
  async createContent(createContentRequestDto: CreateContentRequestDto) {
    const { title, description, categoryId, hashtagNames } =
      createContentRequestDto;
    const content = new Content();
    content.title = title;
    content.description = description;
    content.categoryId = categoryId;

    const savedContent = await this.contentRepository.save(content);

    // 해시태그 저장 로직
    for (const hashtagName of hashtagNames) {
      let insertHashtag;
      const hashtag = await this.hashtagRepository.findOneByName(hashtagName);
      if (!hashtag) {
        const newHashtag = new Hashtag();
        newHashtag.name = hashtagName;
        insertHashtag = await this.hashtagRepository.save(newHashtag);
      }
      insertHashtag = hashtag;
      const contentToHashtag = new ContentToHashtag();
      contentToHashtag.content = savedContent;
      contentToHashtag.hashtag = insertHashtag;
    }

    return savedContent;
  }
}
