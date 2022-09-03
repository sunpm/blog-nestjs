import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', default: '用户名' })
  username: string;

  @ApiProperty({ description: '昵称', default: '昵称' })
  nickname: string;

  @ApiProperty({ description: '密码', default: '123456' })
  password: string;

  @ApiPropertyOptional({ description: '邮箱', default: '' })
  email: string;
}
