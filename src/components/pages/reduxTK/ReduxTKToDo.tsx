import React, { useRef, useState } from "react";
import {
  FilterValuesType,
  TaskStateType,
  TaskType,
} from "../../../types/common";
import { v1 } from "uuid";
import s from "./ReduxTKToDo.module.scss";
import { UniversalInput } from "../../ui/input/UniversalInput";
import { ReduxTKTodolist } from "./ReduxTKTodolist";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export const ReduxTKToDo = () => {
  /// BLL
  /// Global states

  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    {
      id: todoListId_1,
      title: "What to learn",
      filter: "all",
    },
    {
      id: todoListId_2,
      title: "What to buy",
      filter: "all",
    },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListId_1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: false },
      { id: v1(), title: "REACT", isDone: false },
    ],

    [todoListId_2]: [
      { id: v1(), title: "Beer", isDone: true },
      { id: v1(), title: "Chips", isDone: true },
      { id: v1(), title: "Dried fish", isDone: false },
      { id: v1(), title: "Nuts", isDone: false },
    ],
  });

  /// CRUD todolist

  const addTodoList = (title: string) => {
    const newId = v1();
    if (title !== "") {
      const newTodoList: TodoListType = {
        id: newId,
        title,
        filter: "all",
      };
      setTodoLists([newTodoList, ...todoLists]);
      setTasks({ ...tasks, [newId]: [] });
    }
  };

  const removeTodoList = (todolistId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todolistId));
    const copyTasks = { ...tasks };
    delete copyTasks[todolistId];
    setTasks(copyTasks);
  };

  const updateTodolist = (todolistId: string, title: string) => {
    setTodoLists(
      todoLists.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl))
    );
  };

  const changeTodoListFilter = (
    filter: FilterValuesType,
    todolistId: string
  ) => {
    setTodoLists(
      todoLists.map((tl) =>
        tl.id === todolistId ? { ...tl, filter: filter } : tl
      )
    );
  };

  /// CRUD tasks

  const addTask = (title: string, todolistId: string) => {
    if (title !== "") {
      const newTask: TaskType = {
        id: v1(),
        title,
        isDone: false,
      };
      setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
    }
  };

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    });
  };

  const changeTaskStatus = (
    taskId: string,
    newIsDoneValue: boolean,
    todolistId: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone: newIsDoneValue } : t
      ),
    });
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, title } : t
      ),
    });
  };

  const todoListsElements = todoLists.map((tl) => {
    let tasksForTodolist = tasks[tl.id];
    if (tl.filter === "active") {
      tasksForTodolist = tasks[tl.id].filter((t) => !t.isDone);
    }
    if (tl.filter === "completed") {
      tasksForTodolist = tasks[tl.id].filter((t) => t.isDone);
    }

    return (
      <ReduxTKTodolist
        key={tl.id}
        todolistId={tl.id}
        addTask={addTask}
        changeTodoListFilter={changeTodoListFilter}
        removeTask={removeTask}
        title={tl.title}
        filter={tl.filter}
        tasks={tasksForTodolist}
        changeTaskStatus={changeTaskStatus}
        removeTodoList={removeTodoList}
        updateTask={updateTask}
        updateTodolist={updateTodolist}
      />
    );
  });

  return (
    <div className={s.todolist__wrapper}>
      <div className={s.todolist__input_wrapper}>
        <div>
          <h3>Add Todolist</h3>
        </div>
        <UniversalInput addItem={addTodoList} />
      </div>
      <div className={s.todolist__item_wrapper}>{todoListsElements}</div>
    </div>
  );
};
