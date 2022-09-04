import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<null | Omit<UserEntity, 'password'>> {
    const existUser = await this.userService.findByUsername(username);
    if (!existUser) {
      return null;
    }
    if (existUser && existUser.password === password) {
      const { password, ...result } = existUser;

      return result;
    }
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
