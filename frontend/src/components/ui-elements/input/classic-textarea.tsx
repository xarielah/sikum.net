import React, { TextareaHTMLAttributes } from "react";

interface IClassicTextareaProps {}

const ClassicTextarea = React.forwardRef(
  (
    props: TextareaHTMLAttributes<HTMLTextAreaElement> & IClassicTextareaProps,
    ref: any
  ) => {
    const { className, ...restProps } = props;
    return (
      <textarea
        ref={ref}
        {...restProps}
        className={`classic-input ${className ?? ""}`}
      />
    );
  }
);

export default ClassicTextarea;
