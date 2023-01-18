import { UpdateResult } from "typeorm";
import { User } from "../users.entity";
import { IUserEntity } from "./users.interface";

export interface UserService {
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  createUser(data: IUserEntity): Promise<User>;
  updateUser(userId: string, data: Partial<User>): Promise<UpdateResult>;
}
