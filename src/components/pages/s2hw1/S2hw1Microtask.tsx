import React, { useState } from 'react'
import { v1 } from 'uuid';
import { S2hw1Todolist, TaskType } from './S2hw1Todolist';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
};

type TasksStateType = {
  [todolistId: string]: TaskType[]
}

export const S2hw1Microtask = () => {
   /* let [tasks, setTasks] = useState<TaskType[]>([
     { id: v1(), title: "HTML&CSS", isDone: true },
     { id: v1(), title: "JS", isDone: true },
     { id: v1(), title: "ReactJS", isDone: false },
     { id: v1(), title: "Rest API", isDone: false },
     { id: v1(), title: "GraphQL", isDone: false },
   ]); */
   let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    let removeTask = {...tasks, [todolistId]: [...tasks[todolistId].filter(t => t.id !== id)]}
    setTasks(removeTask);
  }

  function addTask(title: string) {
    /* let task = { id: v1(), title: title, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks); */
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    /* let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]); */

    //setTasks({...tasks})
  }

  

  

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  const todolistsForRender = todolists.map(tl => {
    let tasksForTodolist = tasks[tl.id];
    if (tl.filter === "active") {
      tasksForTodolist = tasks[tl.id].filter((t) => !t.isDone);
    }
    if (tl.filter === "completed") {
      tasksForTodolist = tasks[tl.id].filter((t) => t.isDone);
    }

    return (
      <S2hw1Todolist
        key={tl.id}
        title={tl.title}
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={tl.filter}
        todolistId={tl.id}
      />
    );
  });

  return <div className="App">{todolistsForRender}</div>;
}
