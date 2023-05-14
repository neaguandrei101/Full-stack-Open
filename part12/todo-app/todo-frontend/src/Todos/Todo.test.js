import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import * as React from "react";
import Todo from "./Todo";

const todoMock = {
  text: "Write code",
  done: true,
};

it("render a todo", () => {
  render(
    <Todo
      todo={todoMock}
      onClickComplete={() => console.log("complete")}
      onClickDelete={() => console.log("delete")}
    />
  );

  expect(screen.queryByText("Write code")).toBeTruthy();
});
