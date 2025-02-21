import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Product } from 'products/entities/product.entity';

@ObjectType()

export class Category {
  @Field(() => ID)
  id: number;

  @Field(() => String,)
  name: string;

  
  @Field()
  description: string;

  @Field(() =>  GraphQLJSON)
  posterImageUrl: any

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

  @Field(() => [Product], { nullable: true }) // ✅ Define the relation with Products
  products?: Product[];
}

