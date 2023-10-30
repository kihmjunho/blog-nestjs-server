import { Inject, Injectable } from '@nestjs/common';
import { CreateContentRequestDto } from './dto/createContent.request.dto';
import { Content } from './entities/content.entity';
import { CONTENT_REPOSITORY } from '../../common/constants/token.constant';
import { ContentRepository } from './content.repository';

@Injectable()
export class ContentService {
  constructor(
    @Inject(CONTENT_REPOSITORY)
    private readonly contentRepository: ContentRepository,
  ) {}
  async createContent(createContentRequestDto: CreateContentRequestDto) {
    const { title, description, categoryId } = createContentRequestDto;
    const content = new Content();

    return this.contentRepository.save(content);
  }
}
