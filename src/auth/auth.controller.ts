import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { LoginDto } from '@/auth/dto/login.dto';
import { Public } from '@/common/decorators/public.decorator';
type UserWithoutPassword = Omit<User, 'password'>;

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto): Promise<UserWithoutPassword | null> {
    return this.AuthService.register(
      dto.email,
      dto.password,
      dto.confirmPassword,
      dto.name,
    );
  }
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    const user = this.AuthService.validateUser(dto.email, dto.password);
    return user.then((user) => this.AuthService.login(user));
  }
}
