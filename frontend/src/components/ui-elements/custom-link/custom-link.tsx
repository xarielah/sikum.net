import { Link } from "react-router-dom";

interface ICustomListProps {
  to: string;
  children: string;
  className?: string;
}

const CustomLink = ({ to, children, className }: ICustomListProps) => {
  return (
    <Link to={to}>
      <span className={className ?? ""}>{children}</span>
    </Link>
  );
};

export default CustomLink;
