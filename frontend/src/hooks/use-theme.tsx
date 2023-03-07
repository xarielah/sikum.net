import { useLayoutEffect, useState } from "react";

type ThemeValues = "dark" | "light";

const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeValues>("dark");

  const changeTheme = (themeValue: ThemeValues): void => {
    themeValue === "dark"
      ? document.documentElement.classList.remove("light")
      : document.documentElement.classList.remove("dark");

    localStorage.theme = themeValue;

    document.documentElement.classList.add(themeValue);
    setCurrentTheme(themeValue);
  };

  const toggleTheme = () =>
    currentTheme === "dark" ? changeTheme("light") : changeTheme("dark");

  useLayoutEffect(() => {
    const lsMode = localStorage.getItem("theme");
    !lsMode || lsMode === "dark" ? changeTheme("dark") : changeTheme("light");
  }, []);

  return { toggleTheme, currentTheme, changeTheme };
};

export default useTheme;
