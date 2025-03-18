import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../../domain/mappers/user.mapper';

export class DeleteUserUseCases {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<User> {
    const userDocument = await this.userRepo.delete(id);
    return UserMapper.toDomain(userDocument);
  }
}
