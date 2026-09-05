export interface NavItem {
  label: string;
  href: string;
  isRoute?: boolean;
}

// Primary navigation as specified: Home, About, Programs, Contact
export const NAV_ROUTES: NavItem[] = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About", href: "/about", isRoute: true },
  { label: "Programs", href: "/courses", isRoute: true },
  { label: "Contact", href: "/contact", isRoute: true },
];

export const MOBILE_NAV_ROUTES: NavItem[] = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About", href: "/about", isRoute: true },
  { label: "Programs", href: "/courses", isRoute: true },
  { label: "Contact", href: "/contact", isRoute: true },
];
