import React, { InputHTMLAttributes } from "react";

interface IClassicInputProps {}

const ClassicInput = React.forwardRef(
  (
    props: InputHTMLAttributes<HTMLInputElement> & IClassicInputProps,
    ref: any
  ) => {
    const { className, ...restProps } = props;
    return (
      <input
        ref={ref}
        {...restProps}
        className={`p-2 w-[40ch] border-slate-300 focus:outline-cyan-400 border-[1px] rounded-lg text-sm ${
          className ?? ""
        }`}
      />
    );
  }
);

export default ClassicInput;
