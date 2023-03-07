import ThemeSwitch from "../ui-elements/theme-switch/theme-switch";
import AuthState from "./auth-state";

const MainHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between w-full p-6">
      <div className="w-full sm:w-max">
        <ThemeSwitch />
      </div>
      <AuthState />
    </header>
  );
};

export default MainHeader;
