import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../../domain/mappers/user.mapper';

export class FindUserUseCases {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<User> {
    const userDocument = await this.userRepo.show(id);
    return UserMapper.toDomain(userDocument);
  }
}
