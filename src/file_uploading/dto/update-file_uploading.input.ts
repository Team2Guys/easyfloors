import { CreateFileUploadingInput } from './create-file_uploading.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFileUploadingInput extends PartialType(CreateFileUploadingInput) {
  @Field(() => Int)
  id: number;
}
