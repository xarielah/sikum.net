import NavigationBar from "./navigation-bar";
import SearchBar from "./search-bar";

const MainHeader = () => {
  return (
    <header className="flex flex-col w-full">
      <SearchBar />
      <NavigationBar />
    </header>
  );
};

export default MainHeader;
