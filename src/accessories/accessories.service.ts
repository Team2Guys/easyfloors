import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAccessoryInput } from './dto/create-accessory.input';
import { UpdateAccessoryInput } from './dto/update-accessory.input';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';

@Injectable()
export class AccessoriesService {
  constructor(private prisma: PrismaService) { }
  async create(createAccessoryInput: CreateAccessoryInput) {
    const { category,products, ...updateData } = createAccessoryInput;

    try {
      return await this.prisma.acessories.create({
        data: {
          ...updateData,
          ...(category !== undefined ? { category: { connect: { id: +category } } } : {}), 
          ...((products !== undefined && products.length > 0) 
          ? { products: { connect: products.map((id: string) => ({ id: +id })) } } 
          : {}),
        },
      });
    } catch (error) {
      console.log(error, "error")
      if (error.code === 'P2025') {
        throw new BadRequestException('The requested record does not exist.');
      } else {
        throw new InternalServerErrorException('Something went wrong while creating the accessory.');
      }
    }
}


  async findAll() {
    try {
      return await this.prisma.acessories.findMany({include:{category:true, products:true}})
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
      const { category,products, id: _, ...updateData } = updateAccessoryInput;
console.log(products, "products")
      return await this.prisma.acessories.update({
        where: { id },
        data: {
          ...updateData,
          ...(category !== undefined ? { category: { connect: { id: +category } } } : category ? { category } : undefined),
          ...((products !== undefined && products.length > 0) 
          ? { products: { connect: products.map((id: string) => ({ id: +id })) } } 
          : {}),

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
