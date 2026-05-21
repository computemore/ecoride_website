export type PublicPageKey = 'home' | 'ride' | 'drive' | 'corporate' | 'about' | 'account' | 'comingSoon';

export interface DropdownItem {
  href: string;
  label: string;
  description?: string;
}

export interface NavItem {
  kind: 'link' | 'dropdown';
  label: string;
  href?: string;
  items?: DropdownItem[];
}

export interface PageTheme {
  pageColor: string;
  pageBgColor?: string;
}