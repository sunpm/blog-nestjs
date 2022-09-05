import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
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

  async register(registerDto: RegisterDto) {
    const existUser = await this.userService.findOne(registerDto);
    if (existUser) {
      throw new HttpException('邮箱已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userEntity.create(registerDto);
    return await this.userEntity.save(newUser);
  }

  async login(user: UserEntity) {
    const payload = {
      username: user.username,
      id: user.id,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
