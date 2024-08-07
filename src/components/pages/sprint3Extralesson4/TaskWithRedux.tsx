import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, memo } from "react";
import { TaskType } from "./Sp3Le4TodolistStoryBook";
import { EditableSpan } from "../sprint3lesson2/EditableSpan";
import { Delete } from "@mui/icons-material";
import { FilterValuesType } from "./Sp3Le4TodoStoryBook";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";

type TaskPropsType = {
  todolistId: string;
  task: TaskType;
};

export const TaskWithRedux = memo(
  ({
    task,
    todolistId,
  }: TaskPropsType) => {

    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId));

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId));
    };

    const onTitleChangeHandler = (newValue: string) => {
      dispatch(changeTaskTitleAC(task.id, newValue, todolistId));
    };

    return (
      <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
          checked={task.isDone}
          color="primary"
          onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
          <Delete />
        </IconButton>
      </div>
    );
  }
);
