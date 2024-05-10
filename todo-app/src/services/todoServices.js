import axios from "axios";

const BASE_URL = 'http://localhost:8000'
const TODO_ENDPOINT = "/api/todos";

export const getTodos = () => {
  return axios.get(`${BASE_URL}${TODO_ENDPOINT}/`);
};

export const deleteTodo = (id) => {
  return axios.delete(`${BASE_URL}${TODO_ENDPOINT}/${id}/`);
};

export const toggleTodo = (id, isCompleted) => {
  return axios.patch(`${BASE_URL}${TODO_ENDPOINT}/${id}/`, {
    completed: isCompleted,
  });
};

export const addTodo = (todo) => {
  return axios.post(`${BASE_URL}${TODO_ENDPOINT}/`, todo);
};

export const filterTodos = (filters) => {
  return axios.get(`${BASE_URL}${TODO_ENDPOINT}/`, { params: filters });
};

export const searchTodos = (title) => {
  return axios.get(`${BASE_URL}${TODO_ENDPOINT}/`, {
    params: { search: title },
  });
};
