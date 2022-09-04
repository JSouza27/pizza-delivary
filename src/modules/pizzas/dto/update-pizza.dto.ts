import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdatePizzaDTO {
  @IsString({ message: 'The name must be a string.' })
  @MaxLength(250, { message: 'The name cannot be longer than 250 characters.' })
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(0, { message: 'The price cannot be negative.' })
  @IsOptional()
  price?: number;

  @IsArray({ message: 'Ingredients must be an array.' })
  @IsOptional()
  ingredients?: string[];
}
