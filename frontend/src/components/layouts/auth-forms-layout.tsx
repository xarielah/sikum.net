import type { ReactNode } from "react";
import study from "../../assets/study.jpg";

interface IAuthFormsLayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

const AuthFormsLayout = ({ children, title }: IAuthFormsLayoutProps) => {
  return (
    <section className="flex flex-col space-y-6 border-[1px] border-gray-200 rounded-lg max-w-[95%] md:max-w-2xl mx-auto">
      <div>
        <img src={study} className="max-h-xl rounded-tl-lg rounded-tr-lg" />
      </div>
      <div>
        <h1 className="text-center underline font-bold text-lg">{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default AuthFormsLayout;
