import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user/repositories/user-repo.interface';
import { User } from '../user/domain/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findBy({ email });

    if (!user?.isPasswordValid(password)) return null;

    return user;
  }
}
