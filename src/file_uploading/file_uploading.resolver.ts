import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FileUploadingService } from './file_uploading.service';
import { FileUploading } from './entities/file_uploading.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';


@Resolver(() => FileUploading)
export class FileUploadingResolver {
  constructor(private readonly fileUploadingService: FileUploadingService) {}

  @Mutation(() => FileUploading)
  async createFileUploading(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload) {
   return this.fileUploadingService.create(file);
   
  }

}
