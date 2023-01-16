import { IUserEntity } from "@src/modules/users/users.interface";
import { UsersService } from "@src/modules/users/users.service";
import { GetUserByEmailRequest, GetUserByEmailResponse, GetUserByIdRequest, GetUserByIdResponse, ServerUnaryCall, UntypedHandleCall, UpdateUserRequest, UpdateUserResponse, UsersServiceServer, UsersServiceService, sendUnaryData } from "@tranlam1997/lirest-internal-communication-service"

export class UsersServer implements UsersServiceServer {
  [method: string]: UntypedHandleCall;

  public async getUserByEmail(call: ServerUnaryCall<GetUserByEmailRequest, GetUserByEmailResponse>, callback: sendUnaryData<GetUserByEmailResponse>) {
    const user = await UsersService.getUserByEmail(call.request.email);
    callback(null, GetUserByEmailResponse.fromJSON({user}));
  }

  public async getUserById(call: ServerUnaryCall<GetUserByIdRequest, GetUserByIdResponse>, callback: sendUnaryData<GetUserByIdResponse>) {
    const user = await UsersService.getUserById(call.request.id);
    callback(null, GetUserByIdResponse.fromJSON(user));
  }

  public async updateUser(call: ServerUnaryCall<UpdateUserRequest, UpdateUserResponse>, callback: sendUnaryData<UpdateUserResponse>) {
    const user = await UsersService.updateUser(call.request.id, call.request?.user as IUserEntity);
    callback(null, UpdateUserResponse.fromJSON(user));
  }
}