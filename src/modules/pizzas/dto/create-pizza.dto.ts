import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePizzaDTO {
  @ApiProperty({
    description: 'Nome da pizza a ser criada',
    example: 'Pepperoni',
  })
  @IsString({ message: 'The name must be a string.' })
  @IsNotEmpty({ message: 'The name cannot be empty or null.' })
  @MaxLength(250, { message: 'The name cannot be longer than 250 characters.' })
  name: string;

  @ApiProperty({
    description: 'Preço da pizza a ser criada',
    example: 25,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'The price cannot be empty or null.' })
  @Min(0, { message: 'The price cannot be negative.' })
  price: number;

  @ApiProperty({
    description: 'Ingredientes da pizza a ser criada',
    example: ['mozzarella', 'tomato', 'pepperoni', 'oregano'],
  })
  @IsArray({ message: 'Ingredients must be an array.' })
  ingredients: string[];
}
