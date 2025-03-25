import { Injectable } from '@nestjs/common';
import { contactUsEmailInput, CreateOrderInput } from './dto/create-sales-product.input';
import { contactusEmail, customHttpException } from '../utils/helper';
import { PrismaService } from '../prisma/prisma.service';
import { PaymobService } from './paymob.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalesProductsService {
  constructor(private prisma: PrismaService,
    private readonly paymobService: PaymobService) { }

  async create(createSalesProductInput: CreateOrderInput) {
    try {
      const { totalPrice, shipmentFee, products, ...billing_data } = createSalesProductInput;
      const orderId = `ORD-${Date.now()}`;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${process.env.PAYMOB_SECRET_KEY}`);
      myHeaders.append("Content-Type", "application/json");

      const staticProduct = { name: 'Shipping Fee', amount: shipmentFee * 100, };
      const tax = { name: 'tax Fee', amount: Math.ceil(((shipmentFee + totalPrice) * 0.05) * 100)};
      const totalAmount = [{ name: 'tax Fee', amount: Math.ceil(totalPrice * 100)}];

      const changedProducts = products.map(product => ({
        ...product,
        amount: Math.ceil(product.totalPrice * 100),
        totalPrice: Math.ceil(product.totalPrice * 100),
      }));
console.log(changedProducts, "changedProducts", billing_data) 
      const updatedProducts = [...changedProducts, staticProduct, tax];
      let raw = JSON.stringify({
        "amount": Math.ceil(totalPrice * 100),
        "currency": process.env.PAYMOD_CURRENCY,
        "payment_methods": [
          158,
          49727,
          52742,
          52741,
          52992,
          53201
        ],
        "items": totalAmount,
        "billing_data": {
          ...billing_data,
          first_name:billing_data.firstName,
          last_name:billing_data.lastName,
          email:billing_data.email,
          phone_number:billing_data.phone
        
        },
        "special_reference": orderId,
        "redirection_url": "https://easyfloors.vercel.app/thank-you" as RequestRedirect
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect
      };


      let response = await fetch("https://uae.paymob.com/v1/intention/", requestOptions)
      console.log(response, "response")

      let result = await response.json();


      await this.prisma.salesProducts.create({
        data: {
          ...createSalesProductInput,
          orderId: orderId,
          checkout: true,
          currency: 'AED',
          products: createSalesProductInput.products,
        }
      })

      console.log(result, "result")
      return { paymentKey: result };
    } catch (error) {
      console.log(error, "error")
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }

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
      let sales = [];

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



  async contactUs(userDetails: contactUsEmailInput) {
    try {
      let message = await contactusEmail(userDetails);

      return {
        'message': "Email sent successfully"
      }
    }
    catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }





}
