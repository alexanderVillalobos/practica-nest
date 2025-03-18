import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../../domain/mappers/user.mapper';
import { PaginationDto } from '../../../common/dto/pagination-dto';

export class GetAllUsersUseCases {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(pagination: PaginationDto): Promise<User[]> {
    const userDocuments = await this.userRepo.getAll(pagination);
    return UserMapper.toDomains(userDocuments);
  }
}
