// Children represents error message from form
interface IFormFieldErrorProps {
  children: string;
}

const FormFieldError = ({ children }: IFormFieldErrorProps) => {
  return (
    <span className="text-gray-800 font-light mx-3 text-sm">{children}</span>
  );
};

export default FormFieldError;
