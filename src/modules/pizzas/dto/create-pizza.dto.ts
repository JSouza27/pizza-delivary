import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePizzaDTO {
  @IsString({ message: 'The name must be a string.' })
  @IsNotEmpty({ message: 'The name cannot be empty or null.' })
  @MaxLength(250, { message: 'The name cannot be longer than 250 characters.' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'The price cannot be empty or null.' })
  @Min(0, { message: 'The price cannot be negative.' })
  price: number;

  @IsArray({ message: 'Ingredients must be an array.' })
  ingredients: string[];
}
