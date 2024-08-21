import React, { useCallback, useEffect, useReducer, useState } from "react";
import "../../../App.css";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import { Menu } from "@mui/icons-material";
import { TodolistAPI, TaskType } from "./TodolistAPI";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { todolistsSelector } from "./state/selectors";
import axios, { AxiosRequestConfig } from "axios";
import { todolistApi } from "./api/todolist-api";

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
  const [todos, setTodos] = useState(null)

  console.log("todos: ", todos);

  

  

  useEffect(() => {
    todolistApi.getTodoLists().then((data) => console.log(data.data));
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


   /* export const GetTodolists = () => {
     const [state, setState] = useState<any>(null);
     useEffect(() => {
       axios
         .get("https://social-network.samuraijs.com/api/1.1/todo-lists")
         .then((data) => console.log("data: ", data));

       // здесь мы будем делать запрос и ответ закидывать в стейт.
       // который в виде строки будем отображать в div-ке
     }, []);
     return <div>{JSON.stringify(state)}</div>;
   };

   export const CreateTodolist = () => {
     const [state, setState] = useState<any>(null);
     useEffect(() => {}, []);

     return <div>{JSON.stringify(state)}</div>;
   };

   export const DeleteTodolist = () => {
     const [state, setState] = useState<any>(null);
     useEffect(() => {}, []);

     return <div>{JSON.stringify(state)}</div>;
   };

   export const UpdateTodolistTitle = () => {
     const [state, setState] = useState<any>(null);
     useEffect(() => {}, []);

     return <div>{JSON.stringify(state)}</div>;
   }; */










  /* let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)


  let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks) */

  let todolists = useSelector(todolistsSelector);

  let tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useDispatch();

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
            {}
          </div>
        </div>
      </Container>
    </div>
  );
};
