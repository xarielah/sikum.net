import { ReactNode } from "react";
import MainFooter from "../footer/main-footer";
import AuthedMenu from "../header/authed-menu";
import MainHeader from "../header/main-header";

interface IMainLayoutProps {
  children: ReactNode | ReactNode[];
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <MainHeader />
      <main className="py-4 px-6 app-container md:max-w-[100ch] mx-auto">
        <div className="w-full flex items-center justify-center">
          <AuthedMenu />
        </div>
        {children}
      </main>
      <MainFooter />
    </>
  );
};

export default MainLayout;
