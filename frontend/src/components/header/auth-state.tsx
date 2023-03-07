import { Link } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import Button from "../ui-elements/button/button";

const AuthState = () => {
  const { getLoggedUser } = useAuth();
  const { doLogout } = useAuth();

  return (
    <section className="flex gap-3 lg:gap-6 items-center justify-between sm:justify-center mx-0">
      <span className="font-bold text-gray-300">
        {getLoggedUser.username ? (
          <span>
            שלום,{" "}
            <span className="text-green-400">
              {getLoggedUser.name ?? getLoggedUser.username}
            </span>
          </span>
        ) : (
          "מה נשמע?"
        )}
      </span>
      {getLoggedUser.username ? (
        <Button onClick={doLogout} className="shpitz-right">
          התנתקות
        </Button>
      ) : (
        <div className="flex">
          <Link to={"/auth/login"}>
            <Button className="border-l-0 rounded-br-xl">להתחברות</Button>
          </Link>
          <Link to={"/auth/register"}>
            <Button className="rounded-tl-xl">הרשמה</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default AuthState;
