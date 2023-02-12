interface ICannotVerifyUserProps {
  reason: string;
}

const CannotVerifyUser = ({ reason }: ICannotVerifyUserProps) => {
  return (
    <section className="text-center flex flex-col gap-3">
      <h1 className="text-3xl font-bold">מצטערים אך לא יכלנו למלא את הבקשה.</h1>
      <p className="text-lg">לא ניתן לאשר את המשתמש בגלל {reason}</p>
    </section>
  );
};

export default CannotVerifyUser;
