import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalesProductsService } from './sales-products.service';
import { ALL_RECORDS, contactUsEmail, SalesProduct } from './entities/sales-product.entity';
import { contactUsEmailInput, CreateOrderInput, } from './dto/create-sales-product.input';
import { Public } from '../decorators/public.decorator';

@Resolver(() => SalesProduct)
export class SalesProductsResolver {
  constructor(private readonly salesProductsService: SalesProductsService) {}

  @Public()
  @Mutation(() => SalesProduct)
  createSalesProduct(@Args('createSalesProductInput') createSalesProductInput: CreateOrderInput) {
    return this.salesProductsService.create(createSalesProductInput);
  }

  @Public()
  @Query(() => [SalesProduct], { name: 'salesProducts' })
  findAll() {
    return this.salesProductsService.findAll();
  }

  @Query(() => SalesProduct, { name: 'salesProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salesProductsService.findOne(id);
  }

  @Query(() => ALL_RECORDS, { name: 'GET_ALL_RECORDS' })
  get_all_records() {
    return this.salesProductsService.get_all_records();
  }

  @Public()
  @Mutation(() => contactUsEmail)
  Contact_email(@Args('contactUsEmail') contactUsEmail: contactUsEmailInput) {
    return this.salesProductsService.contactUs(contactUsEmail);
  }

}
