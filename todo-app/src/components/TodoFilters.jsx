import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useRef, useState, useMemo } from "react";
import { PriorityEnum } from "../constants/todos";
import React from "react";

export const TodoFilters = ({ filterTodos }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const initial_state = {
    priority: "",
    dueDate: null,
    status: "",
  }
  const [todo, setTodo] = useState(initial_state);
  const isFiltered = useMemo(() => todo.priority !== '' || todo.dueDate !== null || todo.status !== '', [todo]);

  const handleFilters = () => {
    const filterObject = {};
    if (todo.priority) filterObject.priority = todo.priority;
    if (todo.dueDate) filterObject.due_date = todo.dueDate.toISOString();
    if (todo.status) filterObject.completed = todo.status === "complete";

    filterTodos(filterObject);
    onClose();
  };

  const clearFilters = () => {
    setTodo(initial_state)
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Filters
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Todos</DrawerHeader>

          <DrawerBody>
            <FormControl mt={4}>
              <FormLabel>Complete</FormLabel>
              <Select
                value={todo.status}
                placeholder="Select status"
                onChange={(e) => setTodo({ ...todo, status: e.target.value })}
              >
                <option value="complete">Complete</option>
                <option value="pending">Pending</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Priority</FormLabel>
              <Select
                value={todo.priority}
                placeholder="Select Priority"
                onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
              >
                <option value={PriorityEnum.HIGH.toLocaleLowerCase()}>{PriorityEnum.HIGH}</option>
                <option value={PriorityEnum.MEDIUM.toLocaleLowerCase()}>{PriorityEnum.MEDIUM}</option>
                <option value={PriorityEnum.LOW.toLocaleLowerCase()}>{PriorityEnum.LOW}</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <SingleDatepicker
                name="date-input"
                date={new Date()}
                onDateChange={(date) => setTodo({ ...todo, date })}
                placeholder="Select a date"
              />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleFilters}>
              Apply
            </Button>
            <Button colorScheme="gray" ml={3} onClick={clearFilters} isDisabled={!isFiltered}>
              Clear Filters
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
