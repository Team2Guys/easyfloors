import { Module } from '@nestjs/common';
import {GoogleMerchantService} from './gcp.service'
import { GoogleController} from './gcp.controller'
import { PrismaModule } from 'prisma/prisma.module';
import { GoogleAuthModule } from './services/google-auth.module';
@Module({
  controllers: [GoogleController],
  providers: [GoogleMerchantService],
  imports:[PrismaModule, GoogleAuthModule]
})
export class GcpModule {}
