export type NavLink = {
  label: string;
  href: string;
  requiredAuth?: boolean;
};

export const siteNavigation: NavLink[] = [
  {
    label: "סיכומים אחרונים",
    href: "/posts",
  },
  {
    label: "צור חדש",
    href: "/posts/new-post",
    requiredAuth: true,
  },
  {
    label: "צור קשר",
    href: "contact",
  },
];
