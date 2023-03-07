import ForbiddenIcon from "../../ui-elements/svg/status-icons/forbidden-icon";

const UnauthorizedAccess = () => {
  return (
    <section className="flex flex-col gap-8 p-8">
      <div className="mx-auto">
        <ForbiddenIcon />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold">מצטערים לומר אבל...</h1>
        <h2 className="text-4xl mr-6">אינך מורשה כניסה לאיזור זה.</h2>
      </div>
      <p className="mx-auto text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
        איזור זה הוא למשתמש רשומים ומחוברים בלבד. כדי לראות את העמוד נדרש להירשם
        ובאם יש ברשותך משתמש, נדרש להתחבר ולאחר מכן לגשת לעמוד זה.
      </p>
    </section>
  );
};

export default UnauthorizedAccess;
