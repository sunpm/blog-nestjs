import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('auth')
@ApiTags('用户鉴权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '注册',
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: '登陆',
  })
  @ApiBody({ type: LoginDto })
  async login(@CurrentUser() user: UserEntity) {
    return this.authService.login(user);
  }

  @Get('user')
  @ApiOperation({
    summary: '获取用户信息',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async user(@CurrentUser() user: UserEntity) {
    return user;
  }
}
