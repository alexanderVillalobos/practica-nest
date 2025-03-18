import { CreateUserDto } from '../../infrastucture/dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserMapper } from '../../domain/mappers/user.mapper';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class CreateUserUseCases {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(user: CreateUserDto): Promise<User> {
    try {
      const userDocument = await this.userRepo.create(user);
      return UserMapper.toDomain(userDocument);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `User email exists ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(`Cante create user`);
    }
  }
}
