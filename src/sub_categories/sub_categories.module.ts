import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub_categories.service';
import { SubCategoriesResolver } from './sub_categories.resolver';

@Module({
  providers: [SubCategoriesResolver, SubCategoriesService],
})
export class SubCategoriesModule {}
