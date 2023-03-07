interface IPageQueryResultsProps {
  results: number;
  perPage: number;
  className?: string;
}

const PageQueryResults = ({
  results,
  className,
  perPage,
}: IPageQueryResultsProps) => {
  return (
    <small className={className ?? ""}>
      נמצאו <span className="font-bold">{results}</span> תוצאות, מציג{" "}
      <span className="font-bold">{perPage}</span> תוצאות לדף.
    </small>
  );
};

export default PageQueryResults;
