import {
  HStack,
  Text,
  IconButton,
  Spacer,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import React from "react";

export const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {

  const priorityColors = {
    low: "green",
    medium: "orange",
    high: "red",
  };

  const priorityColor = priorityColors[todo.priority]

  return (
    <HStack key={todo.id} data-testid="todo-item">
      <Checkbox
        onChange={(e) => toggleTodo(todo.id, e.target.checked)}
        colorScheme="green"
        isChecked={todo.completed}
      >
        <Text data-testid="todo-title" color={priorityColor} as={todo.completed ? "s" : undefined}>
          {todo.title}
        </Text>
      </Checkbox>
      <Spacer />

      <Badge variant='subtle' colorScheme={priorityColor} data-testid="todo-priority">
        {todo.priority?.toUpperCase()}
      </Badge>
      <IconButton
        icon={<FaTrash />}
        isRound="true"
        onClick={() => deleteTodo(todo.id)}
      />
    </HStack>
  );
};
