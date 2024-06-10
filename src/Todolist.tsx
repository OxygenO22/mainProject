import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "../src/components/ui/button/Button";
import { FilterValuesType, TaskType } from "./types/common";
import s from '../src/components/pages/toDo/ToDo.module.scss'


type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (newFilterValue: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export const Todolist = ({
  title,
  tasks,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
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
  }

  const addTaksHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if(trimmedTitle) {
      addTask(taskTitle);
      setTaskTitle("");
    } else {
      setTasknputError('Title is required')
    }
  };

  const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && addTaksHandler();
  const setAllChangeFilter = () => changeFilter("all");
  const setActiveChangeFilter = () => changeFilter("active");
  const setCompletedChangeFilter = () => changeFilter("completed");

  const tasksElements: Array<JSX.Element> | JSX.Element =
    tasks.length !== 0 ? (
      tasks.map((task) => {
        return (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
            />
            <span className={task.isDone ? s.isdone : ''}>{task.title}</span>
            <Button onClickHandler={() => removeTask(task.id)} title={"x"} />
          </li>
        );
      })
    ) : (
      <span>Your taskslist is empty</span>
    );

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={textHandler}
          onKeyDown={keyDownAddTaskHandler}
          className={tasknputError ? s.inputerror : ''}
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
        <Button onClickHandler={setAllChangeFilter} title={"All"} />
        <Button onClickHandler={setActiveChangeFilter} title={"Active"} />
        <Button onClickHandler={setCompletedChangeFilter} title={"Completed"} />
      </div>
    </div>
  );
}; 
