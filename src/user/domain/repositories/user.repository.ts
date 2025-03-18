import { CreateUserDto } from '../../infrastucture/dto/create-user.dto';
import { UserDocumentInterface } from '../interfaces/user-document.interface';
import { UpdateUserDto } from '../../infrastucture/dto/update-user.dto';
import { PaginationDto } from '../../../common/dto/pagination-dto';

export abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<UserDocumentInterface>;

  abstract show(id: string): Promise<UserDocumentInterface>;

  abstract update(
    id: string,
    user: UpdateUserDto,
  ): Promise<UserDocumentInterface>;

  abstract delete(id: string): Promise<UserDocumentInterface>;

  abstract getAll(pagination: PaginationDto): Promise<UserDocumentInterface[]>;

  abstract findByCity(city: string): Promise<UserDocumentInterface[]>;
}
