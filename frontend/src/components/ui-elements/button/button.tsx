import { ButtonHTMLAttributes } from "react";

interface IButtonProps {
  children: string; // Uses as value for button.
}

const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & IButtonProps
) => {
  const { className, children, ...restProps } = props;
  return (
    <button
      {...restProps}
      className={`py-2 dark:text-white hover:border-b-green-400 border-b-4 hover:dark:text-slate-300 px-6 dark:bg-slate-900/70 border-[1px] text-md font-bold text-slate-600 border-slate-400 ease-in-out duration-300 ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
