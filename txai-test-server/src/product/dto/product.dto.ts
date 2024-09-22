import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string

  @IsNotEmpty({ message: 'O produto precisa ter um preço.' })
  price: number

  @IsNotEmpty({ message: 'O produto precisa ter uma quantidade.' })
  quantity: number

  // @IsNotEmpty({ message: 'O produto precisa ter uma data de criação.' })
  // created_at: string

  @IsNotEmpty({ message: 'É necessário o ID do usuário.' })
  userId: number
}