import { Body, Controller, Post } from '@nestjs/common';

import { ContentService } from './content.service';
import { CreateContentRequestDto } from './dto/createContent.request.dto';
import { Content } from './entities/content.entity';

@Controller('contents')
export class CategoryController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  async createContent(
    @Body() createContentRequestDto: CreateContentRequestDto,
  ) {
    return await this.contentService.createContent(createContentRequestDto);
  }
}
