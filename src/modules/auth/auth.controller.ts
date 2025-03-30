/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from '../user/domain/user.entity';
import { AuthDto } from './dtos/auth.dto';

ApiTags('Auth');
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async handle(@Req() req: Request, @Body() body: AuthDto) {
    return this.authService.login(req.user as User);
  }
}
