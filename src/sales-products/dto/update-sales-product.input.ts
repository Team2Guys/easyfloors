import { CreateSalesProductInput } from './create-sales-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSalesProductInput extends PartialType(CreateSalesProductInput) {
  @Field(() => Int)
  id: number;
}
