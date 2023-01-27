import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import Pagination from "./Pagination";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  const filteredPosts = currentPosts.filter((post) => {
    return post.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search"
            className="w-full border-2 border-gray-300 p-4 rounded-lg outline-none"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <ul className="mt-10">
              {filteredPosts.map((post) => (
                <li key={post.id} className="border-b-2 border-gray-300 py-4">
                  <Link to={`/posts/${post.id}`}>
                    <h2 className="text-2xl text-gray-700">{post.title}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;
