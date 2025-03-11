import { AdditionalInformation, IProduct, ProductImage } from "./prod";
import { Product } from "./type";

export interface Category {
  id: number | string
  name: string;
  description?: string;
  short_description?: string;
  Meta_Description?: string;
  Meta_Title?: string;
  Canonical_Tag?: string;
  images_alt_text?: string;
  posterImageUrl?: ProductImage;
  custom_url: string
  createdAt: Date;
  updatedAt: Date;
  last_editedBy?: string;
  Recall_Cat?: string;
  products?: Product[];

  subcategories?: {
    id: number | string;
    name: string;
    custom_url: string
  }[]

  whatAmiImageBanner?:ProductImage
  topHeading?:string
}

export interface EDIT_CATEGORY extends Category {
    id?: number | string
    createdAt?: Date;
    updatedAt?: Date;

}



export interface ISUBCATEGORY extends Category {
  id: number | string
  category:EDIT_CATEGORY,
  products?:IProduct[]
  whatAmiImage?:ProductImage;
  whatAmiImageBanner?:ProductImage;
  homePageImage?:ProductImage;
  whatAmiTopHeading?:string
  whatamIdetails:AdditionalInformation[]
}


export interface ISUBCATEGORY_EDIT extends ISUBCATEGORY {
  id?: number | string
  category:number | string,
  products?:IProduct[]
  createdAt?: Date;
  updatedAt?: Date;


}