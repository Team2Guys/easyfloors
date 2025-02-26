import { StaticImageData } from "next/image";
import { FormEventHandler, SetStateAction } from "react";

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
  id:number;
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
export  interface FormState {
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
  title?:string;
  description?:string;
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
  export interface IProduct {
    id: number;
    name: string ;
    price: number;
    description: string;
    stock: number;
    discountPrice: number;
    sale?: string;
    colors?: [];
    spacification?: specsDetails[];
    posterImageUrl: string | StaticImageData;
    posterImagePublicId: string;
    posterImageAltText?: string;
    hoverImageAltText?: string;
    hoverImageUrl: string;
    hoverImagePublicId: string;
    productImages: ProductImage[];
    additionalInformation: AdditionalInformation[];
    categoriesId: number;
    categories?: ICategory[];
    subcategories?: ICategory[];
    category?: ICategory[];
    sections?: [];
    createdAt?: string;
    sale_counter?: string;
    sortedSubcategories?: ICategory[];
    sizes?: Sizes[];
    filter?: any;  //eslint-disable-line
    reviews?:any[] //eslint-disable-line
    displayName?: string;
    sizeName?: string;
    colorName?: string;
    custom_url?:string
    Images_Alt_Text?: string;
    Meta_Title?: string;
    Meta_Description?: string;
    Canonical_Tag?: string;
    Og_Title?: string;
    Og_Image?: string;
    OgUrl?: string;
    
  }
  export interface specsDetails {
    id: number;
    specsDetails: string;
  }
  export interface ProductImage {
    imageUrl: string;
    public_id: string;
    altText?: string;
    imageIndex?: number;
    index?: string;
    size?: string;
    color?: string;
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
    categories?: any; //eslint-disable-line
    description?: string;
    short_description?: string;
    Images_Alt_Text?: string;
    Meta_Title?: string;
    Meta_Description?: string;
    Canonical_Tag?: string;
    subcategories?: ICategory[];
    custom_url?:string
  }
  export interface Sizes {
    name: string;
    filterName?: string;
    price: string;
    discountPrice: string;
    stock?: string;
}
// interface Filter {
//   heading: string;
//   additionalInformation: {
//     name: string;
//     price: string;
//     discountPrice: string;
//     stock?: number;
//   }[];
// }
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
export interface Category {
  name: string;
  description?: string;
  short_description?: string;
  meta_description?: string;
  meta_title?: string;
  canonical_tag?: string;
  images_alt_text?: string;
  posterImageUrl?: IMAGE_INTERFACE;
  custom_url?:string
}
export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
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
  custom_url? :string
}
export interface ADDPRODUCTFORMPROPS {
  setselecteMenu: any; //eslint-disable-line
  EditInitialValues?: any | undefined; //eslint-disable-line
  EditProductValue?: Product | undefined;
  setEditProduct?: any; //eslint-disable-line
  subCategories?: ICategory[];
  categoriesList?: ICategory[];
}

export interface FormValues {
  name: string;
  description: string;
  salePrice: string;
  purchasePrice: string;
  discountPrice: string;
  starRating: string;
  reviews: string;
  colors: { colorName: string }[];
  modelDetails: { name: string; detail: string }[];
  spacification: { specsDetails: string }[];
  sizes: string[];
  category: string;
  code: string;
  totalStockQuantity: number;
  variantStockQuantities: { variant: string; quantity: number }[];
  price?: string;
  additionalInformation?: string;
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
  additionalInformation: AdditionalInformation[];
  categories: number[];
  subcategories: number[];
  Meta_Title: string;
  Canonical_Tag: string;
  Meta_Description: string;
  Images_Alt_Text: string;
  sale_counter?: string;
  filters?: any[]; //eslint-disable-line
  custom_url?:string
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
  productImages?: any; //eslint-disable-line
  additionalInformation?: any; //eslint-disable-line
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
  Images_Alt_Text: string;
  Og_title: string;
  Og_description: string;
  Og_Image: string;
  OgUrl: string;
}

export interface USRPROPS {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  error: string | null | undefined;
  loading: boolean | null | undefined;
  inputFields: any; //eslint-disable-line
  buttonTitle: string;
  title?: string;
  descrition?: string;
  InstructionText?: string;
  routingText?: string;
  navigationLink?: string;
  navigationTxt?: string;
  SelectComonent?: any; //eslint-disable-line
  setadminType?: React.Dispatch<SetStateAction<string | undefined>>;
  adminType?: string | undefined;
}
interface PRODUCTS_TYPES {
  _id?: any; //eslint-disable-line
  name: string;
  posterImageUrl?: IMAGE_INTERFACE;  
  hoverImageUrl?: IMAGE_INTERFACE;  
  description?: string;
  salePrice?: number;
  purchasePrice?: number;
  category?: string;
  imageUrl?: IMAGE_INTERFACE[];
  discountPrice?: any; //eslint-disable-line
  colors?: Color[];
  modelDetails?: ModelDetail[];
  spacification?: Specification[];
  createdAt: Date;
  updatedAt: Date;
  starRating?: string;
  reviews?: string;
  totalStockQuantity?: number;
  sizes?: sizes[];
  isFeatured?: any; //eslint-disable-line
  price?: number;
  count?: any;  //eslint-disable-line
  length?: any; //eslint-disable-line
  totalPrice?: any; //eslint-disable-line
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

export interface Admin {
  fullname?: string;
  email?: string;
  password?: string;
  canAddCategory?: boolean;
  canAddProduct?: boolean;
  canCheckProfit?: boolean;
  canCheckRevenue?: boolean;
  canCheckVisitors?: boolean;
  canDeleteCategory?: boolean;
  canDeleteProduct?: boolean;
  canEditCategory?: boolean;
  canEditProduct?: boolean;
  canVeiwAdmins?: boolean;
  canViewSales?: boolean;
  canVeiwTotalCategories?: boolean;
  canVeiwTotalproducts?: boolean;
  canViewUsers?: boolean;
}

export interface AdminRecord {
  _id: string;
  id: string;
  fullname: string;
  email: string;
  canAddProduct: boolean;
  canDeleteProduct: boolean;
  canAddCategory: boolean;
  canDeleteCategory: boolean;
  canCheckProfit: boolean;
  canViewUsers: boolean;
}
export interface IOrderList {
  orderData: IOrder[];
  orderColumns: Array<{ title: string; dataIndex: string; key: string }>;
  visible: boolean;
  /* eslint-disable */
  setVisible: (value: boolean) => void;
  /* eslint-enable */
  selectedProducts: Array<{
    id: string;
    productData: {
      posterImageUrl: string;
      name: string;
      price: number;
      currency: string;
    };
    quantity: number;
  }>;
}