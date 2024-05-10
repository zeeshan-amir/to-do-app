import { useState, useCallback } from "react";
import { searchTodos } from "../services/todoServices";

export const useSearchTodos = (setTodos) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchTodo = useCallback(
    debounce((title) => {
      setLoading(true);
      searchTodos(title)
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.error("Error searching todos:", error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300),
    [setTodos]
  );

  return {
    searchTodo,
    loading,
    error,
  };
};
