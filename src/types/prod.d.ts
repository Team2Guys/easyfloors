import React from "react";



export interface ProductImage {
    imageUrl: string;
    public_id: string;
    altText?: string;
    imageIndex?: number;
    Index?: string;
    size?: string;
    color?: string;
    
  }

export interface IProduct {
    id: number;
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
    categories?: ICategory[];
    subcategories?: ICategory[];
    sections?: [];
    sortedSubcategories?: ICategory[];
    sizes?: Sizes[];
    filter?: Filter[];
  
    custom_url?:string
    category?:ICategory[]
    Meta_Title: string;
    Canonical_Tag: string;
    Meta_Description: string;
    
  }


  export interface ADDPRODUCTFORMPROPS {
    setselecteMenu: React.Dispatch<React.SetStateAction<string>>;
    EditInitialValues?: IProduct | undefined
    EditProductValue?: IProduct | undefined;
    setEditProduct?: React.Dispatch<React.SetStateAction<IProduct | undefined>>;
    subCategories?: ICategory[];
    categoriesList?: ICategory[];
  }