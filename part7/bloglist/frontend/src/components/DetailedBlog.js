import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../redux/blogSlice";
import React from "react";
import { useParams } from "react-router-dom";

const DetailedBlog = () => {
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id === id)
  );
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>{blog.title}</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <a>{blog.url}</a>
        <button
          style={{ marginLeft: "0.5em" }}
          onClick={() => dispatch(likeBlog(blog.id))}
        >
          like
        </button>
      </div>
      <span>{blog.likes} likes</span>
      <span>added by {blog.author}</span>
    </div>
  );
};

export default DetailedBlog;
