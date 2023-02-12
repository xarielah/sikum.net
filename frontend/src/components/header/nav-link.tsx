import { Link } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import { NavLink as NavigationLink } from "../../lib/data/nav-links";

interface INavLinkProps {
  link: NavigationLink;
}

const LI = ({ link }: INavLinkProps) => {
  return (
    <Link to={link.href}>
      <li className="hover:scale-[1.1] duration-300 ease-in-out">
        {link.label}
      </li>
    </Link>
  );
};

const NavLink = ({ link }: INavLinkProps) => {
  const { isUserAuthed } = useAuth();
  if (link.requiredAuth && isUserAuthed) return <LI link={link} />;
  if (!link.requiredAuth) return <LI link={link} />;
  return <></>;
};

export default NavLink;
