import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === id)
  );

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
