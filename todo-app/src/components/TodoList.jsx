import { VStack, StackDivider, Badge, Input } from "@chakra-ui/react";
import { TodoItem } from "./TodoItem";
import { useSearchTodos } from "../hooks/useSearchTodos";
import React from "react";

export const TodoList = ({ todos, deleteTodo, toggleTodo, setTodos }) => {
  const { searchTodo } = useSearchTodos(setTodos);

  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="4"
      borderRadius="lg"
      w="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      alignItems="stretch"
    >
      <Input
        variant="filled"
        placeholder="Search todo"
        onChange={(e) => searchTodo(e.target.value)}
      />
      {!todos.length ? (
        <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
          No Todos
        </Badge>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </VStack>
  );
};