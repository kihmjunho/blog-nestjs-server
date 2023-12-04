import { Inject, Injectable } from '@nestjs/common';
import { CreateContentRequestDto } from './requestDto/createContent.request.dto';
import { Content } from './entities/content.entity';
import {
  CONTENT_IMAGES_REPOSITORY,
  CONTENT_REPOSITORY,
  CONTENT_TO_HASHTAG_REPOSITORY,
  HASHTAG_REPOSITORY,
} from '../../common/constants/token.constant';
import { ContentRepository } from './content.repository';
import { HashtagRepository } from './hashtag.repository';
import { Hashtag } from './entities/hashtag.entity';
import { ContentToHashtag } from './entities/contentToHashtag.entity';
import { ContentToHashtagRepository } from './contentToHashtag.repository';
import { ContentImages } from './entities/contentImages.entity';
import { ContentImagesRepository } from './contentImages.repository';

@Injectable()
export class ContentService {
  constructor(
    @Inject(CONTENT_REPOSITORY)
    private readonly contentRepository: ContentRepository,
    @Inject(CONTENT_IMAGES_REPOSITORY)
    private readonly contentImagesRepository: ContentImagesRepository,
    @Inject(HASHTAG_REPOSITORY)
    private readonly hashtagRepository: HashtagRepository,
    @Inject(CONTENT_TO_HASHTAG_REPOSITORY)
    private readonly contentToHashtagRepository: ContentToHashtagRepository,
  ) {}
  async createContent(createContentRequestDto: CreateContentRequestDto) {
    const { title, description, categoryId, images, hashtagNames } =
      createContentRequestDto;

    const content = new Content();

    content.title = title;
    content.description = description;
    content.categoryId = categoryId;

    const savedContent = await this.contentRepository.save(content);

    for (const image of images) {
      const contentImages = new ContentImages();

      contentImages.content = savedContent;
      contentImages.url = image;

      await this.contentImagesRepository.save(contentImages);
    }

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
