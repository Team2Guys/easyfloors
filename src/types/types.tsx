export interface SocialLink {
    href: string;
    src: string;
    alt: string;
    width: number;
    height: number;
  }
  export interface MenuItemProps {
    label: string;
    href: string;
    submenu?: { label: string; href: string; image?: string }[];
  }