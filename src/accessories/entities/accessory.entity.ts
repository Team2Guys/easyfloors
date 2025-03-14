import { Int, Field, ObjectType, ID } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { Product } from '../../products/entities/product.entity';
import { Category } from 'categories/entities/category.entity';



@ObjectType()
export class Accessory {
  @Field(() => ID)
  id: number;

  @Field(() => String,)
  name: string;

  @Field(() => Int)
  price: number

  @Field(() => Int, { nullable: true })
  discountPrice: number

  @Field()
  description: string;

  @Field(() => Int)
  stock: number

  @Field(() => GraphQLJSON)
  posterImageUrl: any

  @Field(() => GraphQLJSON, { nullable: true })
  hoverImageUrl: any


  @Field(() => [GraphQLJSON])
  productImages: any[]

  @Field(() => [GraphQLJSON])
  colors: any[]

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  Canonical_Tag: string;

  @Field({ nullable: true })
  Meta_Description: string;

  @Field({ nullable: true })
  Meta_Title: string;

  @Field({ nullable: true })
  last_editedBy: string;

  @Field()
  custom_url: string;

  @Field(() => [GraphQLJSON])
  AdditionalInformation: any[]

  @Field(() => [GraphQLJSON])
  FAQS: any[]

  @Field({ nullable: true })
  boxCoverage: string

  @Field(() => Product, { nullable: true })
  products: Product


  @Field(() => Category, { nullable: true })
  category: Category

}
