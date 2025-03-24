import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class SalesProduct {
@Field(()=>GraphQLJSON)
result:any


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


