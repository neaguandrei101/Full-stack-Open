import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, fetchBlogs, likeBlog } from "../redux/blogSlice";
import { notificationMessageWithDelay } from "../redux/notificationSlice";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const SimpleBlog = ({ blog }) => {
  const loggedInUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const borderStyle = {
    borderStyle: "solid",
    margin: "0.5em",
    padding: "0.25em",
    borderWidth: 1,
  };

  if (loggedInUser && loggedInUser.username === blog.user.username) {
    return (
      <div style={borderStyle}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}{" "}
        {blog.likes}
        <button
          style={{ marginLeft: "0.5em" }}
          onClick={() =>
            dispatch(deleteBlog({ blog: blog, token: loggedInUser.token }))
          }
        >
          remove
        </button>
        <button
          style={{ marginLeft: "0.5em" }}
          onClick={() => dispatch(likeBlog(blog.id))}
        >
          like
        </button>
      </div>
    );
  }

  return (
    <div style={borderStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}{" "}
      {blog.likes}
    </div>
  );
};

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) =>
    [...state.blogs.blogs].sort((a, b) => b.likes - a.likes)
  );
  const blogStatus = useSelector((state) => state.blogs.status);
  const user = useSelector((state) => state.login.user);
  const blogFormRef = useRef();

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    } else if (blogStatus === "created") {
      dispatch(notificationMessageWithDelay("Created blog"));
    }
  }, [blogStatus, dispatch]);

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      {user && (
        <div>
          <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
            <BlogForm toggleVisibility={toggleVisibility} />
          </Togglable>
        </div>
      )}
      <h2>Blogs</h2>
      <ul style={{ listStyleType: "none" }}>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <SimpleBlog blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
