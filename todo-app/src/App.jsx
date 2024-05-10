import { VStack, IconButton, HStack, Heading, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { TodoList } from "./components/TodoList";
import { AddTodoModal } from "./components/AddTodoModal";
import { TodoFilters } from "./components/TodoFilters";
import { useTodos } from "./hooks/useTodos";
import React from "react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    todos,
    setTodos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleFilterTodos
  } = useTodos();

  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound="true"
        size="lg"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <Heading mb="8" fontWeight="extrabold" size="2xl" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        Todo Application
      </Heading>
      <HStack>
        <AddTodoModal addTodo={handleAddTodo} />
        <TodoFilters filterTodos={handleFilterTodos} />
      </HStack>
      <TodoList todos={todos} deleteTodo={handleDeleteTodo} toggleTodo={handleToggleTodo} setTodos={setTodos} />
    </VStack>
  );
}

export default App;
