"use client"
import React from "react";
import { useGetPosts } from "@/data/getPosts";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsPage = () => {
  const { data: posts, isLoading, isError } = useGetPosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching posts.</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
