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
  export interface BreadcrumbProps  {
    title?: string;
    image?: string;
    slug?: string;
    subcategory?: string;
  };
  export interface TextInputProps {
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    type?: string;
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
