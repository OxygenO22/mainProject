import { ChangeEvent, useState } from "react";

type PropsType = {
  value: string;
  onChange: (newTitle: string) => void;
};

export const ReducerTestsEditableSpan = ({ value, onChange }: PropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const activateEditModeHandler = () => {
    setEditMode(true);
  };

  const deactivateEditModeHandler = () => {
    setEditMode(false);
    onChange(title);
  };

  return (
    <>
      {editMode ? (
        <input
          value={title}
          onChange={changeTitleHandler}
          onBlur={deactivateEditModeHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
      )}
    </>
  );
};
