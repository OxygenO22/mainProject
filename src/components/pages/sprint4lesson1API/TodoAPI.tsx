import React, { useCallback, useEffect, useState } from "react";
import "../../../App.css";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { TodolistAPI, TaskType } from "./TodolistAPI";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  getTodosTC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "./state/store";
import { todolistsSelector } from "./state/selectors";
import { todolistApi } from "./api/todolist-api";
import { ResponseTypeAPI, tasksApi, TasksTypeAPI } from "./api/tasks-api";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export let todolistId1 = v1();
export let todolistId2 = v1();



export const TodoAPI = () => {

  const [todoApi, setTodoApi] = useState('')
  const [todosAPI, setTodosAPI] = useState<TasksTypeAPI[]>([]);
  const [tasksAPI, setTasksAPI] = useState<ResponseTypeAPI>();
  const dispatch = useAppDispatch();
  

  /* useEffect(() => {
    todolistApi.getTodoLists().then((data) => setTodosAPI(data.data));
  }, []); */

  /* useEffect(() => {
    todolistApi.getTodoLists().then((data) => dispatch(setTodoListsAC(data.data)));
  }, []); */

  // Для работы через редакс Thunk
  useEffect(() => {
    dispatch(getTodosTC());
  }, []);



   const getTL = () => {
     todolistApi.getTodoLists().then((data) => console.log(data.data));
   };

   const addTL = () => {
    const title = todoApi;

     todolistApi
       .createTodo(title)
       .then((data) => console.log("data: ", data.data));
   };

   const deleteTL = () => {
    const todoId = "e0a4ba89-9ab5-46fb-80c0-dad4a5afc8c0";
     todolistApi.deleteTodo(todoId);
   };

   const updateTL = () => {
    const todoId = "e0a4ba89-9ab5-46fb-80c0-dad4a5afc8c0";
    const title = todoApi;
     todolistApi.updateTodo(todoId, title);
   };

   


   useEffect(() => {
      const todoId = "85774521-9c94-405f-aa08-8e0f7d676eed";
      tasksApi.getTasks(todoId).then((data) => console.log(data.data.items));
   }, [todosAPI]);

   const getTasks = () => {
     const todoId = "85774521-9c94-405f-aa08-8e0f7d676eed";
     tasksApi.getTasks(todoId).then((data) => console.log(data.data.items));
   };

   const addTasks = () => {
     const title = "Hey";
      const todoId = "85774521-9c94-405f-aa08-8e0f7d676eed";
     tasksApi
       .createTasks(todoId, title)
       .then((data) => console.log("data: ", data.data));
   };

   const deleteTasks = () => {
     const todoId = "85774521-9c94-405f-aa08-8e0f7d676eed";
     const taskId = "85774521-9c94-405f-aa08-8e0f7d676eed";
     tasksApi.deleteTasks(todoId, taskId);
   };

   const updateTasks = () => {
     const todoId = "85774521-9c94-405f-aa08-8e0f7d676eed";
     const taskId = "85774521-9c94-405f-aa08-8e0f7d676eed";
     const title = "Hey";
     tasksApi.updateTasks(todoId, taskId, title);
   };

  let todolists = useSelector(todolistsSelector);
  console.log(todolists);

  let tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  

  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      dispatch(removeTaskAC(id, todolistId));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskAC(title, todolistId));
    },
    [dispatch]
  );

  const changeStatus = useCallback(
    (id: string, isDone: boolean, todolistId: string) => {
      dispatch(changeTaskStatusAC(id, isDone, todolistId));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, value));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (id: string) => {
      dispatch(removeTodolistAC(id));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(changeTodolistTitleAC(id, title));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title));
    },
    [dispatch]
  );

  return (
    <div className="App">
      {/* <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar> */}
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            return (
              <Grid key={tl.id} item>
                <Paper elevation={6} sx={{ padding: "10px" }}>
                  <TodolistAPI
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <div>
          <div>
            <p>{todoApi}</p>
            <input
              type="text"
              value={todoApi}
              onChange={(e) => setTodoApi(e.target.value)}
            />
          </div>
          <div>
            <button onClick={getTL}>GetTL</button>
            <button onClick={addTL}>AddTL</button>
            <button onClick={deleteTL}>DeleteTL</button>
            <button onClick={updateTL}>UpdateTL</button>
          </div>
          <div>
            <button onClick={getTasks}>GetTasks</button>
            <button onClick={addTasks}>AddTasks</button>
            <button onClick={deleteTasks}>DeleteTasks</button>
            <button onClick={updateTasks}>UpdateTasks</button>
          </div>
        </div>
      </Container>
    </div>
  );
};
