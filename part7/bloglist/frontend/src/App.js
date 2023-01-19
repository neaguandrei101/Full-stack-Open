import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Navigation from "./components/Navigation";
import React from "react";
import User from "./components/User";

const Home = () => (
  <React.Fragment>
    <Notification />
    <Login />
    <BlogList />
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
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
