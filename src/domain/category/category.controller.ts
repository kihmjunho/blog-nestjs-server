import { Body, Controller, Post } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryRequestDto } from './dto/createCategory.request.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body() createCategoryRequestDto: CreateCategoryRequestDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryRequestDto);
  }
}
