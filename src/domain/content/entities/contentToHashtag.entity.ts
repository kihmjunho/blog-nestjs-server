import { Entity, ManyToOne } from 'typeorm';

import { IdAndDate } from '../../../common/entities/idAndDate.entity';
import { Content } from './content.entity';
import { Hashtag } from './hashtag.entity';

@Entity()
export class ContentToHashtag extends IdAndDate {
  @ManyToOne(() => Content, (content) => content.contentToHashtags)
  content: Content;

  @ManyToOne(() => Hashtag, (hashtag) => hashtag.contentToHashtags)
  hashtag: Hashtag;
}
