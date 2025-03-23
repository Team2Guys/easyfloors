import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class SalesProduct {
@Field(()=>GraphQLJSON)
result:any


}
