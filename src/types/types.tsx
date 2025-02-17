export interface SocialLink {
  href: string;
  alt: string;
  className?: string; // Applying class directly to the icon component
}
  export interface MenuItemProps {
    label: string;
    href: string;
    submenu?: { label: string; href: string; image?: string }[];
  }