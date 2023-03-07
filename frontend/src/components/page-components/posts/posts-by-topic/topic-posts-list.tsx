import { Post } from "../../../../lib/types/posts.types";
import PostItem from "../../home/post-item";

interface ITopicPostsListProps {
  posts: Post[];
}

const TopicPostsList = ({ posts }: ITopicPostsListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </div>
  );
};

export default TopicPostsList;
