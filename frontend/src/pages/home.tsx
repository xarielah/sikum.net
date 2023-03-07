import PostsList from "../components/page-components/home/posts-list";

const Home = () => {
  return (
    <section className="flex flex-col gap-6 justify-center">
      <div className="text-center flex flex-col justify-center gap-3">
        <h1 className="font-bold text-3xl text-center">פוסטים אחרונים</h1>
        <p>
          כאן יוצגו הפוסטים האחרונים שעלו לאתר. הפוסטים לא מסוננים ומוצגים בסדר
          של Last is first.
        </p>
      </div>
      <PostsList />
    </section>
  );
};

export default Home;
