import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()

export class UserService {
  constructor (private repository: UserRepository) {}

  async create(createUserDTO: CreateUserDto) {
    await this.repository.create(createUserDTO);
  }

}