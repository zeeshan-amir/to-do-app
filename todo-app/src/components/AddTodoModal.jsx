import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useCallback, useRef, useState } from "react";
import { PriorityEnum } from "../constants/todos";
import React from "react";

export const AddTodoModal = ({ addTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [todo, setTodo] = useState({
    title: "",
    priority: "low",
    due_date: new Date(),
    completed: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};
    // Validate title
    if (!todo.title.trim()) {
      newErrors.title = "Task title cannot be empty.";
    } else if (todo.title.trim().length < 3) {
      newErrors.title =
        "Task title must be at least 3 characters long.";
    }

    // Validate date (must not be in the past)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time part
    if (todo.due_date < today) {
      newErrors.due_date = "Due date cannot be in the past.";
    }

    return newErrors;
  }, [todo]);

  const handleSubmit = useCallback(() => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    addTodo(todo)
    setTodo({
      title: "",
      priority: "low",
      due_date: new Date(),
    });
    onClose();

  }, [addTodo, onClose, todo, validateForm]);

  return (
    <>
      <Button colorScheme="pink" px="8" onClick={onOpen}>
        Add Todo
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.title} isRequired>
              <FormLabel>Add new task</FormLabel>
              <Input
                ref={initialRef}
                variant="filled"
                placeholder="Add new task"
                value={todo.title}
                maxlength="100"
                onChange={(e) => {
                  setTodo({
                    ...todo,
                    title: e.target.value,
                  })
                  setErrors({ ...errors, title: null });
                }}
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Priority</FormLabel>
              <Select
                value={todo.priority}
                onChange={(e) =>
                  setTodo({
                    ...todo,
                    priority: e.target.value,
                  })
                }
              >
                <option value={PriorityEnum.HIGH.toLocaleLowerCase()}>{PriorityEnum.HIGH}</option>
                <option value={PriorityEnum.MEDIUM.toLocaleLowerCase()}>{PriorityEnum.MEDIUM}</option>
                <option value={PriorityEnum.LOW.toLocaleLowerCase()}>{PriorityEnum.LOW}</option>
              </Select>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.due_date} isRequired>
              <FormLabel>Due Date</FormLabel>
              <SingleDatepicker
                name="date-input"
                date={todo.due_date}
                onDateChange={(selectedDate) => {
                  setTodo({
                    ...todo,
                    due_date: selectedDate.toISOString(),
                  })
                  setErrors({ ...errors, due_date: null });
                }}
              />
              <FormErrorMessage>{errors.due_date}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

