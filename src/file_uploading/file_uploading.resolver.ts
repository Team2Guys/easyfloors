import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FileUploadingService } from './file_uploading.service';
import { FileUploading } from './entities/file_uploading.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UpdateFileUploadingInput } from './dto/update-file_uploading.input';


@Resolver(() => FileUploading)
export class FileUploadingResolver {
  constructor(private readonly fileUploadingService: FileUploadingService) {}

  @Mutation(() => FileUploading)
  async createFileUploading(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload) {
   return this.fileUploadingService.create(file);
  }


  @Mutation(() => FileUploading)
    updateProduct(@Args('updateProductInput') updateProductInput: UpdateFileUploadingInput) {
      return this.fileUploadingService.delete(updateProductInput.public_id);
    }

}
