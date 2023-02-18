import React, { ReactNode, SelectHTMLAttributes } from "react";

interface IClassicSelectProps {
  children: ReactNode | ReactNode[];
}

const ClassicSelect = React.forwardRef(
  (
    props: SelectHTMLAttributes<HTMLSelectElement> & IClassicSelectProps,
    ref: any
  ) => {
    const { className, children, ...restProps } = props;
    return (
      <select
        ref={ref}
        {...restProps}
        className={`classic-input ${className ?? ""}`}
      >
        {children}
      </select>
    );
  }
);

export default ClassicSelect;
