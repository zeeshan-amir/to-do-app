import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "../../src/components/TodoList";
import { useSearchTodos } from "../../src/hooks/useSearchTodos";

jest.mock("../../src/hooks/useSearchTodos");

describe("TodoList", () => {
  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockSetTodos = jest.fn();

  beforeEach(() => {
    useSearchTodos.mockReturnValue({
      searchTodo: jest.fn(),
    });
  });

  it("Renders without crashing", () => {
    const todos = [];

    render(
      <TodoList
        todos={todos}
        deleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
        setTodos={mockSetTodos}
      />
    );

    expect(screen.getByPlaceholderText("Search todo")).toBeInTheDocument();
  });

  it('Shows "No Todos" when there are no todos', () => {
    const todos = [];

    render(
      <TodoList
        todos={todos}
        deleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
        setTodos={mockSetTodos}
      />
    );

    expect(screen.getByText("No Todos")).toBeInTheDocument();
  });

  it("Displays the correct number of todos", () => {
    const todos = [
      { id: 1, text: "Learn Testing", completed: false },
      { id: 2, text: "Write Code", completed: false },
    ];
  
    render(
      <TodoList
        todos={todos}
        deleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
        setTodos={mockSetTodos}
      />
    );

    const items = screen.getAllByTestId("todo-item");
    expect(items.length).toBe(todos.length);
  });

  it("Handles search input changes correctly", () => {
    const searchTodo = jest.fn();
    useSearchTodos.mockReturnValue({ searchTodo });
    const todos = [{ id: 1, text: "Learn Testing", completed: false }];

    render(
      <TodoList
        todos={todos}
        deleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
        setTodos={mockSetTodos}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search todo"), {
      target: { value: "Learn" },
    });

    expect(searchTodo).toHaveBeenCalledWith("Learn");
  });
});
