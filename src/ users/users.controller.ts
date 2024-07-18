import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

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
  async updateUser(@Param('uid') uid: string, @Body() body: any) {
    return this.usersService.updateUser(uid, body);
  }

  @Delete(':uid')
  async deleteUser(@Param('uid') uid: string) {
    return this.usersService.deleteUser(uid);
  }
}
