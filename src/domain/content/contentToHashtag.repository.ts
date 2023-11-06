import { ContentToHashtag } from './entities/contentToHashtag.entity';

export interface ContentToHashtagRepository {
  save(contentToHashtag: ContentToHashtag): any;
}
