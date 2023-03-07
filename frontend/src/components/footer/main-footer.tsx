import logo from "../../assets/logo.png";

const MainFooter = () => {
  return (
    <footer className="flex p-8 justify-between flex-col space-y-6 md:space-y-0 md:flex-row items-center dark:text-white text-slate-600">
      <div>
        <ul className="flex gap-4">
          <li>קישור לדוגמה</li>
          <li>קישור לדוגמה</li>
          <li>קישור לדוגמה</li>
        </ul>
      </div>
      <div className="flex items-center justify-center gap-6">
        <div>
          <h1 className="text-xl lg:text-3xl font-bold">סיכום.נט</h1>
          <span className="text-sm">מאגר סיכומים קהילתי לסטודנטים</span>
        </div>
        <img src={logo} className="w-20 h-20" />
      </div>
    </footer>
  );
};

export default MainFooter;
