import AuthFormsLayout from "../../components/layouts/auth-forms-layout";
import { useForm } from "react-hook-form";
import Button from "../../components/ui-elements/button/button";
import ClassicInput from "../../components/ui-elements/input/classic-input";
import FormFieldError from "../../components/page-components/forms/form-field-error";
import { useState } from "react";
import { axiosClient } from "../../service/axios/axiosClient";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RippleLoading from "../../components/ui-elements/loading/ripple-loading";
import { parseCodeToMessage } from "../../utils/forms/error-code-parser";
import SubmitError from "../../components/page-components/forms/submit-error";
import SuccessRegister from "../../components/page-components/register/success-register";

//! Todo: Password confirmation

const schema = yup
  .object({
    username: yup
      .string()
      .matches(
        /^[A-Za-z0-9_]+$/,
        "ניתן להשתמש באותיות באנגלית, מספרים וקו תחתון בלבד."
      )
      .required("שדה שם המשתמש הוא חובה.")
      .max(36),
    password: yup.string().required("שדה הסיסמה הוא חובה."),
    email: yup.string().email().required("שדה המייל הוא חובה."),
    firstName: yup.string().required("שדה שם פרטי הוא חובה.").max(36),
  })
  .required();

const RegisterPage = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const toggleShowPass = () => setShowPass((prev) => !prev);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IRegisterFormFields>({ resolver: yupResolver(schema) });

  const onsubmit = async (data: IRegisterFormFields) => {
    setErrorMessage("");
    setLoading(true);
    try {
      await axiosClient
        .post("/auth/register", data)
        .finally(() => setLoading(false));
      resetField("password");
      setSuccess(true);
    } catch (error) {
      setErrorMessage(parseCodeToMessage((error as any).response.status));
      console.error(error);
    }
  };

  if (loading) return <RippleLoading />;
  else if (success) return <SuccessRegister />;
  else
    return (
      <AuthFormsLayout title="הרשמה לאתר">
        <div className="w-full text-center my-3">
          {errorMessage ? <SubmitError>{errorMessage}</SubmitError> : ""}
        </div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          noValidate
          className="flex flex-col items-center justify-center px-4 lg:px-16 space-y-6 my-6"
        >
          <div className="flex flex-col w-full max-w-sm gap-1">
            <label htmlFor="username">שם פרטי:</label>
            <ClassicInput
              placeholder="נא להזין את שמך הפרטי..."
              className="w-full"
              {...register("firstName")}
            />
            {errors.firstName && errors.firstName.message ? (
              <FormFieldError>{errors.firstName?.message}</FormFieldError>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col w-full max-w-sm gap-1">
            <label htmlFor="username">שם משתמש:</label>
            <ClassicInput
              id="username"
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
            <label htmlFor="username">סיסמת התחברות:</label>
            <div className="flex gap-3 items-center justify-center w-full">
              <ClassicInput
                type={showPass ? "text" : "password"}
                placeholder="נא להזין סיסמת התחברות..."
                className="w-full"
                {...register("password")}
              />
              <Button
                type="button"
                className={`text-sm ${
                  showPass ? "bg-purple-400 hover:bg-purple-600" : ""
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
          <div className="flex flex-col w-full max-w-sm gap-1">
            <label htmlFor="username">אימייל אישי:</label>
            <ClassicInput
              placeholder="נא להזין כתובת מייל תקינה..."
              className="w-full"
              {...register("email")}
            />
            {errors.email && errors.email.message ? (
              <FormFieldError>{errors.email?.message}</FormFieldError>
            ) : (
              ""
            )}
          </div>

          <Button type="submit" className="w-full">
            התחברות
          </Button>
        </form>
      </AuthFormsLayout>
    );
};

interface IRegisterFormFields {
  username: string;
  password: string;
  email: string;
  firstName: string;
  //! institute: string; // institute ID - add later
}

export default RegisterPage;
