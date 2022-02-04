import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsOptional()
  @MaxLength(150)
  @ApiProperty({ required: false })
  description?: string;

  @IsNotEmpty()
  @Min(1.0)
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  sku: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
