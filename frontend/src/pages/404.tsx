import Button from "../components/ui-elements/button/button";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-extrabold">עמוד לא נמצא</h1>
      <p>
        אתם בטוחים שהגעתם למקום הנכון? כדאי לחזור לעמוד הראשי כדי לראות את
        התוכן.
      </p>
      <a href="/">
        <Button>לעמוד הראשי</Button>
      </a>
    </section>
  );
};

export default NotFound;
