import { Link } from "react-router-dom";
import useQueryParams from "../../../hooks/use-query-params";

const GoBackButton = () => {
  const query = useQueryParams();
  const fromQuery = query.get("from");
  const pathRegex = /^\/[A-Za-z0-9,-\/]+$/;

  if (!fromQuery || (!pathRegex.test(fromQuery) && fromQuery !== "/"))
    return <></>;

  return (
    <Link to={fromQuery}>
      <button className="font-bold text-green-400 text-sm border-green-400 dark:hover:bg-green-500 border-[1px] px-2 py-1 shpitz-left hover:bg-green-400 hover:text-white">
        → חזרה אחורה
      </button>
    </Link>
  );
};

export default GoBackButton;
