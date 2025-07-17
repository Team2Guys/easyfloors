import { Injectable } from '@nestjs/common';
import { contactUsEmailInput, CreateOrderInput, orderEmailInput, PaymentQueryDto, ProductInput } from './dto/create-sales-product.input';
import { contactusEmail, customHttpException, sendEmailHandler } from '../utils/helper';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalesProductsService {
  constructor(private prisma: PrismaService) { }

  async create(createSalesProductInput: CreateOrderInput) {
    try {
      const { totalPrice, shipmentFee, products, ...billing_data } = createSalesProductInput;
      const orderId = `ORD-${Date.now()}`;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${process.env.PAYMOB_SECRET_KEY}`);
      myHeaders.append("Content-Type", "application/json");

      const totalAmount = [{ name: 'tax Fee', amount: Math.ceil(totalPrice * 100) }];


      let raw = JSON.stringify({
        "amount": Math.ceil(totalPrice * 100),
        "currency": process.env.PAYMOD_CURRENCY,
        "payment_methods": [
   57660,
   52375,
   52374,
   52172
        ],
        "items": totalAmount,
        "billing_data": {
          ...billing_data,
          first_name: billing_data.firstName,
          last_name: billing_data.lastName,
          email: billing_data.email,
          phone_number: billing_data.phone

        },
        "special_reference": orderId,
        "redirection_url": "https://easyfloors.ae/thank-you" as RequestRedirect
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

      console.log(result.intention_order_id, "intention id")
if(!result.intention_order_id) return customHttpException("Order Id not found ", 'NOT_FOUND');

      await this.prisma.salesProducts.create({
        data: {
          ...createSalesProductInput,
          orderId: String(result.intention_order_id),
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

  async findAll() {
    try {
      return await this.prisma.salesProducts.findMany()
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');

    }
  }

  async findOne(id: string) {
    try {

      return await this.prisma.salesProducts.findFirst({
        where: { orderId: id }
      })
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');

    }
  }

  async findOrderByMail(email: string) {
    try {
      console.log(email, "email")
      let users = await this.prisma.salesProducts.findMany({ where: { email } })
      console.log(users, "users")
      return users;
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');

    }
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


  async postpaymentStatus(postpayment: PaymentQueryDto) {
    try {
      const { orderId } = postpayment;

      let existingOrder = await this.prisma.salesProducts.findFirst({ where: { orderId } })
      if (!existingOrder) {
        customHttpException("Order not found", 'NOT_FOUND');
        return;
      }

      if (existingOrder.paymentStatus) {
        console.log(existingOrder.paymentStatus, "existingOrder.paymentStatus")
        customHttpException("Payment status already updated", 'BAD_REQUEST');
      }
    

      const paymentStatus = await this.prisma.salesProducts.update({
        where: { orderId },
        data: { ...postpayment, checkout: false, paymentStatus: true, transactionDate: new Date() },
      });

      const products: ProductInput[] = JSON.parse(JSON.stringify(existingOrder.products)) as ProductInput[];


      if (Array.isArray(products) && products.length > 0) {
        for (const prod of products) {
          await this.prisma.products.update({
            where: { id: prod.id },
            data: {
              stock: {
                decrement: prod.requiredBoxes,
              },
            },
          });
        }
      }

      await sendEmailHandler(existingOrder as orderEmailInput, existingOrder.email);

      return paymentStatus;
    } catch (error) {
      console.log(error, "error")
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



  async freeSample(createSalesProductInput: CreateOrderInput) {
    try {
      const { totalPrice, shipmentFee, products, ...billing_data } = createSalesProductInput;
      const orderId = Date.now();
      console.log(orderId, "order id ")
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${process.env.PAYMOB_SECRET_KEY}`);
      myHeaders.append("Content-Type", "application/json");
      let existingOrder = await this.prisma.salesProducts.create({
        data: {
          ...createSalesProductInput,
          orderId: String(orderId),
          checkout: true,
          currency: 'AED',
          isfreesample:true,
          products: createSalesProductInput.products,
          shipmentFee:0
        }
      })

      await sendEmailHandler(existingOrder as orderEmailInput, existingOrder.email);
      return { paymentKey: orderId };
    } catch (error) {
      console.log(error, "error")
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }

  }




   async findAllFreesample() {
    try {
      return await this.prisma.salesProducts.findMany({where:{isfreesample:true}})
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');

    }
  }

  




}
