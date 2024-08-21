import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import { MemoButton } from './MemoButton';
import { Task } from './Task';
import { TaskWithRedux } from './TaskWithRedux';
import { FilterValuesType } from './TodoAPI';
import axios from 'axios';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}



type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const TodolistAPI = (props: PropsType) => {

  
      
    




  







  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title);
    },
    [props.changeTodolistTitle, props.id]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  let tasks = props.tasks;

  tasks = useMemo(() => {
    if (props.filter === "active") {
      tasks = tasks.filter((t) => t.isDone === false);
    }
    if (props.filter === "completed") {
      tasks = tasks.filter((t) => t.isDone === true);
    }

    return tasks;
  }, [tasks, props.filter]);

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {
          /* tasks.map(t => {
                    return (
                      <Task
                        key={t.id}
                        task={t}
                        todolistId={props.id}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                      />
                    )
                }) */

          tasks.map((t) => {
            return <TaskWithRedux key={t.id} task={t} todolistId={props.id} />;
          })
        }
      </div>
      <div>
        <MemoButton
          variant={props.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </MemoButton>
        <MemoButton
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </MemoButton>
        <MemoButton
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </MemoButton>
      </div>
      
    </div>
  );
};


