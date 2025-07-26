import { IProduct } from "./prod";

export interface ExtendedThumbnailProps {
  ThumnailImage: ProductImage[];
  ThumnailBottom?: ProductImage[];
  hideThumnailBottom?: boolean;
  imageheight?: boolean;
  onImageChange?: React.Dispatch<SetStateAction<string>>
  stickyside?: boolean;
  onColorSelect?: React.Dispatch<SetStateAction<string>>
  stickyside?: boolean;
  selectedColor?: ProductImage | undefined
  setSelectedColor?: React.Dispatch<SetStateAction<string>>
}

export interface ThumbnailProps {
  ThumnailImage: { imageUrl: string, altText: string }[];
  ThumnailBottom?: { imageUrl: string; title: string, altText: string }[];
}
export interface AdditionalInfoProps {
  description: string;
  AdditionalInformation?: { name: string; detail: string }[];
  subcategory: string
}

export interface AreaCalculatorProps {
  setArea: React.Dispatch<SetStateAction<string>>;
  setUnit: React.Dispatch<SetStateAction<string>>;
  requiredBoxes: number;
  convertedArea: number;
  area: string;
  unit: string;
  pricePerBox: number;
  squareMeter: number;
  accessories: IProduct[];
}

export interface PaymentMethodProps {
  showheading?: boolean
  installments: number
}

export interface detailprops {
  ProductName: string;
  ProductInfo?: IProduct[];
  MainCategory?: string;
  subCategory?: string;
  productData: IProduct
  accessories?: string;
  className?: string;
  isQuickView?: boolean
  AccessoriesProducts?: IProduct[];
}