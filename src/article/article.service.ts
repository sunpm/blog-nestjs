import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createArticleDto: CreateArticleDto, user: UserEntity) {
    const newArticle = await this.articleRepository.create(createArticleDto);
    if (newArticle) {
      newArticle.author = user;
    }
    return this.articleRepository.save(newArticle);
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }
  async findByAuthorAll(authorId: number) {
    const articles = await this.userRepository.find({
      where: { id: authorId },
      relations: ['articles'],
    });
    return articles;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.articleRepository.update(id, updateArticleDto);
    return `This action updates a #${id} article`;
  }

  async remove(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });
    if (!article) {
      throw new UnprocessableEntityException('文章不存在');
    }
    return await this.articleRepository.softDelete(article);
  }
}
