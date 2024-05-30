import React, { useState } from 'react'
import { Todolist } from '../../../Todolist';
import { FilterValuesType, TaskType } from '../../../types/common';

export const ToDo = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: true },
    { id: 3, title: "JS/TS", isDone: false },
    { id: 4, title: "REACT", isDone: false },
  ]);
  const [checked, setChecked] = useState(true);
  const todolistTitle = "What to learn";

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  function handleChange() {
    setChecked(!checked);
  }

  //UI
  // local state
  const [filter, setFilter] = useState<FilterValuesType>("all");

  let filteredTasksForTodolost: Array<TaskType> = tasks;

  if (filter === "active") {
    filteredTasksForTodolost = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filteredTasksForTodolost = tasks.filter((t) => t.isDone);
  }

  const changeFilter = (newFilterValue: FilterValuesType) => {
    setFilter(newFilterValue);
  };

  return (
    <div>
    <Todolist
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
  )
}
