import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private repository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.repository.createUser(dto);
  }

  async signIn(dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = dto;
    const user = await this.repository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
