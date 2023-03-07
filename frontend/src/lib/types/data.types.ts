import { Post } from "./posts.types";

export type PaginatedPostsData = {
  count: number;
  resultsPerPage: number;
  posts: Post[];
};
