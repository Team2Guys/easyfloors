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
  setSelectedColor: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColor: string[];
  setSelectedThickness: React.Dispatch<React.SetStateAction<string[]>>;
  selectedThickness: string[];
  setSelectedCommmericallWarranty: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCommmericallWarranty: string[];
  setSelectedResidentialWarranty: React.Dispatch<React.SetStateAction<string[]>>;
  selectedResidentialWarranty: string[];
  setSelectedPlankWidth: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPlankWidth: string[];
  setPriceValue: React.Dispatch<React.SetStateAction<[number, number]>>;
  priceValue: [number, number];
}

export interface SelectedFilter {
  name: string;
  value: boolean | string | null | undefined;
}

export interface SubCategoryProps {
  filteredProducts: Product[];
  selectedFilters: SelectedFilter[];
  setSelectedColor: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColor: string[];
  setSelectedThickness: React.Dispatch<React.SetStateAction<string[]>>;
  selectedThickness: string[];
  setSelectedCommmericallWarranty: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCommmericallWarranty: string[];
  setSelectedResidentialWarranty: React.Dispatch<React.SetStateAction<string[]>>;
  selectedResidentialWarranty: string[];
  setSelectedPlankWidth: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPlankWidth: string[];
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


