import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';

import { IdAndDate } from '../../../common/entities/idAndDate.entity';
import { Category } from '../../category/entities/category.entity';
import { ContentToHashtag } from './contentToHashtag.entity';
import { ContentImages } from './contentImages.entity';

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

  @OneToMany(() => ContentImages, (contentImages) => contentImages.content)
  contentImages: ContentImages[];

  @OneToMany(
    () => ContentToHashtag,
    (contentToHashtag) => contentToHashtag.content,
  )
  @JoinTable()
  contentToHashtags: ContentToHashtag[];
}
