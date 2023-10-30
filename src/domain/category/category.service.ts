import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryRequestDto } from './dto/createCategory.request.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryRequestDto: CreateCategoryRequestDto) {
    const { name } = createCategoryRequestDto;
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }
}
