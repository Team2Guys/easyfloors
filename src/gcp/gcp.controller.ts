import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleMerchantService } from './gcp.service';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly authService: GoogleAuthService,
    private readonly GoogleMerchantService:GoogleMerchantService) {}

  @Get('auth-url')
  getAuthUrl() {
    return { url: this.authService.getAuthUrl() };
  }

  @Get('callback')
  async handleCallback(@Query('code') code: string, @Res() res: Response) {
    const tokens = await this.authService.getTokens(code);
    res.json({ tokens });
  }

  @Get('sync-product')
  async syncProduct(@Query('id') id: string) {
        const merchantId = process.env.MERCHANT_ID || "";
    return this.GoogleMerchantService.uploadProducts(merchantId);
  }
}
