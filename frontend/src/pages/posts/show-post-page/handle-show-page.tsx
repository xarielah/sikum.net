import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RippleLoading from "../../../components/ui-elements/loading/ripple-loading";
import { axiosClient } from "../../../service/axios/axiosClient";
import NotFound from "../../404";
import ShowPost, { IPost } from "./show-post";

const HandleShowPage = () => {
  const [notfoundError, setNotfoundError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>();
  const params = useParams();

  useEffect(() => {
    const { id } = params;
    if (!id) return setNotfoundError(true);
    setLoading(true);

    const getPostById = async () => {
      try {
        const result = await axiosClient
          .get(`/post/${id}`)
          .finally(() => setLoading(false));
        setPost(result.data);
      } catch (error) {
        setNotfoundError(true);
        console.error(error);
      }
    };

    getPostById();
  }, []);

  if (loading) return <RippleLoading />;
  if (notfoundError) return <NotFound />;
  if (post) return <ShowPost post={post} />;
  else return <NotFound />;
};

export default HandleShowPage;
