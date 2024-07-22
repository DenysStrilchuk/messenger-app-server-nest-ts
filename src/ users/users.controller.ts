import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Post,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':uid')
  async getUser(@Param('uid') uid: string) {
    return this.usersService.getUser(uid);
  }

  @Put(':uid')
  async updateUser(@Param('uid') uid: string, @Body() body: Partial<User>) {
    return this.usersService.updateUser(uid, body);
  }

  @Delete(':uid')
  async deleteUser(@Param('uid') uid: string) {
    return this.usersService.deleteUser(uid);
  }

  @Post('clear')
  async clearUsers() {
    await this.usersService.clearUsersCollection();
    return { message: 'All users deleted' };
  }
}
