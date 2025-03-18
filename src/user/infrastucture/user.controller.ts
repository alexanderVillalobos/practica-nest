import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCases } from '../application/usecases/create-user.use-cases';
import { User } from '../domain/entities/user.entity';
import { GetAllUsersUseCases } from '../application/usecases/get-all-users.use-cases';
import { FindUserUseCases } from '../application/usecases/find-user.use-cases';
import { UpdateUserUseCases } from '../application/usecases/update-user.use-cases';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserUseCases } from '../application/usecases/delete-user.use-cases';
import { SearchUsersByCityUseCase } from '../application/usecases/search-user-by-city-use-cases';
import { PaginationDto } from '../../common/dto/pagination-dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUseCase: CreateUserUseCases,
    private readonly getAllUseCase: GetAllUsersUseCases,
    private readonly findUseCase: FindUserUseCases,
    private readonly updateUseCase: UpdateUserUseCases,
    private readonly deleteUseCase: DeleteUserUseCases,
    private readonly searchUserByCityCase: SearchUsersByCityUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUseCase.execute(createUserDto);
  }

  @Get('search')
  searchUsers(@Query('city') city: string): Promise<User[]> {
    return this.searchUserByCityCase.execute(city);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.updateUseCase.execute(id, updateUserDto);
  }

  @Get(':id')
  show(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.findUseCase.execute(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.deleteUseCase.execute(id);
  }

  @Get()
  getAll(@Query() pagination: PaginationDto): Promise<User[]> {
    return this.getAllUseCase.execute(pagination);
  }
}
