import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import Button from "../ui-elements/button/button";

const AuthedMenu = () => {
  const { isUserAuthed } = useAuth();
  const location = useLocation();

  return (
    <nav className="flex gap-6 my-6 flex-col sm:flex-row w-full justify-center">
      <Link to="/">
        <Button className="shpitz-left w-full">פוסטים אחרונים</Button>
      </Link>
      {isUserAuthed ? (
        <>
          <Link to="/posts/my-posts">
            <Button className="shpitz-left w-full">הפוסטים שלי</Button>
          </Link>
          <Link
            to={`/posts/new-post${
              location.pathname ? `?from=${location.pathname}` : ""
            }`}
          >
            <Button className="shpitz-left w-full">פוסט חדש</Button>
          </Link>
        </>
      ) : (
        ""
      )}
    </nav>
  );
};

export default AuthedMenu;
