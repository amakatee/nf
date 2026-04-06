// components/navbar/types.ts
import { ReactNode } from "react";

export type NavItem = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  badge?: string;
  target?: "_blank" | "_self";
};

export type DropdownItem = {
  label: string;
  href: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
};

export type NavbarProps = {
  logoText?: string;
  logoHref?: string;
  navItems?: NavItem[];
  showSignIn?: boolean;
  showDemo?: boolean;
  signInHref?: string;
  demoHref?: string;
  className?: string;
  onSignInClick?: () => void;
  onDemoClick?: () => void;
  sticky?: boolean;
  transparent?: boolean;
};

export type NavLinksProps = {
  items: NavItem[];
  variant?: "desktop" | "mobile";
  onItemClick?: () => void;
};

export type LogoProps = {
  text: string;
  href?: string;
  showEmoji?: boolean;
};

export type NavActionsProps = {
  showSignIn?: boolean;
  showDemo?: boolean;
  signInHref?: string;
  demoHref?: string;
  onSignInClick?: () => void;
  onDemoClick?: () => void;
  isMobile?: boolean;
};

// export type MobileMenuProps = {
//   isOpen: boolean;
//   items: NavItem[];
//   onClose: () => void;
// };

export type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};
// components/navbar/types.ts
// ... (previous types remain the same)

export type MobileMenuProps = {
    isOpen: boolean;
    items: NavItem[];
    onClose: () => void;
    showSignIn?: boolean;
    signInHref?: string;
    onSignInClick?: () => void;
  };