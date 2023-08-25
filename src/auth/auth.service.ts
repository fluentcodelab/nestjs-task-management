import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private repository: UsersRepository) {}
  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.repository.createUser(dto);
  }

  async signIn(dto: AuthCredentialsDto): Promise<string> {
    const { username, password } = dto;
    const user = await this.repository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
