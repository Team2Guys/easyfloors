import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class SalesProduct {
    @Field(() => GraphQLJSON)
    paymentKey: any
}

@ObjectType()
export class ALL_RECORDS {
    @Field(() => Int,{nullable:true})
    totalSubCategories: number;
    @Field(() => Int,{nullable:true})
    totalProducts: number;

    @Field(() => Int,{nullable:true})
    totalCategories: number;
    @Field(() => Int,{nullable:true})
    totalAdmins: number;
    @Field(() => Int,{nullable:true})
    totalRevenue: number;
    @Field(() => Int,{nullable:true})
    totalSoldProducts: number;
    @Field(() => Int,{nullable:true})
    totalUsers: number;
    @Field(() => Int,{nullable:true})
    totalabundantOrderProd: number;
    @Field(() => Int,{nullable:true})
    totalAccessories: number;
    @Field(() => Int,{nullable:true})
    Orders: number;
    @Field(() => Int,{nullable:true})
    abdundantOrders: number;

    @Field(() => Int,{nullable:true})
    freeSamples: number;

    @Field(() => Int,{nullable:true})
    InstallationAppointments: number;
    @Field(() => Int,{nullable:true})
    MeasureAppointments: number;

}

@ObjectType()
export class contactUsEmail {
    @Field()
    message: string;
}

@ObjectType()
export class Products {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field(() => Float)
    price: number;

    @Field(() => Int)
    stock: number;

    @Field()
    image: string;

    @Field()
    subcategories: string;

    @Field()
    category: string;

    @Field()
    boxCoverage: string;

    @Field(() => Float)
    totalPrice: number;

    @Field(() => Float)
    pricePerBox: number;

    @Field()
    squareMeter: string;

    @Field(() => Int)
    requiredBoxes: number;
}

@ObjectType()
export class paymentStatus {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    country: string;

    @Field()
    city: string;

    @Field()
    address: string;

    @Field()
    note: string;

    @Field()
    phone: string;

    @Field()
    emirate: string;

    @Field()
    orderId: string;

    @Field({nullable:true})
    transactionDate: Date;

    @Field(() => [Products])
    products?: Products[] | undefined;

    @Field(() => Float)
    shipmentFee: number;

    @Field(() => Float)
    totalPrice: number;


    @Field({nullable:true})
    pay_methodType: string;

    @Field({nullable:true})
    paymethod_sub_type: string;

    @Field(()=>Int,{nullable:true})
    cardLastDigits: number;


    @Field(()=>Boolean,{nullable:true})
    checkout: boolean;
    
    @Field(()=>Boolean,{nullable:true})
    paymentStatus: boolean;

    @Field(()=>Boolean,{nullable:true})
    isRefund: boolean;

    @Field(()=>Boolean,{nullable:true})
    success: boolean;

    @Field(()=>Boolean,{nullable:true})
    pending: boolean;

    @Field(()=>Boolean,{nullable:true})
    isfreesample: boolean;

    @Field({nullable:true})
    currency: string;

    @Field({nullable:true})
    is3DSecure: string;


    @Field({nullable:true})
    checkoutDate: Date;


    @Field(() => GraphQLJSON,{nullable:true})
      shippingMethod: any
}



@ObjectType()
export class Last7DaysStat {
  @Field()
  date: string;

  @Field()
  day: string;

  @Field(() => Int)
  orders: number;
}



@ObjectType()
export class MonthlyData {
  @Field()
  month: string;

  @Field(() => Int)
  Orders: number;
}



@ObjectType()
export class monthlyChart {
  @Field(() => [MonthlyData])
  completeMonthlyData: MonthlyData[];
}
