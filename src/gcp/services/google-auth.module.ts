// google-auth.module.ts
import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';

@Module({
  providers: [GoogleAuthService],
  exports: [GoogleAuthService], // ✅ Export so other modules can use it
})
export class GoogleAuthModule {}
