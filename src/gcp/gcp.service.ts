import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuthService } from './services/google-auth.service';
import { timeStamp } from 'console';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GoogleMerchantService {

  constructor(private readonly authService: GoogleAuthService,

    private prisma: PrismaService,



  ) { }


  async uploadProducts(merchantId: string) {
    const authClient = await this.authService.setStoredCredentials(); 
const content = google.content({ version: 'v2.1', auth: authClient });


    const product = await this.prisma.products.findFirst({ where:{id:6}, include: { category: true, subcategory: true } });
    // if (!products || products.length === 0) return 'No products found';

    const responses: any = [];

    // for (const product of products) {
    //   let url = "https://easyfloors.ae/";

    //   if (product.subcategory) {
    //     url += `${product.category?.RecallUrl}/${product.subcategory.custom_url}/${product.custom_url}`;
    //   } else {
    //     url += `${product.category?.RecallUrl}/${product.custom_url}`;
    //   }
    //   try {
    //     const res = await content.products.insert({
    //       merchantId,
    //       requestBody: {
    //         offerId: product.id.toString(),
    //         title: product.name,
    //         description: product.description,
    //         link: url,
    //         // @ts-ignore
    //         imageLink: product?.posterImageUrl?.imageUrl as any,
    //         contentLanguage: 'en',
    //         targetCountry: 'AE',
    //         channel: 'online',
    //         availability: product.stock > 0 ? 'in stock' : 'out of stock',
    //         condition: 'new',
    //         price: {
    //           value: product.price.toString(),
    //           currency: 'AED',
    //         },
    //       },
    //     });

    //     responses.push({ productId: product.id, result: res.data });
    //   } catch (error) {
    //     console.error(`Error uploading product ${product.id}:`, error.message);
    //     responses.push({ productId: product.id, error: error.message });
    //   }
    // }

  let result = await content.products.insert({
  merchantId,
  requestBody: {
    offerId: 'cron Test2',
    title: ' cron Test2',
    description: 'Test2',
    link: 'https://example.com/product',
    imageLink: 'https://example.com/image.jpg',
    contentLanguage: 'en',
    targetCountry: 'AE',
    channel: 'online',
    availability: 'in stock',
    condition: 'new',
    price: {
      value: '135',
      currency: 'AED',
    },
  },
});

console.log(result.data, merchantId, "merchant Id")
    return responses;
  }


}
