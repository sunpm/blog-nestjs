import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, nickname } = createUserDto;
    const existUsername = await this.userRepository.findOne({
      where: { username },
    });
    const existNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    if (existUsername) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    if (existNickname) {
      throw new HttpException('昵称已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
