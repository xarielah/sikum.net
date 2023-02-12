import { ReactNode } from "react";
import MainFooter from "../footer/main-footer";
import MainHeader from "../header/main-header";

interface IMainLayoutProps {
  children: ReactNode | ReactNode[];
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <MainHeader />
      <main className="py-8 app-container md:max-w-[180ch] mx-auto">
        {children}
      </main>
      <MainFooter />
    </>
  );
};

export default MainLayout;
