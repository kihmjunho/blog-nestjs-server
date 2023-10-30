import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { IdAndDate } from '../../../common/entities/idAndDate.entity';
import { Category } from '../../category/entities/category.entity';
import { ContentToHashtag } from './contentToHashtag.entity';

@Entity()
export class Content extends IdAndDate {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  views: number;

  @ManyToOne(() => Category, (category) => category.contents)
  category: Category;

  @Column()
  categoryId: string;

  @OneToMany(
    () => ContentToHashtag,
    (contentToHashtag) => contentToHashtag.content,
  )
  contentToHashtags: ContentToHashtag[];
}
