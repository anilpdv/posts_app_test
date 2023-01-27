import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import Post from "./components/Post";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Posts />} />
        <Route exact path="/posts/:id" element={<Post />} />
      </Routes>
    </Router>
  );
};

export default App;
