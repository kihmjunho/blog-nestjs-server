import { Content } from './entities/content.entity';

export interface ContentRepository {
  save(content: Content): any;
}
