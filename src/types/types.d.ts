import { FilterState } from "./cat";
import { IProduct } from "./prod";

export interface SocialLink {
  href: string;
  alt: string;
  className?: string; // Applying class directly to the icon component
}
  export interface MenuItemProps {
    label: string;
    href: string;
    submenu?: { label: string; href: string; image?: string }[];
    scrolling?: boolean;
  }

  export interface TextInputProps {
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    type?: string;
    value?: string | number;
    onChange?: ChangeEvent<HTMLInputElement>
    min?: string
  };
  export interface FAQ {
    question: string;
    answer: string;
  }

export interface FAQsListProps {
    faqspage: FAQ[];
}
export interface TAboutUs {
  id: number;
  image: string;
  alt: string;
  heading: string;
  paragraph: string;
}
export interface TAboutUsProps {
  sections: TAboutUs[];
}
export interface SampleGridData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  alt: string;
}

export interface SampleGridProps {
  sections: SampleGridData[];
}

export interface TAutoVideoProps {
  videoUrl: string;
  fallbackImage?: string; 
  className?: string;
}

export interface FIlterprops {
  className?: string;
  catgories: Category[];
  category: Category;
  setIsWaterProof: React.Dispatch<React.SetStateAction<boolean | null | undefined>>;
  isWaterProof: boolean | null | undefined;
  setSelectedProductFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  selectedProductFilters: FilterState;

  setPriceValue: React.Dispatch<React.SetStateAction<[number, number]>>;
  priceValue: [number, number];
}

export type SelectedFilter =
| { name: "isWaterProof"; value: boolean }
| { name: keyof FilterState; value: string };

export interface SubCategoryProps {
  filteredProducts: Product[];
  selectedFilters: SelectedFilter[];
  setSelectedProductFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  setIsWaterProof: React.Dispatch<React.SetStateAction<boolean | null | undefined>>;
  categoryData: Category;
  subCategoryData?: Category
}
export interface SubSection {
  subHeading: string;
  content: string;
}

export interface SubSection {
  subHeading: string;
  content: string;
}

export interface SubSection {
  subHeading: string;
  content: string;
}

export interface WhatAmICategoryData {
  categoryHeading: string;
  categorycontent:string;
  subSections: SubSection[];
  images: { src: string; alt: string; }[];
}

export interface Step {
  title: string;
  content: string;
}

export interface MeasurementSection {
  title: string;
  description: string;
  steps: Step[];
  image: string;
}
export interface OrderItem {
  image: string;
  title: string;
  boxes: number;
  sqm: number;
  price: number;
}
export interface AuthData {
  title: string;
  subtitle: string;
  description: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  forgotPasswordText: string;
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  value: string;
}
export interface SignAuthData {
  title: string;
  subtitle: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  // forgotPasswordText?: string; 
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  fullNamePlaceholder?:string;
  retypePasswordPlaceholder?:string
}


export interface AuthFormState {
  email: string;
  password: string;
}

export interface AccPoPProduct {
  id: string;
  image: string;
  name: string;
  price: number;
  meters: number;
  feet: number;
}

export interface AccessoriesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  products:IProduct[];
}export interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  icon: ReactNode;
  required?: boolean;
  value?: string;
  onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (_e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface ProductFilterParams {
  products: IProductFilter[] | undefined;
  priceValue: [number, number];
  sortOption: string;
  selectedProductFilters: FilterState;
  isWaterProof: boolean | null | undefined;
  subcategory?: string;
}

export interface CheckboxProps {
  label: string;
  isActive?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>
}
export interface AccordionProps {
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  detailpage?: boolean;
  showPlusMinus?: boolean;
}