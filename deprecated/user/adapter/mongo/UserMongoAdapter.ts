import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/port/out/UserRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { User } from '../../domain/User';

@Injectable()
export default class UserMongoAdapter implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  private mapUser(doc: any): User {
    return {
      id: doc?.id as string,
      lastname: doc?.lastname,
      name: doc?.name,
      email: doc?.email,
    };
  }

  async save(user: User): Promise<User> {
    const result = await this.userModel.create(user);
    if (result?.errors) {
      throw new BadRequestException('Invalid user data');
    }
    return this.mapUser(result);
  }

  async update(user: Partial<User>): Promise<User> {
    const result = await this.userModel.findByIdAndUpdate(user.id, user);
    if (result?.errors) {
      throw new BadRequestException('Invalid user data');
    }
    return { ...this.mapUser(result), ...user };
  }

  async findAll(): Promise<User[]> {
    const response = await this.userModel.find();
    return response.map(this.mapUser);
  }
}
