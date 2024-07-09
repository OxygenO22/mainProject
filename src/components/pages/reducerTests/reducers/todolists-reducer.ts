import { v1 } from "uuid";
import { TodoListType } from "../ReducerTestsToDo";
import { FilterValuesType } from "../../s2hw1/S2hw1Microtask";

type AddTodoListActionType = {
  type: "ADD-TODOLIST"
  payload: {
    title: string
    id: string
  }
}

type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST"
  payload: {
    id: string
  }
} 

type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER"
  payload: {
    filter: FilterValuesType,
    id: string
  }
} 

type UpdateTodoListTitleActionType = {
  type: "UPDATE-TODOLIST-TITLE"
  payload: {
    id: string, 
    title: string
  }
} 

export type ActionType = AddTodoListActionType | RemoveTodoListActionType | ChangeTodoListFilterActionType | UpdateTodoListTitleActionType

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

export const AddTodoListActionCreator = (id: string, title: string): AddTodoListActionType => ({
  type: "ADD-TODOLIST",
  payload: {
    title,
    id
  }
})

export const RemoveTodoListActionCreator = (id: string): RemoveTodoListActionType => ({
  type: "REMOVE-TODOLIST",
  payload: {
    id
  }
})

export const ChangeTodoListFilterActionCreator = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
  payload: {
    filter,
    id
  }
})

export const UpdateTodoListTitleActionCreator = (id: string, 
    title: string): UpdateTodoListTitleActionType => ({
  type: "UPDATE-TODOLIST-TITLE",
  payload: {
    id,
    title
  }
})
