import { InputType, Int, Field, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateOrderInput {
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

  @Field(() => [GraphQLJSON])
  products: any[];

  @Field(() => Float)
  shipmentFee: number;

  @Field(() => Float)
  totalPrice: number;
}

// Input DTO for the Product (used within CreateOrderInput)
@InputType()
export class ProductInput {
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


