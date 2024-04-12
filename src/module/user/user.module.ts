import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './adapter/mongo/user.schema';
import { UserController } from './adapter/controller/user.controller';
import UserMongoAdapter from './adapter/mongo/UserMongoAdapter';
import { CreateUserUseCase } from './application/usecase/create-user-usecase.service';
import { UpdateUserUseCase } from './application/usecase/update-user-usecase.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    { provide: 'CreateUserCommand', useClass: CreateUserUseCase },
    { provide: 'UpdateUserCommand', useClass: UpdateUserUseCase },
    {
      provide: 'UserRepository',
      useClass: UserMongoAdapter,
    },
  ],
})
export class UserModule {}
