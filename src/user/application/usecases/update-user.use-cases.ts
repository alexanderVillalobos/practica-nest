import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserMapper } from '../../domain/mappers/user.mapper';
import { UpdateUserDto } from '../../infrastucture/dto/update-user.dto';

export class UpdateUserUseCases {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string, user: UpdateUserDto): Promise<User> {
    const userDocument = await this.userRepo.update(id, user);
    return UserMapper.toDomain(userDocument);
  }
}
