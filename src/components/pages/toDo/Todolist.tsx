import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "../../ui/button/Button";
import { FilterValuesType, TaskType } from "../../../types/common";
import s from './ToDo.module.scss'


type TodolistPropsType = {
  todolistId: string
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
}: TodolistPropsType) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [tasknputError, setTasknputError] = useState<string | null>(null);

  const isAddTaskButtonDisabled = !taskTitle.trim() || taskTitle.length > 25;
  const warningInput = taskTitle.length > 15 && (
    <div>Recomended 15 symbols</div>
  );

  const imputError = tasknputError && <div>{tasknputError}</div>;

  const textHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
    tasknputError && setTasknputError(null);
  };

  const addTaksHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle) {
      addTask(taskTitle, todolistId);
      setTaskTitle("");
    } else {
      setTasknputError("Please fill the title");
    }
  };

  const checkInputOnLeave = () =>
    !taskTitle.trim() && setTasknputError("To add task title should be filled");

  const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && addTaksHandler();

  const  changeFilterTaskHandler = (filter: FilterValuesType) =>
    changeTodoListFilter(filter, todolistId);

  const tasksElements: JSX.Element[] | JSX.Element =
    tasks.length !== 0 ? (
      tasks.map((task) => {
        return (
          <li key={task.id} className={s.list__item}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e) =>
                changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
              }
            />
            <span className={task.isDone ? s.isdone : ""}>{task.title}</span>
            <Button
              onClickHandler={() => removeTask(task.id, todolistId)}
              title={"x"}
            />
          </li>
        );
      })
    ) : (
      <span>Your taskslist is empty</span>
    );

  return (
    <div className={s.todolist}>
      <h3>
        {title}
        <button onClick={() => removeTodoList(todolistId)}>x</button>
      </h3>
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={textHandler}
          onKeyDown={keyDownAddTaskHandler}
          className={tasknputError ? s.inputerror : ""}
          onBlur={checkInputOnLeave}
        />
        <Button
          title={"+"}
          disabled={isAddTaskButtonDisabled}
          onClickHandler={addTaksHandler}
        />
        {warningInput}
        {imputError}
      </div>
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
