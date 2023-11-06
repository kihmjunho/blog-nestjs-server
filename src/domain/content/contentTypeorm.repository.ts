import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ContentRepository } from './content.repository';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentTypeormRepository implements ContentRepository {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async save(content: Content): Promise<Content> {
    return await this.contentRepository.save(content);
  }

  async getAll() {
    return await this.contentRepository.find({
      relations: {
        contentToHashtags: {
          hashtag: true,
        },
      },
    });
  }
}
