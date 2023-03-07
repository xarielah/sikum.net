import { useForm } from "react-hook-form";
import AuthFormsLayout from "../../components/layouts/auth-forms-layout";
import Button from "../../components/ui-elements/button/button";
import ClassicInput from "../../components/ui-elements/input/classic-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormFieldError from "../../components/page-components/forms/form-field-error";
import { useState } from "react";
import { axiosClient } from "../../service/axios/axiosClient";
import { parseCodeToMessage } from "../../utils/forms/error-code-parser";
import SubmitError from "../../components/page-components/forms/submit-error";
import useAuth from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { AuthSlice } from "../../redux/slices/authSlice";
import RippleLoading from "../../components/ui-elements/loading/ripple-loading";

//todo
// Yup validation
// Error displaying
// Success displaying

const schema = yup
  .object({
    username: yup.string().required("שדה שם משתמש הוא חובה."),
    password: yup.string().required("שדה הסיסמה הוא חובה."),
  })
  .required();

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const { setLoggedUser } = useAuth();
  const toggleShowPass = () => setShowPass((prev) => !prev);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<ILoginFields>({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data: ILoginFields) => {
    setErrorMessage("");
    setLoading(true);
    try {
      const result = await axiosClient.post("/auth/login", data).finally(() => {
        resetField("password");
        setLoading(false);
        setShowPass(false);
      });

      const user: AuthSlice = result.data;
      setLoggedUser(user);

      navigate("/");
    } catch (error) {
      setErrorMessage(parseCodeToMessage((error as any).response.status));
      console.error(error);
    }
  };

  if (loading) return <RippleLoading />;
  else
    return (
      <AuthFormsLayout title="התחברות לאתר">
        {errorMessage ? (
          <div className="text-center my-3">
            <SubmitError>{errorMessage}</SubmitError>
          </div>
        ) : (
          ""
        )}
        <form
          onSubmit={handleSubmit(onsubmit)}
          noValidate
          className="flex flex-col items-center justify-center px-4 lg:px-16 space-y-6 my-6"
        >
          <div className="flex flex-col w-full max-w-sm gap-1">
            <ClassicInput
              placeholder="נא להזין שם משתמש..."
              className="w-full"
              {...register("username")}
            />
            {errors.username && errors.username.message ? (
              <FormFieldError>{errors.username?.message}</FormFieldError>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col w-full max-w-sm gap-1">
            <div className="flex gap-3 items-center justify-center w-full">
              <ClassicInput
                type={showPass ? "text" : "password"}
                placeholder="נא להזין סיסמת התחברות..."
                className="w-full"
                {...register("password")}
              />
              <Button
                type="button"
                className={`text-sm shpitz-right ${
                  showPass ? "bg-orange-300 hover:bg-orange-400" : ""
                }`}
                onClick={toggleShowPass}
              >
                {showPass ? "הסתר" : "הצג"}
              </Button>
            </div>
            {errors.password && errors.password.message ? (
              <FormFieldError>{errors.password?.message}</FormFieldError>
            ) : (
              ""
            )}
          </div>
          <Button type="submit" className="shpitz-left">
            התחברות
          </Button>
        </form>
      </AuthFormsLayout>
    );
};

interface ILoginFields {
  username: string;
  password: string;
}

export default LoginPage;
