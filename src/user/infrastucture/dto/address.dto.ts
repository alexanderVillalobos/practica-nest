import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddressDto {
  @IsString({ message: 'La calle debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La calle no puede estar vacía' })
  street: string;

  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La ciudad no puede estar vacía' })
  city: string;

  @IsString({ message: 'El país debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El país no puede estar vacía' })
  country: string;

  @IsNumber({}, { message: 'El código postal debe ser un número' })
  @IsPositive({ message: 'El código postal debe ser positivo' })
  zip_code: number;
}
