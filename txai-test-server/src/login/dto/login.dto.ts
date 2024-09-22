import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'O CPF não pode ser vazio.' })
  cpf: string

  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  password: string
}