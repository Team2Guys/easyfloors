import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SubCategory {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
