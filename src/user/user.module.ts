import { Module } from '@nestjs/common';
import { UserController } from './infrastucture/user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { UserRepositoryImpl } from './infrastucture/repositories/user.repository.impl';
import { CreateUserUseCases } from './application/usecases/create-user.use-cases';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './infrastucture/schema/user.schema';
import { GetAllUsersUseCases } from './application/usecases/get-all-users.use-cases';
import { FindUserUseCases } from './application/usecases/find-user.use-cases';
import { UpdateUserUseCases } from './application/usecases/update-user.use-cases';
import { DeleteUserUseCases } from './application/usecases/delete-user.use-cases';
import { SearchUsersByCityUseCase } from './application/usecases/search-user-by-city-use-cases';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: CreateUserUseCases,
      useFactory: (userRepository: UserRepository) => {
        return new CreateUserUseCases(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: GetAllUsersUseCases,
      useFactory: (userRepository: UserRepository) => {
        return new GetAllUsersUseCases(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: FindUserUseCases,
      useFactory: (userRepository: UserRepository) => {
        return new FindUserUseCases(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: UpdateUserUseCases,
      useFactory: (userRepository: UserRepository) => {
        return new UpdateUserUseCases(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: DeleteUserUseCases,
      useFactory: (userRepository: UserRepository) => {
        return new DeleteUserUseCases(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: SearchUsersByCityUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new SearchUsersByCityUseCase(userRepository);
      },
      inject: [UserRepository],
    },
  ],
})
export class UserModule {}
