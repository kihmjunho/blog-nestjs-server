import { Hashtag } from './entities/hashtag.entity';

export interface HashtagRepository {
  findOneByName(name: string): Promise<Hashtag | null>;

  save(hashTag: Hashtag): any;
}
