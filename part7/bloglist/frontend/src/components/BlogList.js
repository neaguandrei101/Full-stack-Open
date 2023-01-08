import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog, likeBlog } from "../redux/blogSlice";
import { notificationMessageWithDelay } from "../redux/notificationSlice";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const Blog = ({ blog }) => {
  const loggedInUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  if (loggedInUser && loggedInUser.username === blog.user.username) {
    return (
      <div>
        {blog.title} {blog.author} {blog.likes}
        <button
          onClick={() =>
            dispatch(deleteBlog({ blog: blog, token: loggedInUser.token }))
          }
        >
          remove
        </button>
        <button onClick={() => dispatch(likeBlog(blog.id))}>like</button>
      </div>
    );
  }

  return (
    <div>
      {blog.title} {blog.author} {blog.likes}
    </div>
  );
};

const BlogList = () => {
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
            <Blog blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
