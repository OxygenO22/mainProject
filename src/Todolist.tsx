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
            <button onClick={() => removeTask(task.id)}>x</button>
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
        <button>+</button>
      </div>
      <ul>{tasksElements}</ul>
      <div>
        <button onClick={() => changeFilter("all")}>All</button>
        <button onClick={() => changeFilter("active")}>Active</button>
        <button onClick={() => changeFilter("completed")}>Completed</button>
      </div>
    </div>
  );
}; 
