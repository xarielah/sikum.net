import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/use-auth";
import { siteNavigation } from "../../lib/data/nav-links";
import AuthState from "./auth-state";
import NavLink from "./nav-link";

const NavigationBar = () => {
  const { isUserAuthed } = useAuth();

  return (
    <section className="min-h-[200px] py-8 lg:py-8 bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center lg:justify-between gap-6 lg:gap-0 px-16 flex-col lg:flex-row">
      <div className="flex gap-8 items-center flex-col lg:flex-row">
        <a href="/">
          <img
            src={logo}
            className="h-32 w-32 mx-10 hover:scale-[1.1] duration-300 ease-in-out"
          />
        </a>
        <nav>
          <ul className="text-sm md:text-lg lg:text-2xl font-bold text-gray-200 flex flex-wrap flex-row gap-6">
            {siteNavigation.map((link, i) => (
              <NavLink link={link} key={i} />
            ))}
          </ul>
        </nav>
      </div>
      <AuthState />
    </section>
  );
};

export default NavigationBar;
