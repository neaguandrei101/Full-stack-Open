import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("BLOG", () => {
  let blog;
  let mockRemove;
  let mockGetAllBlogs;
  let mockUpdate;

  beforeEach(() => {
    mockRemove = jest.fn();
    mockGetAllBlogs = jest.fn();
    mockUpdate = jest.fn();

    blog = {
      title: "Component testing",
      author: "Andrei N",
      // url: 'url:',
      likes: 0,
      user: { username: "userTest" },
    };
  });

  test("renders content", () => {
    let mockRemove = jest.fn();
    let mockGetAllBlogs = jest.fn();
    let mockUpdate = jest.fn();

    const { container } = render(
      <Blog
        blog={blog}
        user={{ id: 1, username: "userTest" }}
        remove={mockRemove}
        getAllBlogs={mockGetAllBlogs}
        update={mockUpdate}
      />
    );

    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent("Component testing Andrei N 0");
  });

  test("button is clicked twice", async () => {
    render(
      <Blog
        blog={blog}
        user={{ id: 1, username: "userTest" }}
        remove={mockRemove}
        getAllBlogs={mockGetAllBlogs}
        update={mockUpdate}
      />
    );

    const user = userEvent.setup();
    const button = screen.getByText("like");
    await user.dblClick(button);

    expect(mockUpdate.mock.calls).toHaveLength(2);
  });
});
