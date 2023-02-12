import Button from "../../ui-elements/button/button";

const SuccessRegister = () => {
  return (
    <section className="flex flex-col space-y-6 text-center">
      <h1 className="font-bold text-6xl">תודה רבה!</h1>
      <p className="text-lg my-6">
        תודה רבה לך שנרשמת לאתר, אנחנו מודים לך מאוד על רצונך לקחת חלק במיזם
        הזה.
        <br />
        כבר מעכשיו ניתן לגלול ולסקור את הסיכומים הקיימים באתר, אנחנו מציעים
        להתחיל מדף הבית,
        <br />
        שם מופיעים הסיכומים שנוספו לאחרונה.
      </p>
      <a href="/auth/login">
        <Button>התחברות</Button>
      </a>
    </section>
  );
};

export default SuccessRegister;
