import React from "react";
import { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <span
              onClick={() => {
                paginate(number);
                setCurrentPage(number);
              }}
              className={
                currentPage === number
                  ? "cursor-pointer text-gray-500"
                  : "cursor-pointer text-blue-500"
              }
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
