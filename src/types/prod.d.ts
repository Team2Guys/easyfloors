import { EDIT_CATEGORY, ISUBCATEGORY_EDIT } from "./cat";
import { AdditionalInformation } from "./type";


export interface ProductImage {
    imageUrl: string;
    public_id: string;
    altText?: string;
    imageIndex?: number;
    Index?: string;
    size?: string;
    color?: string | number;
    
  }

export interface AdditionalInformation {
   name: string, detail: string
}

export interface IProduct {
    id: number | string;
    name: string;
    price: number;
    description: string;
    stock: number;
    discountPrice?: number;
    sale?: string;
    colors?: [];
    spacification?: specsDetails[];
    posterImageUrl: ProductImage;
    productImages: ProductImage[];
    hoverImageUrl: ProductImage;
    AdditionalInformation: AdditionalInformation[];
    categoriesId: number;
    subCategory?: ISUBCATEGORY_EDIT;
    custom_url?:string
    category?:EDIT_CATEGORY
    Meta_Title: string;
    Canonical_Tag: string;
    Meta_Description: string;
    createdAt?:        Date    
    updatedAt ?:          Date
    
    
  }


  export interface EDIT_PRODUCT_PROPS extends IProduct {
    id?: number | string;
    posterImageUrl?: ProductImage;
    productImages?: ProductImage[];
    hoverImageUrl?: ProductImage;
    categoriesId?: number;
    category?:string;
    subcategory?:string;
    custom_url:string

  }


 