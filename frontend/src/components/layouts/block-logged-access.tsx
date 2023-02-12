import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

interface IBlockLoggedAccessProps {
  children: ReactNode | ReactNode[];
}

const BlockLoggedAccess = ({ children }: IBlockLoggedAccessProps) => {
  const { isUserAuthed } = useAuth();
  if (isUserAuthed) return <Navigate replace={true} to="/" />;
  else return <>{children}</>;
};

export default BlockLoggedAccess;
