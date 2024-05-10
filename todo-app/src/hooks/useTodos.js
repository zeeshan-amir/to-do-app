import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { getTodos, addTodo, deleteTodo, toggleTodo, filterTodos } from "../services/todoServices";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const toast = useToast();

  const fetchTodos = useCallback(() => {
    getTodos().then(response => {
      setTodos(response.data);
    }).catch(error => {
      toast({
        title: "Error fetching todos",
        description: error.message || "There was an issue fetching the todos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  }, [toast]);

  const handleAddTodo = useCallback((todo) => {
    addTodo(todo).then(response => {
      setTodos(prevTodos => [...prevTodos, response.data]);
    }).catch(error => {
      toast({
        title: "Error adding todo",
        description: error.message || "Failed to add the todo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  }, [toast])

  const handleDeleteTodo = useCallback((id) => {
    deleteTodo(id).then(() => {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }).catch(error => {
      toast({
        title: "Error deleting todo",
        description: error.message || "Failed to delete the todo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  }, [toast]);

  const handleToggleTodo = useCallback((id, isCompleted) => {
    toggleTodo(id, isCompleted).then(response => {
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? response.data : todo));
    }).catch(error => {
      toast({
        title: "Error updating todo",
        description: error.message || "Failed to update the todo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  }, [toast]);

  const handleFilterTodos = useCallback((filters) => {
    filterTodos(filters).then(response => {
      setTodos(response.data);
    }).catch(error => {
      toast({
        title: "Error filtering todos",
        description: error.message || "Failed to filter the todos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  }, [toast]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    setTodos,
    fetchTodos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleFilterTodos
  };
}
