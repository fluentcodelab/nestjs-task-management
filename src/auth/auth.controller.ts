import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/signup')
  signUp(@Body() dto: AuthCredentialsDto): Promise<void> {
    return this.service.signUp(dto);
  }

  @Post('/signin')
  signIn(@Body() dto: AuthCredentialsDto): Promise<string> {
    return this.service.signIn(dto);
  }
}
