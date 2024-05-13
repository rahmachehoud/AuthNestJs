import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    description: "User registration data",
    type: CreateUserDto,
    examples: {
      a: {
        summary: "Sample registration",
        value: {
          firstname: "john",
          lastname: "doe",
          username: "john_doe",
          password: "securePassword123",
          email: "john_doe@example.com"
        }
      }
    }
  })
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registred.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_doe' },
        password: { type: 'string', format: 'password', example: 'securePassword123' }
      }
    }
  })
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successful, token returned.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid username or password.',
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: {username: string, password: string}) {
    return this.authService.login(credentials.username, credentials.password);
  }
}

