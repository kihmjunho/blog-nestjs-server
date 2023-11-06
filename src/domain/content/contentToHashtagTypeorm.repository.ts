import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ContentToHashtagRepository } from './contentToHashtag.repository';
import { ContentToHashtag } from './entities/contentToHashtag.entity';

@Injectable()
export class ContentToHashtagTypeormRepository
  implements ContentToHashtagRepository
{
  constructor(
    @InjectRepository(ContentToHashtag)
    private readonly contentToHashtagRepository: Repository<ContentToHashtag>,
  ) {}

  async save(ContentToHashtag: ContentToHashtag) {
    const data = await this.contentToHashtagRepository.save(ContentToHashtag);
    console.log(data);
    return;
  }
}
