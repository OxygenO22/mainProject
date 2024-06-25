import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "../../ui/button/Button";
import { FilterValuesType, TaskType } from "../../../types/common";
import s from './ToDo.module.scss'
import { UniversalInput } from "../../ui/input/UniversalInput";
import { EditableSpan } from "./EditableSpan";


type TodolistPropsType = {
  todolistId: string;
  filter: FilterValuesType;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeTodoListFilter: (
    newFilterValue: FilterValuesType,
    todolistId: string
  ) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  removeTodoList: (todolistId: string) => void;
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
};

export const Todolist = ({
  filter,
  title,
  tasks,
  todolistId,
  addTask,
  removeTask,
  changeTodoListFilter,
  changeTaskStatus,
  removeTodoList,
  updateTask,
  updateTodolist,
}: TodolistPropsType) => {
  //const [taskTitle, setTaskTitle] = useState<string>("");
  //const [tasknputError, setTasknputError] = useState<string | null>(null);

  const changeFilterTaskHandler = (filter: FilterValuesType) =>
    changeTodoListFilter(filter, todolistId);

  const addTaskHandler = (taskTitle: string) => {
    addTask(taskTitle, todolistId);
  };

  const updateTodolistHandler = (title: string) => {
    updateTodolist(todolistId, title);
  };

  /* const changeTaskTitleHandler = (title: string, taskId: string) => {
          updateTask(todolistId, taskId, title);
  } */

  const mappedTasks = tasks.map((task) => {
        const changeTaskTitleHandler = (title: string) => {
          updateTask(todolistId, task.id, title);
        };
        return (
          <li key={task.id} className={s.list__item}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e) =>
                changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
              }
            />
            <p className={task.isDone ? s.isdone : ""}>
              <EditableSpan
                value={task.title}
                /* onChange={(title) =>
                  changeTaskTitleHandler(title, task.id)
                } */
               onChange={changeTaskTitleHandler}
              />
            </p>

            <Button
              onClickHandler={() => removeTask(task.id, todolistId)}
              title={"x"}
            />
          </li>
        );
      })

  const tasksElements: JSX.Element[] | JSX.Element =
    tasks.length !== 0 ? mappedTasks : <span>Your taskslist is empty</span>;

  return (
    <div className={s.todolist}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} />
        <button onClick={() => removeTodoList(todolistId)}>x</button>
      </h3>
      <UniversalInput addItem={addTaskHandler} />
      <ul>{tasksElements}</ul>
      <div>
        <Button
          onClickHandler={() => changeFilterTaskHandler("all")}
          title={"All"}
        />
        <Button
          onClickHandler={() => changeFilterTaskHandler("active")}
          title={"Active"}
        />
        <Button
          onClickHandler={() => changeFilterTaskHandler("completed")}
          title={"Completed"}
        />
      </div>
    </div>
  );
}; 
