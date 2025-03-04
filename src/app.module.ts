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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
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
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard, // ✅ Register AuthGuard globally
  },],
})
export class AppModule { }
