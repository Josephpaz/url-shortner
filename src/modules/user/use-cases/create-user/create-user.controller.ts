import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserMapper } from '../../mappers';

@ApiTags('User')
@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async handle(@Body() body: CreateUserDto) {
    const result = await this.createUserService.execute(body);

    return { ...result, data: UserMapper.toDto(result.data) };
  }
}
