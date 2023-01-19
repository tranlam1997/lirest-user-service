import { UpdateResult } from "typeorm";
import { User } from "../users.entity";

export interface UserService {
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  createUser(data: User): Promise<User>;
  updateUser(userId: string, data: Partial<User>): Promise<UpdateResult>;
}
