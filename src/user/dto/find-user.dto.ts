import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindUserDto {
  @ApiProperty({ description: 'id', default: 123 })
  id?: number;

  @ApiProperty({ description: '用户名', default: '用户名' })
  username?: string;

  @ApiProperty({ description: '昵称', default: '昵称' })
  nickname?: string;

  @ApiPropertyOptional({ description: '邮箱', default: '' })
  email?: string;

  @ApiPropertyOptional({ description: '密码', default: '' })
  password?: string;
}
