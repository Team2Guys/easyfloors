import { FormEventHandler, SetStateAction } from "react";
import { IProduct, ProductImage } from "./prod";

export interface Feature {
  icon: string;
  label: string;
  width: number;
  height: number;
}
export interface FlooringType {
  name?: string;
  price?: string;
  product: Product[];
}
export interface Product {
  image: string;
  name: string;
  price: string;
  stock?: number;
}
export interface ProductCardProps {
  product: Product;
  sldier?: boolean;
  features: Feature[];
  category?: string;
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

export interface TImageBanner {
  src: string;
  alt: string;
}
export interface TBlogCard {
  id: number;
  title: string;
  heading: string;
  backgroundImage: string;
  Link: string;
  features: string[];
}
export interface TCategoryData {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesProps {
  items: FeatureItem[];
}
export interface HeroItem {
  backgroundImage: string;
  offerText: string;
  title: string;
  highlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  priceText: string;
  flooringType: string;
  brand: string;
}

export interface HeroMainProps {
  items: HeroItem[];
}
export interface BlogCardProps {
  card: TBlogCard;
}
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
export interface BoxItem {
  id: number;
  title: string;
  description: string;
  buttonText: string;
}
export interface BoxData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  icon: string;
}


export interface CardData {
  id: number;
  heading: string;
  content: string[];

}

export interface CategoryData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface CollectionProduct {
  id: string;
  name: string;
  price: string;
  image: string;
}

export interface CollectionFeature {
  id: number;
  label: string;
  icon: string;
  width: number;
  height: number;
}
export interface FormState {
  success?: string;
  error?: string;
}

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  name: string;
  options: Option[];
  label: string;
  required?: boolean;
  placeholder?: string;
}

export interface Appointmentprops {
  title?: string;
  description?: string;
}
export interface RECORDS {
  totalAdmins: string;
  totalCategories: string;
  totalProducts: string;
  totalUsers: string;
  totalProfit: string;
  totalSales: string;
  totalRevenue: string;
  total_sub_categories: string;
  Total_abandant_order: string;
}

export interface specsDetails {
  id: number;
  specsDetails: string;
}


export interface AdditionalInformation {
  key?: string;
  value?: string;
  colors?: string[];
  dimension?: string[];
}
export interface ICategory {
  id: number;
  name: string;
  createdAt?: string;
  posterImageUrl?: string;
  posterImagePublicId?: string;
  description?: string;
  short_description?: string;
  Images_Alt_Text?: string;
  Meta_Title?: string;
  Meta_Description?: string;
  Canonical_Tag?: string;
  subcategories?: ICategory[];
  custom_url?: string
}
export interface Sizes {
  name: string;
  filterName?: string;
  price: string;
  discountPrice: string;
  stock?: string;
}
export interface IReview {
  id: number;
  name: string;
  email: string;
  review: string;
  star: number;
  createdAt: string;
  productId: number;
  userProfileImg?: string;
}
export interface IOrder {
  id: number;
  orderId: string;
  user_email: string;
  address: string;
  phoneNumber?: string;
  products: IOrderProduct[];
  paymentStatus: IPaymentStatus;
  createdAt: string;
}
export interface IOrderProduct {
  id: number;
  orderId: string;
  createdAt: string;
  quantity: number;
  saleRecordId: number;
  productData: IProduct;
}

export interface IPaymentStatus {
  checkoutData: string;
  checkoutStatus: boolean;
  paymentStatus: boolean;
}


export interface SubCategoryComponentProps_dashboard {
  subCategories: SubCategory[];
  cetagories: ICategory[];
}

export interface SubCategory {
  name: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_tag?: string;
  images_alt_text?: string;
  categoriesId: number[];
  custom_url?: string
}

export interface modelDetails { name: string; detail: string };
export interface spacification { specsDetails: string };

/* eslint-disable */

export interface FormValues {
  name: string;
  description: string;
  salePrice: string;
  purchasePrice: string;
  discountPrice: string;
  starRating: string;
  reviews: string;
  colors: { colorName: string }[];
  modelDetails: modelDetails[];
  spacification: spacification[];
  sizes: string[];
  category: string;
  code: string;
  totalStockQuantity: number;
  variantStockQuantities: { variant: string; quantity: number }[];
  price?: string;
  AdditionalInformation?: [];
}
export interface IProductAdd {
  name: string;
  price: number;
  description: string;
  stock: number;
  discountPrice: number;
  posterImageUrl: string;
  posterImagePublicId: string;
  hoverImageUrl: string;
  hoverImagePublicId: string;
  productImages: ProductImage[];
  spacification: Array<{ specsDetails: string; _id: string }>;
  sizes?: string[];
  AdditionalInformation: AdditionalInformation[];
  categories: number[];
  subcategories: number[];
  Images_Alt_Text: string;
  sale_counter?: string;
  filters?: any[];
  custom_url?: string
}

export interface product {
  posterImageUrl: { public_id: string; imageUrl: string; altText: string };
  hoverImageUrl: { public_id: string; imageUrl: string; altText: string };
  _id: string;
  name: string;
  description: string;
  salePrice: number;
  purchasePrice: number;
  category: string;
  imageUrl: Array<{
    public_id: string;
    imageUrl: string;
    _id: string;
    altText: string;
  }>;
  discountPrice: number;
  colors: Array<{ colorName: string; _id: string }>;
  modelDetails: Array<{ name: string; detail: string; _id: string }>;
  spacification: Array<{ specsDetails: string; _id: string }>;
  createdAt: string;
  starRating: string;
  reviews: string;
  productImages?: any;
  AdditionalInformation?: any;
  sizes: Array<string>;
  stock?: string;
  updatedAt: string;
  price: string;
  __v: number;
  code: string;
  Meta_Title: string;
  Meta_Description: string;
  URL: string;
  Canonical_Tag: string;
}

export interface USRPROPS {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  error: string | null | undefined;
  loading: boolean | null | undefined;
  inputFields: any;
  buttonTitle: string;
  title?: string;
  descrition?: string;
  InstructionText?: string;
  routingText?: string;
  navigationLink?: string;
  navigationTxt?: string;
  SelectComonent?: any;
  setadminType?: React.Dispatch<SetStateAction<string | undefined>>;
  adminType?: string | undefined;
}
interface PRODUCTS_TYPES {
  _id?: any;
  name: string;
  posterImageUrl?: ProductImage;
  hoverImageUrl?: ProductImage;
  description?: string;
  salePrice?: number;
  purchasePrice?: number;
  category?: string;
  imageUrl?: IMAGE_INTERFACE[];
  discountPrice?: any;
  colors?: Color[];
  modelDetails?: ModelDetail[];
  spacification?: Specification[];
  createdAt: Date;
  updatedAt: Date;
  starRating?: string;
  reviews?: string;
  totalStockQuantity?: number;
  sizes?: sizes[];
  isFeatured?: any;
  price?: number;
  count?: any;
  length?: any;
  totalPrice?: any;
}

export default PRODUCTS_TYPES;

interface ModelDetail {
  name?: string;
  detail?: string;
}

interface Specification {
  specsDetails?: string;
}
interface sizes {
  sizesDetails?: string;
}

interface Color {
  colorName?: string;
}