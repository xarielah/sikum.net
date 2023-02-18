import useAuth from "../../../hooks/use-auth";
import ALink from "../../ui-elements/alink/alink";
import SuccessIcon from "../../ui-elements/svg/status-icons/success-icon";

const UserVerifiedSuccessfully = () => {
  const { getLoggedUser, verifyUserState } = useAuth();

  verifyUserState();

  return (
    <section className="text-center flex flex-col space-y-6 items-center">
      <SuccessIcon />
      <h1 className="font-bold text-3xl">
        תודה {getLoggedUser.name ?? getLoggedUser.username}, אישרת את המשתמש שלך
        בהצלחה! 🥳
      </h1>

      <p>
        אנחנו שמחים שטרחתם, פתחתם את המייל שלכם ולחצתם על הקישור ששלחנו לכם, אין
        יותר מעריכים מאיתנו!
        <br />
        נשמח לשתף אתכם בחומרים שיש לנו כאן באתר, תוכלו לצפות ב
        <ALink href="/posts">סיכומים האחרונים</ALink> או ליצור{" "}
        <ALink href="/posts/new-post">סיכום חדש</ALink> ולתרום למאגר של האתר
        ובכך לעזור לסטודנטים אחרים בדיוק כמוכם.
      </p>
    </section>
  );
};

export default UserVerifiedSuccessfully;
