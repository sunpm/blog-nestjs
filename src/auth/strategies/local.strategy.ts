import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { BcryptService } from '../../utils/cryptogram';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userService.validateUserEmail(email);
    if (!user) {
      throw new BadRequestException('用户名不正确');
    }
    if (!BcryptService.compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确');
    }
    return user;
  }
}
