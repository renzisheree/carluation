import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dtos/user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { AuthService } from './auth.service';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Get()
  getUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/sign-in')
  signIn(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }
  @Get('/:id')
  getUser(@Param('id') id: string) {
    // return this.userService.findOne(parseInt(id));

    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found ');
    }
    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    this.userService.remove(parseInt(id));
  }
}
