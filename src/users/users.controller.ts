import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {}

  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }

  @Get()
  getUser() {}

  @Patch('/:id')
  updateUser() {}

  @Delete('/:id')
  deleteUser() {}
}
