import { CreateAccessoryInput } from './create-accessory.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccessoryInput extends PartialType(CreateAccessoryInput) {
  @Field(() => Int)
  id: number;
}
