import { Injectable } from '@nestjs/common';
import { CreateSubCategoryInput } from './dto/create-sub_category.input';
import { UpdateSubCategoryInput } from './dto/update-sub_category.input';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';

@Injectable()
export class SubCategoriesService {
  constructor(private prisma: PrismaService) { }
  async create(createSubCategoryInput: CreateSubCategoryInput) {

    try {
      const email = "Admin";
      const { category, ...updateData } = createSubCategoryInput;

      let response = await this.prisma.subCategories.create({
        data: {
          ...updateData,
          ...(category !== undefined ? { category: { connect: { id: category } } } : category ? { category } : undefined),
          last_editedBy: email,
        },
      });

      console.log(response, "response")

      return response;
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }

  }

  async findAll() {
    try {

      return await this.prisma.subCategories.findMany({ include: { category: true, products: true } });
    } catch (error: any) {
      console.log(error, "err")
      return customHttpException(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')

    }

  }

  async findOne(id: number) {
    try {
      return await this.prisma.subCategories.findUnique({ where: { id }, include: { category: true, products: true } });
    } catch (error) {
      return customHttpException(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')

    }
  }

  async update(id: number, updateSubCategoryInput: UpdateSubCategoryInput) {
    let updatedAt = new Date();
    try {
      const { category, id: _, ...updateData } = updateSubCategoryInput;

      console.log(id, "id", updateSubCategoryInput.category);

      return await this.prisma.subCategories.update({
        where: { id },
        data: {
          ...updateData,
          ...(category !== undefined
            ? { category: { connect: { id: Number(category) } } }
            : {}),
          updatedAt,
        },
      });

    } catch (error) {
      console.log(error, "err");
      return customHttpException(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT');
    }
  }


  async remove(id: number) {
    try {
      return await this.prisma.subCategories.delete({ where: { id } })
    } catch (error) {
      return customHttpException(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')

    }
  }
}
