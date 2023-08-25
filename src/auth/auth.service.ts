import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private repository: UsersRepository) {}
  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.repository.createUser(dto);
  }
}
