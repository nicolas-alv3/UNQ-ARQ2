import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserCommand } from '../../application/port/in/CreateUserCommand';
import GenericMapper from '../../../utils/GenericMapper';
import { UserRequestDTO } from './dto/UserRequestDTO';
import { UserRestResponseDto } from './dto/UserRestResponseDto';
import { User } from '../../domain/User';
import { UpdateUserCommand } from '../../application/port/in/UpdateUserCommand';
import { FindUsersQuery } from '../../application/port/in/FindUsersQuery';

@Controller('users')
export class UserController {
  constructor(
    @Inject('CreateUserCommand')
    private createUserCommand: CreateUserCommand,
    @Inject('FindUsersCommand')
    private findUsersCommand: FindUsersQuery,
    @Inject('UpdateUserCommand')
    private updateUserCommand: UpdateUserCommand,
  ) {}

  @Get()
  async getAll(): Promise<User[]> {
    const response = await this.findUsersCommand.execute();
    return response.map((u) =>
      GenericMapper.toClass<User, UserRestResponseDto>(
        u,
        new UserRestResponseDto(),
      ),
    );
  }

  @Post()
  async create(@Body() data: UserRequestDTO): Promise<UserRestResponseDto> {
    if (!data) {
      throw new BadRequestException('Invalid product data');
    }
    const response = await this.createUserCommand.execute(
      GenericMapper.toClass<UserRequestDTO, User>(data, new User()),
    );
    return GenericMapper.toClass<User, UserRestResponseDto>(
      response,
      new UserRestResponseDto(),
    );
  }

  @Put()
  async update(
    @Body() data: Partial<UserRequestDTO>,
  ): Promise<UserRestResponseDto> {
    if (!data) {
      throw new BadRequestException('Invalid product data');
    }
    const response = await this.updateUserCommand.execute(
      GenericMapper.toClass<Partial<UserRequestDTO>, User>(data, new User()),
    );
    return GenericMapper.toClass<User, UserRestResponseDto>(
      response,
      new UserRestResponseDto(),
    );
  }
}
