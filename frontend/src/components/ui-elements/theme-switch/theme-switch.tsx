import useTheme from "../../../hooks/use-theme";
import { BsFillSunFill } from "react-icons/bs";
import { HiMoon } from "react-icons/hi";

const ThemeSwitch = () => {
  const { toggleTheme, currentTheme } = useTheme();

  const iconsSize = "1.5em";

  return (
    <button onClick={toggleTheme} className="text-slate-800 dark:text-gray-100">
      {currentTheme === "dark" ? (
        <div className="text-sm items-center justify-center flex gap-2">
          <span>מצב יום</span>
          <BsFillSunFill size={iconsSize} />
        </div>
      ) : (
        <div className="text-sm items-center justify-center flex gap-2">
          <span>מצב לילה</span>
          <HiMoon size={iconsSize} />
        </div>
      )}
    </button>
  );
};

export default ThemeSwitch;
