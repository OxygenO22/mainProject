import { Button } from "../src/components/ui/button/Button";
import { FilterValuesType, TaskType } from "./types/common"


type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: number) => void;
  changeFilter: (newFilterValue: FilterValuesType) => void;
};

export const Todolist = ({
  title,
  tasks,
  removeTask,
  changeFilter,
}: TodolistPropsType) => {
  const tasksElements: Array<JSX.Element> | JSX.Element =
    tasks.length !== 0 ? (
      tasks.map((task) => {
        return (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
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
        <input />
        <Button title={"+"} />
      </div>
      <ul>{tasksElements}</ul>
      <div>
        <Button onClickHandler={() => changeFilter("all")} title={"All"} />
        <Button
          onClickHandler={() => changeFilter("active")}
          title={"Active"}
        />
        <Button
          onClickHandler={() => changeFilter("completed")}
          title={"Completed"}
        />
      </div>
    </div>
  );
}; 
