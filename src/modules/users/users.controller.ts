import { UsersService } from './users.service';
import { Response } from 'express';
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
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
} from "tsoa";
import { IGetUserByIdRequest, IUpdateUserRequest, IUserEntity } from './interfaces/users.interface';
@Route('users')
@controller('/users')
export class UsersController extends Controller implements interfaces.Controller {

  constructor(@inject(TYPES.UsersService) private readonly usersService: UsersService) {
    super();
  }

  @Get('{id}')
  @httpGet('/:id')
  async getUserById(@Path() @requestParam("id") id: string, @response() res: Response) {
    const user = await this.usersService.getUserById(id);
    return res.status(200).send(user);
  }

  @SuccessResponse("201", "Created")
  @httpPost('/')
  async updateUser (@request() req: IUpdateUserRequest, @response() res: Response) {
    const { affected: isSuccess } = await this.usersService.updateUser(req.params?.userId, req.body);
    return res.status(isSuccess ? 200 : 400).send({ success: isSuccess ? true : false });
  }
};
