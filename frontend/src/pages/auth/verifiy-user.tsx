import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CannotVerifyUser from "../../components/page-components/auth/cannot-verify-user";
import UserVerifiedSuccessfully from "../../components/page-components/auth/user-verified-successfully";
import RippleLoading from "../../components/ui-elements/loading/ripple-loading";
import { axiosClient } from "../../service/axios/axiosClient";
import { parseVerifyCodeToMessage } from "../../utils/auth/verify-error-code-parser";

const VerifyUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const params = useParams();

  useEffect(() => {
    const verifyUserToken = async () => {
      setLoading(true);
      const token = params.token;
      if (!token) return <Navigate to="/" replace={true} />;

      try {
        await axiosClient
          .post("/auth/verify", { token: token })
          .finally(() => setLoading(false));
      } catch (error) {
        console.error(error);
        setErrorMessage(
          parseVerifyCodeToMessage((error as any).response.status)
        );
      }
    };

    verifyUserToken();
  }, []);

  if (loading) return <RippleLoading />;
  else if (errorMessage) return <CannotVerifyUser reason={errorMessage} />;
  else return <UserVerifiedSuccessfully />;
};

export default VerifyUser;
