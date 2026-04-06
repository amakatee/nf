// components/navbar/constants.ts
import { NavItem } from "./types";

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { 
    label: "Поиск поставщиков", 
    href: "/services/suppliers",
    dropdown: [
      {
        label: "Features",
        href: "/product/features",
        description: "Discover all powerful features",
      },
      {
        label: "Integrations",
        href: "/product/integrations", 
        description: "Connect with your favorite tools",
      },
      {
        label: "API",
        href: "/product/api",
        description: "Build custom solutions",
        badge: "New",
      },
    ],
  },
  { 
    label: "Страхование груза", 
    href: "/services/insurance",
    dropdown: [
      {
        label: "For Sales Teams",
        href: "/solutions/sales",
        description: "Close more deals with better data",
      },
      {
        label: "For Marketing",
        href: "/solutions/marketing",
        description: "Target the right audience",
      },
      {
        label: "For Revenue Ops",
        href: "/solutions/revenue-ops",
        description: "Streamline your operations",
      },
    ],
  },
  { 
    label: "Таможенное оформление", 
    href: "/services/customs",
    dropdown: [
      {
        label: "Blog",
        href: "/resources/blog",
        description: "Latest insights and updates",
      },
      {
        label: "Documentation",
        href: "/resources/docs",
        description: "Guides and references",
      },
      {
        label: "Webinars",
        href: "/resources/webinars",
        description: "Live and on-demand sessions",
        badge: "Live",
      },
    ],
  },
  
];

export const SCROLL_THRESHOLD = 20;
export const MOBILE_BREAKPOINT = 768;