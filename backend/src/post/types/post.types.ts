import { Post } from '@prisma/client';

export type PaginatedPosts<T> = {
  count: number;
  resultsPerPage: number;
  posts: T;
};

export type MyPosts = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  topic: TopicLabelId;
};

export type TopicLabelId = {
  id: string;
  label: string;
};

export type LastPosts = {
  topic: TopicLabelId;
  owner: OwnerUsernameAndId;
} & Post;

export type OwnerUsernameAndId = {
  username: string;
  id: string;
};

export type PostsByTopic = {
  topic: TopicLabelId;
  owner: OwnerUsernameAndId;
} & Post;
