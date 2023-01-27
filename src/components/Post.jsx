import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const Post = (props) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-1/2">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div className="mt-10">
              <h2 className="text-2xl text-gray-700">{post.title}</h2>
              <p className="text-gray-500">{post.body}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
