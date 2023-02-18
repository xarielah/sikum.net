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
      className={`p-2 bg-cyan-400 shadow-md shadow-cyan-800/20 border-b-[2px] border-b-cyan-600 focus:outline-2 outline-cyan-400 rounded-lg hover:bg-cyan-300 ease-in-out duration-300 ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
