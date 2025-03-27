import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class SalesProduct {
    @Field(() => GraphQLJSON)
    paymentKey: any
}

@ObjectType()
export class ALL_RECORDS {
    @Field(() => Int)
    totalSubCategories: number;
    @Field(() => Int)
    totalProducts: number;

    @Field(() => Int)
    totalCategories: number;
    @Field(() => Int)
    totalAdmins: number;
    @Field(() => Int)
    totalRevenue: number;
    @Field(() => Int)
    totalSales: number;
    @Field(() => Int)
    totalUsers: number;
    @Field(() => Int)
    Total_abandant_order: number;
    @Field(() => Int)
    totalAccessories: number;

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

    @Field()
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

    @Field({nullable:true})
    currency: string;

    @Field({nullable:true})
    is3DSecure: string;


    @Field({nullable:true})
    checkoutDate: Date;
}
