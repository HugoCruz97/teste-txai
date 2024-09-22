import { Injectable } from "@nestjs/common";
import { LoginRepository } from "./repository/login.repository";
import { LoginDto } from "./dto/login.dto";

@Injectable()

export class LoginService {
  constructor(private repository: LoginRepository) {}

  async login(loginDTO: LoginDto) {
    return await this.repository.login(loginDTO)
  }
}