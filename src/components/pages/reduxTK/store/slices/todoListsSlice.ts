import { createSlice } from "@reduxjs/toolkit";
import { TodoListType } from "../../ReduxTKToDo";
import { FilterValuesType } from "../../../../../types/common";

type AddTodoListActionType = {
  payload: {
    title: string
    todolistId: string
  }
}

type RemoveTodoListActionType = {
  payload: {
    todolistId: string
  }
} 

type UpdateTodoListTitleActionType = {
  payload: {
    todolistId: string, 
    title: string
  }
} 

type ChangeTodoListFilterActionType = {
  payload: {
    filter: FilterValuesType,
    todolistId: string
  }
} 

type TodoListsState = {
  todoLists: TodoListType[]
}

const initialState: TodoListsState = {
  todoLists: [],
  
}

const todoListsSlice = createSlice({
  name: 'TODO-LiST',
  initialState,
  reducers: {
    addTodoList(state, action: AddTodoListActionType) {
      const {title, todolistId} = action.payload;
      state.todoLists.push({
        id: todolistId,
        title, 
        filter: "all",
      });
    },
    removeTodoList(state, action: RemoveTodoListActionType) {
      const {todolistId} = action.payload;
      state.todoLists.filter((tl) => tl.id !== todolistId);
    },
    updateTodolist(state, action: UpdateTodoListTitleActionType) {
      const {title, todolistId} = action.payload 
      state.todoLists.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl));
    },
    changeTodoListFilter(state, action: ChangeTodoListFilterActionType) {
      const {filter, todolistId} = action.payload 
      state.todoLists.map((tl) =>
        tl.id === todolistId ? { ...tl, filter } : tl);
    },
  },
});

export const {addTodoList, removeTodoList, updateTodolist, changeTodoListFilter} = todoListsSlice.actions;
export default todoListsSlice.reducer;