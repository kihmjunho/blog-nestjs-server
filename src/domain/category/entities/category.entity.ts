import { Column, Entity, OneToMany } from 'typeorm';
import { IdAndDate } from '../../../common/entities/idAndDate.entity';
import { Content } from '../../content/entities/content.entity';

@Entity()
export class Category extends IdAndDate {
  @Column()
  name: string;

  @OneToMany(() => Content, (content) => content.category)
  contents: Content[];
}
