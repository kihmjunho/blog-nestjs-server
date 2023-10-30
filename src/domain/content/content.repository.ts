import { CreateContentRequestDto } from './dto/createContent.request.dto';

export interface ContentRepository {
  save(createContentRequestDto: CreateContentRequestDto): any;
}
