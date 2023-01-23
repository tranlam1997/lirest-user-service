import { UsersService } from './users.service';
import { inject } from 'inversify';
import {
  Body,
  Controller,
  Get,
  Path,
  Query,
  Route,
  Tags,
  Response,
  SuccessResponse,
  Put,
} from "tsoa";
import { UpdateUserBodyRequest } from './interfaces/users.interface';
import { ProvideSingleton } from '@src/decorators/provide-singleton';
import { ErrorResponseModel } from '@src/common/interfaces/error-response-model.interface';

@Route('users')
@Tags('Users')
@Response<ErrorResponseModel<400>>('400', 'Bad Request')
@Response<ErrorResponseModel<401>>('401', 'Unauthorized')
@Response<ErrorResponseModel<403>>('403', 'Forbidden')
@Response<ErrorResponseModel<404>>('404', 'Not Found')
@Response<ErrorResponseModel<422>>('422', 'Validation Failed')
@Response<ErrorResponseModel<500>>('500', 'Internal Server Error')
@ProvideSingleton(UsersController)
export class UsersController extends Controller {

  constructor(@inject(UsersService) private readonly usersService: UsersService) {
    super();
  }
  /**
   * Get user by id
   * @summary Get user by id
   * @param id User id
   */
  @SuccessResponse('200', 'OK')
  @Get('{id}')
  async getUserById(@Path() id: string) {
    return this.usersService.getUserById(id);
  }

  /**
   *  Update user
   *  @summary Update user
   *  @param userId User id
   */
  @SuccessResponse('200', 'OK')
  @Put()
  async updateUser (@Query() userId: string, @Body() body: UpdateUserBodyRequest) {
    const { affected: isSuccess } = await this.usersService.updateUser(userId, body);
    isSuccess ? this.setStatus(200) : this.setStatus(400);
  }
};
