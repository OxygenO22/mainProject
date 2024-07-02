import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType, TasksType } from "./MaterialUI";
import { Box, Button, ButtonGroup, Checkbox, IconButton, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { filterButtonsContainerSx, getListItemSx } from "./MaterialUI.styles";

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TasksType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  filter: FilterValuesType;
};

export const MaterialUITodoList = (props: PropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const buttonStyles = {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
  };

  

  const addTask = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      props.addTask(newTitle, props.id);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  };

  const removeTodolist = () => props.removeTodolist(props.id);

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  return (
    <div>
      <h3>
        {" "}
        {props.title}
        <IconButton aria-label="delete" size="medium" onClick={removeTodolist}>
          <Delete fontSize="inherit" />
        </IconButton>
        {/* <button onClick={removeTodolist}>x</button> */}
      </h3>
      <div>
        <TextField
          helperText={error}
          error={!!error}
          size={"small"}
          id="outlined-basic"
          label="Enter a title"
          variant="outlined"
          defaultValue="Default Value"
          value={title}
          onChange={onChangeHandler}
        />
        {/* <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        /> */}
        <Button variant="contained" onClick={addTask} style={buttonStyles}>
          +
        </Button>
        {/* {error && <div className="error-message">{error}</div>} */}
      </div>
      <List>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.taskId, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
          };

          return (
            <ListItem
              key={t.taskId}
              sx={getListItemSx(t.isDone)}
              //className={t.isDone ? "is-done" : ""}
            >
              <div>
                <Checkbox onChange={onChangeHandler} checked={t.isDone} />
                {/* <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              /> */}
                <span>{t.title}</span>
              </div>
              <IconButton
                aria-label="delete"
                size="medium"
                onClick={onClickHandler}
              >
                <Delete fontSize="inherit" />
              </IconButton>
              {/* <button onClick={onClickHandler}>x</button> */}
            </ListItem>
          );
        })}
      </List>
      <ButtonGroup sx={filterButtonsContainerSx}>
        <Button
          variant={props.filter === "all" ? "contained" : "outlined"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        {/* <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button> */}
        <Button
          variant={props.filter === "active" ? "contained" : "outlined"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        {/* <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button> */}
        <Button
          variant={props.filter === "completed" ? "contained" : "outlined"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
        {/* <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button> */}
      </ButtonGroup>
    </div>
  );
};

