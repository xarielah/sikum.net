import { Link } from "react-router-dom";
import Button from "../../../ui-elements/button/button";

interface ISuccessCreationProps {
  title: string;
  id: string;
  topic: {
    id: string;
    label: string;
  };
}

const SuccessCreation = ({ title, id, topic }: ISuccessCreationProps) => {
  return (
    <section className="text-center flex flex-col gap-3 items-center justify-center">
      <h1 className="font-bold text-3xl">תודה רבה!</h1>
      <p>
        הפוסט{" "}
        <Link to={`/posts/${id}`}>
          <span className="hover:underline font-bold">{title}</span>
        </Link>{" "}
        בנושא{" "}
        <Link to={`/posts/topic/${topic.id}`}>
          <span className="hover:underline font-bold colored-title">
            {topic.label}
          </span>
        </Link>{" "}
        נוצר בהצלחה.
        <br />
        צוות האתר מודה לכם רבות על התרומה שלכם למאגר!
      </p>
      <Link to={`/posts/${id}`}>
        <Button className="shpitz-left">צפייה בפוסט</Button>
      </Link>
    </section>
  );
};

export default SuccessCreation;
