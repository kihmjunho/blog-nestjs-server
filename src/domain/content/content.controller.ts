import { Body, Controller, Get, Post } from '@nestjs/common';

import { ContentService } from './content.service';
import { CreateContentRequestDto } from './dto/createContent.request.dto';
// import { Content } from './entities/content.entity';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getAll() {
    return await this.contentService.getAll();
  }
  @Post()
  async createContent(
    @Body() createContentRequestDto: CreateContentRequestDto,
  ) {
    return await this.contentService.createContent(createContentRequestDto);
  }
}
