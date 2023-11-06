import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { HashtagRepository } from './hashtag.repository';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class HashtagTypeormRepository implements HashtagRepository {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async findOneByName(name: string): Promise<Hashtag | null> {
    return await this.hashtagRepository.findOne({ where: { name } });
  }

  async save(hashtag: Hashtag) {
    return await this.hashtagRepository.save(hashtag);
  }
}
