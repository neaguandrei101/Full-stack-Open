const Blog = ({ blog, user, remove, getAllBlogs, update }) => {
  const handleDelete = async (blog, token) => {
    if (window.confirm("Do you really want to remove this?")) {
      await remove(blog, token);
      getAllBlogs();
    }
  };

  const handleLike = async (blog) => {
    const initialLikes = blog.likes;
    const userId = blog.user.id;
    const updatedBlog = { ...blog, likes: initialLikes + 1, user: userId };
    await update(blog.id, updatedBlog);
    getAllBlogs();
  };

  if (user && user.username === blog.user.username) {
    return (
      <div
        className="blog"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        {blog.title} {blog.author} {blog.likes}
        <button onClick={() => handleDelete(blog, user.token)}>remove</button>
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
    );
  }

  return (
    <div
      className="blog"
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
      {blog.title} {blog.author} {blog.likes}
      <button onClick={() => handleLike(blog)}>like</button>
    </div>
  );
};

export default Blog;
