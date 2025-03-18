import { User } from '../entities/user.entity';
import { UserDocumentInterface } from '../interfaces/user-document.interface';
import { CreateUserDto } from '../../infrastucture/dto/create-user.dto';
import {PaginatedResponse} from "../../../common/dto/pagination-dto";

export class UserMapper {
  static toDomain(userDocument: UserDocumentInterface): User {
    return new User({
      id: userDocument._id,
      name: userDocument.name,
      email: userDocument.email,
      age: userDocument.age,
      createdAt: userDocument.createdAt,
      address: userDocument.address,
    });
  }

  static toDomains(userDocument: UserDocumentInterface[]): User[] {
    return userDocument.map((user) => {
      return this.toDomain(user);
    });
  }

  static toPaginate(
    documents: UserDocumentInterface[],
    total: number,
    page: number,
    limit: number,
  ): PaginatedResponse<User> {
    return {
      data: this.toDomains(documents),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static toPersist(user: User): CreateUserDto {
    return {
      name: user.name,
      email: user.email,
      age: user.age,
      createdAt: user.createdAt,
      address: user.address,
    };
  }
}
