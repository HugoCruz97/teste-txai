import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDto } from "./dto/login.dto";

@Controller('login')

export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDTO: LoginDto
  ) {
    const user = await this.loginService.login(loginDTO)    
    
    return user
  }

}