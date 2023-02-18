import { Link } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import Button from "../ui-elements/button/button";

const AuthState = () => {
  const { getLoggedUser } = useAuth();
  const { doLogout } = useAuth();

  return (
    <section className="flex lg:gap-6 gap-2 items-center justify-center flex-col lg:flex-row text-sm mx-auto lg:mx-0">
      <span className="font-bold text-sm lg:text-lg text-gray-300">
        {getLoggedUser.username ? (
          <span>
            שלום,{" "}
            <span className="text-white">
              {getLoggedUser.name ?? getLoggedUser.username}
            </span>
          </span>
        ) : (
          "אתם רשומים?"
        )}
      </span>
      {getLoggedUser.username ? (
        <Button
          onClick={doLogout}
          className="bg-transparent shadow-none text-red-500 font-bold hover:bg-transparent hover:underline"
        >
          התנתקות
        </Button>
      ) : (
        <div className="flex gap-3">
          <Link to={"/auth/register"}>
            <Button className="bg-gray-200 hover:bg-gray-300">הרשמה</Button>
          </Link>
          <Link to={"/auth/login"}>
            <Button>להתחברות</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default AuthState;
