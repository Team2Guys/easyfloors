import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from '../../prisma/prisma.service'
import * as path from 'path';


@Injectable()
export class GoogleAuthService {
  private oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  constructor(private readonly prisma: PrismaService) { }

  getAuthUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['https://www.googleapis.com/auth/content'],
    });
  }

  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);

    // Store in Prisma DB
    await this.prisma.googleToken.upsert({
      where: { id: 1 },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        scope: tokens.scope,
        tokenType: tokens.token_type,
        expiryDate: tokens.expiry_date, // BigInt
      },
      create: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        scope: tokens.scope,
        tokenType: tokens.token_type,
        expiryDate: tokens.expiry_date,
      },
    });

    return tokens;
  }

  // async setStoredCredentials() {
  //   const token = await this.prisma.googleToken.findUnique({
  //     where: { id: 1 },
  //   });

  //   if (!token) throw new Error('Google token not found');

  //   this.oauth2Client.setCredentials({
  //     access_token: token.accessToken,
  //     refresh_token: token.refreshToken,
  //     scope: token.scope ||  "",
  //     token_type: token.tokenType,
  //     expiry_date: token.expiryDate ? Number(token.expiryDate) : undefined,
  //   });

  //   return this.oauth2Client;
  // }

  getOAuthClient() {
    return this.oauth2Client;
  }


  async setStoredCredentials(): Promise<any> {
    const base64Key = process.env.GCP_KEY_BASE64;
    if (!base64Key) throw new Error("GCP_KEY_BASE64 is not set");

    // Decode the base64 key and parse it as JSON
    const credentials = JSON.parse(Buffer.from(base64Key, 'base64').toString('utf-8'));
    console.log(credentials, "credentials" , base64Key)

    const auth = new google.auth.GoogleAuth({
      credentials, // directly passing JSON credentials object
      scopes: ['https://www.googleapis.com/auth/content'],
    });

    const jwtClient = await auth.getClient();
    return jwtClient;
  }


}
