import { InputType, Int, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateSalesProductInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
  
  @Field()
  email:string;

  @Field()
  note: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field()
  city: string;


  @Field()
  country: string;

  @Field(()=>[GraphQLJSON])
  products: any[];

}



@InputType()
export class contactUsEmailInput {
    @Field()
    firstName: string;
    @Field()
    LastName: string;
    @Field()
    email: string;
    @Field()
    phoneNumber: string;
    @Field()
    message: string;
}


