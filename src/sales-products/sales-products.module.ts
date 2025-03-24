import { Module } from '@nestjs/common';
import { SalesProductsService } from './sales-products.service';
import { SalesProductsResolver } from './sales-products.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [SalesProductsResolver, SalesProductsService],
  imports: [PrismaModule],
})
export class SalesProductsModule {}
