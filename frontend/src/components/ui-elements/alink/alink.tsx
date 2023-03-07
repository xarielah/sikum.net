import { Link } from "react-router-dom";

interface IALinkProps {
  href: string;
  children: string;
}

const ALink = ({ children, href }: IALinkProps) => {
  return (
    <Link to={href}>
      <span className="text-cyan-500 font-bold underline hover:text-green-600 duration-300 ease-in-out cursor-pointer">
        {children}
      </span>
    </Link>
  );
};

export default ALink;
