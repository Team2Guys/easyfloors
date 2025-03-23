import { Module } from '@nestjs/common';
import { SalesProductsService } from './sales-products.service';
import { SalesProductsResolver } from './sales-products.resolver';

@Module({
  providers: [SalesProductsResolver, SalesProductsService],
})
export class SalesProductsModule {}
