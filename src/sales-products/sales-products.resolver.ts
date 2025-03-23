import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalesProductsService } from './sales-products.service';
import { SalesProduct } from './entities/sales-product.entity';
import { CreateSalesProductInput } from './dto/create-sales-product.input';
import { UpdateSalesProductInput } from './dto/update-sales-product.input';

@Resolver(() => SalesProduct)
export class SalesProductsResolver {
  constructor(private readonly salesProductsService: SalesProductsService) {}

  @Mutation(() => SalesProduct)
  createSalesProduct(@Args('createSalesProductInput') createSalesProductInput: CreateSalesProductInput) {
    return this.salesProductsService.create(createSalesProductInput);
  }

  @Query(() => [SalesProduct], { name: 'salesProducts' })
  findAll() {
    return this.salesProductsService.findAll();
  }

  @Query(() => SalesProduct, { name: 'salesProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salesProductsService.findOne(id);
  }

  @Mutation(() => SalesProduct)
  updateSalesProduct(@Args('updateSalesProductInput') updateSalesProductInput: UpdateSalesProductInput) {
    return this.salesProductsService.update(updateSalesProductInput.id, updateSalesProductInput);
  }

  @Mutation(() => SalesProduct)
  removeSalesProduct(@Args('id', { type: () => Int }) id: number) {
    return this.salesProductsService.remove(id);
  }
}
