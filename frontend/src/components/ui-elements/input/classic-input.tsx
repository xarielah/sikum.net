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
        className={`classic-input ${className ?? ""}`}
      />
    );
  }
);

export default ClassicInput;
