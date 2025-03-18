import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { BaseDatasource } from '../../../common/connection/base-datasource';
import { UserDocument } from '../schema/user.schema';
import { UserDocumentInterface } from '../../domain/interfaces/user-document.interface';
import { Promise } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginationDto } from '../../../common/dto/pagination-dto';

export class UserRepositoryImpl
  extends BaseDatasource<UserDocument>
  implements UserRepository
{
  async create(user: CreateUserDto): Promise<UserDocumentInterface> {
    const userDocument = await this.model.create(user);
    return (await userDocument.save()) as unknown as UserDocumentInterface;
  }

  async getAll(pagination: PaginationDto): Promise<UserDocumentInterface[]> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const userDocuments = await this.model
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return userDocuments as unknown as UserDocumentInterface[];
  }

  async delete(id: string): Promise<UserDocumentInterface> {
    const deletedUser = await this.model.findByIdAndDelete(id).exec();
    return deletedUser as unknown as UserDocumentInterface;
  }

  async show(id: string): Promise<UserDocumentInterface> {
    const user = await this.model.findById(id).exec();
    return user as unknown as UserDocumentInterface;
  }

  async update(
    id: string,
    userData: UpdateUserDto,
  ): Promise<UserDocumentInterface> {
    const updatedUser = await this.model
      .findByIdAndUpdate(
        id,
        userData,
        { new: true, runValidators: true }, // Devuelve el documento actualizado y ejecuta validaciones
      )
      .exec();
    return updatedUser as unknown as UserDocumentInterface;
  }

  async findByCity(city: string): Promise<UserDocumentInterface[]> {
    const userDocuments = await this.model
      .find({
        address: {
          $elemMatch: {
            city: {
              $regex: new RegExp(`^${city.trim()}$`, 'i'), // ^ y $ para full match
            },
          },
        },
      })
      .exec();
    return userDocuments as unknown as UserDocumentInterface[];
  }
}
