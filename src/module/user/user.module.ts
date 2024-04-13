import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './adapter/mongo/user.schema';
import { UserController } from './adapter/controller/user.controller';
import UserMongoAdapter from './adapter/mongo/UserMongoAdapter';
import { CreateUserUseCase } from './application/usecase/create-user-usecase.service';
import { UpdateUserUseCase } from './application/usecase/update-user-usecase.service';
import { FindUsersUsecase } from './application/usecase/find-users-usecase.service';
import { SellerSchema } from './adapter/mongo/seller.schema';
import SellerMongoAdapter from './adapter/mongo/SellerMongoAdapter';
import { FindSellersUsecase } from './application/usecase/find-sellers-usecase.service';
import { SellerController } from './adapter/controller/seller.controller';
import { CreateSellerUseCase } from './application/usecase/create-seller-usecase.service';
import { UpdateSellerUseCase } from './application/usecase/update-seller-usecase.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
  ],
  controllers: [UserController, SellerController],
  providers: [
    { provide: 'CreateUserCommand', useClass: CreateUserUseCase },
    { provide: 'FindUsersCommand', useClass: FindUsersUsecase },
    { provide: 'UpdateUserCommand', useClass: UpdateUserUseCase },
    { provide: 'CreateSellerCommand', useClass: CreateSellerUseCase },
    { provide: 'FindSellersCommand', useClass: FindSellersUsecase },
    { provide: 'UpdateSellerCommand', useClass: UpdateSellerUseCase },
    {
      provide: 'UserRepository',
      useClass: UserMongoAdapter,
    },
    {
      provide: 'SellerRepository',
      useClass: SellerMongoAdapter,
    },
  ],
})
export class UserModule {}
