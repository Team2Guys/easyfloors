import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'prisma/prisma.service';
import { customHttpException } from 'utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(createProductInput: CreateProductInput) {
    const { category, subcategory, ...updateData } = createProductInput;
    try {
      return await this.prisma.products.create({
        data: {
          ...updateData,
          ...(category !== undefined ? { category: { connect: { id: category.id } } } : category ? { category } : undefined),
          ...(category !== undefined ? { subcategory: { connect: { id: subcategory.id } } } : subcategory ? { subcategory } : undefined),
        },
      });

    } catch (error) {
      console.log(error, "error")
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }

  }

  async findAll() {
    try {
      return await this.prisma.products.findMany({include: {category: true, subcategory: true}});
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.products.findUnique({ where: { id },include: {category: true, subcategory: true}});
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }


  async update(id: number, updateProductInput: UpdateProductInput) {
    try {
      const { category, ...updateData } = updateProductInput;

      return await this.prisma.products.update({
        where: { id },
        data: {
          ...updateData,
          ...(category !== undefined
            ? { category: { set: { id: category.id } } }
            : category
              ? { category }
              : undefined),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }






  async remove(id: number) {
    try {
      return await this.prisma.products.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }


}           
