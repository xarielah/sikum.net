import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../ui-elements/button/button";
import ClassicInput from "../../ui-elements/input/classic-input";
import ClassicTextarea from "../../ui-elements/input/classic-textarea";
import MaxDescChars from "../posts/new-post/max-desc-chars";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required().max(256),
  })
  .required();

const ContactForm = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IContactFields>({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data: IContactFields): Promise<void> => {
    console.log(data);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onsubmit)}
      className="flex flex-col gap-6 lg:max-w-2xl w-full mx-auto"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">מה השם שלכם?</label>
        <ClassicInput
          placeholder="לדוגמה: חואקין פניקס..."
          {...register("name")}
          id="name"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">מהי כתובת האימייל שלכם?</label>
        <ClassicInput
          placeholder="לדוגמה: joker@marvel.com"
          {...register("email")}
          id="email"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message">מה תרצו לומר לנו?</label>
        <ClassicTextarea
          rows={6}
          placeholder="זה יכול להיות לגבי שיפורים לאתר כאלו ואחרים, דיווחים על משתמשים ו/או סיכומים כאלה ואחרים או כל דבר אחר..."
          {...register("message")}
          id="message"
        />
        <MaxDescChars
          current={watch("message") ? watch("message").trim().length : 0}
          max={256}
        />
      </div>
      <Button>שליחת פנייה</Button>
    </form>
  );
};

interface IContactFields {
  name: string;
  email: string;
  message: string;
}

export default ContactForm;
