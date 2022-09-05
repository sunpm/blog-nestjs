import {
  createParamDecorator,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';

// 自定义装饰器
// 返回策略的user数据
export const CurrentUser = createParamDecorator((data, input) => {
  try {
    const { user }: { user: UserEntity } = input.switchToHttp().getRequest();
    // 忽略密码
    delete user.password;
    return user;
  } catch (e) {
    throw new HttpException('请添加校验策略', HttpStatus.INTERNAL_SERVER_ERROR);
  }
});
