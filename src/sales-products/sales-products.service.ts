import { Injectable } from '@nestjs/common';
import { CreateSalesProductInput } from './dto/create-sales-product.input';
import { UpdateSalesProductInput } from './dto/update-sales-product.input';

@Injectable()
export class SalesProductsService {
  create(createSalesProductInput: CreateSalesProductInput) {
    return 'This action adds a new salesProduct';
  }

  findAll() {
    return `This action returns all salesProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesProduct`;
  }

  update(id: number, updateSalesProductInput: UpdateSalesProductInput) {
    return `This action updates a #${id} salesProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesProduct`;
  }
}
