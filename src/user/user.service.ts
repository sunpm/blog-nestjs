import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user.dto';

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
  }

  async findAll(createUserDto: CreateUserDto) {
    const { username, nickname } = createUserDto;
    return await this.userRepository.find({
      where: [{ username }, { nickname }],
    });
  }

  async findOne(findUserDto: FindUserDto) {
    // delete findUserDto.password;
    return this.userRepository.findOne({
      where: findUserDto,
    });
  }

  // 验证邮箱存不存在
  async validateUserEmail(email) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByUsername(username) {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
