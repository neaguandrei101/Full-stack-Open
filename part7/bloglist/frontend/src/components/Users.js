import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/usersSlice";

const Users = () => {
  const usersStatus = useSelector((state) => state.users.status);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  if (!users) {
    return null;
  }

  return (
    <div>
      <h1> Users</h1>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <tr key={users.id}>
            <td>{user.name}</td>
            <td style={{ textAlign: "left" }}>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;
