import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalesProductsService } from './sales-products.service';
import { ALL_RECORDS, contactUsEmail, paymentStatus, SalesProduct } from './entities/sales-product.entity';
import { contactUsEmailInput, CreateOrderInput, PaymentQueryDto, } from './dto/create-sales-product.input';
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
  @Mutation(() => SalesProduct,{nullable:true})
  freeSample(@Args('createFreesample') createFreesample: CreateOrderInput) {
    return this.salesProductsService.freeSample(createFreesample);
  } 

  @Public()
  @Mutation(() => paymentStatus)
  postpaymentStatus(@Args('postpaymentStatus') updatepaymentstatusInput: PaymentQueryDto) {
    return this.salesProductsService.postpaymentStatus(updatepaymentstatusInput);
  }

  @Public()
  @Query(() => [paymentStatus], { name: 'AllOrders' })
  findAll() {
    return this.salesProductsService.findAll();
  }

  @Public()
  @Query(() => paymentStatus, { name: 'Order' })
  findOne(@Args('orderId', { type: () => String }) orderId: string) {
    return this.salesProductsService.findOne(orderId);
  }

  @Public()
  @Query(() => [paymentStatus], { name: 'usersOrders' })
  OrdersMyMail(@Args('email', { type: () => String }) email: string) {
    return this.salesProductsService.findOrderByMail(email);
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
