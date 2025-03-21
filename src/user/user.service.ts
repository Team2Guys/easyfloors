import { Injectable } from '@nestjs/common';
import { CreateUserInput, UserLogin } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { customHttpException } from '../utils/helper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async create(createUserInput: CreateUserInput) {
    try {
      const { name, email, password } = createUserInput
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return customHttpException("User already exists!", 'BAD_REQUEST');
      }

      return await this.prisma.user.create({ data: createUserInput })

    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }


  async userLogin(createUserInput: UserLogin) {
    try {
      const {email, password } = createUserInput
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (!existingUser) {
        return customHttpException("User already exists!", 'BAD_REQUEST');
      }

      if(existingUser.email !== email && existingUser.password !==password){
      return customHttpException("Invalid User name or passowrd", 'UNAUTHORIZED');   
      }

    return  existingUser;

    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }
  async findAll() {

    try {
      return await this.prisma.user.findMany()
    }
    catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }



  async findOne(email: string) {

    try {
return this.prisma.user.findFirst({where:{email}})
    }
    catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    try {
      const {id, ...withoutId}  = updateUserInput;
     return this.prisma.user.update({where:{id}, data: withoutId})

    }

    catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async remove(id: number) {
try{
  await this.prisma.user.delete({where:{id}})
}
    catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }
}
