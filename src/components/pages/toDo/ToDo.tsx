import React, { useState } from 'react'
import { Todolist } from '../../../Todolist';
import { FilterValuesType, TaskType } from '../../../types/common';
import { v1 } from 'uuid';

export const ToDo = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS/TS", isDone: false },
    { id: v1(), title: "REACT", isDone: false },
  ]);
  const [checked, setChecked] = useState(true);
  // local state
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const todolistTitle = "What to learn";

  const addTask = (title: string) => {
    if (title !== "") {
      const newTask: TaskType = {
        id: v1(),
        title,
        isDone: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const removeTask = (taskId: string) => setTasks(tasks.filter((t) => t.id !== taskId));
  const handleChange = () => setChecked(!checked);

  let filteredTasksForTodolost: Array<TaskType> = tasks;

  if (filter === "active") {
    filteredTasksForTodolost = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filteredTasksForTodolost = tasks.filter((t) => t.isDone);
  }

  const changeFilter = (newFilterValue: FilterValuesType) => setFilter(newFilterValue);

  return (
    <div>
      <Todolist
        addTask={addTask}
        changeFilter={changeFilter}
        removeTask={removeTask}
        title={todolistTitle}
        tasks={filteredTasksForTodolost}
      />
      {/* Todolist({title: "What to learn", tasks: tasks}) */}
      <div>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span>Example</span>
      </div>
    </div>
  );
}
