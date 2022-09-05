import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({
    summary: '创建文章',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createArticleDto: CreateArticleDto, @CurrentUser() user) {
    return this.articleService.create(createArticleDto, user);
  }

  @Get('findByAuthor/:authorId')
  @ApiOperation({
    summary: '通过作者查全部文章',
  })
  findByAuthorAll(@Param('authorId') authorId: string) {
    return this.articleService.findByAuthorAll(+authorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
