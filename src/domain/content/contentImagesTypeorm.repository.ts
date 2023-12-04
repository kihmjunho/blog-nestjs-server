import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentImagesRepository } from './contentImages.repository';
import { ContentImages } from './entities/contentImages.entity';

@Injectable()
export class ContentImagesTypeormRepository implements ContentImagesRepository {
  constructor(
    @InjectRepository(ContentImages)
    private readonly contentImagesRepository: Repository<ContentImages>,
  ) {}

  async save(contentImages: ContentImages) {
    return await this.contentImagesRepository.save(contentImages);
  }

  async delete(id: string) {
    await this.contentImagesRepository.manager.transaction(async (manager) => {
      await manager.softDelete(ContentImages, id);
    });
  }
}
