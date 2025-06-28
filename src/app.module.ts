import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub_categories/sub_categories.module';
import { FileUploadingModule } from './file_uploading/file_uploading.module';
import { AdminsModule } from './admins/admins.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurds/auth.guard';
import { AccessoriesModule } from './accessories/accessories.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { UserModule } from './user/user.module';
import { SalesProductsModule } from './sales-products/sales-products.module';
import { PrismaService } from './prisma/prisma.service'
import { GeneralModule } from './general/general.module';
import { GcpModule } from 'gcp/gcp.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      path:"backend/graphql",
      autoSchemaFile:true,
      csrfPrevention: false,
      playground: true,
      context: ({ req, res }) => ({ req, res }),

    }),
    ProductsModule,
    CategoriesModule,
    SubCategoriesModule,
    FileUploadingModule,
    AdminsModule,
    AccessoriesModule,
    AppointmentsModule,
    UserModule,
    SalesProductsModule,
    GeneralModule,
    GcpModule,
  ],
  controllers: [AppController],
  providers: [ PrismaService,AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard, 

  },],
})
export class AppModule { }
