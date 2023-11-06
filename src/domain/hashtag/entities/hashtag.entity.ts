import { Column, Entity, OneToMany } from 'typeorm';

import { IdAndDate } from '../../../common/entities/idAndDate.entity';
import { ContentToHashtag } from '../../content/entities/contentToHashtag.entity';

@Entity()
export class Hashtag extends IdAndDate {
  @Column()
  name: string;

  @OneToMany(
    () => ContentToHashtag,
    (contentToHashtag) => contentToHashtag.hashtag,
  )
  contentToHashtags: ContentToHashtag[];
}
