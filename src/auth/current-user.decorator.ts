import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';

// 自定义装饰器
// 返回策略的user数据
export const CurrentUser = createParamDecorator((data, input) => {
  const { user }: { user: UserEntity } = input.switchToHttp().getRequest();
  // 忽略密码
  delete user.password;
  return user;
});
