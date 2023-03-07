import { Link } from "react-router-dom";
import { parseDate } from "../../../../utils/dates/parser";

const DateAndOwner = ({
  owner,
  creationDate,
  location,
}: IDateAndOwnerProps) => {
  return (
    <div className="flex gap-1 font-light">
      <small>
        נוצר בתאריך <span className="font-bold">{parseDate(creationDate)}</span>
        ,
      </small>
      <small>
        נכתב על ידי{" "}
        <Link to={`/posts/user/${owner.id}?from=${location ? location : "/"}`}>
          <span className="font-bold text-slate-400">{owner.username}</span>
        </Link>
      </small>
    </div>
  );
};

interface IDateAndOwnerProps {
  owner: { id: string; username: string };
  creationDate: string;
  location?: string;
}

export default DateAndOwner;
