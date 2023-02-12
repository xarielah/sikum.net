import { ReactNode } from "react";
import useAuth from "../../hooks/use-auth";
import UnauthorizedAccess from "../page-components/access/unauthorized-access";

interface IProtectedRouteProps {
  children: ReactNode | ReactNode[];
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { isUserAuthed } = useAuth();

  if (!isUserAuthed) return <UnauthorizedAccess />;
  else return <>{children}</>;
};

export default ProtectedRoute;
