export interface ThumbnailProps {
  ThumnailImage: { imageUrl: string }[];
  ThumnailBottom: { image: string; title: string }[];
}
export interface AdditionalInfoProps {
  description: string;
  AdditionalInformation: { name: string; detail: string }[];
  subcategory:string
}

export interface AreaCalculatorProps {
  setArea: (value: string) => void; //eslint-disable-line
  setUnit: (unit: "sqm" | "sqft") => void; //eslint-disable-line
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