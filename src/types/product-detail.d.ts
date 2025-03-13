export interface ExtendedThumbnailProps extends ThumbnailProps {
  hideThumnailBottom?: boolean;
  imageheight?: boolean; 
}

export interface ThumbnailProps {
  ThumnailImage: { imageUrl: string }[];
  ThumnailBottom?: { imageUrl: string; title: string,altText:string }[];
}
export interface AdditionalInfoProps {
  description: string;
  AdditionalInformation: { name: string; detail: string }[];
  subcategory:string
}

export interface AreaCalculatorProps {
  setArea: React.Dispatch<SetStateAction<string>>;
  setUnit: React.Dispatch<SetStateAction<string>>; 
  requiredBoxes: number;
  convertedArea: number;
  area: string;
  unit: string;
  pricePerBox: number;
  squareMeter:number;
}

export interface PaymentMethodProps{
  showheading?: boolean
  installments:number
}

export interface detailprops{
  ProductName: string;
    ProductInfo: IProduct[];
    MainCategory: string;
    subCategory: string;
}