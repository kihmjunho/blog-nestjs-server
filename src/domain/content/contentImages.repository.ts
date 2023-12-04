import { ContentImages } from './entities/contentImages.entity';

export interface ContentImagesRepository {
  save(contentImages: ContentImages): Promise<ContentImages>;

  delete(id: string): Promise<void>;
}
