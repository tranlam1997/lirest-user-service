import { UsersService } from './users.service';
import { inject } from 'inversify';
import { TYPES } from './types/users-inversify.types';
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Request,
  Response as Res,
  SuccessResponse,
  Put,
} from "tsoa";
import { UpdateUserBodyRequest } from './interfaces/users.interface';
import { provideSingleton } from '@src/decorators/provide-singleton';
@Route('users')
@provideSingleton(UsersController)
export class UsersController extends Controller {

  constructor(@inject(TYPES.UsersService) private readonly usersService: UsersService) {
    super();
  }

  @Get('{id}')
  async getUserById(@Path() id: string) {
    return this.usersService.getUserById(id);
  }

  @Put()
  async updateUser (@Query() userId: string, @Body() body: UpdateUserBodyRequest) {
    const { affected: isSuccess } = await this.usersService.updateUser(userId, body);
    isSuccess ? this.setStatus(200) : this.setStatus(400);
  }
};
