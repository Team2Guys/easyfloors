import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAccessoryInput } from './dto/create-accessory.input';
import { UpdateAccessoryInput } from './dto/update-accessory.input';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';

@Injectable()
export class AccessoriesService {
  constructor(private prisma: PrismaService) { }
  async create(createAccessoryInput: CreateAccessoryInput) {
    const { Category, ...updateData } = createAccessoryInput
    try {
      return await this.prisma.acessories.create({
        data: {
          ...updateData,
          ...(Category !== undefined ? { category: { connect: { id: +Category } } } : Category ? { Category } : undefined),


        },

      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('The requested record does not exist.');
      } else {
        throw new InternalServerErrorException('Something went wrong while creating the accessory.');
      }
    }
  }

  async findAll() {
    try {
      return await this.prisma.acessories.findMany()
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.acessories.findUnique({ where: { id: id } })
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async update(id: number, updateAccessoryInput: UpdateAccessoryInput) {
    try {
      const { Category, id: _, ...updateData } = updateAccessoryInput;

      return await this.prisma.products.update({
        where: { id },
        data: {
          ...updateData,
          ...(Category !== undefined ? { category: { connect: { id: +Category } } } : Category ? { Category } : undefined),

        },
      });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.acessories.delete({ where: { id: id } })
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }
}
