export interface Product {
  id: number;
  image: string; 
  name: string;
  price: string;
}

export interface LabelPrice {
    id: number;
    name: string;
    price: string;
    image: string;
  }
  
  export interface ImageData {
    src: string;
    label: string;
  }
  export interface Feature {
    id: number;
    icon: string;
    label: string;
    width: number;
    height: number;
  }
  export interface FlooringType {
    name: string;
    price: string;
  }
  export interface ProductCardProps {
    product: Product;
    features: Feature[];
}
export type Block = {
  id: number;
  heading: string;
  points: string[];
  imageUrl: string;
};
export interface HeadingImageProps {
  title: string;
  imageUrl: string;
}