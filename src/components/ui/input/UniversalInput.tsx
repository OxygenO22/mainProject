import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button } from '../button/Button';
import s from './UniversalInput.module.scss'

type UniversalInputPropsType = {
  addItem: (title: string) => void;
};

export const UniversalInput = ({ addItem }: UniversalInputPropsType) => {
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
      addItem(taskTitle);
      setTaskTitle("");
    } else {
      setTasknputError("Please fill the title");
    }
  };

  const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && addTaksHandler();

  const checkInputOnLeave = () =>
    !taskTitle.trim() && setTasknputError("To add task title should be filled");

  return (
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
  );
};
