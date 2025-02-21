import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubCategoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
