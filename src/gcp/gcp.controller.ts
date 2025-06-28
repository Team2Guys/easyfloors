import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleMerchantService } from './gcp.service';
import { Public } from 'decorators/public.decorator';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly authService: GoogleAuthService,
    private readonly GoogleMerchantService: GoogleMerchantService) { }
  @Public()
  @Get()
  testApi() {
    return "Api is Working"
  }
  @Public()
  @Get('auth-url')
  getAuthUrl() {
    return { url: this.authService.getAuthUrl() };
  }
  @Public()
  @Get('/auth/callback')
  async handleCallback(@Query('code') code: string, @Res() res: Response) {
    const tokens = await this.authService.getTokens(code);
    res.json({ tokens });
  }

  @Public()
  @Get('sync-product')
  async syncProduct(@Query('id') id: string) {
    const merchantId = process.env.GOOGLE_MERCHANT_ID || "";
    return this.GoogleMerchantService.uploadProducts(merchantId);
  }
}
