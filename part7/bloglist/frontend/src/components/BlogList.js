import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/blogSlice";

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
    }
  }, [blogStatus, dispatch]);

  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {blogs.map((blog) => (
          <li>
            <Blog key={blog.id} blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
