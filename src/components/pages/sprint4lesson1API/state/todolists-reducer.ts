import { Dispatch } from 'redux';
import { todolistApi, TodolistTypeAPI } from '../api/todolist-api';
import {FilterValuesType, TodolistType} from '../TodoAPI';
import {v1} from 'uuid';

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type SetTodoListsType = ReturnType<typeof setTodoListsAC>;

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodoListsType;

const initialState: TodolistType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        case 'SET_TODOLISTS': {
            return action.todos.map((tl) => ({...tl, filter: 'all'}));
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId} as const
}


// Action Creator Для запроса на бек
export const setTodoListsAC = (todos: TodolistTypeAPI[]) => ({type: 'SET_TODOLISTS', todos} as const)

// Thunk Creator - можно передавать пропсы
export const getTodosTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodoLists()
        .then((res) => dispatch(setTodoListsAC(res.data)))
}