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
    colorName?: string;
    
  }

export interface AdditionalInformation {
   name: string, detail: string
}

export interface IProduct {
    id: number | string;
    name: string;
    price: number ;
    description?: string;
    short_description?: string;
    stock?: number;
    discountPrice?: number;
    sale?: string;
    spacification?: specsDetails[];
    posterImageUrl: ProductImage;
    productImages?: ProductImage[];
    hoverImageUrl?: ProductImage;
    AdditionalInformation?: AdditionalInformation[];
    colors?: AdditionalInformation[];
    categoriesId?: number;
    subcategory: ISUBCATEGORY_EDIT;
    custom_url?:string;
    thickness?:string;
    ResidentialWarranty?:string;
    CommmericallWarranty?:string;
    plankWidth?:string
    waterproof?:boolean
    category:EDIT_CATEGORY
    Meta_Title?: string;
    Canonical_Tag?: string;
    Meta_Description?: string;
    createdAt?:        Date    
    updatedAt ?:          Date
    image?: string
    FAQS?: AdditionalInformation[];
    boxCoverage?: string;
    featureImages?:ProductImage[]
    acessories?:IProduct[]
    colorCode:string;
  }

  export interface ICart {
    id: number ;
    name: string;
    price?: number;
    stock: number;
    subcategory?: string;
    category?:string;
    image?: string
    quantity?:number ;
    pricePerBox:number,
    squareMeter:number,
    requiredBoxes:number,
 
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



  export interface IAccessories extends IProduct{
        colors: AdditionalInformation[];
        products: IProduct[]

  }


 export interface Edit_Accessories extends EDIT_PRODUCT_PROPS{
  colors: AdditionalInformation[];

 }