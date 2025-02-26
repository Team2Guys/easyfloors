import { InputType, Int, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateSubCategoryInput {
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
 
   @Field(() => ID, { nullable: true })
   category?: Number | any ;
 
   @Field({ nullable: true })
   Recall_subCat?:string



}
