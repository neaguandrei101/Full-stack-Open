import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../redux/blogSlice";

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleCreateBlog = (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
      likes: 0,
    };
    dispatch(createBlog(blog));
    toggleVisibility();
  };

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write here the blog title content"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write here the blog author content"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write here the blog URL content"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
