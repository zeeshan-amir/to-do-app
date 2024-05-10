import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { TodoFilters } from "../../src/components/TodoFilters";

describe("TodoFilters", () => {
  it("Opens and closes drawer correctly", () => {
    render(<TodoFilters />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Filters/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("Selects filter options correctly", () => {
    render(<TodoFilters />);

    fireEvent.click(screen.getByRole("button", { name: /Filters/i }));

    fireEvent.change(screen.getByLabelText("Complete"), {
      target: { value: "complete" },
    });

    expect(screen.getByLabelText("Complete")).toHaveValue("complete");

    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "high" },
    });

    expect(screen.getByLabelText("Priority")).toHaveValue("high");

    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
  });

  it("Applies and clears filters correctly", () => {
    const filterTodosMock = jest.fn();
    render(<TodoFilters filterTodos={filterTodosMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Filters/i }));

    fireEvent.change(screen.getByLabelText("Complete"), {
      target: { value: "complete" },
    });

    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "high" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Apply/i }));

    expect(filterTodosMock).toHaveBeenCalledWith({
      priority: "high",
      completed: true,
    });
  });
});
