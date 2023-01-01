import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/blogSlice";
import { notificationMessageWithDelay } from "../redux/notificationSlice";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} {blog.likes}
  </div>
);

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) =>
    [...state.blogs.blogs].sort((a, b) => b.likes - a.likes)
  );
  const blogStatus = useSelector((state) => state.blogs.status);

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    } else if (blogStatus === "succeeded") {
      dispatch(notificationMessageWithDelay("Created blog"));
    }
  }, [blogStatus, dispatch]);

  return (
    <div>
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
