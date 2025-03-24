import { Injectable } from '@nestjs/common';
import { CreateSalesProductInput } from './dto/create-sales-product.input';
import { customHttpException } from 'utils/helper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesProductsService {
    constructor(private prisma: PrismaService) { }
  
  create(createSalesProductInput: CreateSalesProductInput) {
    return 'This action adds a new salesProduct';
  }

  findAll() {
    return `This action returns all salesProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesProduct`;
  }


  async get_all_records() {
    try {
      let totalProducts = await this.prisma.products.count({});
      let totalCategories = await this.prisma.category.count({});
      let totalSubCategories = await this.prisma.subCategories.count({});
      let totalUsers = await this.prisma.user.count({});
      let totalAdmins = await this.prisma.admins.count({});
      let totalAccessories = await this.prisma.acessories.count({});
      let sales =[];
      
      // await this.prisma.sales_record.findMany({
      //   include: { products: true },
      // });

      const reducer_handler = (arr: any[]) => {
        return arr.reduce((totalQuantity: number, currentValue: any) => {
          const productQuantitySum = currentValue.products.reduce(
            (productTotal: number, value: any) => {
              console.log(value, 'valued');
              return productTotal + value.productData.quantity;
            },
            0,
          );
          return totalQuantity + productQuantitySum;
        }, 0);
      };

      let sucessfulpayment = sales.filter(
        (prod: any) => prod.paymentStatus.paymentStatus,
      );

      let totalSales = reducer_handler(sucessfulpayment);

      let abdundant = sales.filter(
        (prod: any) => prod.paymentStatus.checkoutStatus,
      );
      let Total_abandant_order = reducer_handler(abdundant);

      let totalRevenue = sucessfulpayment.reduce(
        (accumulator: any, currentValue: any) => {
          return currentValue.products.reduce((accum: number, value: any) => {
            let price =
              value.productData.discountPrice &&
                Number(value.productData.discountPrice) > 0
                ? value.productData.discountPrice
                : value.productData.price;
            let finalPrice = Number(value.productData.quantity) * Number(price);
            return (accum += finalPrice);
          }, 0);
        },
        0,
      );

      return {
        totalSubCategories,
        totalProducts,
        totalCategories,
        totalAdmins,
        totalRevenue,
        totalSales,
        totalUsers,
        Total_abandant_order,
        totalAccessories
      };
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }


  
}
