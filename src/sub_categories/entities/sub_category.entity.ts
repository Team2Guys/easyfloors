import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from '../../categories/entities/category.entity';
import GraphQLJSON from 'graphql-type-json';
import { Product } from 'products/entities/product.entity';

@ObjectType()
export class SubCategory {
  @Field(() => ID,{ nullable: true })
  id?: number;

  @Field()
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

  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field({ nullable: true })
  Recall_subCat?:string
}
