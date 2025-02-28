import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin_login, CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { customHttpException } from 'utils/helper';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) { }
  async create(createAdminInput: CreateAdminInput) {

    try {
      let existingAdmin = await this.prisma.admins.findFirst({ where: { email: createAdminInput.email } })
      if (existingAdmin) {
        customHttpException("User Already Exist", 'BAD_REQUEST');
        return
      }
      await this.prisma.admins.create({ data: { ...createAdminInput } })
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');

    }
  }

  async AdminLogin(loginData: Admin_login) {
    const { email, password } = loginData;
    try {
      const existingUser = await this.prisma.admins.findFirst({
        where: { email },
      });

      if (!existingUser)
        return customHttpException('User Not found', 'NOT_FOUND');
      if (existingUser) {
        const isPasswordValid = existingUser.password === password


        if (!isPasswordValid)
          throw new UnauthorizedException('Invalid username or password');

        const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
          expiresIn: '24h',
        });
        const { password: _, ...userWithoutPassword } = existingUser;
console.log(userWithoutPassword, "userdata")
        return {
          ...userWithoutPassword,
          token,
        };
      }
    } catch (error) {
      return customHttpException(error.message,
        'INTERNAL_SERVER_ERROR',
      );

    }
  }


  findAll() {
    try {
      return this.prisma.admins.findMany({})

    } catch (error) {
      return customHttpException(error.message,
        'INTERNAL_SERVER_ERROR',
      );
    };
  }

  async findOne(id: number) {
    try {
      return await this.prisma.admins.findUnique({ where: { id } })
    } catch (error) {
      return customHttpException(error.message,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async update(id: number, updateAdminInput: UpdateAdminInput) {
    try {

      const { id: _, ...withoutId } = updateAdminInput

      let admin = await this.prisma.admins.findUnique({ where: { id } })
      if (!admin) {
        return customHttpException(
          'User not found😴',
          'FORBIDDEN',
        );
      }
      return await this.prisma.admins.update({ where: { id }, data: withoutId })


    } catch (error) {
      return customHttpException(error.message,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.admins.delete({ where: { id } })
    } catch (error) {
      return customHttpException(error.message,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
