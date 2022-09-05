import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: '文章标题',
  })
  @IsNotEmpty({
    message: '请填写文章标题',
  })
  title: string;

  @ApiProperty({
    description: '文章内容',
  })
  @IsNotEmpty({
    message: '请填写文章内容',
  })
  content: string;
}
