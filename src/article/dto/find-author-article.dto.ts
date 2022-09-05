import { ApiProperty } from '@nestjs/swagger';

export class FindAuthorArticleDto {
  @ApiProperty({
    description: '作者id',
  })
  authorId: number;
}
