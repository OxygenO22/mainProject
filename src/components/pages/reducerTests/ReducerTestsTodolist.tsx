import { Button } from "../../ui/button/Button";
import { FilterValuesType, TaskType } from "../../../types/common";
import s from "./ReducerTestsToDo.module.scss";
import { UniversalInput } from "../../ui/input/UniversalInput";
import { ReducerTestsEditableSpan } from "./ReducerTestsEditableSpan";

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

export const ReducerTestsTodolist = ({
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
        <div className={s.list__item_inner}>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={(e) =>
              changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
            }
          />
          <p className={task.isDone ? s.isdone : ""}>
            <ReducerTestsEditableSpan
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
        </div>
      </li>
    );
  });

  const tasksElements: JSX.Element[] | JSX.Element =
    tasks.length !== 0 ? mappedTasks : <span>Your taskslist is empty</span>;

  return (
    <div className={s.todolist}>
      <div className={s.todolist__title_wrapper}>
        <h3>
          <ReducerTestsEditableSpan
            value={title}
            onChange={updateTodolistHandler}
          />
        </h3>
        <Button
          onClickHandler={() => removeTodoList(todolistId)}
          title={"x"}
        />
      </div>
      <UniversalInput addItem={addTaskHandler} />
      <ul className={s.todolist__tasks_wrapper}>{tasksElements}</ul>
      <div className={s.todolist__buttons_wrapper}>
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
