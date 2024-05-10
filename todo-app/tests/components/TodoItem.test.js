import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../../src/components/TodoItem";

describe("TodoItem", () => {
  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  it("Renders without crashing", () => {
    const todo = {
      id: 2,
      title: "New Task 2",
      completed: true,
      created_at: "2024-05-09T00:02:37.234271Z",
      due_date: "2023-12-31T00:00:00Z",
      priority: "medium",
    };

    render(
      <TodoItem
        todo={todo}
        deleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
      />
    );

    expect(screen.getByText("New Task 2")).toBeInTheDocument();
    expect(screen.getByText("MEDIUM")).toBeInTheDocument();
  });

  it("Renders correct elements when todo is completed", () => {
    const todo = {
      id: 2,
      title: "New Task 1",
      completed: true,
      created_at: "2024-05-09T00:02:37.234271Z",
      due_date: "2023-12-31T00:00:00Z",
      priority: "medium",
    };

    const { getByRole } = render(
      <TodoItem
        todo={todo}
        deleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
      />
    );

    const checkbox = getByRole("checkbox");

    expect(screen.getByText("New Task 1")).toBeInTheDocument();
    expect(screen.getByText("MEDIUM")).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it("Renders correct elements when todo is not completed", () => {
    const todo = {
      id: 2,
      title: "New Task 2",
      completed: false,
      created_at: "2024-05-09T00:02:37.234271Z",
      due_date: "2023-12-31T00:00:00Z",
      priority: "low",
    };

    const { getByRole } = render(
      <TodoItem
        todo={todo}
        deleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
      />
    );

    const checkbox = getByRole("checkbox");

    expect(screen.getByText("New Task 2")).toBeInTheDocument();
    expect(screen.getByText("LOW")).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });
});
