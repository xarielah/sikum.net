import { Link } from "react-router-dom";
import Button from "../../ui-elements/button/button";

const UnauthorizedAccess = () => {
  return (
    <section className="flex items-center justify-between">
      <article className="bg-red-100 p-8 w-3/4 lg:w-1/2 mx-auto border-2 border-red-200 rounded-md">
        <h1 className="text-red-900 font-bold text-3xl">
          אינך מורשה כניסה לאיזור זה
        </h1>
        <p className="text-lg">
          איזור זה הוא למשתמש רשומים ומחוברים בלבד. כדי לראות את העמוד נדרש
          להירשם ובאם יש ברשותך משתמש, נדרש להתחבר ולאחר מכן לגשת לעמוד זה.
        </p>

        <div className="flex gap-3 items-center justify-center mt-6">
          <Link to="/auth/register">
            <Button className="text-white bg-gray-900 hover:bg-gray-700">
              הרשמה
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button className="text-white bg-gray-900 hover:bg-gray-700">
              התחברות
            </Button>
          </Link>
        </div>
      </article>
    </section>
  );
};

export default UnauthorizedAccess;
