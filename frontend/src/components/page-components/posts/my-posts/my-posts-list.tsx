import { Post } from "../../../../lib/types/posts.types";
import MyPostsItem from "./my-posts-item";

interface IMyPostsListProps {
  posts: Post[];
}

const MyPostsList = ({ posts }: IMyPostsListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <MyPostsItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default MyPostsList;
