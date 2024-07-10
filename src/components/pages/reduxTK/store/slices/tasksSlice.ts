import { createSlice } from "@reduxjs/toolkit";
import { TaskStateType } from "../../../../../types/common";
import { v1 } from "uuid";

type AddTaskAT = {
  payload: {
    todolistId: string
    title: string
  }
}

type RemoveTaskAT = {
  payload: {
    todolistId: string
    taskId: string
  }
}

type ChaangeTaskStatusAT = {
  payload: {
    todolistId: string
    taskId: string
    newIsDoneValue: boolean
  }
}

type UpdateTaskAT = {
  payload: {
    todolistId: string
    taskId: string
    title: string
  }
}

type TasksState = {
  tasks: TaskStateType
}

const initialState: TasksState = {
  tasks: {}
}

const tasksSlice = createSlice({
  name: 'TASKS-LIST',
  initialState,
  reducers: {
    addNewTask(state, action: AddTaskAT) {
      const {todolistId, title} = action.payload;
      state.tasks = {...state.tasks, [todolistId]: [{
        id: v1(),
        title,
        isDone: false,
      },] }
    },
    removeTask(state, action: RemoveTaskAT) {
      const {todolistId, taskId} = action.payload;
      state.tasks = {
      ...state.tasks,
      [todolistId]: state.tasks[todolistId].filter((t) => t.id !== taskId),
    }
    },
    changeTaskStatus(state, action: ChaangeTaskStatusAT) {
      const {todolistId, taskId, newIsDoneValue} = action.payload;
      state.tasks = {
      ...state.tasks,
      [todolistId]: state.tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone: newIsDoneValue } : t
      ),
    }
    },
    updateTask(state, action: UpdateTaskAT) {
      const {todolistId, taskId, title} = action.payload;
      state.tasks = {
      ...state.tasks,
      [todolistId]: state.tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, title } : t
      ),
    }
    },
  },
});

export const {addNewTask, removeTask, changeTaskStatus, updateTask} = tasksSlice.actions;
export default tasksSlice.reducer;