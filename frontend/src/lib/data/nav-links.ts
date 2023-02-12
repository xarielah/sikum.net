export type NavLink = {
  label: string;
  href: string;
  requiredAuth?: boolean;
};

export const siteNavigation: NavLink[] = [
  {
    label: "עמוד ראשי",
    href: "/",
  },
  {
    label: "כל הסיכומים",
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
