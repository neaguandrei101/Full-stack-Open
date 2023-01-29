import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Navigation from "./components/Navigation";
import React from "react";
import User from "./components/User";
import DetailedBlog from "./components/DetailedBlog";

const Home = () => (
  <React.Fragment>
    <Notification />
    <Login />
    <Blogs />
  </React.Fragment>
);

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<DetailedBlog />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
