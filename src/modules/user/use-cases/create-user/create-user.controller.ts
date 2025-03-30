import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

ApiTags('User');
@Controller('user')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async handle(@Body() body: CreateUserDto) {
    return await this.createUserService.execute(body);
  }
}
