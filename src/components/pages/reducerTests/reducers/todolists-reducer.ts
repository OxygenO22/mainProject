import { v1 } from "uuid";
import { TodoListType } from "../ReducerTestsToDo";
import { FilterValuesType } from "../../s2hw1/S2hw1Microtask";

type AddTodoListActionTtype = {
  type: "ADD-TODOLIST"
  payload: {
    title: string
    id: string
  }
}

type RemoveTodoListActionTtype = {
  type: "REMOVE-TODOLIST"
  payload: {
    id: string
  }
} 

type ChangeTodoListFilterActionTtype = {
  type: "CHANGE-TODOLIST-FILTER"
  payload: {
    filter: FilterValuesType,
    id: string
  }
} 

type UpdateTodoListTitleActionTtype = {
  type: "UPDATE-TODOLIST-TITLE"
  payload: {
    id: string, 
    title: string
  }
} 

export type ActionType = AddTodoListActionTtype | RemoveTodoListActionTtype | ChangeTodoListFilterActionTtype | UpdateTodoListTitleActionTtype

export const todolistsReducer = (todolists: TodoListType[], action: ActionType): TodoListType[] => {
  switch (action.type) {

    case "ADD-TODOLIST": {
      const {title, id} = action.payload;
      return [...todolists, {
        id,
        title,
        filter: "all",
      } ]
    }

    case "REMOVE-TODOLIST": {
      const {id} = action.payload 
      return todolists.filter((tl) => tl.id !== id)
    }

    case "CHANGE-TODOLIST-FILTER": {
      const {filter, id} = action.payload 
      return todolists.map((tl) =>
        tl.id === id ? { ...tl, filter } : tl
      )
    }

    case "UPDATE-TODOLIST-TITLE": {
      const {title, id} = action.payload 
      return todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl))
    }

    default:
      return todolists;
  }
}