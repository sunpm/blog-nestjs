import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: '邮箱',
    default: '15022352@qq.com',
  })
  email: string;

  @ApiProperty({
    description: '密码',
    default: '123456',
  })
  password: string;
}
