import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../../domain/mappers/user.mapper';

@Injectable()
export class SearchUsersByCityUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(city: string): Promise<User[]> {
    if (!city) {
      throw new Error('Invalid city parameter');
    }
    const userDocument = await this.userRepository.findByCity(
      city.toLowerCase().trim(),
    );
    return UserMapper.toDomains(userDocument);
  }
}
