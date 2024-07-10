import { configureStore } from "@reduxjs/toolkit";
import todoListsReducer from './slices/todoListsSlice';
import tasksReducer from './slices/tasksSlice'


const store = configureStore({
  reducer: {
    todoLists: todoListsReducer,
    tasks: tasksReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;