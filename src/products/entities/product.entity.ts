import {Int, Field, ObjectType, ID } from '@nestjs/graphql';
import { Category } from 'categories/entities/category.entity';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: number;

  @Field(() => String,)
  name: string;

  @Field(() => Int)
  price: number

  @Field(()=>Int,{ nullable: true })
  discountPrice: number

  @Field()
  description: string;

  @Field(() => Int)
  stock: number

  @Field(() =>  GraphQLJSON)
  posterImageUrl: any

  @Field(() => GraphQLJSON)
  hoverImageUrl: any


  @Field(() => [GraphQLJSON])
  productImages: any[]

  @Field(() => [String])
  colors: string[]

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

  @Field(()=>Boolean,{nullable:true})
  waterproof: boolean;


  @Field(() => [GraphQLJSON])
  AdditionalInformation: any[]

  @Field({nullable:true})
  plankWidth: string;

  @Field({nullable:true})
  ResidentialWarranty: string;

  @Field({nullable:true})
  CommmericallWarranty: string;

  @Field(() => Category,{nullable:true})
  category: Category;

@Field(()=>Int,{nullable:true})
categoryId:number
}
