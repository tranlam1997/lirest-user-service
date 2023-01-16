import { BaseRequest } from '@src/base/request';

export interface IUserEntity {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  phoneNumber: string;
  email: string;
  username: string;
  password: string;
}

export interface ICreateUserRequest extends BaseRequest {
  body: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
  };
}

export type IUpdateUserRequest = Partial<ICreateUserRequest>;

export interface IGetUserByIdRequest extends BaseRequest {
  params: {
    id: string;
  };
  accessTokenDecoded?: any;
}
