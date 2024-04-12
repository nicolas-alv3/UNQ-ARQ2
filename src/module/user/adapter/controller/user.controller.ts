import {
  BadRequestException,
  Body,
  Controller,
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

@Controller('users')
export class UserController {
  constructor(
    @Inject('CreateUserCommand')
    private createUserCommand: CreateUserCommand,
    @Inject('UpdateUserCommand')
    private updateUserCommand: UpdateUserCommand,
  ) {}

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
