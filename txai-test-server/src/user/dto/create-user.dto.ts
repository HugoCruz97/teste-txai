import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @IsNotEmpty({ message: 'O nome de usuário não pode ser vazio.' })
  userName: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  password: string;

  @IsNotEmpty({ message: 'O cpf não pode ser vazia.' })
  cpf: string;

  profileImageUrl: string;

  @IsNotEmpty({ message: 'O email não pode ser vazia.' })
  email: string;

  @IsNotEmpty({ message: 'A role não pode ser vazia.' })
  role: string;
}