import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AddTodoModal } from "../../src/components/AddTodoModal";

describe("AddTodoModal", () => {
  it("Opens and closes modal correctly", () => {
    render(<AddTodoModal addTodo={() => {}} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Add Todo/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(screen.queryByRole("dialog")).not.toBeVisible();
  });

  it("Inputs are rendered and functional", () => {
    render(<AddTodoModal addTodo={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /Add Todo/i }));

    expect(
      screen.getByRole("textbox", { name: /Add new task/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", { name: /Priority/i })
    ).toBeInTheDocument();
  });

  it("Form validation works correctly", () => {
    render(<AddTodoModal addTodo={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /Add Todo/i }));

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(screen.getByText("Task title cannot be empty.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
  });

  it("AddTodo function is called with correct todo object", () => {
    const addTodoMock = jest.fn();
    render(<AddTodoModal addTodo={addTodoMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Add Todo/i }));

    fireEvent.change(screen.getByRole("textbox", { name: /Add new task/i }), {
      target: { value: "Test Task" },
    });

    fireEvent.change(screen.getByRole("combobox", { name: /Priority/i }), {
      target: { value: "low" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(addTodoMock).toHaveBeenCalledWith({
      title: "Test Task",
      priority: "low",
      due_date: expect.any(Date),
      completed: false,
    });

    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
  });
});
