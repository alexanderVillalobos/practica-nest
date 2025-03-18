import { Address } from '../../domain/interfaces/address';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNumber()
  @IsPositive()
  readonly age: number;

  @IsOptional()
  readonly createdAt?: Date;

  @IsArray({ message: 'La dirección debe ser un array' })
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  readonly address: Address[];
}
