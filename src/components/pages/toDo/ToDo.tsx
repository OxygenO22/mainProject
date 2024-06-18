import React, { useState } from 'react'
import { Todolist } from './Todolist';
import { FilterValuesType, TaskStateType, TaskType } from '../../../types/common';
import { v1 } from 'uuid';
import s from './ToDo.module.scss'

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export const ToDo = () => {

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


  const addTask = (title: string, todolistId: string) => {
    if (title !== "") {
      const newTask: TaskType = {
        id: v1(),
        title,
        isDone: false,
      };
      /* setTasks([...tasks, newTask]); */
      setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
    }
  };

  const removeTask = (taskId: string, todolistId: string) => {
    /* setTasks(tasks.filter((t) => t.id !== taskId)); */

    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    });
    // explainded
    /* const updatedTasks = tasks[todolistId];
    const filteredTasks = updatedTasks.filter((t) => t.id !== taskId);
    const copyTasks = {...tasks};
    copyTasks[todolistId] = filteredTasks;
    setTasks(copyTasks); */
  }

  const changeTodoListFilter = (filter: FilterValuesType, todolistId: string) =>{
    /* setFilter(newFilterValue); */
    setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter: filter}: tl))
  }

  const changeTaskStatus = (
    taskId: string,
    newIsDoneValue: boolean,
    todolistId: string
  ) => {
    /* const nextState: TaskType[] = tasks.map((t) =>
      t.id === taskId ? { ...t, isDone: newIsDoneValue } : t
    );
    setTasks(nextState); */
    setTasks({...tasks, [todolistId]: tasks[todolistId].map((t) =>
      t.id === taskId ? { ...t, isDone: newIsDoneValue } : t
    )})
  };

  const removeTodoList = (todolistId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todolistId));
    const copyTasks = { ...tasks };
    delete copyTasks[todolistId];
    setTasks(copyTasks);
  };

  // UI
  /* let filteredTasksForTodolost = tasks;

    if (filter === "active") {
      filteredTasksForTodolost = tasks.filter((t) => !t.isDone);
    }
    if (filter === "completed") {
      filteredTasksForTodolost = tasks.filter((t) => t.isDone);
    } */

  const todoListsElements = todoLists.map(tl => {
    let tasksForTodolost = tasks[tl.id];
    if (tl.filter === "active") {
      tasksForTodolost = tasks[tl.id].filter((t) => !t.isDone);
    }
    if (tl.filter === "completed") {
      tasksForTodolost = tasks[tl.id].filter((t) => t.isDone);
    }

    return (
      <Todolist
        key={tl.id}
        todolistId={tl.id}
        addTask={addTask}
        changeTodoListFilter={changeTodoListFilter}
        removeTask={removeTask}
        title={tl.title}
        filter={tl.filter}
        //tasks={tasks[tl.id]} // all don't filtered tasks
        tasks={tasksForTodolost} //  filtered tasks
        changeTaskStatus={changeTaskStatus}
        removeTodoList={removeTodoList}
      />
    );
  })

  

  return <div className={s.todolist}>{todoListsElements}</div>;
}
