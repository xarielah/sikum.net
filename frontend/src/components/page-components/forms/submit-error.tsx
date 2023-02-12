interface ISubmitErrorProps {
  children: string;
}
const SubmitError = ({ children }: ISubmitErrorProps) => {
  return <span className="text-xl text-red-600 font-bold">{children}</span>;
};

export default SubmitError;
