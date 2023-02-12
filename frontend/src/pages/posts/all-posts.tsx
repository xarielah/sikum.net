import { useEffect, useState } from "react";
import PostPreview from "../../components/page-components/posts/post-preview";
import RippleLoading from "../../components/ui-elements/loading/ripple-loading";
import { axiosClient } from "../../service/axios/axiosClient";

const AllPosts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchAllSumData = async () => {
      const results = await axiosClient
        .get("/post?amount=9")
        .finally(() => setLoading(false));
      setData(results.data);
    };

    fetchAllSumData();
  }, []);
  if (loading) return <RippleLoading />;
  else
    return (
      <section className="flex flex-col">
        <div className="flex flex-col items-center justify-center space-y-3 my-12">
          <h1 className="text-3xl font-bold underline text-center">
            סיכומים אחרונים
          </h1>
          <p className="max-w-2xl text-center lg:text-lg">
            כאן יופיעו הסיכומים האחונים שנוספו לאתר, כמעט כל אלמנט בתצוגה הוא
            אינטראקטיבי כמו חיפוש לפי משתמש, נושא, מוסד אקדמי ועוד... המון
            בהצלחה! 🚀
          </p>
        </div>
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((post, i) => (
            <PostPreview key={i} post={post} />
          ))}
        </div>
      </section>
    );
};

export default AllPosts;
